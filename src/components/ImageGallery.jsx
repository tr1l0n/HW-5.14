import React from 'react'
import { ImageGalleryItem } from './ImageGalleryItem'
export const ImageGallery = ({ gallery, onClick }) => {
  return (
      <ul className="gallery" onClick={onClick}>
          {gallery.map(item => (
              <ImageGalleryItem item={item} />
          ))}
    </ul>
  )
}

