import React, { Component } from 'react'
import './styles.css'
import { SearchBar } from './components/SearchBar'
import { ImageGallery } from './components/ImageGallery'
import { Button } from './components/Button'
import { ImageGalleryItem } from './components/ImageGalleryItem'
export default class App extends Component {
  state = {
    status: 'idle',
    isOpen: false,
  }
  handleToggle = () => {
    this.setState(prevState => { isOpen: !prevState.isOpen })
  }
  handleOpen = e => {
    if (e.target.closest() === 'li') {
      this.handleToggle()
    }
  }
  render() {
    const { status,isOpen } = this.state
    return (
      <div>
        <SearchBar />
        <ImageGallery onClick={this.handleOpen} />
        <Button />
        {isOpen && <Modal onCLose={this.handleToggle}>
          <li src=''></li>
        </Modal>}
      </div>
    );
  }
}
