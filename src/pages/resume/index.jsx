import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";

const Resume = () => {
  return (
    <Flex
      flexDir="column"
      m="auto"
      w={{ sm: "90vw", md: "80vw", lg: "70vw" }}
      mt="3rem"
    >
      <Box textAlign={"center"}>
        <Heading>Dujin Kim</Heading>
        <Link href="mailto:dujink2@gmail.com">dujink2@gmail.com</Link>
      </Box>
    </Flex>
  );
};

export default Resume;
