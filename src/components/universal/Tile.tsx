import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ActionSheetIOS,
  Alert,
  ImageSourcePropType,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useObservationPresetsModalStore } from "@/src/state/observationPresets/useObservationPresetsModalStore";
import { colors, fontSizes } from "@/src/utils/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";

export default function Tile({
  title,
  subTitle,
  onEdit,
  onRemove,
  onPress,
  iconSource,
}: {
  title: string;
  subTitle: string;
  onEdit?: () => void;
  onRemove: () => void;
  onPress?: () => void;
  iconSource?: ImageSourcePropType;
}) {
  const { settings } = useSettingsStore();
  return (
    <Pressable
      style={styles.tile}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <View style={styles.iconAndInfo}>
        {iconSource && <Image source={iconSource} style={styles.icon} />}

        <View style={styles.info}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.subText}>{subTitle}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        {onEdit && (
          <Pressable
            style={[
              styles.iconButton,
              { backgroundColor: settings.themeColor },
            ]}
            onPress={onEdit}
          >
            <Octicons name="pencil" size={20} color={colors.white} />
          </Pressable>
        )}

        <Pressable
          style={[styles.iconButton, styles.deleteButton]}
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ["Cancel", "Delete"],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
              },
              (index: number) => {
                if (index === 1) onRemove();
              },
            );
          }}
        >
          <Octicons name="trash" size={20} color={colors.white} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderColor: "#d6d6d6ff",
    width: "100%",
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  iconAndInfo: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
  },
  info: {
    flexShrink: 1,
  },
  text: {
    fontSize: fontSizes.text,
    fontWeight: "600",
  },
  subText: {
    fontSize: fontSizes.subText,
    color: colors.darkGray,
    marginTop: 2,
  },
  controls: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    backgroundColor: colors.blue,
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: colors.black,
  },
});
