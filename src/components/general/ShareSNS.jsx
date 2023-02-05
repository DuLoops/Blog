import { Box, Divider, Text, Icon, Flex, CloseButton } from "@chakra-ui/react";
import { TwitterShareButton, FacebookShareButton } from "react-share";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { useState } from "react";
const ShareSNS = (props) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText("https://duloops.com/gallery/" + props.url);
    setTimeout(props.close, 3000);
  };

  return (
    <Box
      w="150px"
      background={"blackAlpha.900"}
      borderRadius="10px"
      p="10px"
      textAlign={"center"}
      color='white'
    >
      <CloseButton
        position={"absolute"}
        top="2px"
        right="2px"
        onClick={props.close}
      />
      <Flex direction="row" w="100%" justifyContent={"center"} gap="15px">
        <FacebookShareButton url={props.url}>
          <Icon
            as={BsFacebook}
            boxSize="28px"
            _hover={{ bg: "blue.300", color: "gray.500" }}
            borderRadius={"30px"}
            p="2px"
          />
        </FacebookShareButton>
        <TwitterShareButton url={props.url}>
          <Icon
            as={BsTwitter}
            boxSize="30px"
            p="2px"
            _hover={{ color: "cyan.400", bg: " gray.500" }}
            borderRadius={"28px"}
          />
        </TwitterShareButton>
      </Flex>
      <Divider my="5px" bg="gray" />
      <Box
        w="100%"
        mx="auto"
        my="5px"
        background={copied ? "green.300" : "lightGlass.100"}
        borderRadius={"5px"}
        cursor="pointer"
        _hover={{ backgroundColor: "green.300" }}
        onClick={handleClick}
      >
        <Text
          w={"100%"}
          overflow="hidden"
          height={"20px"}
          fontSize="xs"
          background="blackAlpha.600"
        >
          duloops.com/{props.url.slice(28, 34)}...
        </Text>
        <Text w="100%" p="3px">
          {copied ? "Copied!" : "Copy photo link"}
        </Text>
      </Box>
    </Box>
  );
};

export default ShareSNS;
