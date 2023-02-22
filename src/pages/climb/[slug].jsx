import { Box, Heading, Text } from "@chakra-ui/react";
import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import Head from "next/head";
import Nav from "@/container/Nav";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useQuery } from "@apollo/client";
import LoadingScreen from "../../components/LoadingScreen";
import { useRouter } from "next/router";

const GET_CLIMB = gql`
  query GetClimb($id: ID!) {
    climb(id: $id) {
      data {
        attributes {
          videoID
          grade
          type
          content
          name
        }
      }
    }
  }
`;

const ClimbBlog = () => {
  const rounter = useRouter();
  const { id } = rounter.query;
  const { data, loading, error } = useQuery(GET_CLIMB, {
    variables: { id: id },
  });
  let climbData = null;
  if (loading) {
    return <LoadingScreen />;
  }
  if (data) {
    climbData = data.climb.data.attributes;
  }
  return (
    <Box textAlign={"center"}>
      <Head>
        <title>Climb | DuLoops</title>
      </Head>
      <Nav />
      {error && <Text>Cannot load the climb at the moment.</Text>}
      {loading && <LoadingScreen />}
      {climbData && (
        <Box>
          <Heading>{climbData.name}</Heading>
          <Text mt={"1rem"}>Type: {climbData.type}</Text>
          <Text>Grade: {climbData.grade}</Text>
          <Box w="90%" height="80vh" m="auto">
            <iframe
              width="100%"
              height="100%"
              src={"https://www.youtube.com/embed/" + climbData.videoID}
              title="Bouldering in Squamish - Speech Therapy (V3)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
          <Box
            w="80%"
            m="auto"
            my="1rem"
            borderRadius={"1rem"}
            backgroundColor="whiteAlpha.300"
          >
            <ReactMarkdown components={ChakraUIRenderer}>
              {climbData.content}
            </ReactMarkdown>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ClimbBlog;
