import { Box, Heading, Text } from "@chakra-ui/react";
import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import Head from "next/head";
import Nav from "@/container/Nav";
import ReactMarkdown from "react-markdown";

const ClimbBlog = ({ climbData }) => {
  return (
    <Box textAlign={"center"}>
      <Head>
        <title>Climb | DuLoops</title>
      </Head>
      <Nav />
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
        <ReactMarkdown>{climbData.content}</ReactMarkdown>
      </Box>
    </Box>
  );
};

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

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { error, data } = await client.query({
    query: GET_CLIMB,
    variables: {
      id: id,
    },
  });

  if (error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      climbData: data.climb.data.attributes,
    },
  };
}

export default ClimbBlog;
