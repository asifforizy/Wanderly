import { DestinationsResult } from "@/types/destination";

export async function getDestinations(): Promise<DestinationsResult> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/destinations`,
      {
        cache: "no-store",
      }
    );

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      return {
        success: false,
        message: json?.message || "Failed to load destinations",
      };
    }

    // Handles both `data: [...]` and `data: { data: [...], meta }`
    const list = Array.isArray(json.data) ? json.data : json.data?.data ?? [];

    return { success: true, destinations: list };
  } catch {
    return {
      success: false,
      message: "Cannot reach the server. Please try again later.",
    };
  }
}
