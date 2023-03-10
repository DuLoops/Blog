import Connect from "../components/nav/Connect";
import DesktopMenu from "../components/nav/DesktopMenu";
import {
  Box,
  HStack,
  useColorMode,
  Grid,
  useMediaQuery,
  Icon
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "../components/nav/MobileMenu";
import { useRouter } from "next/router";
import { IoReturnUpBackOutline } from "react-icons/io5";

const Nav = () => {
  const [isMobile] = useMediaQuery("(max-width: 980px)");
  const { colorMode } = useColorMode();
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Box>
      <Grid
        width={"100%"}
        gridTemplateColumns="1fr 1fr 1fr"
        color="pink"
        backgroundcolor={{
          sm: "whiteAlpha.300",
          md:
            colorMode == "light" ? "rgba(87, 109, 81, 0.9)" : "blackAlpha.900",
        }}
        boxShadow={{
          sm: "dark-lg",
          md:
            colorMode == "light"
              ? "0px 5px 20px rgba(161, 189, 154, 0.7)"
              : "0px 5px 20px rgba(0,0,0,0.7)",
        }}
      >
        {!isMobile && (
          <Box alignItems={"center"} my="auto">
            <Connect />
          </Box>
        )}
        {pathname != '/' && isMobile && (
          <Box justifySelf="left" my="auto" gridColumnStart={"1"} ml='5px' alignItems='center' onClick={router.back}>
            <Icon as={IoReturnUpBackOutline} w={10} h={10}   color='white' m='auto' />
          </Box>
        )}
        <Box justifySelf={"center"} gridColumnStart="2">
          <Link href={"/"} position="relative">
            <Box width="55px" height={"55px"} p="5px">
              <Image
                src={"/images/logo/logo.png"}
                alt="Dujin's logo"
                fill
                className="image"
              />
            </Box>
          </Link>
        </Box>
        {isMobile ? (
          <MobileMenu pathname={pathname} />
        ) : (
          <HStack justifySelf="right" my="auto" gridColumnStart={"3"}>
            <DesktopMenu showToggle={true} pathname={pathname} />
          </HStack>
        )}
      </Grid>
    </Box>
  );
};

export default Nav;
