import Nav from "../container/Nav";
import { logo, logoTop, logoBottom } from "../resources/images/logo";
import ContactForm from "@/container/ContactForm";
import { Box, Center, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
const Contact = () => {
  const { colorMode } = useColorMode();
  return (
    <Box h="100vh" bgColor={colorMode == "light" ? "neutralGreen.100" : ""}>
      <Head>
        <title>Contact| DuLoops</title>
      </Head>
      <Nav />
      <Center my="auto" h="100%">
        <ContactForm />
      </Center>
    </Box>
  );
};

export default Contact;
