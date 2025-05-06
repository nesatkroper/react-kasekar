import React, { useRef, useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, Trash2, ImageIcon, Save } from "lucide-react";
import { showToast } from "@/components/app/toast";
import PropTypes from "prop-types";

const MAX_IMAGES = 5;
const WIDTH = 1920;
const HEIGHT = 1080;

export const CameraCapture = ({ onGetImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  const handlePassImage = () => {
    onGetImage(images);
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: WIDTH, height: HEIGHT },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        await videoRef.current.play();
        setCameraActive(true);
        showToast("Camera started", "success", false, {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError(error.message || "Could not access camera");
      showToast("Camera Error", "error");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (images.length >= MAX_IMAGES) {
      showToast("Maximum images reached", "warning");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT);

    const imageData = canvas.toDataURL("image/webp", 0.9);
    setImages((prev) => [...prev, imageData]);

    showToast("Image captured", "success", false, {
      duration: 5000,
    });
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
    showToast("Image deleted", "success", false, {
      duration: 5000,
    });
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  };

  return (
    <div className='space-y-6'>
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <Button variant='outline' className='flex items-center gap-2'>
            <Camera className='h-4 w-4' />
            <span>Open Camera</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='sm:max-w-md p-4'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-md'>
              Camera Capture
            </AlertDialogTitle>
            {cameraError ? (
              <div className='bg-red-50 p-4 rounded-md text-red-600'>
                <p className='font-medium'>Camera Error</p>
                <p className='text-sm'>{cameraError}</p>
                <Button
                  variant='outline'
                  className='mt-2'
                  onClick={startCamera}>
                  Try Again
                </Button>
              </div>
            ) : (
              <div className='relative bg-black rounded-md overflow-hidden'>
                <video
                  ref={videoRef}
                  className='w-full h-auto'
                  autoPlay
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  width={WIDTH}
                  height={HEIGHT}
                  className='hidden'
                />
              </div>
            )}
          </AlertDialogHeader>

          {images.length > 0 && (
            <div className='space-y-4'>
              <h3 className='text-base font-medium'>
                Captured Images ({images.length}/{MAX_IMAGES})
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                {images.map((img, idx) => (
                  <div key={idx} className='relative group'>
                    <img
                      src={img || "/placeholder.svg"}
                      className='w-full h-auto aspect-video object-cover rounded-md border border-gray-200'
                      alt={`Captured ${idx + 1}`}
                    />
                    <Button
                      variant='destructive'
                      size='icon'
                      className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
                      onClick={() => deleteImage(idx)}>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AlertDialogFooter className='flex-col sm:flex-row gap-2'>
            <AlertDialogCancel>Close</AlertDialogCancel>
            {cameraActive ? (
              <>
                <Button
                  variant='destructive'
                  onClick={stopCamera}
                  className='w-full sm:w-auto'>
                  <X className='h-4 w-4 mr-2' />
                  Stop Camera
                </Button>
                {images.length >= 5 ? (
                  ""
                ) : (
                  <Button
                    onClick={captureImage}
                    disabled={images.length >= MAX_IMAGES}
                    className='w-full sm:w-auto'>
                    <ImageIcon className='h-4 w-4 mr-2' />
                    Capture ({images.length}/{MAX_IMAGES})
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant='default'
                onClick={startCamera}
                className='w-full sm:w-auto bg-blue-500'>
                <Camera className='h-4 w-4 mr-2' />
                Start Camera
              </Button>
            )}
            {images.length >= 5 ? (
              <Button onClick={() => handlePassImage}>
                <Save /> Save
              </Button>
            ) : (
              ""
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

CameraCapture.propTypes = {
  onGetImage: PropTypes.func,
};
