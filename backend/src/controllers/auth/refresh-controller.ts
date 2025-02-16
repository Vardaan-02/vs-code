import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config/config";

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ message: "Unauthorized: No refresh token" });
      return;
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        refreshToken,
        config.JWT_REFRESH_SECRET
      ) as JwtPayload;
    } catch (err) {
      res.status(403).json({ message: "Invalid or expired refresh token" });
      return;
    }

    if (!decoded.userId) {
      res.status(403).json({ message: "Invalid token payload" });
      return;
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      config.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
