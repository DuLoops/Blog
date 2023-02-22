import {
  Box,
  Flex,
  Grid,
  slideFadeConfig,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Nav from "../container/Nav";
import Filter from "../components/blogHome/Filter";
import BlogPost from "../container/blogHome/BlogPost";
import BottomNav from "../container/BottomNav";
import Head from "next/head";

import { gql } from "@apollo/client";
import client from "@/lib/apollo";
const Blog = ({ blogPostsProp, blogTagsProp }) => {
  const [isMobile] = useMediaQuery("(max-width: 980px)");
  const [blogPosts, setBlogPosts] = useState(blogPostsProp);
  const [selectedTags, setSelectedTags] = useState([]);

  

  const filterPosts = (blogPosts, selectedTags) => {
    let sortedPosts = [...blogPosts];
    sortedPosts.sort((a, b) => {
      return new Date(b.attributes.modifiedDate) - new Date(a.attributes.modifiedDate);
    });

    if (selectedTags.length === 0) {
      return sortedPosts;
    }
    return sortedPosts.filter((post) => {
      return selectedTags.every((selectedTag) => {
        return post.attributes.blog_tags.data.find(
          (tag) => tag.id === selectedTag
        );
      });
    });
  };

  const filteredPosts = filterPosts(blogPosts, selectedTags);

  return (
    <Box minHeight={"100vh"}>
      <Head>
        <title>Blog | DuLoops</title>
        <meta name="description" content="Dujin Kim's personal blog" />
      </Head>
      <Nav />
      <Filter
        tags={blogTagsProp}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Grid p="10px" gap="10px" gridTemplateColumns={{ lg: "1fr 1fr" }}>
        {blogPosts.length > 0 &&
          filteredPosts.map((post, index) => (
            <BlogPost key={index} post={post.attributes} />
          ))}
      </Grid>
      {isMobile && <BottomNav current="blog" />}
    </Box>
  );
};

const GET_QUERY = gql`
  query getBlogPostsAndTags {
    blogPosts {
      data {
        attributes {
          title
          description
          modifiedDate
          internalLink
          link
          size
          blog_tags {
            data {
              id
              attributes {
                color
                name
              }
            }
          }
          coverImage {
            alt
            media {
              data {
                attributes {
                  url
                  caption
                }
              }
            }
          }
        }
      }
    }

    blogTags {
      data {
        id
        attributes {
          name
          color
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_QUERY,
  });
  return {
    props: {
      blogPostsProp: data.blogPosts.data,
      blogTagsProp: data.blogTags.data,
    },
    revalidate: false,
  };
}

export default Blog;
