import { Box, Heading, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LoadingScreen = (props) => {
  return (
    <Box padding="5rem" boxShadow="lg">
      <Heading my='3rem' textAlign={'center'}>{props.title}</Heading>
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      <SkeletonText mt="5rem" noOfLines={4} spacing="4" skeletonHeight="2" />

    </Box>
  );
};

export default LoadingScreen;
