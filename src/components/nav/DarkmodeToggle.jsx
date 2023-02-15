import {
  HStack,
  Button,
  useColorMode,
  Link,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";
import styled from "styled-components";
// import sun from "/next.svg";
// import moon from "/resources/svg/moon.svg";

const DarkmodeLabel = styled.label`
  width: 60px;
  height: 25px;
  position: relative;
  display: block;
  background: #ebebeb;
  border-radius: 200px;
  box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4),
    inset 0px -5px 15px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: 0.3s;
  &:after {
    content: "";
    width: 20px;
    height: 20px;
    position: absolute;
    top: 3px;
    left: 3px;
    background: linear-gradient(180deg, #ffcc89, #d8860b);
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;
const DarkmodeInput = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;

  &:checked + label {
    background: #242424;
  }
  &:checked + label:after {
    left: 55px;
    transform: translateX(-100%);
    background: linear-gradient(180deg, #777, #3a3a3a);
  }
`;

const DarkmodeToggle = (props) => {
  return (
    <Center justifySelf="left">
      <DarkmodeInput
        type="checkbox"
        id="darkmode-toggle"
        checked={props.colorMode == "dark"}
        onChange={props.toggleColorMode}
      />
      <DarkmodeLabel htmlFor="darkmode-toggle">
        <Image
          src="/resources/svg/sun.svg"
          alt="sun"
          position={"absolute"}
          w="20px"
          left="3px"
          top="3px"
          zIndex={"1"}
        />

        <Image
          src={"/resources/svg/moon.svg"}
          alt="moon"
          position={"absolute"}
          w="23px"
          right="3px"
          top="1px"
          zIndex={"1"}
        />
      </DarkmodeLabel>
    </Center>
  );
};

export default DarkmodeToggle;
