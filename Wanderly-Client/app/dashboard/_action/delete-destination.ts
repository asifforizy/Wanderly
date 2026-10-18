"use server";

import { revalidatePath } from "next/cache";
import { getAuthHeaders } from "./get-auth-headers";


export async function deleteDestination(id: string) {
  try {
    const headers = await getAuthHeaders();
    if (!headers)
      return { success: false as const, message: "Please log in first" };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/destinations/${id}`,
      {
        method: "DELETE",
        headers,
        cache: "no-store",
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok || data?.success === false) {
      return {
        success: false as const,
        message: data?.message || "Failed to delete destination",
      };
    }

    revalidatePath("/dashboard");
    revalidatePath("/destinations");

    return { success: true as const };
  } catch {
    return {
      success: false as const,
      message: "Cannot reach the server. Please try again later.",
    };
  }
}
