import React, { useEffect, useRef, useState } from "react";
export default function SoundPlayer(props) {
  const audioRef = useRef(null);
  const [audio, setAudio] = useState(beginning);

  useEffect(() => {
    switch (props.sequence) {
      case "ready":
        setAudio('/audio/timer/beginning.mp3');
        setTimeout(() => {
          audioRef.current.play();
        }, 2000);
        break;
      case "breath":
        setAudio('/audio/timer/breath.mp3');
        break;
      case "exhale":
      case "exhaleLast":
        setAudio('/audio/timer/exhale.mp3');
        break;
      case "hold":
      case "inhaleHold":
        setAudio('/audio/timer/hold.mp3');
        break;
      case "inhale":
        setAudio('/audio/timer/inhale.mp3');
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
