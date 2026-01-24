import { useReportsStore } from "@/src/state/reports/useReportsStore";
import { ReportType } from "@/src/types/reportsTypes";
import { typeToIcon } from "@/src/utils/observationPresets/typeToIcon";
import Tile from "../universal/Tile";
import { deletePDF } from "@/src/utils/pdf/storePDF";
import { useReportModalStore } from "@/src/state/reports/useReportModalStore";
import { capitalizeFirst } from "@/src/utils/format/capitalizeFirst";

export default function ReportTile({ report }: { report: ReportType }) {
  const { removeReport } = useReportsStore();
  const { setOpen, setFilename } = useReportModalStore();

  function onPress() {
    setFilename(report.filename);
    setOpen(true);
  }

  function onRemove() {
    removeReport(report.uuid);
    deletePDF(report.filename);
  }

  return (
    <Tile
      title={report.name}
      subTitle={capitalizeFirst(report.type) + " Report"}
      onPress={onPress}
      onRemove={onRemove}
      iconSource={typeToIcon[report.type]}
    />
  );
}
