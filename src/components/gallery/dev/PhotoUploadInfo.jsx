import { useState, useImperativeHandle, forwardRef } from "react";
import {
  Box,
  FormLabel,
  Image,
  Input,
  Text,
  Stack,
  Checkbox,
  Button,
  UnorderedList,
  ListItem,
  useBoolean,
  CloseButton,
} from "@chakra-ui/react";
import PhotoLink from "./PhotoLink";
import PhotoLocation from "./PhotoLocation";
import { arrayRemove, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import PhotoDisplayLinks from "./PhotoDisplayLinks";
const PhotoUploadInfo = (props) => {
  const [isLocationOpen, setIsLocationOpen] = useBoolean();
  const [isLinkOpen, setIsLinkOpen] = useBoolean();

  const handleTextChange = (e) => {
    props.dispatch({
      type: "SetTextInput",
      id: props.photo.id,
      key: e.target.name,
      value: e.target.value,
    });
  };

  const handleRemove = () => {
    props.dispatch({
      type: "Remove",
      id: props.photo.id,
    });
  }

  return (
    <Box w="200px" backgroundColor="darkGlass.100" p="5px" position={'relative'}>
      <Image
        src={URL.createObjectURL(props.photo.file)}
        alt={props.photo.name}
      />
      <form>
        <FormLabel>Category</FormLabel>
        <Stack>
          {Object.keys(props.photo.categories).map((key, index) => {
            return (
              <Checkbox
                isChecked={props.photo.categories[key]}
                key={index}
                onChange={(e) =>
                  props.dispatch({
                    type: "SetCategory",
                    id: props.photo.id,
                    value: e.target.checked,
                    category: key,
                  })
                }
              >
                {key}
              </Checkbox>
            );
          })}
        </Stack>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          type={"text"}
          value={props.photo.title}
          onChange={handleTextChange}
        />
        <FormLabel>Description</FormLabel>
        <Input
          name="desc"
          type={"text"}
          value={props.photo.desc}
          onChange={handleTextChange}
        />

        <FormLabel>Location</FormLabel>
        {props.photo.location && <Text>{props.photo.location}</Text>}
        <Button onClick={setIsLocationOpen.on}>Set Location</Button>
        {isLocationOpen && (
          <PhotoLocation
            isOpen={isLocationOpen}
            setIsOpen={setIsLocationOpen}
            photoID={props.photo.id}
            dispatch={props.dispatch}
          />
        )}
        <FormLabel>Links</FormLabel>
        {props.photo.links && (
          <PhotoDisplayLinks
            links={props.photo.links}
            photoID = {props.photo.id}
            dispatch={props.dispatch}
          />
        )}
        <Button onClick={setIsLinkOpen.on}>Add Links</Button>
        {isLinkOpen && (
          <PhotoLink
            isOpen={isLinkOpen}
            setIsOpen={setIsLinkOpen}
            photoID={props.photo.id}
            dispatch={props.dispatch}
          />
        )}
        <Button onClick={handleRemove} color='red' position={'absolute'} right='0' bottom='0' size='sm'>Remove</Button>
      </form>
    </Box>
  );
};

export default PhotoUploadInfo;
