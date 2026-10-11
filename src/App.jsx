import React, { Component } from 'react'
import './styles.css'
import { SearchBar } from './components/SearchBar'
import { ImageGallery } from './components/ImageGallery'
import { Button } from './components/Button'
import { ImageGalleryItem } from './components/ImageGalleryItem'
import { fetchImages } from './services/galleryResp'
import Modal from './components/Modal'
import { Loader } from './components/Loader'
export default class App extends Component {
  state = {
    query: '',
    gallery: [],
    page: 1,
    error:null,
    status: 'idle',
    isOpen: false,
    selectedImage: null,
  }
  handleSearch = async query => {
    this.setState({
      status: "pending",
      query,
      page:1
    })
    try {
      const data =await fetchImages(query, 1);
      this.setState({
        gallery: data.hits,
        status: "resolved",
      })
    } catch (error) {
      this.setState({error:error.message,status:"rejected"})
    }
  }
  handleToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }
  handleOpen = e => {
    const image = e.target.closest('.imageGalleryItem-image');
    if (!image) return;
    const selectedImage = this.state.gallery.find(
      item => item.id === Number(image.dataset.id)
    );
    if (!selectedImage) return;
    this.setState({
      isOpen: true,
      selectedImage,
    });
  };
  handleLoadMore =async () => {
    const { query, page, gallery } = this.state;
    const nextPage = page + 1;
    console.log(nextPage);
    
    try {
      const images = await fetchImages(query, nextPage);
      this.setState({
        gallery: [...gallery, ...images.hits],
        page: nextPage
      });
    } catch (error) {
      this.setState({
        error: error.message,
      })
    }
  }
  render() {
    const { status, isOpen, gallery,selectedImage,error } = this.state;
    if (status === "pending") {
      return (
        <Loader/>
      )
    }
    if (status === "resolved") {
      return (
        <div>
          <SearchBar onSubmit={this.handleSearch} />
          <ImageGallery gallery={gallery} onClick={this.handleOpen} />
          <Button onLoad={this.handleLoadMore} />
          {isOpen && (
            <Modal onClose={this.handleToggle}>
              <img
                className="modal"
                src={selectedImage?.largeImageURL}
                alt={selectedImage?.tags}
              />
            </Modal>
          )}
        </div>
      );
    }
    if (status === "rejected") {
      return (
        <div>
          <SearchBar onSubmit={this.handleSearch} />
          {/* // <h1>Помилка запиту,введіть дійсний запит</h1> */}
          <h1>{error}</h1>
        </div>
      )
    }
    if (status === "idle") {
      return (
        <div>
          <SearchBar onSubmit={this.handleSearch} />
          <h1>Введіть назву картинок</h1>
        </div>
      );
    }
  }
  
}
