
import { Destination } from "@/types/destination";
import { getAuthHeaders } from "./get-auth-headers";


export type MyDestinationsResult =
  | { success: true; destinations: Destination[] }
  | { success: false; message: string };

export async function getMyDestinations(): Promise<MyDestinationsResult> {
  try {
    const headers = await getAuthHeaders();
    if (!headers) return { success: false, message: "Please log in first" };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/destinations/my`,
      {
        headers,
        cache: "no-store",
      }
    );

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      return {
        success: false,
        message: json?.message || "Failed to load your listings",
      };
    }

    const list = Array.isArray(json.data) ? json.data : json.data?.data ?? [];
    return { success: true, destinations: list };
  } catch {
    return {
      success: false,
      message: "Cannot reach the server. Please try again later.",
    };
  }
}
