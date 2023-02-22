import { Box, Heading, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Box padding="10vw" boxShadow="lg">
      <SkeletonText mt="4" noOfLines={4} spacing={{sm:3, lg: 10}} skeletonHeight={{sm:3, lg: 7}}  />
      <SkeletonText mt={{sm:"50px", lg: '150px'}} noOfLines={4} spacing={{sm:3, lg: 10}}  skeletonHeight={{sm:3, lg: 7}}  />
    </Box>
  );
};

export default LoadingScreen;
