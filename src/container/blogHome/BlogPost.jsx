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
import { useRouter } from "next/router";
import { STRAPI_URL } from "@/lib/strapi";
export default function BlogPost(props) {
  const router = useRouter();
  const handleClick = () => {
    if (props.post.internalLink) {
      let newPath = props.post.link;
      if (props.postID) {
        newPath += `?id=${props.postID}`;
      }
      const currentPath = router.asPath;
      if (newPath !== currentPath) {
        router.push(newPath);
      }
    } else {
      window.open(props.post.link, "_blank");
    }
  };

  return (
    <Flex
      flexDir="column"
      backgroundColor={"whiteAlpha.100"}
      borderRadius="md"
      gap="5px"
      border="solid 2px rgba(255,255,255,0.1)"
      onClick={handleClick}
      // maxH="400px"
      justifyContent="space-between"
      overflow={"hidden"}
    >
      <Center className="image-container" maxHeight="300px">
        <Image
          src={STRAPI_URL + props.post.coverImage.media.data.attributes.url}
          alt={props.post.coverImage.media.data.attributes.caption}
          fill
          className="image"
        />
      </Center>
      <Flex
        w="100%"
        p="10px"
        borderBottomRadius="md"
        bg="blackAlpha.500"
        flexDir={"column"}
        gap="10px"
      >
        <HStack justifyContent={"space-between"}>
          <Heading size="md">{props.post.title}</Heading>
          <HStack justifyContent={"flex-end"}>
            {props.post.blog_tags.data.map((tag, index) => (
              <Tag colorScheme={tag.attributes.color} key={index}>
                {tag.attributes.name}
              </Tag>
            ))}
          </HStack>
        </HStack>
        <Text fontSize={"sm"} fontStyle="italic" ml="10px">
          {props.post.description.slice(0, 43)} ...
        </Text>
        <Button size="sm" w="50%" mx="auto">
          View
        </Button>
      </Flex>
    </Flex>
  );
}
