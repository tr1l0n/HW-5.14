import React from 'react'
import "../styles.css";
export const ImageGalleryItem = ({ item }) => {
  return (
    <li className="imageGalleryItem" id={item.id}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        data-id={item.id}
        className="imageGalleryItem-image"
      />
    </li>
  );
}


