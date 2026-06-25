"use client";

import { createContext, MutableRefObject, useContext } from "react";

/** Optional scroll progress ref shared inside an active portal (0..1). */
export const PortalScrollContext = createContext<MutableRefObject<number> | null>(null);

export function usePortalScrollProgress() {
  return useContext(PortalScrollContext);
}
