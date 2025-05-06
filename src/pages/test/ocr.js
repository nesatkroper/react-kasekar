"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { createWorker } from "tesseract.js"
import { Loader2, Upload, FileText, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface ExtractedData {
  name?: string
  idNumber?: string
  dateOfBirth?: string
  expiryDate?: string
  address?: string
  [key: string]: string | undefined
}

export function IdCardScanner() {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [extractedText, setExtractedText] = useState("")
  const [extractedData, setExtractedData] = useState<ExtractedData>({})
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    setExtractedText("")
    setExtractedData({})

    const file = acceptedFiles[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setError("Please upload a valid image file")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  })

  const processImage = async () => {
    if (!image) return

    setIsProcessing(true)
    setProgress(0)
    setError(null)

    try {
      const worker = await createWorker({
        logger: (progress) => {
          if (progress.status === "recognizing text") {
            setProgress(progress.progress * 100)
          }
        },
      })

      await worker.loadLanguage("eng")
      await worker.initialize("eng")
      const {
        data: { text },
      } = await worker.recognize(image)
      setExtractedText(text)

      // Parse the extracted text to find ID card information
      const extractedInfo = parseIdCardText(text)
      setExtractedData(extractedInfo)

      await worker.terminate()
    } catch (err) {
      setError("Error processing image. Please try again.")
      console.error(err)
    } finally {
      setIsProcessing(false)
      setProgress(100)
    }
  }

  const parseIdCardText = (text: string): ExtractedData => {
    const data: ExtractedData = {}

    // Common ID card patterns
    const idNumberPattern = /\b(?:ID|No|Number)[.:# ]?[ ]?([A-Z0-9-]{6,12})\b/i
    const dobPattern = /\b(?:DOB|Date of Birth|Birth Date)[.:# ]?[ ]?([0-9]{1,2}[/.-][0-9]{1,2}[/.-][0-9]{2,4})\b/i
    const expiryPattern = /\b(?:Expiry|Expiration|Exp)[.:# ]?[ ]?([0-9]{1,2}[/.-][0-9]{1,2}[/.-][0-9]{2,4})\b/i
    const namePattern = /\b(?:Name)[.:# ]?[ ]?([A-Z][a-z]+ [A-Z][a-z]+)\b/i

    // Extract ID number
    const idNumberMatch = text.match(idNumberPattern)
    if (idNumberMatch && idNumberMatch[1]) {
      data.idNumber = idNumberMatch[1]
    }

    // Extract date of birth
    const dobMatch = text.match(dobPattern)
    if (dobMatch && dobMatch[1]) {
      data.dateOfBirth = dobMatch[1]
    }

    // Extract expiry date
    const expiryMatch = text.match(expiryPattern)
    if (expiryMatch && expiryMatch[1]) {
      data.expiryDate = expiryMatch[1]
    }

    // Extract name (this is more complex and might need refinement)
    const nameMatch = text.match(namePattern)
    if (nameMatch && nameMatch[1]) {
      data.name = nameMatch[1]
    }

    // Try to find address (usually multi-line and complex)
    const lines = text.split("\n")
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/\b(?:Address|Addr)[.:# ]?\b/i) && i + 1 < lines.length) {
        data.address = lines[i + 1].trim()
        break
      }
    }

    return data
  }

  const resetAll = () => {
    setImage(null)
    setExtractedText("")
    setExtractedData({})
    setError(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ID Card Scanner</CardTitle>
        <CardDescription>Upload an ID card image to extract information using OCR</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!image ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="text-lg font-medium">
                {isDragActive ? "Drop the image here" : "Drag & drop an ID card image, or click to select"}
              </p>
              <p className="text-sm text-gray-500">Supports JPG, JPEG, PNG</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-background">
              <img src={image || "/placeholder.svg"} alt="ID Card Preview" className="h-full w-full object-contain" />
            </div>

            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                  <p>Processing image... This may take a few seconds</p>
                </div>
                <Progress value={progress} className="h-2 w-full" />
              </div>
            ) : extractedText ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4" />
                    Extracted Information
                  </h3>

                  {Object.keys(extractedData).length > 0 ? (
                    <div className="grid gap-2">
                      {Object.entries(extractedData).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 gap-2 py-1 border-b last:border-0">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                          <span className="col-span-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No structured information could be extracted. Try adjusting the image or using a clearer photo.
                    </p>
                  )}
                </div>

                <details className="text-sm">
                  <summary className="cursor-pointer font-medium">View Raw OCR Text</summary>
                  <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-muted p-4 text-xs">{extractedText}</pre>
                </details>
              </div>
            ) : (
              <Button onClick={processImage} className="w-full">
                Extract Information
              </Button>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetAll}>
          Reset
        </Button>
        {image && !isProcessing && !extractedText && <Button onClick={processImage}>Extract Information</Button>}
      </CardFooter>
    </Card>
  )
}
