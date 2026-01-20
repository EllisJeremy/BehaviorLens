import { create } from "zustand";
import { loadObject, saveObject } from "../../utils/storage/storage";
import { ReportType } from "@/src/types/reportsTypes";

type ReportsStore = {
  reports: Record<string, ReportType>;

  loadReports: () => Promise<void>;
  addReport: (report: ReportType) => void;
  removeReport: (uuid: string) => void;
};

export const useReportsStore = create<ReportsStore>((set, get) => ({
  reports: {},

  loadReports: async () => {
    const data = await loadObject("reports");
    if (data) set({ reports: data });
  },

  addReport: (report: ReportType) => {
    set((state) => {
      const newReports = {
        ...state.reports,
        [report.uuid]: report,
      };

      saveObject("reports", newReports);

      return { reports: newReports };
    });
  },

  removeReport: (uuid: string) => {
    set((state) => {
      const newReports = { ...state.reports };
      if (uuid in newReports) {
        delete newReports[uuid];
      } else {
        console.error("ERROR: there is no report with uuid", uuid);
      }

      saveObject("reports", newReports);

      return { reports: newReports };
    });
  },
}));
