"use client";

import { useRef } from "react";
import { useMainStore } from "@/store/main";

export default function Home() {
  const store = useMainStore();
  const inputRef = useRef(null);

  async function onSubmit(e: any) {
    e.preventDefault();
    await store.getListProject(inputRef);
  }

  return (
    <div>
      <p>Project Explorer</p>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} placeholder="type user id" />
      </form>
      {store.projectList.map((x: any, i: number) => (
        <div
          key={i}
          className="cursor-pointer"
          onClick={() => store.getDetailProject(x.full_name)}
        >
          {x.name}
        </div>
      ))}
      <div dangerouslySetInnerHTML={{ __html: store.readme }} />
    </div>
  );
}
