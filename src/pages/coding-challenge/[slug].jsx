import client from "@/lib/apollo";
import { gql } from "@apollo/client";
import { Box, Flex, Heading, Tag, Text, Divider } from "@chakra-ui/react";
import Nav from "@/container/Nav";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import Image from "next/image";
import { STRAPI_URL } from "@/lib/strapi";
const CodingChallenge = ({ challengeData }) => {
  const challengeInfo = challengeData.blog_post.data.attributes;
  return (
    <Box>
      <Head>
        <title>Coding-Challenge | DuLoops</title>
      </Head>
      <Nav />
      <Flex w="80%" m="auto" my="1rem" flexDir="column" gap="1rem">
        <Heading m="1rem" size="2xl">
          {challengeInfo.title}
        </Heading>
        <Heading as="h2" size="md">
          {challengeInfo.description}
        </Heading>
        <Image
          src={STRAPI_URL + challengeInfo.coverImage.media.data.attributes.url}
          alt={challengeInfo.coverImage.alt}
          fill
          className="image"
        />
        <Divider />
        <Text>
          Challenge difficulty:{" "}
          <Tag colorScheme={"blue"}>{challengeData.difficulty}</Tag>
          <br />
          <br />
          Type:{" "}
          {challengeData.tags.data.map((tag, index) => (
            <Tag key={index} color={tag.attributes.color}>{tag.attributes.type}</Tag>
          ))}
        </Text>
        <Divider />
        <Heading as={"h3"}>Problem</Heading>
        <ReactMarkdown>{challengeData.problem}</ReactMarkdown>
        <Divider />
        <Heading as={"h3"}>Solution</Heading>
        <ReactMarkdown>{challengeData.solution}</ReactMarkdown>
        <Divider />
        <Heading as={"h3"}>Code</Heading>
        <Text>Language: {challengeData.codeLanguage}</Text>
        <ReactSyntaxHighlighter language={challengeData.codeLanguage}>
          {challengeData.code}
        </ReactSyntaxHighlighter>
      </Flex>
    </Box>
  );
};

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

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { error, data } = await client.query({
    query: GET_CHALLENGE,
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
      challengeData: data.codingChallenge.data.attributes,
    },
  };
}

export default CodingChallenge;
