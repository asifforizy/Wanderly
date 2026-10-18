"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type CreateDestinationPayload = {
  name: string;
  country: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  estimatedBudget: number;
  currency: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  activities: string[];
  travelTips: string[];
  imageUrl: string;
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
        // If Postman only works with the wrapper, use: JSON.stringify({ data: payload })
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const data = await res.json().catch(() => null);
    console.log("CREATE DESTINATION:", res.status, JSON.stringify(data)); // remove when it works

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
