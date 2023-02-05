import {
  Box,
  Input,
  Text,
  Flex,
  Button,
  useBoolean,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState, useReducer } from "react";

import PhotoUploadInfo from "../../components/gallery/dev/PhotoUploadInfo";
import uploadFile from "../../hooks/uploadFile";
import {
  doc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import EXIF from "exif-js";
const PhotoUploader = (props) => {
  const [uploading, setUploading] = useBoolean(false);

  const InitialPhotos = props.photos.map((photo) => {
    // console.log(EXIF.getData(photo));
    // EXIF.getData(photo,(data)=>{console.log(EXIF.getAllTags(data))})
    let cameraInfo = {};
    function parseDate(s) {
      var b = s.split(/\D/);
      return new Date(b[0],b[1]-1,b[2],b[3],b[4],b[5]);
    }
    EXIF.getData(photo, function () {
      let data = EXIF.getAllTags(this);
      if(!data.DateTimeOriginal || data.ExposureTime) return;
      cameraInfo.date = parseDate(data.DateTimeOriginal);
      cameraInfo.aperature = Math.round(data.FNumber*10)/10;
      cameraInfo.exposure = [data.ExposureTime.numerator, data.ExposureTime.denominator ]; 
      cameraInfo.iso = data.ISOSpeedRatings
      cameraInfo.focalLength = data.FocalLength.numerator /data.FocalLength.denominator;
      cameraInfo.camera =
        data.Model == "ILCE-6000"
          ? "Sony Alpha-6000"
          : data.Model;
        });
    return ({
      file: photo,
      id: encodeURI(
        photo.name.replace(/\.[^/.]+$/, "").concat(photo.lastModified)
      ),
      title: photo.name.replace(/\.[^/.]+$/, ""),
      desc: "",
      links: [],
      location: null,
      categories: {
        all: true,
        adventure: false,
        landscape: false,
        sports: false,
        life: false,
        architecture: false,
        products: false,
      },
      cameraInfo: cameraInfo,
    })
  });

  const reducer = (state, action) => {
    switch (action.type) {
      case "SetCategory":
        return state.map((photo) => {
          if (photo.id === action.id) {
            return {
              ...photo,
              categories: {
                ...photo.categories,
                [action.category]: action.value,
              },
            };
          } else {
            return photo;
          }
        });
      //TextInput includes title, desc, date, and address
      case "SetTextInput":
        return state.map((photo) => {
          if (photo.id === action.id) {
            return { ...photo, [action.key]: action.value };
          } else {
            return photo;
          }
        });
      case "InsertLink":
        return state.map((photo) => {
          if (photo.id === action.id) {
            return { ...photo, links: photo.links.concat(action.value) };
          } else {
            return photo;
          }
        });
      case "RemoveLink":
        return state.map((photo) => {
          if (photo.id === action.id) {
            return {
              ...photo,
              links: photo.links.filter((link) => link != action.value),
            };
          } else {
            return photo;
          }
        });
      case "UploadFile":
        return state.map((photo) => {
          if (photo.id === action.id) {
            return {
              ...photo,
              file: action.value,
            };
          } else {
            return photo;
          }
        });
      case "Remove":
        return state.filter((photo) => photo.id !== action.id);

      default:
        return state;
    }
  };

  const [photos, dispatch] = useReducer(reducer, InitialPhotos);

  const handleUpload = async () => {
    setUploading.on();

    const requests = photos.map(async (photo) => {
      let filePath = await uploadFile("photos", photo.file);
      setDoc(doc(db, "photos", photo.id), { ...photo, file: filePath });
    });

    Promise.all(requests).then(() => {
      props.setPhotos(null);
      alert("Beautiful pictures! :D");
    });
  };

  return (
    <Box p="20px">
      {uploading ? (
        <Box>
          <Text>
            Uploading <Spinner color="red" />
          </Text>
        </Box>
      ) : (
        <>
          <Flex gap={"10px"} m="0">
            {photos.map((photo, index) => {
              return (
                <PhotoUploadInfo
                  photo={photo}
                  dispatch={dispatch}
                  key={index}
                />
              );
            })}
          </Flex>
          <Button colorScheme={"green"} onClick={handleUpload}>
            Upload
          </Button>
        </>
      )}
    </Box>
  );
};

export default PhotoUploader;
