"use client";

import { useState } from "react";
import { ReadyProvider } from "./ready";
import { SmoothScroll } from "./SmoothScroll";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";

export function Shell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <ReadyProvider value={ready}>
      <SmoothScroll />
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      {children}
    </ReadyProvider>
  );
}
