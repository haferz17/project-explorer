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
import { useRouter, usePathname, useParams } from "next/navigation";
import "highlight.js/styles/atom-one-dark.css";
import Layout from "@/components/layout";

export default function Home() {
  const store = useMainStore();
  const inputRef = useRef(null);
  const router = useRouter();
  const path = usePathname();
  const params = useParams();

  useEffect(() => {
    store.getDetailProject(path);
  }, []);

  return (
    <Layout>
      <div
        className={`flex w-full md:overflow-y-hidden relative ${
          !store.showList && ""
        }`}
      >
        {/* route */}
        <div className="flex fixed pb-3 pl-5 sm:pl-9 md:pl-5 bg-[#212121] w-full top-[8rem] md:top-[5.5rem] z-[2]">
          {!store.loadingDetail && store.detail?.name && (
            <div className="flex items-center gap-1">
              <p
                className="text-[#aaa] cursor-pointer hover:text-[#ddd]"
                onClick={() => router.back()}
              >
                {params?.user}
              </p>
              /
              <p className="text-[#FB773C] font-semibold line-clamp-1">
                {store.detail?.name}
              </p>
            </div>
          )}
          {store.loadingDetail && (
            <div className="animate-pulse h-6 w-60">
              <div className="bg-[#2F2F2F] h-[100%] rounded-lg"></div>
            </div>
          )}
        </div>

        {!store.loadingDetail && (
          <div className="h-[calc(100vh-5.5rem)] mt-[7.5rem] md:mt-[5.5rem] pb-10 relative duration-500 bg-[#212121] flex max-md:flex-col max-md:items-center md:gap-5 w-full max-md:overflow-y-auto">
            {/* detail */}
            {store.detail?.id && !store.loadingDetail && (
              <div className="bg-[#2F2F2F] rounded-lg px-5 py-3 flex flex-col gap-2 mb-7 mt-12 md:ml-5 h-fit w-full sm:w-[90%] md:w-[30%]">
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
                <a
                  href={store.detail?.html_url}
                  target="_blank"
                  className="text-sm font-semibold text-[#FB773C]"
                >
                  See on Github
                </a>
              </div>
            )}

            {/* readme */}
            {store.readme && !store.loadingDetail && (
              <div className="md:mt-12 md:overflow-y-auto h-full w-full sm:w-[90%] md:w-[70%] pb-10 md:pr-5 max-sm:px-5">
                <p className="text-lg font-semibold border-b-2 pr-3 border-[#FB773C] mb-5">
                  Readme
                </p>
                <Markdown
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  className="max-md:pb-14"
                >
                  {store.readme}
                </Markdown>
              </div>
            )}
          </div>
        )}

        {/* loading */}
        {store.loadingDetail && (
          <div className="h-screen w-screen flex gap-5 mt-[11rem] md:mt-[8.5rem] md:px-5">
            <div className="animate-pulse h-full w-full gap-3 md:gap-5 flex max-md:flex-col max-md:items-center">
              <div className="w-full sm:w-[90%] md:w-[31%] h-[48%] bg-[#2F2F2F] rounded-lg"></div>
              <div className="w-full sm:w-[90%] h-full md:w-[70%] flex flex-col gap-3 md:gap-5">
                <div className="h-[10%] w-full bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[30%] w-full bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[60%] w-full bg-[#2F2F2F] rounded-lg"></div>
              </div>
            </div>
          </div>
        )}

        {store.error && (
          <div>
            <p>{store.error}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
