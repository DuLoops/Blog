import { UnorderedList, ListItem, Button } from "@chakra-ui/react";
import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebase/config";

const PhotoDisplayLinks = (props) => {
  const removeLinkDoc = async (link) => {
    await updateDoc(doc(db, "links", link), {
      linkedPhotos: arrayRemove(props.photoID),
    });
  };

  return (
    <UnorderedList>
      {props.links.map((link, index) => {
        return (
          <ListItem key={index}>
            {link}
            <Button
              colorScheme={"red"}
              size="xs"
              onClick={() => {
                props.dispatch({
                  type: "RemoveLink",
                  id: props.photoID,
                  value: link,
                });
                removeLinkDoc(link);
              }}
            >
              X
            </Button>
          </ListItem>
        );
      })}
    </UnorderedList>
  );
};

export default PhotoDisplayLinks;
