import React, { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, FileText, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PropTypes from "prop-types";

const ImageGallery = ({ images, showAddressInfo = false, addresses = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (images?.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-lg border border-dashed'>
        <FileText className='h-10 w-10 text-muted-foreground mb-4' />
        <h3 className='text-lg font-medium mb-2'>No Images Available</h3>
        <p className='text-sm text-muted-foreground max-w-md'>
          There are no images available for this selection. Upload new images to
          see them here.
        </p>
        <Button variant='outline' className='mt-4'>
          <FileText className='mr-2 h-4 w-4' />
          Upload Images
        </Button>
      </div>
    );
  }

  const getAddressInfo = (addressId) => {
    const address = addresses?.find((addr) => addr.addressId === addressId);
    return address
      ? `${address.city?.name || "Unknown"}, ${
          address.state?.name || "Unknown"
        }`
      : "Unknown location";
  };

  const getImageTypeColor = (type) => {
    if (!type)
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";

    switch (type.toLowerCase()) {
      case "exterior":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "interior":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "document":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {images.map((image) => (
          <div
            key={image.imageId}
            className='group relative aspect-square rounded-md overflow-hidden border cursor-pointer shadow-sm transition-all hover:shadow-md'
            onClick={() => setSelectedImage(image)}>
            <image
              src={image.imageUrl || "/placeholder.svg"}
              alt={`Image ${image.imageType || ""}`}
              className='object-cover transition-transform group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity p-3'>
              <div className='w-full'>
                {image.imageType && (
                  <Badge
                    variant='outline'
                    className={`mb-1 ${getImageTypeColor(image.imageType)}`}>
                    {image.imageType}
                  </Badge>
                )}
                {showAddressInfo && (
                  <div className='text-white text-xs flex items-center gap-1 mt-1.5'>
                    <MapPin className='h-3 w-3' />
                    <span className='truncate'>
                      {getAddressInfo(image.addressId)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className='max-w-4xl'>
          {selectedImage && (
            <div className='space-y-4'>
              <div className='relative h-[60vh] w-full bg-muted/30 rounded-md overflow-hidden'>
                <image
                  src={selectedImage.imageUrl || "/placeholder.svg"}
                  alt={`Image ${selectedImage.imageType || ""}`}
                  className='object-contain'
                />
              </div>

              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div className='space-y-2'>
                  {selectedImage.imageType && (
                    <Badge
                      variant='outline'
                      className={getImageTypeColor(selectedImage.imageType)}>
                      {selectedImage.imageType}
                    </Badge>
                  )}
                  {showAddressInfo && (
                    <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                      <MapPin className='h-4 w-4' />
                      <span>{getAddressInfo(selectedImage.addressId)}</span>
                    </div>
                  )}
                </div>

                <div className='flex items-center gap-2'>
                  <Button variant='outline' size='sm'>
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-destructive hover:text-destructive'>
                    <Trash2 className='mr-2 h-4 w-4' />
                    Delete
                  </Button>
                </div>
              </div>

              <Separator />

              <div className='flex items-center justify-between text-sm text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    Added: {format(selectedImage.createdAt, "MMMM d, yyyy")}
                  </span>
                </div>
                <div>
                  <span>Image ID: </span>
                  <span className='font-mono'>{selectedImage.imageId}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  showAddressInfo: PropTypes.bool,
  addresses: PropTypes.array,
};

export default ImageGallery;
