import React from 'react'
import "../styles.css";
export const ImageGalleryItem = ({ item }) => {
  return (
    <li className="gallery-item" id={item.id}>
      <img src={item.webformatURL} alt="image" id='image'/>
    </li>
  );
}


