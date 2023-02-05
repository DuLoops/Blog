import React from "react";
import { useEffect } from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import Nav from "@/container/Nav";
import BottomNav from "@/container/BottomNav";
import { useRouter } from "next/router";
import Head from "next/head";
export default function VideoViewer(shorts) {
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const router = useRouter();
  const videoID = router.query.pid;

  return (
    <Flex flexDir="column" gap="40px" pb="100px">
      <Head>
        <title>Video | DuLoops</title>
      </Head>
      <Nav />
      <Box w="90%" height="80vh" m="auto">
        <iframe
          width="100%"
          height="100%"
          src={"https://www.youtube.com/embed/" + videoID}
          title="Bouldering in Squamish - Speech Therapy (V3)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe> 
      </Box>

      {isMobile && <BottomNav current={""} />}
    </Flex>
  );
}
