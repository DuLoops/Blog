import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  RadioGroup,
  Stack,
  Radio,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack} from "@chakra-ui/react";
import HoldingNumberInput from "./WHSettingHoldingNumberInput";
import TimeDetails from "./TimeDetails";
export default function WHSetting(props) {
  
  const handleRadioChange = (value) => {
    props.setSetting((prev) => ({ ...prev, sets: +value }));
  };

  const handleSetChange = (value) => {
    props.setSetting((prev) => ({ ...prev, breathCycles: value }));
  };

  const getTotalTime = () => {
    let totalTime = 0;
    props.setting.holdingTime.forEach((time, i) => {
      if (i < props.setting.sets) totalTime += time;
    });
    totalTime += props.setting.breathCycles * props.setting.breathDuration * props.setting.sets;
    totalTime += props.setting.sets * 15;
    const min = Math.floor(totalTime / 60);
    const sec = totalTime % 60;
    return `${min} min ${sec} sec`;
  };

  return (
    <Box
      w="90%"
      backgroundColor={"whiteAlpha.100"}
      borderRadius="10px"
      py="20px"
    >
      <Heading>Settings</Heading>
      
      <Flex flexDir="column" alignItems={"center"} gap="1rem" margin="1rem">
        <Box>
          <Text>Number of Sets</Text>
          <RadioGroup onChange={handleRadioChange} value={props.setting.sets}>
            <Stack direction="row">
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3</Radio>
              <Radio value={4}>4</Radio>
              <Radio value={5}>5</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box>
          <Text>Number of Breathing</Text>
          <Slider
            aria-label="slider-ex-4"
            onChange={handleSetChange}
            defaultValue={30}
            min={10}
            max={50}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>
            {props.setting.breathCycles} Cycles -{" "}
            {props.setting.breathCycles * props.setting.breathDuration} Seconds
          </Text>
        </Box>
        <Box
          className="holding-time"
          border={"1px solid white"}
          w="90%"
          py="10px"
        >
          <Text>Breath Holding Time</Text>
          <VStack spacing="12px" my="10px">
            {props.setting.holdingTime.map((time, index) => {
              if (index < props.setting.sets) {
                return (
                  <HStack key={index}>
                    <Text>Set #{index + 1}</Text>
                    <HoldingNumberInput defaultVal={time} index={index} setSetting={props.setSetting}/>
                    <Text>sec</Text>
                  </HStack>
                );
              }
            })}
          </VStack>
        </Box>
        <TimeDetails setting={props.setting}/>
        <Text>Total Time: {getTotalTime()}</Text>
      </Flex>
    </Box>
  );
}
