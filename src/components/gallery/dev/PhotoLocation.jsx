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
  Input,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import {
  arrayUnion,
  doc,
  GeoPoint,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { apiKey } from "../../../api/googleMapApi";
import { db } from "../../../firebase/config";

const PhotoLocation = (props) => {
  const [searchVal, setSearchVal] = useState("");
  const [location, setLocation] = useState();
  const [docID, setDocID] = useState();

  const handleSearch = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchVal.replace(
        /\s/g,
        "+"
      )}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status != "OK") {
          alert(`Error: ${data.status}`);
        } else {
          let formattedAddress = data.results[0].formatted_address;
          setLocation({
            place_id: data.results[0].place_id,
            address_components: data.results[0].address_components,
            formatted_address: formattedAddress,
            geo_point: data.results[0].geometry.location,
            title: formattedAddress.substr(0, formattedAddress.indexOf(",")),
          });
        }
      });
  };

  const addNewLocationDoc = async () => {
    await setDoc(
      doc(db, "locations", location.formatted_address),
      {
        place_id: location.place_id,
        address_components: location.address_components,
        formatted_address: location.formatted_address,
        geo_point: new GeoPoint(location.geo_point.lat, location.geo_point.lng),
        title: location.title,
      },
      { merge: true }
    ).then(() => {
      updateDoc(doc(db, "locations", location.formatted_address), {
        linkedPhotos: arrayUnion(props.photoID),
      });
    }).then(() => {
      props.dispatch({
        type: "SetTextInput",
        id: props.photoID,
        key: "location",
        value: location.formatted_address,
      });
    })
  };

  const addToExisitingDoc = async() => {
    updateDoc(doc(db, 'locations', docID), {
      linkedPhotos: arrayUnion(props.photoID),
    }).then(()=> {
      props.dispatch({
        type: "SetTextInput",
        id: props.photoID,
        key: "location",
        value: docID,
      });
    })
  }


  const handleSave = () => {
    if (!location && !docID) {
      alert("No location found");
      return;
    } else if (!location) {
      addToExisitingDoc().then(()=> {
        props.setIsOpen.off();
      })
    } else {
      addNewLocationDoc().then(() => {
        props.setIsOpen.off();
      });
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.setIsOpen.off}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
          <Button onClick={handleSearch}>Search</Button>
          {location && (
            <Box>
              <Text color={"grey"}>docID: {location.formatted_address}</Text>
              <Input
                type="text"
                value={location.title}
                onChange={(e) =>
                  setLocation((prevLocation) => ({
                    ...prevLocation,
                    title: e.target.value,
                  }))
                }
              />
            </Box>
          )}
          <Text>DOC ID</Text>
          <Input
            type="text"
            value={docID}
            onChange={(e) => setDocID(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => {
              props.setLocationData(null);
            }}
            mr={3}
          >
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PhotoLocation;
