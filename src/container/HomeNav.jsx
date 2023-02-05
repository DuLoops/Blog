import Connect from "../components/nav/Connect";
import Hamberger from "../components/nav/Hamberger";
import Menu from "../components/nav/DesktopMenu";
import {
  Box,
  Flex,
  HStack,
  Image,
  useColorMode,
  Button,
  Grid,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { logo } from "../resources/images/logo";

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Grid
        width={"100%"}
        position="absolute"
        zIndex={10}
        gridTemplateColumns="1fr 1fr 1fr"

      >
        <Box alignItems={"center"} my='auto'>
          <Connect />
        </Box>
        <Box justifySelf={"center"}>
          <RouterLink href={"/"}>
            <Image src={logo} alt="logo" boxSize="55px" p="5px" />
          </RouterLink>
        </Box>
        <HStack spacing={3} justifySelf="right" alignItems={"center"}>
          {isOpen && <Menu showToggle={false}/>}
          <Hamberger isOpen={isOpen} setIsOpen={setIsOpen} />
        </HStack>
      </Grid>
    </Box>
  );
};

export default HomeNav;
