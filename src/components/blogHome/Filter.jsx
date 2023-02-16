import {HStack, Tag, Text } from "@chakra-ui/react";

const Filter = (props) => {
  return (
    <HStack m={"10px"}  justifyContent='center'>
      <Text>Tags filter: </Text>
      {props.tags.map((tag, index) => (
        <Tag
          key={index}
          colorScheme={
            props.selectedTags.find((selectedTag) => selectedTag == tag.name)
              ? tag.color
              : "gray"
          }
          onClick={() => {
            props.setSelectedTags(
              props.selectedTags.includes(tag.name)
                ? props.selectedTags.filter(
                    (selectedTag) => selectedTag !== tag.name
                  )
                : [...props.selectedTags, tag.name]
            );
          }}
          cursor="pointer"
        >
          {tag.name}
        </Tag>
      ))}
    </HStack>
  );
};

export default Filter;
