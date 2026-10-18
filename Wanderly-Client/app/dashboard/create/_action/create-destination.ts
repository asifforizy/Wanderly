"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type CreateDestinationPayload = {
  name: string;
  description: string;
  country: string;
  city: string;
  price?: number;
  imageUrl?: string;
};

export async function createDestination(payload: CreateDestinationPayload) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false as const, message: "Please log in first" };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/destinations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      return {
        success: false as const,
        message: data?.message || "Failed to create destination",
      };
    }

    revalidatePath("/dashboard");
    revalidatePath("/destinations");

    return { success: true as const, data: data.data };
  } catch {
    return {
      success: false as const,
      message: "Cannot reach the server. Please try again later.",
    };
  }
}
