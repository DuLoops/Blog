import {
  Box,
  CloseButton,
  Heading,
  Link,
  Text,
  Flex,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getLocation from "@/utils/getGoogleMapsLocation";
import { AiFillCamera } from "react-icons/ai";
const PhotoDetail = (props) => {
  const [locationInfo, setLocationInfo] = useState();
  useEffect(() => {
    if (props.photo.location) {
      getLocation(props.photo.location).then((data) => {
        setLocationInfo(data);
      });
    } else {
      setLocationInfo(null);
    }
  }, [props]);

  return (
    <Box
      // bg="whiteAlpha.100"
      width={"70vw"}
      h="14vh"
      position={"absolute"}
      bottom={{ sm: "180px", md: "0" }}
      left="50%"
      transform={"translate(-50%, 0)"}
      borderRadius={"5px 5px 0 0 "}
      textAlign="center"
      bg="blackAlpha.400"
      zIndex={10}
    >
      <Flex
        flexDir="column"
        justifyContent={"space-around"}
        h="14vh"
        color="white"
      >
        <Heading fontSize="2xl" as="b" fontFamily={"Poiret One"}>
          {props.photo.title}
        </Heading>
        {(props.photo.desc || locationInfo) && (
          <Flex justifyContent={"center"} gap="2rem">
            {props.photo.desc && (
              <Text fontSize={"md"}>"{props.photo.desc}"</Text>
            )}
            {locationInfo && (
              <Text>
                Location:
                <Link
                  fontSize="md"
                  ml="0.5rem"
                  href={locationInfo.link}
                  isExternal
                  color="blue.300"
                  textDecor={"underline"}
                  fontStyle="italic"
                  _hover={{ textDecor: "none" }}
                >
                  {locationInfo.title}
                </Link>
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default PhotoDetail;
