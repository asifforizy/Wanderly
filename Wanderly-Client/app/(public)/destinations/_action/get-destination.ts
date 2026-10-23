import { DestinationsResult } from "@/types/destination";

export type DestinationFilters = {
  search?: string;
  category?: string;
  budget?: string;
  limit?: number;
};

export type DestinationSearchParams = {
  search?: string | string[];
  searchTerm?: string | string[];
  category?: string | string[];
  budget?: string | string[];
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function getDestinationFilters(params: DestinationSearchParams): DestinationFilters {
  const search = (firstValue(params.search) || firstValue(params.searchTerm) || "").trim();

  return {
    search: search || undefined,
    category: firstValue(params.category) || undefined,
    budget: firstValue(params.budget) || undefined,
  };
}

export async function getDestinations(filters: DestinationFilters = {}): Promise<DestinationsResult> {
  try {
    const query = new URLSearchParams();

    if (filters.search) query.set("search", filters.search);
    if (filters.category) query.set("category", filters.category);
    if (filters.budget) query.set("budget", filters.budget);
    if (filters.limit) query.set("limit", String(filters.limit));

    const queryString = query.toString();
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/destinations${queryString ? `?${queryString}` : ""}`,
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

    return {
      success: true,
      destinations: list,
      total: json.meta?.total ?? list.length,
    };
  } catch {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Cannot reach the API at ${process.env.BACKEND_API_URL}. Is Wanderly-Server running?`
          : "Cannot reach the server. Please try again later.",
    };
  }
}
