import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";

  const res = await fetch(`${BACKEND_URL}/api/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
