"use client";

import Layout from "@/components/layout";
import { useEffect } from "react";
import { useMainStore } from "@/store/main";

export default function Home() {
  const store = useMainStore();

  useEffect(() => {
    store.resetState();
  }, []);

  return <Layout />;
}
