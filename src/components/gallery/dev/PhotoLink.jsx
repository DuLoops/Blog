import {
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  useBoolean,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { db } from "../../../firebase/config";
import { doc, getDocs, collection, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from "react";

const PhotoLink = (props) => {
  const [selectedLink, setSelectedLink] = useState("test");
  const [linkDocs, setLinkDocs] = useState([]);
  const [createNewLink, setCreateNewLink] = useBoolean();
  const [newLink, setNewLink] = useState({
    docID: "",
    linkName: "",
    linkAddress: "",
    linkedPhotos: [props.photoID],
  });

  const loadLinkDocs = async () => {
    const querySnapshot = await getDocs(collection(db, "links"));
    setLinkDocs(querySnapshot.docs);
  };

  const addNewLinkDoc = async () => {
    await setDoc(doc(db, "links", newLink.docID), {
      linkName: newLink.linkName,
      linkAddress: newLink.linkAddress,
      availability: true,
      linkedPhotos: newLink.linkedPhotos,
    });
  };

  const updateLinkDoc = async () => {
    await updateDoc(doc(db, 'links', selectedLink), {
      linkedPhotos: arrayUnion(props.photoID)
    })
  }

  useEffect(() => {
    loadLinkDocs();
  }, []);

  const handleNewLinkChange = (e) => {
    setNewLink({ ...newLink, [e.target.name]: e.target.value });
  };

  const handleNewLink = (e) => {
    e.preventDefault();
    addNewLinkDoc().then(() => {
      props.dispatch({
        type: "InsertLink",
        id: props.photoID,
        value: newLink.docID
      });
    });
    props.setIsOpen.off();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLinkDoc().then(
      () => {
        props.dispatch({
          type: "InsertLink",
          id: props.photoID,
          value: selectedLink
        });
        props.setIsOpen.off();
      }
    );
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.setIsOpen.off}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Link</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {linkDocs && (
            <Select
              onChange={(e) => {
                setSelectedLink(e.target.value);
              }}
              value={selectedLink}
            >
              {linkDocs.map((doc, index) => {
                return <option value={doc.id} key={index}>{doc.id}</option>;
              })}
            </Select>
          )}
          <Button onClick={setCreateNewLink.toggle}>
            {createNewLink ? "Cance new link" : "Create new link"}
          </Button>
          {createNewLink && (
            <form onSubmit={handleNewLink}>
              <FormLabel>Doc Name</FormLabel>
              <Input
                type={"text"}
                name={"docID"}
                value={newLink.docID}
                onChange={handleNewLinkChange}
                required
              />
              <FormLabel>Link Name</FormLabel>
              <Input
                type={"text"}
                name={"linkName"}
                value={newLink.linkName}
                onChange={handleNewLinkChange}
                required
              />
              <FormLabel>Link Address</FormLabel>
              <Input
                type={"text"}
                name={"linkAddress"}
                value={newLink.linkAddress}
                onChange={handleNewLinkChange}
                required
              />
              <Button type={"submit"}>Add Link</Button>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.setIsOpen.off}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add Link
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhotoLink;
