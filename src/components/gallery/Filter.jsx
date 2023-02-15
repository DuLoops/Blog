import {
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Icon,
  Grid,
  Image,
  Link,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";
import { VscOpenPreview } from "react-icons/vsc";
// import {
//   adventure,
//   landscape,
//   sports,
//   life,
//   architecture,
//   products,
// } from "/resources/images/dev/filter";

const addNumber =(a, b) => {
  
}

const Filter = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan1026] = useMediaQuery("(min-width: 1026px)");
  const filters = [
    ["Adventure", "/resources/images/dev/filter/adventure.jpg"],
    ["Landscape", "/resources/images/dev/filter/landscape.jpg"],
    ["Sports", "/resources/images/dev/filter/sports.jpg"],
    ["Life", "/resources/images/dev/filter/life.jpg"],
    ["Architecture", "/resources/images/dev/filter/architecture.jpg"],
    ["Products", "/resources/images/dev/filter/products.jpg"],
  ];

  return (
    <Box  my="1rem" textAlign={'center'}>
      <Button variant="ghost" onClick={onOpen}>
        Filter by
        <Text textDecor={"underline"} ml="0.5rem">
          {props.filter}
        </Text>
        <Icon as={VscOpenPreview} ml="0.5rem" boxSize="20px" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="50vw">
          <ModalHeader>Gallery filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Link
              onClick={() => {
                props.setFilter("all");
                onClose();
              }}
              fontSize="xl"
              width={"100%"}
              display="inline-block"
            >
              All
            </Link>
            {isLargerThan1026 ? (
              <Grid gridTemplate={"1fr 1fr / 1fr 1fr 1fr"} gap="5px" mt="10px">
                {filters.map((item, index) => (
                  <Link
                    key={index}
                    textAlign={"center"}
                    onClick={() => {
                      props.setFilter(item[0]);
                      onClose();
                    }}
                  >
                    <Image
                      src={item[1]}
                      alt={item[0]}
                      w="250px"
                      h="130px"
                      objectFit={"cover "}
                    />
                    <Text>{item[0]}</Text>
                  </Link>
                ))}
              </Grid>
            ) : (
              <Flex flexDir={"column"} fontSize="xl">
                {filters.map((item, index) => (
                  <Link
                    key={index}
                    onClick={() => {
                      props.setFilter(item[0]);
                      onClose();
                    }}
                    mb="10px"
                  >
                    {item[0]}
                  </Link>
                ))}
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Filter;
