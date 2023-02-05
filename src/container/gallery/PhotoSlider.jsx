import { Box, Center, useBoolean, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";

const PhotoSlider = (props) => {
  const [flag, setFlag] = useBoolean();

  const handleWheel = (e) => {
    if (!flag) {
      setFlag.on();
      setTimeout(() => {
        setFlag.off();
      }, 500);
      if (e.nativeEvent.deltaY > 0) {
        props.swiperRef.current.slideNext();
      } else {
        props.swiperRef.current.slidePrev();
      }
    }
  };
  return (
    <Box overflow="hidden">
      <Center onWheel={handleWheel} position="relative">
        <Swiper
          modules={[A11y]}
          slidesPerView={1}
          onSlideChange={(e) => props.setShowIndex(e.activeIndex)}
          onSwiper={(swiper) => {
            props.swiperRef.current = swiper;
          }}
          initialSlide={props.showIndex}
        >
          {props.photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <Center
                className="image-container"
                height={props.showDetail ? "80vh" : "100vh"}
              >
                <Image src={photo.file} alt={photo.id} fill className="image" />
              </Center>
            </SwiperSlide>
          ))}
        </Swiper>
        <Icon
          as={MdNavigateBefore}
          position="absolute"
          left="0"
          top="0"
          zIndex="1"
          h="100px"
          mt="50vh"
          transform="translate(0%, -50%)"
          w="40px"
          color="gray"
          _hover={{ color: "white" }}
          onClick={() => props.swiperRef.current.slidePrev()}
        />
        <Icon
          as={MdNavigateNext}
          position="absolute"
          right="0"
          top="0"
          zIndex="1"
          h="100px"
          mt="50vh"
          transform="translate(0%, -50%)"
          w="40px"
          color={"gray"}
          _hover={{ color: "white" }}
          onClick={() => props.swiperRef.current.slideNext()}
        />
      </Center>
    </Box>
  );
};

export default PhotoSlider;
