import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import TimeDetails from './setting/TimeDetails';

export default function WHFinished(props) {
  const getTotalTime = () => {
    let totalTime = 0;
    props.setting.holdingTime.forEach((time, i) => {
      if (i < props.setting.sets) totalTime += time;
    });
    totalTime +=
      props.setting.breathCycles *
      props.setting.breathDuration *
      props.setting.sets;
    totalTime += props.setting.sets * 15;
    const min = Math.floor(totalTime / 60);
    const sec = totalTime % 60;
    return `${min} min ${sec} sec`;
  };
  return <Flex flexDir='column' h='100vh' justifyContent={'center'}  gap='2rem' textAlign={'center'}>
    <Heading>Congraturations!</Heading>
    <Text>Total Time: {getTotalTime()}</Text>
    <TimeDetails setting={props.setting} />
    <Button w='50%' mx='auto' onClick={()=>{props.setCurrentState("setting")}}>Start again</Button>
  </Flex>;
}
