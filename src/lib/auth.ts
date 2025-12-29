// src/lib/auth.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getUserFromJWT() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as {
      id: string;
      name?: string;
      email?: string;
      avatarUrl?: string;
    };
  } catch {
    return null;
  }
}
