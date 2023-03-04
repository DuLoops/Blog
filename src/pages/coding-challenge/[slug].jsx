import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import { Box, Flex, Heading, Tag, Text, Divider } from "@chakra-ui/react";
import Nav from "@/container/Nav";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import Image from "next/image";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/LoadingScreen";

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

const CodingChallenge = () => {
  const rounter = useRouter();
  const { id } = rounter.query;
  const { data, loading, error } = useQuery(GET_CHALLENGE, {
    variables: { id: id },
  });

  let challengeData = null;
  let blogPost = null;
  if (!error && data) {
    challengeData = data.codingChallenge.data.attributes;
    blogPost = data.codingChallenge.data.attributes.blog_post.data.attributes;
  }

  return (
    <Box>
      <Head>
        <title>Coding-Challenge | DuLoops</title>
      </Head>
      <Nav />
      {loading && <LoadingScreen />}
      {error && <p>Error loading content. Sorry.</p>}
      {data && (
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
        </Flex>
      )}
    </Box>
  );
};

export default CodingChallenge;
