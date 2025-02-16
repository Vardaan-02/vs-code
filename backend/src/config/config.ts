import dotenv from "dotenv";

dotenv.config();

export const config = {
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  SMTP_USER: process.env.SMTP_USER || "noreplyvardaan@gmail.com",
  SMTP_PASS: process.env.SMTP_PASS || "uyie abzo dlce levk",

  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  BACKEND_URL:process.env.BACKEND_URL || "https://yourbackend.com",

  JWT_EMAIL_SECRET: process.env.JWT_EMAIL_SECRET || "6283087912",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "7015832983",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "9802204488",

  GOOGLE_CLIENT_ID:"your_google_client_id",
  GOOGLE_CLIENT_SECRET:"your_google_client_secret",
  GITHUB_CLIENT_ID:"your_github_client_id",
  GITHUB_CLIENT_SECRET:"your_github_client_secret",
};
