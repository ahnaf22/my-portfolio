"use client";

import { createContext, useContext } from "react";

const ReadyContext = createContext(false);

export const ReadyProvider = ReadyContext.Provider;
export const useReady = () => useContext(ReadyContext);
