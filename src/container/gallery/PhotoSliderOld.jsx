import PhotoViewerModal from "../../pages/PhotoViewerModal";

import {
  Box,
  Center,
  Image,
  useBoolean,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Scrollbar, A11y, Parallax } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import {
  useLocation,
  useNavigate,
  Link,
  Routes,
  Route,
} from "react-router-dom";

const PhotoSlider = (props) => {
  const [flag, setFlag] = useBoolean();
  const { colorMode, toggleColorMode } = useColorMode();
  const swiperRef = useRef();
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    setFlag.on();
    setTimeout(() => {
      setFlag.off();
    }, 100);
  }, [props.showIndex]);

  const handleClick = (index) => {
    if (index < props.showIndex - 1 || index > props.showIndex + 1) return;
    if (index < props.showIndex) {
      swiperRef.current.slidePrev(false);
    } else if (index > props.showIndex) {
      swiperRef.current.slideNext(false);
    }
    props.setModal.on();
  };

  const handleWheel = (e) => {
    if (!flag) {
      if (e.nativeEvent.deltaY > 0) {
        swiperRef.current.slideNext();
      } else {
        swiperRef.current.slidePrev();
      }
    }
  };
  return (
    <Box overflow="hidden">
      <Center
        mt="50px"
        mx="5px"
        onWheel={handleWheel}
        position="relative"
        background={colorMode == "light" ? "white" : "dark.100"}
      >
        <Swiper
          modules={[A11y]}
          slidesPerView={3}
          onSlideChange={
            (e) => props.setShowIndex(e.activeIndex)
            // console.log(e.activeIndex)
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <SwiperSlide />
          {props.photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <Image
                src={photo.file}
                key={index}
                alt={photo.id}
                objectFit={"contain"}
                loading="lazy"
                onClick={() => handleClick(index)}
                maxH="70vh"
                maxW="33vw"
                m="auto"
                draggable="true"
              />
            </SwiperSlide>
          ))}
          <SwiperSlide />
        </Swiper>
        <Icon
          as={MdNavigateBefore}
          position="absolute"
          left="0"
          top="0"
          zIndex="1"
          h="45vh"
          w="40px"
          color="gray"
          onClick={() => swiperRef.current.slidePrev()}
        />
        <Icon
          as={MdNavigateNext}
          position="absolute"
          right="0"
          top="0"
          zIndex="1"
          h="45vh"
          w="40px"
          color={"gray"}
          onClick={() => swiperRef.current.slideNext()}
        />
      </Center>
    </Box>
  );
};

export default PhotoSlider;
