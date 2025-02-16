import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import db from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { config } from "../../config/config";
import { sendResetPasswordEmail } from "../../utils/email";

export const forgotPassword = async (req: Request, res: Response):Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const resetToken = jwt.sign({ userId: user[0].id }, config.JWT_EMAIL_SECRET, {
      expiresIn: "1h",
    });

    await sendResetPasswordEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
