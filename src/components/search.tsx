"use client";

import { useEffect, useRef } from "react";
import { useMainStore } from "@/store/main";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Wrapper from "./wrapper";

export default function Search() {
  const store = useMainStore();
  const inputRef = useRef(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!params?.user) {
      // @ts-ignore
      inputRef.current.focus();
    }
    // @ts-ignore
    inputRef.current.value = params?.user || "";
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault();
    // @ts-ignore
    router.push(`/${inputRef?.current?.value}`);
  }

  return (
    <div
      className={`flex max-md:flex-col items-center justify-center gap-3 md:gap-5 fixed w-full bg-[#212121] duration-500 z-[3] left-0 ${
        params?.user
          ? "top-0 py-5"
          : "flex-col top-1/2 -translate-y-1/2 h-screen"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <p
          className={`font-semibold bg-gradient-to-r from-[#F9DBBA] to-[#FB773C] inline-block text-transparent bg-clip-text ${
            params?.user ? "text-xl" : "text-3xl md:text-4xl"
          }`}
        >
          Project Explorer
        </p>
        <Wrapper if={!params?.user}>
          <p className="md:text-xl mx-5 mt-1 mb-3">
            Simplify your search for open-source inspiration on GitHub
          </p>
        </Wrapper>
      </div>
      <form
        onSubmit={onSubmit}
        className={`px-5 w-[90%] md:w-1/2 bg-[#2F2F2F] rounded-xl flex items-center gap-5 ${
          params?.user ? "py-3" : "py-3.5"
        }`}
      >
        <input
          ref={inputRef}
          placeholder="Type github username"
          className="w-full bg-transparent outline-none"
        />
        <Wrapper if={!store.loadingList}>
          <Image
            src={require("../assets/icons/search.svg")}
            alt={"search"}
            className="w-4 cursor-pointer"
            onClick={onSubmit}
          />
        </Wrapper>
        <Wrapper if={store.loadingList}>
          <span className="loading loading-spinner loading-md"></span>
        </Wrapper>
      </form>
    </div>
  );
}
