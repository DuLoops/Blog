import { useState } from "react";
import useTags from "../../hooks/admin/useTags";
import { Box, Flex, Radio, RadioGroup, Text } from "@chakra-ui/react";
export default function BlogInputTags(props) {
  const tags = useTags();

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      props.setSelectedTags((prevTags) => [...prevTags, value]);
    } else {
      props.setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== value));
    }
  };
  
  return (
    <Flex flexDir="column">
      <Text>Tags</Text>
      {tags.map((tag, index) => (
        <Box key={index}>
          <input
            type="checkbox"
            value={tag.name}
            onChange={handleChange}
            key={index}
          />{" "}
          {tag.name}
        </Box>
      ))}
    </Flex>
  );
}
