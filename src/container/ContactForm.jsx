import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  FormControl,
  Input,
  Textarea,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorMode,
} from "@chakra-ui/react";
import {
  BsGithub,
  BsLinkedin,
  BsStrava,
  BsYoutube,
} from "react-icons/bs";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

export default function Contact() {
  const Clear = styled.div`
    clear: both;
  `;

  const [form, setForm] = useState({
    about: "web-development",
    other: "",
    subject: "",
    email: "",
    text: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);
  const { colorMode } = useColorMode();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRadio = (radioValue) => {
    setForm({ ...form, about: radioValue });
  };

  const handleOther = () => {
    setForm({ ...form, about: "other" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    emailjs
      .send("service_kgsfubg", "template_ofm6cnc", form, "82G2kc4aCnqBmcQit")
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setSubmitted(true);
        },
        (error) => {
          console.log("try again");
          console.log(error.text);
          setLoading(false);
          setAlert(true);
        }
      )
      .then(() => {
        setForm({
          about: "web-development",
          other: "",
          subject: "",
          email: "",
          text: "",
        });
      });
  };

  const RadioForm = () => {
    return (
      <RadioGroup onChange={handleRadio} value={form.about} name="about">
        <Stack>
          <Radio value="web-development">Web Development</Radio>
          <Radio value="photography">Photography</Radio>
          <Radio value="blog">Blog</Radio>
          <Flex gap={"10px"}>
            <Radio value={"other"} />
            <Input
              type="text"
              onChange={handleChange}
              onClick={handleOther}
              value={form.other}
              placeholder="Other"
              name="other"
            />
          </Flex>
        </Stack>
      </RadioGroup>
    );
  };

  const InputForm = () => {
    return (
      <Flex direction={"column"} gap="5px">
        <FormControl isRequired>
          <Input
            value={form.email}
            onChange={handleChange}
            placeholder="*email"
            size="sm"
            name="email"
            type="email"
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            value={form.subject}
            onChange={handleChange}
            placeholder="*subject"
            size="sm"
            name="subject"
            type="text"
          />
        </FormControl>
        <FormControl isRequired>
          <Textarea
            value={form.text}
            onChange={handleChange}
            placeholder="*message"
            size="sm"
            name="text"
          />
        </FormControl>
      </Flex>
    );
  };

  const SnsForm = () => {
    return (
      <Box bg={"darkGlass.200"} p={"5px"} borderRadius="0px 0px 10px 10px">
        <Flex direction={"row"} justifyContent={"space-around"}>
          <IconButton
            aria-label="linkedin"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ bg: "#0077b5" }}
            icon={<BsLinkedin size="28px" />}
            onClick={() =>
              window.open("https://www.linkedin.com/in/dujin-kim/", "_blank")
            }
          />
          <IconButton
            aria-label="github"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ bg: "#000" }}
            icon={<BsGithub size="28px" />}
            onClick={() =>
              window.open("https://www.instagram.com/dujinkim_/", "_blank")
            }
          />
          <IconButton
            aria-label="instagram"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ bg: "#EA185A" }}
            icon={<BsYoutube size="28px" />}
            onClick={() =>
              window.open("https://www.youtube.com/channel/UCStFXv1aQMGE9r9VbzHBA_g", "_blank")
            }
          />
          <IconButton
            aria-label="strava"
            variant="ghost"
            size="lg"
            isRound={true}
            _hover={{ bg: "#fc4c02" }}
            icon={<BsStrava size="28px" />}
            onClick={() =>
              window.open("https://www.strava.com/athletes/66308223", "_blank")
            }
          />
        </Flex>
      </Box>
    );
  };

  const ErrorAlert = () => {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Message didn&apos;t send!</AlertTitle>
        <AlertDescription>Check your internet connection.</AlertDescription>
      </Alert>
    );
  };


  return (
    <Container
      bgColor={colorMode == "light" ? "neutralGreen.100" : ""}
      maxW="full"
      p={{ sm: "15px", md: "50px", lg: "100px" }}
    >
      {submitted ? (
        <Flex  flexDir="column" pt='20px' gap='20px' bg={'whiteAlpha.400'} borderRadius='xl' textAlign={"center"} w="100%">
          <Heading textAlign={"center"}>Thank you for reaching me!</Heading>
          <Text textAlign={"center"}>You can also connect with me via</Text>
          <SnsForm />
        </Flex>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            bg={colorMode == "light" ? "blackAlpha.400" : "whiteAlpha.300"}
            borderRadius="10px"
          >
            <Box
              className="left"
              w={{ md: "50%" }}
              float={{ md: "left" }}
              p="0 10px"
              color={colorMode == "light" ? "white" : "gray.400"}
            >
              <Heading fontSize="2xl" pt="5px">
                Contact
              </Heading>
              <Text>
                Email:&nbsp;
                <Link href="mailto:contact@dujinkim.com">
                  contact@dujinkim.com
                </Link>
              </Text>
              <RadioGroup
                onChange={handleRadio}
                value={form.about}
                name="about"
                mt="1rem"
                color={colorMode == "light" ? "black" : "white"}
              >
                <Text fontSize="lg">Select One</Text>
                <Stack>
                  <Radio value="web-development">Web Development</Radio>
                  <Radio value="photography">Photography</Radio>
                  <Radio value="blog">Blog</Radio>
                  <Flex gap={"10px"}>
                    <Radio value={"other"} />
                    <Input
                      type="text"
                      onChange={handleChange}
                      onClick={handleOther}
                      value={form.other}
                      placeholder="Other"
                      name="other"
                    />
                  </Flex>
                </Stack>
              </RadioGroup>{" "}
            </Box>
            <Flex
              direction={"column"}
              gap={{ sm: "5px", md: "10px" }}
              p="10px"
              justifyContent={"space-evenly"}
            >
              <FormControl isRequired>
                <Input
                  value={form.email}
                  onChange={handleChange}
                  borderColor={"white"}
                  placeholder="*email"
                  name="email"
                  type="email"
                />
              </FormControl>
              <FormControl isRequired>
                <Input
                  borderColor={"white"}
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="*subject"
                  name="subject"
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <Textarea
                  borderColor={"white"}
                  value={form.text}
                  onChange={handleChange}
                  placeholder="*message"
                  name="text"
                />
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                colorScheme={"teal"}
                h="40px"
              >
                {!loading ? "Send Message" : <Spinner />}
              </Button>
            </Flex>
            <Clear />
            {alert && <ErrorAlert />}
            <Box
              bg={"darkGlass.200"}
              p={"5px"}
              borderRadius="0px 0px 10px 10px"
              mt="10px"
            >
              <Flex direction={"row"} justifyContent={"space-around"}>
                <IconButton
                  aria-label="linkedin"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "#0077b5" }}
                  icon={<BsLinkedin size="28px" />}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/dujin-kim/",
                      "_blank"
                    )
                  }
                />
                <IconButton
                  aria-label="github"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "purple" }}
                  icon={<BsGithub size="28px" />}
                  onClick={() =>
                    window.open("https://github.com/DuLoops", "_blank")
                  }
                />
                <IconButton
                  aria-label="youtube"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "#EA185A" }}
                  icon={<BsYoutube size="28px" />}
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/channel/UCStFXv1aQMGE9r9VbzHBA_g",
                      "_blank"
                    )
                  }
                />
                <IconButton
                  aria-label="strava"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "#fc4c02" }}
                  icon={<BsStrava size="28px" />}
                  onClick={() =>
                    window.open(
                      "https://www.strava.com/athletes/66308223",
                      "_blank"
                    )
                  }
                />
              </Flex>
            </Box>{" "}
          </Box>
        </form>
      )}
    </Container>
  );
}
