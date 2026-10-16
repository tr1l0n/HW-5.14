import React from 'react'
import '../styles.css'
import { ImageGalleryItem } from './ImageGalleryItem'
export const ImageGallery = ({ gallery, onClick }) => {
  return (
      <ul className="imageGallery" onClick={onClick}>
          {gallery.map(item => (
              <ImageGalleryItem item={item} />
          ))}
    </ul>
  )
}

