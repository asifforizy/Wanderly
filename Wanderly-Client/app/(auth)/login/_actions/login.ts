"use server";

import { cookies } from "next/headers";

export async function loginUser(payload: {
  email: string;
  password: string;
  clientVersion?: number;
}) {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      res.status === 401 || res.status === 404
        ? "Incorrect email or password."
        : data?.message || "Login failed";

    if (payload.clientVersion === 2) {
      return { success: false as const, message };
    }

    throw new Error(message);
  }

  const cookieStore = await cookies();

  // Tokens may come in the response body or in the backend's Set-Cookie headers
  let accessToken: string | undefined =
    data?.data?.accessToken ?? data?.accessToken;
  let refreshToken: string | undefined =
    data?.data?.refreshToken ?? data?.refreshToken;

  if (!accessToken) {
    for (const line of res.headers.getSetCookie()) {
      const [pair] = line.split(";");
      const index = pair.indexOf("=");
      const name = pair.slice(0, index).trim();
      const value = pair.slice(index + 1).trim();
      if (name === "accessToken") accessToken = value;
      if (name === "refreshToken") refreshToken = value;
    }
  }

  if (!accessToken) {
    const message =
      "Login worked, but no accessToken was found in the response";

    if (payload.clientVersion === 2) {
      return { success: false as const, message };
    }

    throw new Error(message);
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  cookieStore.set("accessToken", accessToken, {
    ...options,
    maxAge: 60 * 60 * 24,
  });

  if (refreshToken) {
    cookieStore.set("refreshToken", refreshToken, {
      ...options,
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return { success: true as const, data };
}
