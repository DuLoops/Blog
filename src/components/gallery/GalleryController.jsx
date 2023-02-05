import { Box, Icon, Stack, Tooltip, useBoolean } from "@chakra-ui/react";
import {
  BiDownload,
  BiShare,
  BiMessageAltX,
  BiMessageDetail,
} from "react-icons/bi";
import { useState } from "react";
import ShareSNS from "@/components/general/ShareSNS";

const PhotoshowDetail = (props) => {
  const [popover, setPopover] = useBoolean(false);
  const [popoverType, setPopoverType] = useState("");
  const [showShare, setShowShare] = useBoolean(false);
  const iconStyle = {
    width: "35px",
    height: "35px",
    zIndex: 100,
    color: props.showDetail ? "white" : "#5A5A5A",
  };

  const flipIcon = {
    ...iconStyle,
    transform: "scaleX(-1)",
  };

  const handleHover = (type) => {
    if (!showShare) {
      setPopoverType(type);
      setPopover.on();
    }
  };

  const handleLeave = () => {
    setPopover.off();
  };

  async function handleDownload() {
    const image = await fetch(props.photo.file);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = props.photo.title + "-DuJin";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Box position="absolute" right={"2rem"} bottom={{sm:'80px', lg:'1rem'}}>
      <Stack direction={"row"} onMouseLeave={handleLeave}>
        <Icon
          as={props.showDetail ? BiMessageAltX : BiMessageDetail}
          style={iconStyle}
          onMouseEnter={() =>
            handleHover(props.showDetail ? "Hide Details" : "Photo Details")
          }
          onClick={props.setShowDetail.toggle}
        />
        {/* <Icon
          as={BiDownload}
          style={iconStyle}
          onMouseEnter={() => handleHover("Download")}
          onClick={handleDownload}
        /> */}
        <Icon
          as={BiShare}
          style={flipIcon}
          color={showShare ? "white !important" : ""}
          onMouseEnter={() => handleHover("Share")}
          onClick={setShowShare.toggle}
          zIndex={"10"}
        />
        {showShare && (
          <Box
            position="absolute"
            bottom="40px"
            right="0"
            borderRadius={"5px"}
            zIndex={100}
          >
            <ShareSNS close={setShowShare.off} url={props.url} />
          </Box>
        )}

        {popover && (
          <Box
            position="absolute"
            top="-35px"
            backgroundColor="whiteAlpha.100"
            borderRadius={"5px"}
            p="3px"
            color={"gray.50"}
            right="0"
            zIndex={10}
          >
            {popoverType}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PhotoshowDetail;
