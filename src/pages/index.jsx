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
  const querySnapshot = await getDocs(collection(db, "blogPosts"));
  const docsData = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    data.date = data.date.toDate().toString();
    return data;
  });

  return {
    props: { docsData },
  };
}

const Blog = ({ docsData }) => {
  const [isMobile] = useMediaQuery("(max-width: 980px)");
  const [blogPosts, setBlogPosts] = useState(docsData);

  return (
    <Box minHeight={"100vh"}>
      <Head>
        <title>Blog | DuLoops</title>
        <meta name="description" content="Dujin Kim's personal blog" />
      </Head>
      <Nav />
      <Filter />
      <Grid p="10px" gap="10px" gridTemplateColumns={{ lg: "1fr 1fr" }}>
        {blogPosts.length > 0 &&
          blogPosts.map((post, index) => <BlogPost key={index} post={post} />)}
      </Grid>
      {isMobile && <BottomNav current="blog" />}
    </Box>
  );
};

export default Blog;
