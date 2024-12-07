import { create } from "zustand";
import { Octokit } from "octokit";
import { marked } from "marked";

interface State {
  loadingList: boolean;
  loadingDetail: boolean;
  user: any;
  projectList: any;
  set: Function;
  getListProject: Function;
  getDetailProject: Function;
  projectName: string;
  detail: any;
  readme: string;
  error: string;
}

const octokit = new Octokit({
  auth: "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",
});

const headers = {
  "X-GitHub-Api-Version": "2022-11-28",
};

export const useMainStore = create<State>((set, state) => ({
  loadingList: false,
  loadingDetail: false,
  user: {},
  projectList: [],
  projectName: "",
  detail: {},
  readme: "",
  error: "",
  set: (val: any) => {
    set(() => val);
  },
  getListProject: async (ref: any) => {
    try {
      set(() => ({ loadingList: true, readme: "", error: "" }));
      const user = await octokit.request(`GET /users/${ref?.current?.value}`, {
        headers,
      });
      const repos = await octokit.request(
        `GET /users/${ref?.current?.value}/repos`,
        { headers }
      );
      console.log("list", user, repos);
      set(() => ({
        user: user.data,
        projectList: repos.data,
        loadingList: false,
      }));
    } catch (error) {
      set(() => ({ loadingList: false }));
      console.error(error);
    }
  },
  getDetailProject: async (name: string) => {
    try {
      set(() => ({ loadingDetail: true, projectName: name, error: "" }));
      const detail = await octokit.request(`GET /repos/${name}`, { headers });
      const readme = await octokit.request(`GET /repos/${name}/readme`, {
        headers: {
          ...headers,
          Accept: "application/vnd.github.raw+json",
        },
      });
      const markdown = await octokit.request("POST /markdown", {
        text: readme.data,
        headers,
      });

      const a = await marked.parse(readme.data);
      console.log("detail", detail, readme, markdown, a);
      set(() => ({
        detail: detail.data,
        readme: readme.data,
        loadingDetail: false,
      }));
    } catch (error) {
      set(() => ({ loadingDetail: false, error: "Data not found" }));
      console.error(error);
    }
  },
}));
