import React, { Component } from 'react'
import './styles.css'
import { SearchBar } from './components/SearchBar'
import { ImageGallery } from './components/ImageGallery'
import { Button } from './components/Button'
import { ImageGalleryItem } from './components/ImageGalleryItem'
import { fetchImages } from './services/galleryResp'
export default class App extends Component {
  state = {
    query: '',
    gallery: [],
    page: 1,
    error:null,
    status: 'idle',
    isOpen: false,
  }
  handleSearch = async  query => {
    try {
      const data =await fetchImages(query, 1);
      this.setState({
        gallery: data.hits,
        status: "resolved"
      })
    } catch (error) {
      this.setState({error:error.message,status:"rejected"})
    }
  }
  handleToggle = () => {
    this.setState(prevState => { isOpen: !prevState.isOpen })
  }
  handleOpen = e => {
    
    if (e.target.id === 'image') {
      this.handleToggle()
    }
  }
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
    const { status, isOpen, gallery } = this.state;
    
    return (
      <div>
        <SearchBar onSubmit={this.handleSearch}/>
        <ImageGallery gallery={gallery} onClick={this.handleOpen} />
        <Button onLoad={this.handleLoadMore}/>
        {isOpen && <Modal onCLose={this.handleToggle}>
          <li src=''></li>
        </Modal>}
      </div>
    );
  }
}
