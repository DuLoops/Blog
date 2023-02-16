import { Box, Flex, Grid, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Nav from "../container/Nav";
import Filter from "../components/blogHome/Filter";
import BlogPost from "../container/blogHome/BlogPost";
import BottomNav from "../container/BottomNav";
import { db } from "@/utils/firebase";
import { getDocs, collection } from "firebase/firestore";
import Head from "next/head";

export async function getServerSideProps() {
  const postsQuerySnapshot = await getDocs(collection(db, "blogPosts"));
  const tagsQuerySnapshot = await getDocs(collection(db, "blogTags"));
  const blogPostsProp = postsQuerySnapshot.docs.map((doc) => {
    const data = doc.data();
    data.date = data.date.toDate().toString();
    return data;
  });
  const tags = tagsQuerySnapshot.docs.map((doc) => {
    return doc.data();
  });

  const  blogTagsProp = tags.filter(tag => tag.hasOwnProperty('posts'));
  return {
    props: { blogPostsProp, blogTagsProp },
  };
}

const Blog = ({ blogPostsProp, blogTagsProp }) => {
  const [isMobile] = useMediaQuery("(max-width: 980px)");
  const [blogPosts, setBlogPosts] = useState(blogPostsProp);
  const [selectedTags, setSelectedTags] = useState([]);
  const filterPosts = (blogPosts, selectedTags) => {
    if (selectedTags.length === 0) {
      return blogPosts;
    }
    return blogPosts.filter((post) => {
      return selectedTags.every((tag) => post.tags.includes(tag));
    });
  }

  const filteredPosts = filterPosts(blogPosts, selectedTags);


  return (
    <Box minHeight={"100vh"}>
      <Head>
        <title>Blog | DuLoops</title>
        <meta name="description" content="Dujin Kim's personal blog" />
      </Head>
      <Nav />
      <Filter tags={blogTagsProp} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
      <Grid p="10px" gap="10px" gridTemplateColumns={{ lg: "1fr 1fr" }}>
        {blogPosts.length > 0 &&
            filteredPosts.map((post, index) => <BlogPost key={index} post={post} tags={blogTagsProp}/>)}
      </Grid>
      {isMobile && <BottomNav current="blog" />}
    </Box>
  );
};

export default Blog;
