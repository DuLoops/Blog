import { Box, Flex, GridItem, Heading, Text } from "@chakra-ui/react";

const data = [
  {
    attributes: {
      link: "blog/reacToNext",
      size: "m",
    },
  },
  {
    attributes: {
      link: "climb/speech_therapy",
      size: "l",
    },
  },
  {
    attributes: {
      link: "climb/sfu_boulder",
      size: "m",
    },
  },
  {
    attributes: {
      link: "climb/purble_overhange",
      size: "s",
    },
  },
  {
    attributes: {
      link: "coding-challenge/lego_blocks",
      size: "m",
    },
  },
  {
    attributes: {
      link: "app/wim-hof-timer",
      size: "l",
    },
  },
  {
    attributes: {
      link: "climb/purble_overhange",
      size: "s",
    },
  },
  {
    attributes: {
      link: "climb/purble_overhange",
      size: "s",
    },
  },
];

export default function GridTest() {
  const sizeChart = { small: 0, medium: 0, large: 1 };
  let smallOrder = 1;
  return (
    <Flex flexFlow={"row wrap"} gap="10px" justifyContent={"space-around"}>
      {data.map((item, index) => {
        return (
          <Box
            key={index}
            w={item.attributes.size == "s" ? "100px" : "200px"}
            h="200px"
            bg="red.200"
            flexGrow={item.attributes.size == "l" ? 3 : 0}
            order={item.attributes.size == "s" ? smallOrder : 2}
          >
            <Text>{item.attributes.size}</Text>
          </Box>
        );
      })}
      <Box w="200px" h="200px" bg="blue.200" order="-1">
        example
      </Box>
    </Flex>
  );
}
