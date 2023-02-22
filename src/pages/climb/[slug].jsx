import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import Head from "next/head";
import Nav from "@/container/Nav";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useQuery } from "@apollo/client";

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

const ClimbBlog = ({ contentID }) => {
  const { data, loading, error } = useQuery(GET_CLIMB, {
    variables: { id: contentID },
  });
  let climbData = null;
  if (data) climbData = data.climb.data.attributes;

  return (
    <Box textAlign={"center"}>
      <Head>
        <title>Climb | DuLoops</title>
      </Head>
      <Nav />
      {loading && (
        <Spinner
          pos={"absolute"}
          size="xl"
          top="50vh"
          left="50vw"
          transform={"translate('-50%,-50%')"}
        />
      )}
      {error && <Text>Cannot load the climb at the moment.</Text>}
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

const GET_BLOG_POST = gql`
  query GetBlogPost($id: ID!) {
    blogPost(id: $id) {
      data {
        attributes {
          contentID
        }
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { error, data } = await client.query({
    query: GET_BLOG_POST,
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
      contentID: data.blogPost.data.attributes.contentID,
    },
  };
}

export default ClimbBlog;
