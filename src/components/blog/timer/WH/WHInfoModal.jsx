import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Heading,
  Box,
  Flex,
  Link,
} from "@chakra-ui/react";

function WHInfoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Info</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wim Hof Breathing Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex px="20px" flexDir="column" gap="20px">
              <Link
                href="https://www.youtube.com/watch?v=tybOi4hjZFQ&ab_channel=WimHof"
                target={"_blank"}
                mx="1rem"
                textDecor={"underline"}
                backgroundColor={"whiteAlpha.300"}
                textAlign="center"
              >
                Video Guide
              </Link>
              <Box>
                <Heading>How to?</Heading>
                <ol>
                  <li>Take in a strong inhalation.</li>
                  <li>Let out a relaxed exhalation through the mouth.</li>
                  <li>
                    Repeat for 20~40 breaths (recommendation: 30 breaths).
                  </li>
                  <li>
                    On the last breath, exhale to 90 percent and hold for as
                    long as you can.
                  </li>
                  <li>
                    When you feel your body really needs to take a breath,
                    inhale fully and hold for 15 seconds before releasing.
                  </li>
                  <li>Repeat 3 to 5 sets</li>
                </ol>
              </Box>
              <Box>
                <Heading>Precaustions</Heading>
                <ul>
                  <li>
                    Watch the safety video first.
                    <Link
                      href="https://www.youtube.com/watch?v=IFSL_Qk9qKw&ab_channel=WimHof"
                      target={"_blank"}
                      mx="1rem"
                      textDecor={"underline"}
                    >
                      Video Link
                    </Link>
                  </li>
                  <li>
                    Hyperventilation is not safe for everyone, and people with a
                    history of fainting should consult a healthcare professional
                    before trying this method.
                  </li>
                  <li>
                    Wim Hof Breathing can affect motor control and, in rare
                    cases, lead to loss of consciousness. Practice it in a safe
                    environment.
                  </li>
                  <li>
                    WHB is about learning to find comfort in discomfort, rather
                    than setting records or fighting through pain. Listen to
                    your body, not your ego.
                  </li>
                </ul>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WHInfoModal;
