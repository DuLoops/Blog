import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import { Box, Flex, Heading, Tag, Text, Divider } from "@chakra-ui/react";
import Nav from "@/container/Nav";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import Image from "next/image";
import { STRAPI_URL } from "@/lib/strapi";
const Blog = ({ blogProp }) => {
  const blogInfo = blogProp.blog_post.data.attributes;
  return (
    <Box>
      <Head>
        <title>Blog | DuLoops</title>
      </Head>
      <Nav />
      <Flex w="80%" m="auto" my="1rem" flexDir="column" gap="1rem">
        <Heading m="1rem" size="2xl">
          {blogInfo.title}
        </Heading>
        <Heading as="h2" size="md">
          {blogInfo.description}
        </Heading>
        <Image
          src={STRAPI_URL + blogInfo.coverImage.media.data.attributes.url}
          alt={blogInfo.coverImage.alt}
          fill
          className="image"
        />
        <ReactMarkdown>{blogProp.content}</ReactMarkdown>
      </Flex>
    </Box>
  );
};

const GET_BLOG = gql`
  query GetBLog($id: ID!) {
    blog(id: $id) {
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

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { error, data } = await client.query({
    query: GET_BLOG,
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
      blogProp: data.blog.data.attributes,
    },
  };
}

export default Blog;
