import React from "react";
import { useState, useEffect, useReducer } from "react";
import { Heading, Text, Box, Flex, HStack, Icon } from "@chakra-ui/react";
import Instruction from "./running/Instruction";
import Clock from "./running/Clock";
import SoundPlayer from "./running/SoundPlayer";
import { AiOutlinePause } from "react-icons/ai";

const timerSquence = [
  "ready",
  "breath",
  "exhale",
  "hold",
  "inhale",
  "inhaleHold",
  "exhaleLast",
];
const reducer = (state, action) => {
  switch (action.type) {
    case "next":
      let index = state.timerSequenceIndex + 1;
      if (index === timerSquence.length) {
      state.set++;
        index = 0;
      }
      return {
        ...state,
        sequence: timerSquence[index],
        timerSequenceIndex: index,
      };
    case "pause":
      return {
        ...state,
        sequence: "paused",
      };
    case "resume":
      return {
        ...state,
        sequence: timerSquence[state.timerSequenceIndex],
      };
  }
};
const initalState = { sequence: "ready", timerSequenceIndex: 0, set: 1 };

const WHRunning = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    if (state.set > props.setting.sets) {
      props.setCurrentState("finished");
    }
  }, [state.set]);

  const handlePause = () => {
    if (state.sequence === "paused") {
      dispatch({ type: "resume" });
    } else {
      dispatch({ type: "pause" });
    }
  };

  return (
    <Flex flexDir={"column"} w="100%" textAlign={"center"} gap="2rem">
      <Text>
        Set # {state.set} / {props.setting.sets}
      </Text>
      <Box h="200px" position={"relative"}>
        <Instruction sequence={state.sequence} set={state.set} />
      </Box>
      <Box onClick={handlePause} pb='50px'>
        <Clock
          setting={props.setting}
          state={state}
          dispatch={dispatch}
          setCurrentState={props.setCurrentState}
        />
        <SoundPlayer sequence={state.sequence} />
        {state.sequence !== "paused" && (
          <Icon as={AiOutlinePause} boxSize="120px" pos={'absolute'} bottom='0' left='50%' transform={'translate(-50%,0)'}/>
        )}
      </Box>
    </Flex>
  );
};

export default WHRunning;
