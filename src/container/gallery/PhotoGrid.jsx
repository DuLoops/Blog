import Image from "next/image";
import { Center, Flex } from "@chakra-ui/react";
const PhotoGrid = (props) => {
  const handleClick = (index, photoID) => {
    props.setShowIndex(index);
    props.setModal.on();
  };
  return (
    <Flex w="100%" flexFlow={"row wrap"} px="30px" gap='10px'>
      {props.photos.map((photo, index) => (
        <Center
          onClick={() => handleClick(index, photo.id)}
          className="image-container"
          key={index}
          width={{sm: '100%', lg: '49%'}}
          maxHeight={{sm: '100%', lg: '50vh'}}
          mx="auto"
          p='auto'
          
        >
          <Image
            src={photo.file}
            alt={photo.title}
            className="image"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </Center>
      ))}
    </Flex>
  );
};

export default PhotoGrid;
