import React, { useCallback, useRef, useState } from "react";
import Layout from "@/layout/layout";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { showLoadingToast } from "@/components/app/loading/toast-loading";
import { toast } from "sonner";
import Map from "@/components/app/map";
import ClickableMap from "@/components/app/map/getmap";
import useTextToSpeech from "@/hooks/use-text2speech";

const Test = () => {
  const webcamRef = useRef(null);
  const [isOpen, setIsopen] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const [text, setText] = useState("Recive 10$ from your friend។");
  const {
    voices,
    selectedVoice,
    setSelectedVoice,
    isSpeaking,
    speak,
    stop,
    settings,
    setSettings,
  } = useTextToSpeech();

  const handleSpeak = () => {
    speak(text);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const testToast = async () => {
    const toastId = showLoadingToast({
      title: "Loading",
      desc: "Please wait",
      actionLabel: "Cancel",
    });

    setTimeout(() => {
      toast.dismiss(toastId);
    }, 5000);
  };
  return (
    <Layout>
      <Button onClick={handleSpeak}>Button</Button>
      {/* <Map
        lat={13.3632533}
        lng={103.856403}
        location='11.91215142287882, 105.98684885006485'
      /> */}
      {/* <ClickableMap /> */}
      {/* <Button onClick={() => testToast()}>Button</Button> */}
      {/* <div className='flex gap-4'>
        <Button onClick={() => setIsopen(!isOpen)}>
          {isOpen ? "Close Camera" : "Open Camera"}
        </Button>
        <Button onClick={capture}>Capture photo</Button>
      </div>
      {isOpen ? (
        <div className='w-96'>
          <Webcam
            ref={webcamRef}
            audio={true}
            screenshotFormat='image/png'
            videoConstraints={videoConstraints}
          />
        </div>
      ) : (
        ""
      )}{" "}
      {imgSrc && <img className='w-96' src={imgSrc} />} */}
    </Layout>
  );
};

export default Test;
