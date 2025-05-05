export const compressToWebP = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
  
      reader.onload = (e) => {
        const img = new Image()
        img.src = e.target.result
  
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 1920
          const MAX_HEIGHT = 1080
  
          let { width, height } = img
  
          // Resize proportionally
          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height)
            width *= ratio
            height *= ratio
          }
  
          canvas.width = width
          canvas.height = height
  
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
  
          const webpData = canvas.toDataURL('image/webp', 0.8) // 80% quality
          resolve(webpData)
        }
      }
  
      reader.readAsDataURL(file)
    })
  }
  