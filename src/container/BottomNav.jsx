import { Box, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function BottomNav(props) {
  const [scrollingUp, setScrollingUp] = useState(true);
  const router=useRouter();
  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollingUp(scrollY > lastScrollY ? false : true);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollingUp]);

  return (
    <Flex
      w="100%"
      position={"fixed"}
      bottom="0"
      p="5px"
      gap="10px"
      bg="blackAlpha.800"
      visibility={scrollingUp ? "visible" : "hidden"}
    >
      <Center
        w="50%"
        bgColor={props.current == "blog" ? "whiteAlpha.400" : ""}
        borderRadius="5px"
        border={"solid grey 1px"}
        p="3px"
        onClick={()=>router.push("/")}
      >
          <Image src={"/images/icons/blog.png"} alt="Blog" width={50} height={50} />
          <Text ml="10px">
            <i>Blog</i>
          </Text>
      </Center>
      <Center
        w="50%"
        float={"right"}
        bgColor={props.current == "gallery" ? "whiteAlpha.400" : ""}
        borderRadius="5px"
        border={"solid grey 1px"}
        p="5px"
        onClick={()=>router.push("/gallery")}
      >
        <Image src={"/images/icons/gallery.png"} alt="Gallery" width={50} height={50} />
        <Text ml="10px">
          <i>Gallery</i>
        </Text>
      </Center>
    </Flex>
  );
}
