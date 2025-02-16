import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateLoginInput } from "../../validations/auth.validation";
import { config } from "../../config/config";
import { eq } from "drizzle-orm";
import db from "../../db";
import { usersTable } from "../../db/schema";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const validationError = validateLoginInput({ email, password });
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (existingUser.length === 0) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const user = existingUser[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    if (!user.is_verified) {
      res
        .status(403)
        .json({ message: "Email not verified. Please verify your email." });
      return;
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      config.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: user.id },
      config.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
