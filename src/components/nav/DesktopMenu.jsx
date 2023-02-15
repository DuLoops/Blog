import { HStack, Button, useColorMode, Link } from "@chakra-ui/react";

const DesktopMenu = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const links = [
    ["BLOG", "/"],
    ["GALLERY", "/gallery"],
    ["ABOUT", "/about"],
  ];

  return (
    <HStack
      as={"nav"}
      spacing={5}
      color="black"
      display={{ base: "none", md: "flex" }}
      pr="10px"
    >
      {links.map((link, index) => (
        <Link
          key={index}
          rounded={"md"}
          _hover={{
            textDecoration: "none",
            color: colorMode == "light" ? "gray.400" : "white",
          }}
          style={
            props.pathname == link[1] ||
            (props.pathname == "/" && link[0] == "BLOG")
              ? { textDecoration: "underline" }
              : {}
          }
          href={link[1]}
          color={colorMode == "light" ? "black" : "gray.400"}
        >
          {link[0]}
        </Link>
      ))}
      {/* {props.showToggle && (
        <>
          <input
            className={style.darkmodeInput}
            type="checkbox"
            id="darkmode-toggle"
            checked={colorMode == "dark"}
            onChange={toggleColorMode}
          />
          <label
            className={style.darkmodeLabel}
            htmlFor="darkmode-toggle"
          >
            <div
              width="20px"
              position={"absolute"}
              left="3px"
              top="3px"
              zindex={"1"}
            >
              <Image src={sun} alt="sun" width="fill" />
            </div>
            <div
              width="20px"
              position={"absolute"}
              width="23px"
              right="3px"
              top="1px"
              zindex={"1"}
            >
              <Image src={moon2} alt="moon" />
            </div>
          </label>
        </>
      )} */}
    </HStack>
  );
};

export default DesktopMenu;
