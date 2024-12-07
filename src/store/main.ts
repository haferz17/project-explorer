import { create } from "zustand";
import { Octokit } from "octokit";

interface State {
  user: any;
  projectList: any;
  getListProject: Function;
  getDetailProject: Function;
  detail: any;
  readme: string;
}

const octokit = new Octokit({
  auth: "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",
});

const headers = {
  "X-GitHub-Api-Version": "2022-11-28",
};

export const useMainStore = create<State>((set, state) => ({
  user: {},
  projectList: [],
  detail: {},
  readme: "",
  getListProject: async (ref: any) => {
    try {
      const user = await octokit.request(`GET /users/${ref?.current?.value}`, {
        headers,
      });
      const repos = await octokit.request(
        `GET /users/${ref?.current?.value}/repos`,
        { headers }
      );
      console.log("list", user, repos);
      set(() => ({ user: user.data, projectList: repos.data }));
    } catch (error) {
      console.error(error);
    }
  },
  getDetailProject: async (name: string) => {
    try {
      const detail = await octokit.request(`GET /repos/${name}`, { headers });
      const readme = await octokit.request(`GET /repos/${name}/readme`, {
        headers: {
          ...headers,
          Accept: "application/vnd.github+json",
        },
      });
      const markdown = await octokit.request("POST /markdown", {
        text: readme.data,
        headers,
      });

      console.log("detail", detail, readme, markdown);
      set(() => ({ detail: detail.data, readme: markdown.data }));
    } catch (error) {
      console.error(error);
    }
  },
}));
