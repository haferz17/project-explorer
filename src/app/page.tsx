"use client";

import { Octokit } from "octokit";
import { useRef } from "react";

export default function Home() {
  const inputRef = useRef(null);
  const octokit = new Octokit({
    auth: "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",
  });

  async function onSubmit(e) {
    e.preventDefault();
    const data = await octokit.request(
      `GET /users/${inputRef?.current?.value}/repos`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data2 = await octokit.request(
      `GET /repos/${inputRef?.current?.value}/anmol098`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    const data3 = await octokit.request(
      `GET /repos/${inputRef?.current?.value}/anmol098/readme`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Accept: "application/vnd.github.v3.raw",
        },
      }
    );

    const data4 = await octokit.request("POST /markdown", {
      text: data3.data,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    document.getElementById("readme").innerHTML = data4.data;
  }

  return (
    <div>
      <p>Project Explorer</p>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} placeholder="type user id" />
      </form>
      <div id="readme" />
    </div>
  );
}
