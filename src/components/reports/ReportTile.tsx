import { useReportsStore } from "@/src/state/reports/useReportsStore";
import { ReportType } from "@/src/types/reportsTypes";
import { typeToIcon } from "@/src/utils/observationPresets/typeToIcon";
import Tile from "../universal/Tile";
import { getPDF } from "@/src/utils/pdf/storePDF";
import { useReportModalStore } from "@/src/state/reports/useReportModalStore";

export default function ReportTile({ report }: { report: ReportType }) {
  const { removeReport } = useReportsStore();
  const { setOpen, setFilename } = useReportModalStore();

  function onPress() {
    setFilename(report.filename);
    setOpen(true);
  }

  function onRemove() {
    removeReport(report.uuid);
  }

  return (
    <Tile
      title={report.name}
      subTitle={report.type + " report"}
      onPress={onPress}
      onRemove={onRemove}
      iconSource={typeToIcon[report.type]}
    />
  );
}
