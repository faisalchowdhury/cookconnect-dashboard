"use client";

import { useEffect, useState } from "react";

import { hydrateTaxonomiesFromApi } from "@/lib/taxonomyHydrate";

const USE_API = Boolean(process.env.NEXT_PUBLIC_API_URL);

/**
 * Holds the screens back until the API taxonomy is loaded, so labels and filter
 * options are never rendered from fixture ids first. If the request fails the
 * screens render anyway, with the fixture lists.
 */
export default function TaxonomyHydrator({ children }) {
  const [ready, setReady] = useState(!USE_API);

  useEffect(() => {
    if (ready) return undefined;
    let alive = true;
    hydrateTaxonomiesFromApi().finally(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, [ready]);

  if (!ready) return <div className="min-h-screen bg-white" />;
  return children;
}
