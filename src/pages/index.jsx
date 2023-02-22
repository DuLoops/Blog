import { Box, Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Nav from "../container/Nav";
import Filter from "../components/blogHome/Filter";
import BlogPost from "../container/blogHome/BlogPost";
import BottomNav from "../container/BottomNav";
import Head from "next/head";
import style from "@/styles/blog.module.css";

import { gql } from "@apollo/client";
import client from "@/lib/apollo";
const Blog = ({ blogPostsProp, blogTagsProp }) => {
  const [isMobile] = useMediaQuery("(max-width: 980px)");
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    let sortedPosts = [...blogPostsProp];
    sortedPosts.sort((a, b) => {
      return (
        new Date(b.attributes.modifiedDate) -
        new Date(a.attributes.modifiedDate)
      );
    });
    setBlogPosts(sortedPosts);
  }, []);

  const filterPosts = (blogPosts, selectedTag) => {
    if (selectedTag == null) {
      return blogPosts;
    }
    return blogPosts.filter((post) => {
      return post.attributes.blog_tags.data.find(
        (tag) => tag.id === selectedTag
      );
    });
  };

  const filteredPosts = filterPosts(blogPosts, selectedTag);

  return (
    <Box minHeight={"100vh"}>
      <Head>
        <title>Blog | DuLoops</title>
        <meta name="description" content="Dujin Kim's personal blog" />
      </Head>
      <Nav />
      <Filter tags={blogTagsProp} tag={selectedTag} setTag={setSelectedTag} />
      <Flex
        p="1rem"
        gap="1rem"
        rowGap="2rem"
        flexDir={{ sm: "column", lg: "row" }}
        flexWrap={{ sm: "nowrap", lg: "wrap" }}
        justifyContent="space-around"
      >
        {blogPosts.length > 0 &&
          filteredPosts.map((post, index) => (
            <BlogPost
              key={index}
              post={post.attributes}
              postID={post.id}
              filtered={selectedTag != null}
            />
          ))}
      </Flex>
      {isMobile && <BottomNav current="blog" />}
    </Box>
  );
};

const GET_QUERY = gql`
  query getBlogPostsAndTags {
    blogPosts {
      data {
        id
        attributes {
          title
          description
          modifiedDate
          internalLink
          link
          size
          contentID
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
