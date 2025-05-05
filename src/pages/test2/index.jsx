import React, { useRef, useState } from 'react'

const MAX_IMAGES = 5
const WIDTH = 1920
const HEIGHT = 1080 // Landscape mode

const CameraCapture = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [images, setImages] = useState([])

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: WIDTH, height: HEIGHT }
    })
    videoRef.current.srcObject = stream
    videoRef.current.play()
  }

  const captureImage = () => {
    if (images.length >= MAX_IMAGES) {
      alert('Maximum 5 images allowed')
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT)

    const imageData = canvas.toDataURL('image/webp', 0.9) // compress WebP
    setImages(prev => [...prev, imageData])
  }

  return (
    <div>
      <video
        ref={videoRef}
        width={WIDTH / 4}
        height={HEIGHT / 4}
        style={{ border: '1px solid #333' }}
        autoPlay
      />

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ display: 'none' }}
      />

      <div style={{ margin: '10px 0' }}>
        <button onClick={startCamera}>📷 Start Camera</button>
        <button onClick={captureImage}>🖼️ Capture</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            width={240}
            style={{ borderRadius: 4 }}
            alt={`Captured ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default CameraCapture
