import {
  Flex,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  useColorMode,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import DarkmodeToggle from "./DarkmodeToggle";
import { useState } from "react";
const MobileMenu = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [copied, setCopied] = useState();
  const links = [
    ["Blog", "/"],
    ["Gallery", "/gallery"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];

  return (
    <Flex alignItems={"center"} justifySelf="right" mr="8px">
      <Icon
        as={AiOutlineMenu}
        transform="rotateY(180deg)"
        boxSize="30px"
        onClick={onOpen}
        color="gray.300"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          background={colorMode == "light" ? "white" : "blackAlpha.900"}
        >
          <DrawerHeader textAlign={"center"}>MENU</DrawerHeader>
          <DrawerCloseButton size="lg" />
          <DrawerBody pt="50px" position={"relative"}>
            <Flex
              direction="column"
              fontSize={"3rem"}
              justifyContent="flex-end"
              gap="50px"
            >
              {links.map((link, index) => (
                <Link href={link[1]} key={index}>
                  <Text
                    key={index}
                    rounded={"md"}
                    color={colorMode == "light" ? "red.300" : "brandGreen.400"}
                    fontWeight="500"
                    style={
                      props.pathname == link[1] ||
                      (props.pathname == "/" && link[0] == "Blog")
                        ? { textDecoration: "underline" }
                        : {}
                    }
                  >
                    {link[0]}
                  </Text>
                </Link>
              ))}
              <Button
                onClick={() => {
                  navigator.clipboard.writeText("https://duloops.com/");
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 4000);
                }}
              >
                {copied ? (
                  "Link Copied!"
                ) : (
                  <>
                    Share Website
                    <Icon
                      as={BsFillShareFill}
                      boxSize="20px"
                      color="gray.300"
                      ml="10px"
                    />
                  </>
                )}
              </Button>
            </Flex>
            <Flex position={"absolute"} bottom="10px" right="20px">
              <Text fontSize="lg" mr="10px">
                {colorMode == "light" ? "Dark Mode " : "Light Mode "}
              </Text>
              <DarkmodeToggle
                colorMode={colorMode}
                toggleColorMode={toggleColorMode}
              />
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <i>© 2023 DuJin Kim</i>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default MobileMenu;
