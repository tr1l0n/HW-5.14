import React from 'react'

export const ImageGalleryItem = (item) => {
  return (
    <li className="gallery-item" id={item.id}>
      <img src={item.webformatURL} alt="image" />
    </li>
  );
}


