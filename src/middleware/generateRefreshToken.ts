

import jwt from "jsonwebtoken";

export default function generateRefreshToken(payload: any): string {
  const secret = process.env.REFRESH_SECRET_TOKEN;

  if (!secret) {
    throw new Error("REFRESH_SECRET_TOKEN is not defined");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d", 
  });
}