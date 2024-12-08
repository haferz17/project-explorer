export interface MainStore {
  loadingList: boolean;
  loadingDetail: boolean;
  user: any;
  showList: boolean;
  projectList: any;
  set: (val: any) => void;
  resetState: () => void;
  getListProject: (name: string | string[]) => void;
  getDetailProject: (name: string) => void;
  getReadme: (name: string) => Promise<string>;
  projectName: string;
  detail: any;
  readme: string;
  error: string;
}
