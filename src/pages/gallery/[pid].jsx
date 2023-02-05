import Image from "next/image";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Nav from "../../container/Nav";
import { Box, useBoolean } from "@chakra-ui/react";
import PhotoDetail from "../../components/gallery/PhotoDetail";
import GalleryController from "@/components/gallery/GalleryController";
import Head from "next/head";
export async function getServerSideProps({ params }) {
  const photoID = params.pid;
  const docRef = doc(db, "photos", photoID.replace(/ /g, "%20"));
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    data.cameraInfo.date = data.cameraInfo.date.toDate().toString();
    return { props: data };
  } else {
    return null;
  }
}

const PhotoViewer = (props) => {
  const [showDetail, setShowDetail] = useBoolean(true);

  return (
    <Box position={"relative"} h="100vh">
      <Head>
        <title>Gallery | DuLoops</title>
      </Head>
      <Nav />
      <Box h={showDetail ? "75vh" : "90vh"} maxW="100vw" position={"relative"}>
        <Image src={props.file} alt={props.title} fill objectFit="contain" />
      </Box>
      {showDetail && <PhotoDetail photo={props} />}
      <GalleryController
        showDetail={showDetail}
        setShowDetail={setShowDetail}
      />
    </Box>
  );

  // return <Image src={pid} alt={pid} width='100' height='100'/>;
};

export default PhotoViewer;
