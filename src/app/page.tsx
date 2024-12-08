"use client";

import { useEffect, useRef, useState } from "react";
import { useMainStore } from "@/store/main";
import commonmark from "commonmark";
import MarkdownView from "react-showdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import moment from "moment";
import "highlight.js/styles/atom-one-dark.css";

export default function Home() {
  const store = useMainStore();
  const inputRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    inputRef.current.focus();
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault();
    // var reader = new commonmark!.Parser();
    // var writer = new commonmark.HtmlRenderer();
    // var parsed = reader.parse("Hello *world*");

    // console.log("wkwkw", reader);
    await store.getListProject(inputRef);
  }

  const showList = () => store.user?.id || store.projectList.length;

  return (
    <div className="relative h-screen w-full flex flex-col items-center">
      {/* search section */}
      <div
        className={`flex items-center justify-center gap-5 absolute w-full bg-[#212121] duration-500 z-[3] left-0 ${
          store.showList
            ? "top-0 py-5"
            : "flex-col top-1/2 -translate-y-1/2 h-screen"
        }`}
      >
        <p
          className={`font-semibold bg-gradient-to-r from-[#F9DBBA] to-[#FB773C] inline-block text-transparent bg-clip-text ${
            store.showList ? "text-xl" : "text-4xl"
          }`}
        >
          Project Explorer
        </p>
        <form
          onSubmit={onSubmit}
          className={`px-5 w-1/2 bg-[#2F2F2F] rounded-xl flex items-center gap-5 ${
            store.showList ? "py-3" : "py-3.5"
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

      {/* search result */}
      <div className="flex w-full overflow-y-hidden">
        <div
          className={`h-[calc(100vh-5.5rem)] flex flex-col items-center transition-all duration-500 mt-[5.5rem] w-[40%] ${
            store.showList
              ? store.readme
                ? "opacity-0 !w-0"
                : "translate-y-0 pl-5"
              : "translate-y-full"
          }`}
        >
          {store.loadingList && (
            <div className="animate-pulse h-full w-full gap-5 grid grid-cols-1">
              <div className="w-full flex flex-col gap-5">
                <div className="h-[48%] bg-[#2F2F2F] rounded-lg"></div>
              </div>
            </div>
          )}
          {!store.loadingList && (
            <div className="flex flex-col items-center bg-[#2F2F2F] rounded-lg p-7 w-full">
              <div className="w-[14rem] h-[14rem] bg-[#555] rounded-2xl mb-5">
                {store.user?.avatar_url && (
                  <Image
                    src={store.user?.avatar_url}
                    alt="avatar"
                    width="100"
                    height="100"
                    className="w-[14rem] rounded-2xl"
                  />
                )}
              </div>
              {store.user?.id && (
                <>
                  <p className="text-xl font-semibold">{store.user?.name}</p>
                  <p className="text-lg text-[#bbb]">{store.user?.login}</p>
                  <div className="flex items-center gap-2 mb-5">
                    <p className="text-[#aaa]">
                      <span className="font-semibold text-white">
                        {store.user?.followers}
                      </span>{" "}
                      followers
                    </p>{" "}
                    |
                    <p className="text-[#aaa]">
                      <span className="font-semibold text-white">
                        {store.user?.following}
                      </span>{" "}
                      following
                    </p>
                  </div>
                  <div className="w-full flex flex-col">
                    {store.user?.bio && (
                      <p className="mb-5">{store.user?.bio}</p>
                    )}
                    <p>{store.user?.location}</p>
                    <a>{store.user?.email}</a>
                    <a>{store.user?.blog}</a>
                    {store.user?.twitter_username && (
                      <a>@{store.user?.twitter_username}</a>
                    )}
                  </div>
                </>
              )}
              {!store.user?.id && (
                <p className="text-xl font-semibold text-[#555]">
                  User not found
                </p>
              )}
            </div>
          )}
        </div>

        {/* project list */}
        <div
          className={`px-7 flex flex-col items-center gap-3 duration-500 overflow-y-auto pb-10 h-[calc(100vh-5.5rem)] mt-[5.5rem] bg-[#212121] ${
            store.showList ? " translate-y-0 z-[2]" : "translate-y-full z-[-1]"
          } ${store.readme ? "w-[45%]" : "w-full"}`}
        >
          {store.loadingList && (
            <div className="animate-pulse h-full w-full gap-5 grid grid-cols-1">
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
                className={`cursor-pointer bg-[#2F2F2F] py-5 px-7 flex items-center justify-between hover:scale-[1.005] rounded-lg ${
                  store.readme ? "w-full" : "w-full"
                }`}
                onClick={() => store.getDetailProject(x.full_name)}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-[#FB773C]">
                      {x.name}
                    </p>
                    <p className="border border-[#aaa] rounded-lg text-xs px-2.5 text-[#ddd]">
                      <span className="capitalize">{x.visibility}</span>
                      {x.is_template && " template"}
                    </p>
                  </div>
                  <p className="line-clamp-2 text-[.95rem] text-[#ddd]">
                    {x.description}
                  </p>
                  {x.topics.length ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      {x.topics.map((y: any, i: number) => (
                        <p
                          key={i}
                          className="rounded-lg text-xs font-semibold px-3 py-1 bg-[#F9DBBA] text-[#212121]"
                        >
                          {y}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  <p className="text-[.9rem] text-[#ddd]">
                    Updated on {moment(x.updated_at).format("ll")}
                  </p>
                </div>

                {store.loadingDetail &&
                  x.full_name == store.projectName &&
                  !store.readme && (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
              </div>
            ))}

          {store.error && (
            <div className="">
              <p className="text-lg font-semibold text-[#555]">{store.error}</p>
            </div>
          )}
        </div>

        {/* project detail */}
        <div
          className={`h-[calc(100vh-5.5rem)] overflow-y-auto mt-[5.5rem] pb-10 relative duration-500 ${
            store.readme ? "w-full px-5" : "w-0 opacity-0"
          }`}
        >
          <div className="flex justify-between pb-5">
            {!store.loadingDetail && (
              <div className="flex items-center gap-1">
                <p
                  className="text-[#aaa] cursor-pointer hover:text-[#ddd]"
                  onClick={() => store.set({ readme: "" })}
                >
                  {inputRef?.current?.value}
                </p>
                /
                <p className="text-[#FB773C] font-semibold">
                  {store.detail?.name}
                </p>
              </div>
            )}
            {store.loadingDetail && (
              <div className="animate-pulse h-6 w-60">
                <div className="bg-[#2F2F2F] h-[100%] rounded-lg"></div>
              </div>
            )}
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
                <div className="bg-[#2F2F2F] h-[21%] rounded-lg"></div>
                <div className="h-[70%] bg-[#2F2F2F] rounded-lg"></div>
              </div>
            </div>
          )}
          {!store.loadingDetail && !store.error && (
            <div>
              {store.detail?.id && (
                <div className="bg-[#2F2F2F] rounded-lg px-5 py-3 flex flex-col gap-2 mb-7">
                  <p className="font-semibold">About</p>
                  <p>{store.detail?.description}</p>
                  {store.detail?.topics.length ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      {store.detail?.topics.map((y: any, i: number) => (
                        <p
                          key={i}
                          className="rounded-lg text-xs font-semibold px-3 py-1 bg-[#F9DBBA] text-[#212121]"
                        >
                          {y}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  <div className="flex items-center gap-2">
                    <p className="text-[#aaa]">
                      <span className="font-semibold text-white">
                        {store.detail?.stargazers_count}
                      </span>{" "}
                      stars
                    </p>{" "}
                    |
                    <p className="text-[#aaa]">
                      <span className="font-semibold text-white">
                        {store.detail?.watchers_count}
                      </span>{" "}
                      watching
                    </p>
                    |
                    <p className="text-[#aaa]">
                      <span className="font-semibold text-white">
                        {store.detail?.forks_count}
                      </span>{" "}
                      forks
                    </p>
                  </div>
                </div>
              )}
              <p className="text-lg font-semibold border-b-2 pr-3 border-[#FB773C] mb-5">
                Readme
              </p>
              <Markdown
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                className=""
              >
                {store.readme}
              </Markdown>
            </div>
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
