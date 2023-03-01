import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { DateTime } from "luxon";
import "intl";
import "intl/locale-data/jsonp/en";

// initialize the `Intl` object
if (typeof Intl === "undefined") {
  global.Intl = require("intl");
}

export default function Timer() {
  const [start, setStart] = useState(null);
  const [timers, setTimers] = useState({});
  const [timerLabel, setTimerLabel] = useState("");
  const [timerDuration, setTimerDuration] = useState("");

  const handleStart = () => {
    const now = DateTime.now();
    setStart(now);
    console.log(`Timer started at ${now}`);
  };

  const handleStop = () => {
    const now = DateTime.now();
    const elapsed = now.diff(start, "seconds");
    console.log(`Elapsed time: ${elapsed.toFormat("s")} seconds`);
  };

  const handleAdd = (label, duration) => {
    const now = DateTime.now();
    const end = now.plus({ seconds: duration });
    setTimers({ ...timers, [label]: end });
    console.log(
      `Added timer '${label}' with duration ${duration} seconds. Ends at ${end}`
    );
  };

  const handleTimers = () => {
    Object.entries(timers).forEach(([label, end]) => {
      const remaining = end.diffNow();
      console.log(
        `Timer '${label}' ends in ${remaining.toFormat("s")} seconds`
      );
    });
  };

  return (
    <View>
      <Button title="Start" onPress={handleStart} />
      <Button title="Stop" onPress={handleStop} />
      <TextInput placeholder="Timer Label" onChangeText={setTimerLabel} />
      <TextInput
        placeholder="Duration (seconds)"
        onChangeText={setTimerDuration}
      />
      <Button
        title="Add Timer"
        onPress={() => handleAdd(timerLabel, parseInt(timerDuration))}
      />
      <Button title="Show Timers" onPress={handleTimers} />
    </View>
  );
}
