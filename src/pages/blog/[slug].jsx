import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import Nav from "@/container/Nav";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import Image from "next/image";
import { STRAPI_URL } from "@/lib/strapi";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useQuery } from "@apollo/client";

const GET_BLOG = gql`
  query GetBLog($id: ID!) {
    blog(id: $id) {
      data {
        attributes {
          content
        }
      }
    }
  }
`;

const Blog = ({ blogPostProp }) => {
  const { data, loading, error } = useQuery(GET_BLOG, {
    variables: { id: blogPostProp.contentID },
  });

  return (
    <Box>
      <Head>
        <title>Blog | DuLoops</title>
      </Head>
      <Nav />
      <Flex w="80%" m="auto" my="1rem" flexDir="column" gap="1rem" mb="50px">
        <Heading my="1rem" size="2xl">
          {blogPostProp.title}
        </Heading>
        <Heading as="h2" size="md" fontStyle={"italic"}>
          {blogPostProp.description}
        </Heading>
        <Box width={{ sm: "100%", lg: "60%" }} alignSelf={"center"} m="2rem">
          <Image
            src={STRAPI_URL + blogPostProp.coverImage.media.data.attributes.url}
            alt={blogPostProp.coverImage.alt}
            fill
            className="image"
          />
        </Box>
        {loading && <Spinner size="xl" alignSelf={"center"} />}
        {error && <p>Error loading content. Sorry.</p>}
        {data && (
          <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
            {data.blog.data.attributes.content}
          </ReactMarkdown>
        )}
      </Flex>
    </Box>
  );
};

const GET_BLOG_POST = gql`
  query GetBlogPost($id: ID!) {
    blogPost(id: $id) {
      data {
        attributes {
          title
          description
          contentID
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
`;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { error, data } = await client.query({
    query: GET_BLOG_POST,
    variables: { id: id },
  });

  if (error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id: id,
      blogPostProp: data.blogPost.data.attributes,
    },
  };
}

export default Blog;
