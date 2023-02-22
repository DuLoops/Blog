import React, { useEffect, useRef, useState } from "react";

const audioPath = {
  beginning: "/audio/beginning.mp3",
  breath: "/audio/breath.mp3",
  exhale: "/audio/exhale.mp3",
  hold: "/audio/hold.mp3",
  inhale: "/audio/inhale.mp3",
};
export default function SoundPlayer(props) {
  const audioRef = useRef(null);
  const [audio, setAudio] = useState(audioPath.beginning);

  useEffect(() => {
    switch (props.sequence) {
      case "ready":
        setAudio(audioPath.beginning);
        setTimeout(() => {
          audioRef.current.play();
        }, 2000);
        break;
      case "breath":
        setAudio(audioPath.breath);
        break;
      case "exhale":
      case "exhaleLast":
        setAudio(audioPath.exhale);
        break;
      case "hold":
      case "inhaleHold":
        setAudio(audioPath.exhale);
        break;
      case "inhale":
        setAudio(audioPath.breath);
        break;
      case "paused":
        if (audioRef.current) audioRef.current.pause();
        break;
    }
  }, [props.sequence]);

  useEffect(() => {
    if (audio != audioPath.beginning) audioRef.current.play();
  }, [audio]);

  return <audio ref={audioRef} src={audio} />;
}
