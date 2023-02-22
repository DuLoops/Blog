import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import {
  Box,
  Flex,
  Heading,
  Tag,
  Text,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import Nav from "@/container/Nav";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import Image from "next/image";
import { STRAPI_URL } from "@/lib/strapi";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useQuery } from "@apollo/client";

const GET_CHALLENGE = gql`
  query getCodingChallenge($id: ID!) {
    codingChallenge(id: $id) {
      data {
        attributes {
          difficulty
          date
          problem
          solution
          code
          codeLanguage
          tags {
            data {
              attributes {
                type
                color
              }
            }
          }
        }
      }
    }
  }
`;

const CodingChallenge = ({ blogPostProp }) => {
  const { data, loading, error } = useQuery(GET_CHALLENGE, {
    variables: { id: blogPostProp.contentID },
  });

  let challengeData = null;
  if (!error && data) challengeData = data.codingChallenge.data.attributes;

  return (
    <Box>
      <Head>
        <title>Coding-Challenge | DuLoops</title>
      </Head>
      <Nav />
      <Flex w="80%" m="auto" my="1rem" flexDir="column" gap="1rem" mb="50px">
        <Heading m="1rem" size="2xl">
          {blogPostProp.title}
        </Heading>
        <Heading as="h2" size="md">
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
          <Box>
            <Divider my="1rem" />
            <Text>
              Challenge difficulty:{" "}
              <Tag colorScheme={"blue"}>{challengeData.difficulty}</Tag>
              <br />
              <br />
              Type:{" "}
              {challengeData.tags.data.map((tag, index) => (
                <Tag key={index} color={tag.attributes.color}>
                  {tag.attributes.type}
                </Tag>
              ))}
            </Text>
            <Divider my="1rem" />
            <Heading as={"h3"}>Problem</Heading>
            <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
              {challengeData.problem}
            </ReactMarkdown>
            <Divider my="1rem" />
            <Heading as={"h3"}>Solution</Heading>
            <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
              {challengeData.solution}
            </ReactMarkdown>
            <Divider my="1rem" />
            <Heading as={"h3"}>Code</Heading>
            <Text>Language: {challengeData.codeLanguage}</Text>
            <ReactSyntaxHighlighter language={challengeData.codeLanguage}>
              {challengeData.code}
            </ReactSyntaxHighlighter>
          </Box>
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

export default CodingChallenge;
