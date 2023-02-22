import { HStack, Tag, Text } from "@chakra-ui/react";

const Filter = (props) => {
  return (
    <HStack m={"10px"} justifyContent="center">
      <Text>Tags filter: </Text>
      {props.tags.map((tag, index) => (
        <Tag
          key={index}
          colorScheme={props.tag == tag.id ? tag.attributes.color : "gray"}
          onClick={() => {
            props.setTag(props.tag == tag.id ? null : tag.id);
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
