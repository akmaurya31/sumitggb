import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';

const ModalComponent = ({ show, handleClose, title, children }) => {
  const marginSpacing = '1em'; 
  const modalStyle = {
    marginRight: marginSpacing,
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered>
    <div className="inner-modal-part" style={modalStyle}>
      <div className="modal-dialog">
        <div className="modal-content">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </div>
    </div>
  </Modal>
        );

      }

    ModalComponent.propTypes = {
      show: PropTypes.bool.isRequired,
      handleClose: PropTypes.func.isRequired,
      title: PropTypes.string,
      children: PropTypes.node
    };

 
export default ModalComponent;
