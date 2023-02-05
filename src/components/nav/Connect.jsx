import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";
import { Box, Flex, Text, useBoolean, useColorMode } from "@chakra-ui/react";

const Connect = () => {
  const { colorMode } = useColorMode();
  const [connectHover, setConnectHover] = useBoolean();

  return (
    <Link
      href={"/contact"}
      onMouseEnter={setConnectHover.on}
      onMouseLeave={setConnectHover.off}
    >
      <Flex alignItems={"center"}>
        <motion.div
          height="2px"

          width="40px"
          animate={{ width: connectHover ? "60px" : "40px" }}
          transition={{ type: "Inertia" }}
          
        >
          <Box w="100%" h='2px' bgColor={colorMode == "light" ? "black" : "gray.400"} />
        </motion.div>
        <Text
          fontSize={"xl"}
          ml="3"
          color={colorMode == "light" ? "black" : "gray.400"}
        >
          CONTACT
        </Text>
      </Flex>
    </Link>
  );
};

export default Connect;
