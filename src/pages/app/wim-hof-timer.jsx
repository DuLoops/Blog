import { useState, useEffect } from "react";
import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import Nav from "@/container/Nav";
import WHLanding from "@/components/blog/timer/WH/WHLanding";
import WHRunning from "@/components/blog/timer/WH/WHRunning";
import WHFinished from "@/components/blog/timer/WH/WHFinished";
export default function WimHofTimer() {
  const timerStates = ["setting", "running", "finished"];
  const [currentState, setCurrentState] = useState(timerStates[0]);
  const [setting, setSetting] = useState({
    readyDuration: 5,
    instructionDuration: 3,
    sets: 3,
    breathCycles: 30,
    breathDuration: 3,
    holdingTime: [60, 90, 120, 120, 150],
    inhaleHoldingTime: 15,
  });

  useEffect(() => {
    document.title = "Wim Hof Timer | DuLoops";
  }, []);

  return (
    <Box>
      <Nav />
      {currentState === "setting" && (
        <WHLanding
          setting={setting}
          setSetting={setSetting}
          setCurrentState={setCurrentState}
        />
      )}
      {currentState === "running" && (
        <WHRunning setting={setting} setCurrentState={setCurrentState} />
      )}

      {currentState === "finished" && (
        <WHFinished setting={setting} setCurrentState={setCurrentState} />
      )}
    </Box>
  );
}
