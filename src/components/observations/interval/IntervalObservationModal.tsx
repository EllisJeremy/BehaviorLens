import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import SlideUpModal from "../../universal/SlideUpModal";
import IntervalTile from "./IntervalTile";
import { useIntervalObservationStore } from "@/src/state/observations/useIntervalObservationStore";
import { IntervalObservationPreset } from "@/src/types/observations/observationTypes";
import { useStartObservationModalStore } from "@/src/state/observations/useStartObservationModalStore";
import { constants } from "@/src/utils/constants";
import { colors } from "@/src/utils/styles";
import { useSettingsStore } from "@/src/state/settings/useSettingsStore";
import { useTimer } from "use-timer";
import { timeFormatter } from "@/src/utils/timeFormatter";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function IntervalObservationModal({
  preset,
}: {
  preset: IntervalObservationPreset;
}) {
  const { open, clearForm, currentInterval, observations, nextInterval } =
    useIntervalObservationStore();
  const { settings } = useSettingsStore();
  const { clearForm: clearStartForm } = useStartObservationModalStore();

  const {
    observationIntervalSeconds,
    numberOfObservations,
    onTaskList,
    offTaskList,
  } = preset;

  const { time, start, pause, reset, status } = useTimer({
    interval: 1000,
  });

  const borderAnim = useRef(new Animated.Value(2)).current;

  useEffect(() => {
    if (open) start();
  }, [open]);

  useEffect(() => {
    if (time === 0) return;
    if (time % observationIntervalSeconds === 0) {
      nextInterval(numberOfObservations);
    }
  }, [time]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(borderAnim, {
        toValue: status === "RUNNING" ? 3 : 2,
        duration: 180,
        useNativeDriver: false,
      }),
    ]).start();
  }, [status]);

  function exit() {
    clearForm();
    setTimeout(() => {
      clearStartForm();
    }, constants.modalDelay);
  }

  function IntervalObservation() {
    return (
      <View style={styles.container}>
        <FlatList
          data={observations.slice(0, currentInterval)}
          keyExtractor={(_, i) => i.toString()}
          style={styles.flatlist}
          renderItem={({ item, index }) => (
            <IntervalTile
              index={index}
              observation={item}
              onTaskList={onTaskList}
              offTaskList={offTaskList}
            />
          )}
        />

        <View style={styles.controller}>
          <View>
            <Text>{currentInterval}</Text>
            <Text>{timeFormatter(time)}</Text>
            <Text>
              {observationIntervalSeconds - (time % observationIntervalSeconds)}
            </Text>
          </View>

          <Pressable
            onPress={() => {
              status === "RUNNING" ? pause() : start();
            }}
          >
            <Animated.View
              style={[
                styles.pause,
                {
                  borderWidth: borderAnim,
                  paddingLeft: status === "RUNNING" ? 0 : 4,

                  borderColor: settings.themeColor,
                },
              ]}
            >
              <Ionicons
                name={status === "RUNNING" ? "pause-outline" : "play-outline"}
                size={40}
                color={settings.themeColor}
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SlideUpModal
      modalOpen={open}
      setModalOpen={() => {}}
      title="Interval Observation"
      clearForm={exit}
      submitForm={exit}
      form={<IntervalObservation />}
      scrollable={false}
      padding={0}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    padding: 20,
  },
  controller: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    height: 100,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  pause: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginRight: 20,
  },
});
