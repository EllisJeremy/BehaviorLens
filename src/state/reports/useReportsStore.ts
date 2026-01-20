import { create } from "zustand";
import { loadObject, saveObject } from "../../utils/storage/storage";
import { ReportType } from "@/src/types/reportsTypes";

type ReportsStore = {
  reports: Record<string, ReportType>;

  loadObservationPresets: () => Promise<void>;
  addObservationPreset: (report: ReportType) => void;
  removeObservationPreset: (uuid: string) => void;
};

export const useReportsStore = create<ReportsStore>((set, get) => ({
  reports: {},

  loadObservationPresets: async () => {
    const data = await loadObject("reports");
    if (data) set({ reports: data });
  },

  addObservationPreset: (report: ReportType) => {
    set((state) => {
      const newReports = {
        ...state.reports,
        [report.uuid]: report,
      };

      saveObject("reports", newReports);

      return { reports: newReports };
    });
  },

  removeObservationPreset: (uuid: string) => {
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
