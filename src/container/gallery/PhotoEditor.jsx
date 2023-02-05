import { Box, Heading, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
const PhotoEditor = () => {

  const photoDocs = [];
  const [viewIndex, setViewIndex] = useState(10);

  const getDoc = async () => {
    const q = query(collection(db, "photos"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) => {
      photoDocs.push(doc.data());
    });
  };

  useEffect(() => {
    getDoc();
  }, []);

  return (
    <Box>
      <Heading color={"whtie"}>Edit photo details</Heading>
      
      <Button onClick={() => setViewIndex(prev=>(prev+10))}>Load more</Button>
    </Box>
  );
};

export default PhotoEditor;
