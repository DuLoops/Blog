import {
  Flex,
  Box,
  Center,
  Heading,
  Text,
  Tag,
  HStack,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
// import laptop from "@/resources/images/dev/laptop.jpg";
import { useRouter } from "next/router";
export default function BlogPost(props) {
  const router = useRouter();
  
  const handleClick = () => {
    if (props.post.link.substring(0, 5) == "https") {
      window.open(props.post.link, "_blank");
      return;
    } else {
      router.push(`/blog/${props.post.link}`);
    }
  };


  const getButtonText = () => {
    switch (props.post.type) {
      case "software":
        return "Use App";
      case "video":
        return "Watch";
      default:
        return "View";
    }
  };
  return (
    <Center
      flexDir="column"
      backgroundColor={"whiteAlpha.100"}
      borderRadius="md"
      gap="5px"
      border="solid 2px rgba(255,255,255,0.1)"
      onClick={handleClick}
    >
      {props.post.card.type === "image" && (
        <Center className="image-container" maxH='40vh'>
          <Image
            src={props.post.card.data}
            alt={props.post.title}
            fill
            className="image"
          />
        </Center>
      )}
      <Flex
        w="100%"
        p="10px"
        borderBottomRadius="md"
        bg="blackAlpha.500"
        flexDir={"column"}
        gap="10px"
      >
        <Box>
          <Heading size="md" float={"left"}>
            {props.post.title}
          </Heading>
          <HStack justifyContent={"flex-end"} float="right">
            {props.post.tags.map((tag, index) => (
              <Tag colorScheme={"blue"} key={index}>
                {tag}
              </Tag>
            ))}
          </HStack>
        </Box>
        <Text fontSize={"sm"} fontStyle="italic" ml="10px">
          {props.post.description.slice(0, 43)} ...
        </Text>
        <Button size="sm" w="50%" mx="auto">
          {getButtonText()}
        </Button>
      </Flex>
    </Center>
  );
}
