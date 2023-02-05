import { Icon, Modal, ModalContent, Flex } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import Remote from "@/components/gallery/GalleryController";
import PhotoSlider from "@/container/gallery/PhotoSlider";
import PhotoDetail from "@/components/gallery/PhotoDetail";
import { useRouter } from "next/router";

const PhotoViewerModal = (props) => {
  // const gaEventTracker = useAnalyticsEventTracker("gallery-modal");

  const swiperRef = useRef();
  const router = useRouter();
  const [url, setUrl] = useState(`${props.photos[props.showIndex].id}`);

  const back = () => {
    router.push("/gallery", undefined, { shallow: true });
    props.setModal.off();
  };

  useEffect(() => {
    setUrl(props.photos[props.showIndex].id);

    if (url) {
      window.history.pushState({}, '', `/gallery/${url}`);
    }
  }, [props.showIndex]);

  const hoverStyle = {
    color: "white !important",
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          swiperRef.current.slidePrev();
          break;
        case "ArrowRight":
          event.preventDefault();
          swiperRef.current.slideNext();
          break;
        case "ArrowUp":
          event.preventDefault();
          props.setShowDetail.on();
          break;

        case "ArrowDown":
          event.preventDefault();
          props.setShowDetail.off();
          break;
        default:
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <Modal isOpen={props.isOpen} zIndex="10" allowPinchZoom={true}>
      <ModalContent
        backgroundColor={"dark.200"}
        h="100vh"
        w="100vw"
        maxW="100vw"
        overflow="hidden"
        m="0"
        borderRadius={0}
      >
        <Icon
          as={MdClose}
          position="absolute"
          top="30px"
          right="30px"
          onClick={back}
          h="30px"
          w="30px"
          color={"gray"}
          zIndex={100}
          _hover={hoverStyle}
        />
        <PhotoSlider
          photos={props.photos}
          showIndex={props.showIndex}
          setShowIndex={props.setShowIndex}
          showDetail={props.showDetail}
          swiperRef={swiperRef}
        />
        <Remote
          photo={props.photos[props.showIndex]}
          showDetail={props.showDetail}
          setShowDetail={props.setShowDetail}
          url={url}
        />
        {props.showDetail && (
          <PhotoDetail
            photo={props.photos[props.showIndex]}
            close={props.setShowDetail.off}
          />
        )}
        {/* </Flex> */}
      </ModalContent>
    </Modal>
  );
};

export default PhotoViewerModal;
