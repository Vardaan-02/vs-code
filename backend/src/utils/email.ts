import nodemailer from "nodemailer";
import { config } from "../config/config";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";
import db from "../db";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const verificationLink = `${config.FRONTEND_URL}/auth/verify-email?token=${token}`;
    const mailOptions = {
      from: `"V Code" <${config.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Welcome to V Code!</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}" target="_blank">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw new Error("Email sending failed");
  }
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  try {
    const resetUrl = `${config.FRONTEND_URL}/auth/reset-password?token=${token}`;

    const mailOptions = {
      from: `V Code <${config.SMTP_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>This link is valid for 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Password reset email sent to: ${email}`);
  } catch (error) {
    console.error("❌ Error sending reset password email:", error);
    throw new Error("Failed to send password reset email");
  }
};