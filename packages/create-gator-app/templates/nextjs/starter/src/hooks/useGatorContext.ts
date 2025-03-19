"use client";
import { GatorContext } from "@/providers/GatorProvider";
import { useContext } from "react";

export function useGatorContext() {
  const context = useContext(GatorContext);

  if (!context) {
    throw new Error(
      "useGatorContext must be used within the scope of GatorContextProvider"
    );
  }

  return context;
}
