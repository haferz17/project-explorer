"use client";

import { useRef, useState } from "react";
import { useMainStore } from "@/store/main";
import commonmark from "commonmark";
import MarkdownView from "react-showdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import "highlight.js/styles/atom-one-dark.css";

export default function Home() {
  const store = useMainStore();
  const inputRef = useRef(null);

  async function onSubmit(e: any) {
    e.preventDefault();
    // var reader = new commonmark!.Parser();
    // var writer = new commonmark.HtmlRenderer();
    // var parsed = reader.parse("Hello *world*");

    // console.log("wkwkw", reader);
    await store.getListProject(inputRef);
  }

  return (
    <div className="relative h-screen w-full flex flex-col items-center">
      <div
        className={`flex items-center justify-center gap-5 absolute w-full bg-[#212121] duration-500 z-[2] ${
          store.projectList.length
            ? "top-0 left-0 py-5"
            : "flex-col top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 h-screen"
        }`}
      >
        <p
          className={`font-semibold ${
            store.projectList.length ? "text-xl" : "text-3xl"
          }`}
        >
          Project Explorer
        </p>
        <form
          onSubmit={onSubmit}
          className={`px-5 w-1/2 bg-[#2F2F2F] rounded-xl flex items-center gap-5 ${
            store.projectList.length ? "py-3" : "py-3.5"
          }`}
        >
          <input
            ref={inputRef}
            placeholder="Type github username"
            className="w-full bg-transparent outline-none"
          />
          {!store.loadingList && (
            <Image
              src={require("../assets/icons/search.svg")}
              alt={"search"}
              className="w-4 cursor-pointer"
              onClick={onSubmit}
            />
          )}
          {store.loadingList && (
            <span className="loading loading-spinner loading-md"></span>
          )}
        </form>
      </div>
      <div className="flex w-full">
        <div
          className={`px-7 flex flex-col items-center gap-5 duration-500 overflow-y-auto ${
            store.projectList.length
              ? "mt-[5.5rem] pb-10 h-[calc(100vh-5.5rem)]"
              : "mt-[100vh] z-[-1]"
          } ${store.readme ? "w-[35%]" : "w-full"}`}
        >
          {store.loadingList && store.projectList.length && (
            <div className="animate-pulse h-full w-2/3 gap-5 grid grid-cols-1">
              <div className="w-full flex flex-col gap-5">
                <div className="h-[20%] bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[20%] bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[20%] bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[20%] bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[20%] bg-[#2F2F2F] rounded-lg"></div>
              </div>
            </div>
          )}
          {!store.loadingList &&
            store.projectList.map((x: any, i: number) => (
              <div
                key={i}
                className={`cursor-pointer bg-[#2F2F2F] py-10 px-10 flex items-center justify-between ${
                  store.readme ? "w-full" : "w-2/3"
                }`}
                onClick={() => store.getDetailProject(x.full_name)}
              >
                <p>{x.name}</p>
                {store.loadingDetail &&
                  x.full_name == store.projectName &&
                  !store.readme && (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
              </div>
            ))}
        </div>
        <div
          className={`h-[calc(100vh-5.5rem)] overflow-y-auto mt-[5.5rem] pb-10 relative duration-500 ${
            store.readme ? "w-full px-5" : "w-0"
          }`}
        >
          <div className="flex justify-end pb-5">
            <Image
              src={require("../assets/icons/close.svg")}
              alt={"close"}
              className="w-6 cursor-pointer"
              onClick={() => store.set({ readme: "" })}
            />
          </div>
          {store.loadingDetail && (
            <div className="animate-pulse h-full gap-6 grid grid-cols-1">
              <div className="w-full flex flex-col gap-5">
                <div className="bg-[#2F2F2F] h-[10%] rounded-lg"></div>
                <div className="h-[30%] bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[48%] bg-[#2F2F2F] rounded-lg"></div>
              </div>
            </div>
          )}
          {!store.loadingDetail && !store.error && (
            <Markdown rehypePlugins={[rehypeRaw, rehypeHighlight]} className="">
              {store.readme}
            </Markdown>
          )}
          {store.error && (
            <div>
              <p>{store.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
