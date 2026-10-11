import React, { Component } from 'react'
import { createPortal } from 'react-dom';
const modalRoot = document.getElementById('modal-root')
export default class Modal extends Component {
    handleEsc = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }
    handleBackdrop = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }
    componentDidMount(){
        window.addEventListener('keydown', this.handleEsc);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown',this.handleEsc)
    }
  render() {
      return createPortal(
        <div className="overlay">
          <div className="modal">
                {this.props.children}
          </div>
          </div>,
          modalRoot
      );
  }
}




