import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function BreathClock(props) {
  const [cycle, setCycle] = React.useState(
    Math.trunc(props.timer / props.setting.breathDuration)
  );

  useEffect(() => {
    if (props.timer % props.setting.breathDuration == 0 && !props.exhale) {
      setCycle((cycle) => cycle + 1);
    }
  }, [props.timer]);

  const getAnimation = () => {
    switch (props.sequence) {
      case "breath":
        return { scale: [0.5, 1, 0.5] };
      case "exhale":
      case "exhaleLast":
        return { scale: [0.9, 0.2] };
      case "inhale":
        return { scale: [0.2, 1] };
    }
  };

  return (
    <Box h="50vh">
      <motion.div
        key={cycle}
        initial={{ scale: 0.2 }}
        animate={getAnimation()}
        transition={{
          duration: props.setting.breathDuration,
          type: "spring",
        }}
      >
        <Box
          m="auto"
          border="10px white solid"
          borderRadius={"50%"}
          boxSize="300px"
          position={"relative"}
        >
          <Text
            fontSize={"3rem"}
            m="0"
            position={"absolute"}
            top="50%"
            left="50%"
            transform={"translate(-50%,-50%)"}
          >
            {props.sequence == "breath" &&
              (cycle - 1) + "/" + props.setting.breathCycles}
          </Text>
        </Box>
      </motion.div>
    </Box>
  );
}
