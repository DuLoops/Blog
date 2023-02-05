import { Box, Icon, Button } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import ReadyClock from "./ReadyClock";
import BreathClock from "./BreathClock";
import HoldClock from "./HoldClock";
import PauseClock from "./PauseClock";
export default function Clock(props) {
  const [initialTimer, setInitialTimer] = useState(0); //Used for pausing
  const [timer, setTimer] = useState(0);
  const [duration, setDuration] = useState(props.setting.readyDuration);

  const setDurationHelper = (sequence) => {
    switch (sequence) {
      case "ready":
        setDuration(props.setting.readyDuration);
        break;
      case "exhale":
      case "inhale":
        setDuration(props.setting.instructionDuration);
        break;
      case "exhaleLast":
        setDuration(3);
        break;
      case "breath":
        setDuration(
          props.setting.breathCycles * props.setting.breathDuration - 1
        );
        break;
      case "hold":
        setDuration(props.setting.holdingTime[props.state.set - 1]);
        break;
      case "inhaleHold":
        setDuration(props.setting.inhaleHoldingTime);
        break;
    }
  };

  useEffect(() => {
    let interval = null;
    if (props.state.sequence !== "paused") {
      setInitialTimer(0);
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      setInitialTimer(timer);
      clearInterval(interval);
    }
    setDurationHelper(props.state.sequence);
    return () => clearInterval(interval);
  }, [props.state.sequence]);

  useEffect(() => {
    if (timer >= duration) {
      setTimer(initialTimer);
      props.dispatch({ type: "next" });
    }
  }, [timer]);

  switch (props.state.sequence) {
    case "ready":
      return (
        <ReadyClock set={props.state.set} timer={timer} duration={duration} />
      );
    case "breath":
    case "exhale":
    case "exhaleLast":
    case "inhale":
      return (
        <BreathClock
          setting={props.setting}
          timer={timer}
          sequence={props.state.sequence}
        />
      );
    case "hold":
    case "inhaleHold":
      return <HoldClock timer={timer} duration={duration} />;
    default:
      return (
        <PauseClock setCurrentState={props.setCurrentState}/>
      );
  }
}
