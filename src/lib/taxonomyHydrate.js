import { hydrateSectorsFromApi } from "@/mock/sectors";
import { hydrateCitiesFromApi } from "@/mock/cities";
import { hydrateJobOptionsFromApi } from "@/mock/jobOptions";

const API = process.env.NEXT_PUBLIC_API_URL;

/**
 * Loads the API's taxonomy into the shared option lists, in place.
 *
 * Records store the API's keys (`kitchen`, `tangier`, …), not the fixture ids
 * (`restaurant`, `tanger`, …), so without this every label lookup and every
 * filter sent back to the API misses.
 */
export async function hydrateTaxonomiesFromApi() {
  if (!API) return false;
  try {
    const res = await fetch(`${API}/taxonomies`);
    const json = await res.json().catch(() => ({}));
    const items = json.data;
    if (!res.ok || !Array.isArray(items) || items.length === 0) return false;

    hydrateSectorsFromApi(items);
    hydrateCitiesFromApi(items);
    hydrateJobOptionsFromApi(items);
    return true;
  } catch {
    return false;
  }
}
