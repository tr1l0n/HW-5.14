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
    totalHits: null,
    gallery: [],
    page: 1,
    error: null,
    status: 'idle',
    isOpen: false,
    selectedImage: null,
  }
  componentDidUpdate = async ( prevProps, prevState) => {
    if (prevState.query !== this.state.query) {
      try {
        const resp = await this.handleFetch(this.state.query); 
        this.setState({
          gallery: resp.hits,
          totalHits: resp.totalHits,
          status: "resolved",
        })
      } catch (error) {
        this.setState({ error: error.message, status: "rejected" });
      }
    }
  }
  
  handleFetch = async (query) => {
    return await fetchImages(query);
  }
  handleSearch = async query => {
    if (query === this.state.query) {
      alert('введи новий запит');
      return;
    }
    this.setState({
      status: "pending",
      query,
      page: 1
    })
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
  handleLoadMore = async () => {
    const { query, page, gallery} = this.state;
    const nextPage = page + 1;
    try {
      const images = await fetchImages(query, page);
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
    const { status, isOpen, gallery, selectedImage, error,page,totalHits} = this.state;
    const isAllImageLoaded = page === Math.ceil(totalHits / 12);
    if (status === "pending") {
      return (
        <div className='loader'>
          <Loader />
        </div>
      );
    }
    if (status === "resolved" && gallery.length === 0) {
      return (
        <div>
          <SearchBar onSubmit={this.handleSearch} />
          <h1>Картинок за таким запитом немає,введіть інший запит,будь ласка</h1>
        </div>
      );
    }
    if (status === "resolved") {
      return (
        <div>
          <SearchBar onSubmit={this.handleSearch} />
          <ImageGallery gallery={gallery} onClick={this.handleOpen} />
          {!isAllImageLoaded && (
            <Button onLoad={this.handleLoadMore} />
          )}
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
