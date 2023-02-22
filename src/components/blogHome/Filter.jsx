import {HStack, Tag, Text } from "@chakra-ui/react";

const Filter = (props) => {

  return (
    <HStack m={"10px"}  justifyContent='center'>
      <Text>Tags filter: </Text>
      {props.tags.map((tag, index) => (
        <Tag
          key={index}
          colorScheme={
            props.selectedTags.find((selectedTag) => selectedTag == tag.id)
              ? tag.attributes.color
              : "gray"
          }
          onClick={() => {
            props.setSelectedTags(
              props.selectedTags.includes(tag.id)
                ? props.selectedTags.filter(
                    (selectedTag) => selectedTag !== tag.id
                  )
                : [...props.selectedTags, tag.id]
            );
          }}
          cursor="pointer"
        >
          {tag.attributes.name}
        </Tag>
      ))}
    </HStack>
  );
};

export default Filter;
