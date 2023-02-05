import { Progress } from "@chakra-ui/react";
import { useEffect } from "react";
import useStorage from "../../../hooks/uploadFile";
import { dnd } from "../../../resources/images/dev/portfolio";

const ProgressBar = ({file, setImgUrl}) => {
  const {url, progress} = useStorage(file);
  useEffect(() => {setImgUrl(url)}, [url]);
  return (
    <Progress value={progress}/>
  )
}

export default ProgressBar;
