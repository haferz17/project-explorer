"use client";

import { useEffect } from "react";
import { useMainStore } from "@/store/main";
import Image from "next/image";
import moment from "moment";
import { useRouter, useParams } from "next/navigation";
import "highlight.js/styles/atom-one-dark.css";
import Layout from "@/components/layout";

export default function Home() {
  const store = useMainStore();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    store.getListProject(params?.user);
  }, []);

  return (
    <Layout>
      <div className="flex max-md:flex-col max-md:items-center w-full overflow-y-auto md:overflow-y-hidden">
        {/* user info */}
        {store.user?.id && !store.loadingList && (
          <div className="h-fit md:h-[calc(100vh-5.5rem)] md:overflow-y-auto flex flex-col items-center mt-[7.8rem] md:mt-[5.5rem] w-full sm:w-[90%] duration-500 md:w-[40%] md:pl-5">
            <div className="flex flex-col items-center bg-[#2F2F2F] rounded-lg p-5 xl:p-7 w-full">
              <div
                className={`w-[8rem] md:w-[10rem] xl:w-[14rem] aspect-square rounded-2xl mb-2 md:mb-5 ${
                  !store.user?.avatar_url && "bg-[#555]"
                }`}
              >
                {store.user?.avatar_url && (
                  <Image
                    src={store.user?.avatar_url}
                    alt="avatar"
                    width="100"
                    height="100"
                    className="w-[8rem] md:w-[10rem] xl:w-[14rem] rounded-2xl"
                  />
                )}
              </div>
              <>
                <a
                  href={`https://github.com/${store.user?.login}`}
                  target="_blank"
                  className="text-xl font-semibold text-center text-[#eee] hover:text-white"
                >
                  {store.user?.name}
                </a>
                <p className="text-lg text-[#bbb]">{store.user?.login}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[#aaa] text-center">
                    <span className="font-semibold text-white">
                      {store.user?.followers}
                    </span>{" "}
                    followers
                  </p>{" "}
                  |
                  <p className="text-[#aaa] text-center">
                    <span className="font-semibold text-white">
                      {store.user?.following}
                    </span>{" "}
                    following
                  </p>
                </div>
                {store.user?.bio && (
                  <p className="mt-5 line-clamp-5">{store.user?.bio}</p>
                )}
                <div className="w-full flex flex-col line-clamp-1">
                  {store.user?.location && (
                    <p className="mt-5">{store.user?.location}</p>
                  )}
                  <a
                    href={`mailto:${store.user?.email}`}
                    target="_blank"
                    className="text-[#ddd] hover:text-white"
                  >
                    {store.user?.email}
                  </a>
                  <a
                    href={`https://x.com/${store.user?.blog}`}
                    target="_blank"
                    className="text-[#ddd] hover:text-white"
                  >
                    {store.user?.blog}
                  </a>
                  {store.user?.twitter_username && (
                    <a
                      href={`https://x.com/${store.user?.twitter_username}`}
                      target="_blank"
                      className="text-[#ddd] hover:text-white"
                    >
                      @{store.user?.twitter_username}
                    </a>
                  )}
                </div>
              </>
            </div>
          </div>
        )}

        {/* project list */}
        {store.projectList.length > 0 && !store.loadingList && (
          <div className="md:px-5 flex flex-col items-center gap-1 sm:gap-2 md:gap-3 duration-500 md:overflow-y-auto pb-10 h-[calc(100vh-5.5rem)] mt-1 sm:mt-2 md:mt-[5.5rem] bg-[#212121] w-full sm:w-[90%] md:w-full">
            {store.projectList.map((x: any, i: number) => (
              <div
                key={i}
                className="cursor-pointer bg-[#2F2F2F] py-4 md:py-5 px-5 md:px-7 flex items-center justify-between hover:scale-[1.005] rounded-lg w-full"
                onClick={() => router.push(`/${x.full_name}`)}
              >
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-[#FB773C] line-clamp-1">
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
                  !store.detail?.id && (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
              </div>
            ))}
          </div>
        )}

        {/* loading */}
        {store.loadingList && (
          <div className="h-screen w-screen flex mt-[6.4rem] md:mt-[5.5rem] md:px-5">
            <div className="animate-pulse h-full w-full gap-1 sm:gap-2 md:gap-5 flex max-md:flex-col max-md:items-center">
              <div className="w-full md:w-[40%] h-[100%] md:h-[48%] bg-[#2F2F2F] rounded-lg"></div>
              <div className="w-full h-full flex flex-col gap-1 md:gap-3">
                <div className="h-[33%] md:h-[20%] w-full bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[33%] md:h-[20%] w-full bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[33%] md:h-[20%] w-full bg-[#2F2F2F] rounded-lg"></div>
                <div className="h-[20%] w-full bg-[#2F2F2F] rounded-lg max-md:hidden"></div>
                <div className="h-[20%] w-full bg-[#2F2F2F] rounded-lg max-md:hidden"></div>
              </div>
            </div>
          </div>
        )}

        {/* error */}
        {!store.user?.id && !store.loadingList && (
          <p className="text-xl font-semibold text-[#555] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            User not found
          </p>
        )}
        {store.user?.id && store.error && !store.loadingList && (
          <div className="w-full flex items-start mt-[5.5rem] justify-center">
            <p className="text-lg font-semibold text-[#555]">{store.error}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
