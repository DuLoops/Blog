import Nav from "../../container/Nav";
import Filter from "../../components/gallery/Filter";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Box, useBoolean, useMediaQuery } from "@chakra-ui/react";
import PhotoViewerModal from "@/container/gallery/photoViewerModal";
import PhotoGrid from "@/container/gallery/PhotoGrid";
import ScrollToTopBtn from "@/components/general/ScrollToTopBtn";
import BottomNav from "@/container/BottomNav";
import Head from "next/head";

export async function getStaticProps() {
  const querySnapshot = await getDocs(collection(db, "photos"));
  const photos = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    delete data.cameraInfo;
    return data;
  });

  return {
    props: { photos },
    revalidate: false,
  };
}

const Gallery = (props) => {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useBoolean(false);
  const [showIndex, setShowIndex] = useState(0);
  const [showDetail, setShowDetail] = useBoolean(true);
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  const filterPhotos = (photos, filter) => {
    if (filter == "All") {
      return photos;
    }
    return photos.filter(
      (photo) => photo.categories[filter.toLowerCase()] === true
    );
  };

  const filteredPhotos = filterPhotos(props.photos, filter);

  return (
    <Box width="100%" overflow={"hidden"} position="relative">
      <Head>
        <title>Gallery | DuLoops</title>
      </Head>
      <Nav />
      <ScrollToTopBtn />
      <Box>
        <Filter filter={filter} setFilter={setFilter} />
        {props.photos && (
          <PhotoGrid
            photos={filteredPhotos}
            setShowIndex={setShowIndex}
            setModal={setModal}
          />
        )}
      </Box>
      {modal && (
        <PhotoViewerModal
          isOpen={modal}
          setModal={setModal}
          showIndex={showIndex}
          setShowIndex={setShowIndex}
          photos={filteredPhotos}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
        />
      )}
      {isMobile && <BottomNav current="gallery" />}
    </Box>
  );
};

export default Gallery;
