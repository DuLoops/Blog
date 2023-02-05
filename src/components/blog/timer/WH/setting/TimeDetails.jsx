import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tooltip,
} from "@chakra-ui/react";

const TimeDetails = (props) => {
  let breathingTime = props.setting.breathCycles * props.setting.breathDuration * props.setting.sets;
  let exhaleTime = 0;
  props.setting.holdingTime.forEach((time, i) => {
    if (i < props.setting.sets) exhaleTime += time;
  });

  const formatTime = (totalTime) => {
    return `${Math.trunc(totalTime / 60)} : ${totalTime % 60 < 10 ? "0" : ""}${totalTime % 60
} `;
  };

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Time Details
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <TableContainer>
            <Table variant="simple" fontSize={"sm"}>
              <Thead>
                <Tr>
                  <Th>Type</Th>
                  <Th>Time (Minutes)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Tooltip label="3 sec/cycle">Breathing</Tooltip>
                  </Td>
                  <Td isNumeric>{formatTime(breathingTime)}</Td>
                </Tr>
                <Tr>
                  <Td>Exhale Holding</Td>
                  <Td isNumeric>{formatTime(exhaleTime)}</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Tooltip label="15 sec/set">Inhale Holding</Tooltip>
                  </Td>
                  <Td isNumeric>{formatTime(props.setting.sets * 15)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default TimeDetails;
