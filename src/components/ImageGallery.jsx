import React from 'react'
import '../styles.css'
import { ImageGalleryItem } from './ImageGalleryItem'
export const ImageGallery = ({ gallery, onClick }) => {
    console.log(gallery);
    
  return (
      <ul className="gallery" onClick={onClick}>
          {gallery.map(item => (
              <ImageGalleryItem item={item} />
          ))}
    </ul>
  )
}

