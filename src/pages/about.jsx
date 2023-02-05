import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  Icon,
  Button,
  Center,
  Highlight,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdLinkedCamera } from "react-icons/md";
import { GiBookCover } from "react-icons/gi";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { PageMe } from "../resources/images/icons";
import laptop from "@/resources/images/dev/laptop.jpg";
import Nav from "../container/Nav";
import Image from "next/image";
import Head from "next/head";
const purpose = [
  { name: "Experience", icon: MdLinkedCamera, color: "green.200" },
  { name: "Knowlege", icon: GiBookCover, color: "orange.200" },
  { name: "Creations", icon: AiFillCodeSandboxCircle, color: "blue.200" },
];

export default function About() {
  const [purposeIndex, setPurposeIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPurposeIndex((prevIndex) => (prevIndex + 1) % purpose.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "About | DuLoops";
  }, []);

  return (
    <Box position={"relative"}>
      <Head>
        <title>About | DuLoops</title>
      </Head>
      <Nav />
      <Flex
        p="2rem"
        textAlign={"center"}
        flexDir="column"
        // gap="1rem"
        alignItems={"center"}
      >
        <Heading mb="30px">About</Heading>
        <Center flexDir="column" gap="20px" fontSize="xl">
          <Text>
            <b>DuLoops.com</b> is a personal website of Dujin 🔗
            <Link
              color="blue.300"
              textDecor={"underline"}
              href="https://dujinkim.com/"
            >
              dujinkim.com
            </Link>
          </Text>
          <Box pos="relative">
            <Box width={{ sm: "100%", md: "400px" }}>
              <Image src={laptop} alt="my laptop" />
            </Box>
            <Box position="absolute" top="5px" right="5px" height="120px">
              <Image src={PageMe} alt="me" height={100} />
            </Box>
          </Box>
        </Center>
        <Text fontSize="xl" mt="50px" fontStyle={"italic"}>
          “I use this website to <b>Document</b> and <b>Share</b>
        </Text>
        <Flex>
          my
          <Text color={purpose[purposeIndex].color} ml="5px" display="inline">
            {" "}
            {purpose[purposeIndex].name}
          </Text>
          "
        </Flex>
        <Icon as={purpose[purposeIndex].icon} w="150px" h="150px" />
      </Flex>
      <Flex w="100%" justifyContent={"center"} gap="20px" p="10px">
        <Button>
          <Link href="/contact">Contact</Link>
        </Button>
        <Button>
          <Link href="/">Back</Link>
        </Button>
      </Flex>
    </Box>
  );
}
