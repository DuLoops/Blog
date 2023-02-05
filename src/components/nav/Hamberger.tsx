import styled from "styled-components";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Flex, Text, useBoolean, Box, useColorMode } from "@chakra-ui/react";

const path01Variants = {
  open: { d: "M10 0L40 30" },
  closed: { d: "M0 11.5, L50 11.5 " },
};

const path02Variants = {
  open: { d: "M40 0L10 30" },
  moving: { d: "M0 20.5, L50 20.5 " },
  closed: { d: "M20 20.5, L50 20.5 " },
};

const Hamberger = (props: any) => {
  const [isHover, setHover] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode()

  const path01Controls = useAnimation();
  const path02Controls = useAnimation();

  const onHover = async () => {
    if (!props.isOpen) {
      setHover(true);
      await path02Controls.start(path02Variants.moving);
    }
  };

  const onLeave = async () => {
    if (!props.isOpen) {
      setHover(false);
      path02Controls.start(path02Variants.closed);
    }
  };

  const onClick = async () => {
    props.setIsOpen(!props.isOpen);
    //Closing
    if (!props.isOpen) {
      path01Controls.start(path01Variants.open);
      path02Controls.start(path02Variants.open);
    } else {
      path01Controls.start(path01Variants.closed);
      path02Controls.start(path02Variants.closed);
    }
  };

  return (
    <button onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <Flex alignItems={"center"}>
        {!props.isOpen && (
          <Text fontSize={"2xl"} color={colorMode == 'light' ? 'black' : '#A0AEC0'} mr="3">
            MENU
          </Text>
        )}
        <svg width="50" height="30" viewBox="0 0 50 30" widths={"10"}>
          <motion.path
            {...path01Variants.closed}
            animate={path01Controls}
            transition={{ duration: 0.2 }}
            stroke={colorMode == 'light' ? 'black' : '#A0AEC0'}
            strokeWidth={"2"}
          />
          <motion.path
            {...path02Variants.closed}
            animate={path02Controls}
            transition={{ duration: 0.2 }}
            stroke={colorMode == 'light' ? 'black' : '#A0AEC0'}
            strokeWidth={"2"}
          />
        </svg>
      </Flex>
    </button>
  );
};

export default Hamberger;
