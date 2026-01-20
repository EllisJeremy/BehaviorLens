import { useReportsStore } from "@/src/state/reports/useReportsStore";
import { ReportType } from "@/src/types/reportsTypes";
import { typeToIcon } from "@/src/utils/observationPresets/typeToIcon";
import Tile from "../universal/Tile";

export default function ReportTile({ report }: { report: ReportType }) {
  const { removeReport } = useReportsStore();

  function onPress() {
    return;
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
