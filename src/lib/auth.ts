import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

type JwtPayload = {
  userId: string;
};

export async function getUserFromJWT() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // 🔥 map userId → id (what Prisma expects)
    return {
      id: decoded.userId,
    };
  } catch {
    return null;
  }
}
