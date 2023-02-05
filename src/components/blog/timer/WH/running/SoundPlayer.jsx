import React, { useEffect, useRef, useState } from "react";
import {
  breath,
  exhale,
  hold,
  inhale,
  beginning,
} from "@/resources/audio/timer";
import  inhale2  from "@/resources/audio/timer/inhale.mp3";
export default function SoundPlayer(props) {
  const audioRef = useRef(null);
  const [audio, setAudio] = useState(beginning);

  useEffect(() => {
    switch (props.sequence) {
      case "ready":
        setAudio(beginning);
        setTimeout(() => {
          audioRef.current.play();
        }, 2000);
        break;
      case "breath":
        setAudio(breath);
        break;
      case "exhale":
      case "exhaleLast":
        setAudio(exhale);
        break;
      case "hold":
      case "inhaleHold":
        setAudio(hold);
        break;
      case "inhale":
        setAudio(inhale);
        break;
    }
  }, [props.sequence]);

  useEffect(() => {
    if (audio != beginning) audioRef.current.play();
  }, [audio]);

  return (
    <audio ref={audioRef} src={audio} />
  );
}
