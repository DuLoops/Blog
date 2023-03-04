import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import Nav from "@/container/Nav";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Image from "next/image";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import LoadingScreen from "../../components/LoadingScreen";

const GET_BLOG = gql`
  query GetBLog {
    blog(id: 1) {
      data {
        attributes {
          content
          blog_post {
            data {
              attributes {
                title
                description
                coverImage {
                  alt
                  media {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Blog = () => {
  const rounter = useRouter();
  const { id } = rounter.query;
  const { data, loading, error } = useQuery(GET_BLOG, {
    variables: { id: id },
  });
  let blogPost;
  if (data) {
    blogPost = data.blog.data.attributes.blog_post.data.attributes;
  }

  return (
    <Box>
      <Head>
        <title>Blog | DuLoops</title>
      </Head>
      <Nav />
      {error && (
        <Heading textAlign={"center"}>Error loading content. Sorry.</Heading>
      )}
      {loading && <LoadingScreen />}
      {data && blogPost && (
        <Flex w="80%" m="auto" my="1rem" flexDir="column" gap="1rem" mb="50px">
          <Heading my="1rem" size="2xl">
            {blogPost.title}
          </Heading>
          <Heading as="h2" size="md" fontStyle={"italic"}>
            {blogPost.description}
          </Heading>
          <Box width={{ sm: "100%", lg: "60%" }} alignSelf={"center"} m="2rem">
            <Image
              src={blogPost.coverImage.media.data.attributes.url}
              alt={blogPost.coverImage.alt}
              fill
              className="image"
            />
          </Box>

          {data && (
            <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
              {data.blog.data.attributes.content}
            </ReactMarkdown>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Blog;
