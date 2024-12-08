import { create } from "zustand";
import { Octokit } from "octokit";
import { marked } from "marked";

interface State {
  loadingList: boolean;
  loadingDetail: boolean;
  user: any;
  showList: boolean;
  projectList: any;
  set: Function;
  resetState: Function;
  getListProject: Function;
  getDetailProject: Function;
  getReadme: Function;
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
  showList: false,
  projectList: [],
  projectName: "",
  detail: {},
  readme: "",
  error: "",
  set: (val: any) => {
    set(() => val);
  },
  resetState: () => {
    set(() => ({
      user: {},
      projectList: [],
      detail: {},
      readme: "",
      error: "",
      showList: false,
    }));
  },
  getListProject: async (name: string) => {
    try {
      set(() => ({
        loadingList: true,
        user: {},
        projectList: [],
        detail: {},
        readme: "",
        error: "",
        showList: true,
      }));
      const user = await octokit.request(`GET /users/${name}`, {
        headers,
      });
      const repos = await octokit.request(`GET /users/${name}/repos`, {
        sort: "pushed",
        headers,
      });
      set(() => ({
        showList: user?.data?.id !== undefined,
        user: user.data,
        projectList: repos.data,
        loadingList: false,
        error: repos.data.length ? "" : "No public project yet",
      }));
    } catch (error) {
      set(() => ({ loadingList: false, error: "Data empty" }));
      console.error(error);
    }
  },
  getDetailProject: async (name: string) => {
    try {
      set(() => ({
        loadingDetail: true,
        projectName: name,
        error: "",
        showList: true,
      }));
      const detail = await octokit.request(`GET /repos${name}`, { headers });
      const readme = await state().getReadme(name);
      set(() => ({
        detail: detail.data,
        readme,
        loadingDetail: false,
      }));
      window.scrollTo(0, 0);
    } catch (error) {
      set(() => ({ loadingDetail: false, error: "Data not found" }));
      console.error(error);
    }
  },
  getReadme: async (name: string) => {
    try {
      const readme = await octokit.request(`GET /repos${name}/readme`, {
        headers: {
          ...headers,
          Accept: "application/vnd.github.raw+json",
        },
      });

      if (typeof readme.data !== "string") {
        const decode = atob(readme.data?.content);
        return decode;
      }

      const html = marked(readme.data);

      return html;
    } catch (error) {
      console.error(error);
      return "Readme not created yet";
    }
  },
}));
