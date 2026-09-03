"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MediaAsset } from "@/data/landingPage";
import { trailer } from "@/data/landingPage";
import { TrailerModal } from "./TrailerModal";

interface VideoRequest {
  asset: MediaAsset;
  label: string;
}

interface TrailerContextValue {
  /** Oeffnet den 90-Sekunden-Trailer. */
  openTrailer: () => void;
  /** Oeffnet ein beliebiges Video im Fullscreen-Overlay. */
  openVideo: (asset: MediaAsset, label: string) => void;
  close: () => void;
  active: VideoRequest | null;
}

const TrailerContext = createContext<TrailerContextValue | null>(null);

export function TrailerProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<VideoRequest | null>(null);

  const openVideo = useCallback(
    (asset: MediaAsset, label: string) => setActive({ asset, label }),
    [],
  );
  const openTrailer = useCallback(
    () => setActive({ asset: trailer.video, label: trailer.label }),
    [],
  );
  const close = useCallback(() => setActive(null), []);

  const value = useMemo(
    () => ({ openTrailer, openVideo, close, active }),
    [openTrailer, openVideo, close, active],
  );

  return (
    <TrailerContext.Provider value={value}>
      {children}
      <TrailerModal request={active} onClose={close} />
    </TrailerContext.Provider>
  );
}

export function useTrailer() {
  const ctx = useContext(TrailerContext);
  if (!ctx) {
    throw new Error(
      "useTrailer muss innerhalb von <TrailerProvider> genutzt werden.",
    );
  }
  return ctx;
}
