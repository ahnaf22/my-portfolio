"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Asia/Dhaka",
});

export function LiveClock({ withSeconds = false }: { withSeconds?: boolean }) {
  // empty until mounted so server and client markup match
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const shown = t ? (withSeconds ? t : t.slice(0, 5)) : "--:--";
  return <span className="tabular-nums">{shown}</span>;
}
