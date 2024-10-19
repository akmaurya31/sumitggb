import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';

const ModalComponent = ({ show, handleClose, title, children }) => {
 

  

  return (
     <Modal show={show} onHide={handleClose} centered>
      <div className="inner-modal-part">
        <div className="modal-dialog">
          <div className="modal-content">
            <Button variant="link" className="close" onClick={handleClose}>
              <img
                src="https://www.thechardhamyatra.com/wp-content/themes/chardham-pkg-theme/images/close.png"
                alt="Close"
              />
            </Button>
            <Button variant="link" className="close-tooltip" onClick={handleClose}>
              &times;
            </Button>
            <div className="modal-body">
              <div className="left-send">
                <img
                  src="https://www.thechardhamyatra.com/wp-content/themes/chardham-pkg-theme/images/enqury.jpg"
                  alt="Enquiry"
                />
                <div className="left-content">
                  <div className="left-content-top"></div>
                  <div className="left-content-bottom">
                    <h4>How it works</h4>
                    <ul>
                      <li>
                        <span>1</span>
                        <a href="#">Tell us details of your Tour plan.</a>
                      </li>
                      <li>
                        <span>2</span>
                        <a href="#">
                          Our Tour Experts will customize the plan based upon your requirements &amp; will email the tour quote with 2-3 different hotel options.
                        </a>
                      </li>
                      <li>
                        <span>3</span>
                        <a href="#">Select &amp; book best deal.</a>
                      </li>
                    </ul>
                    <div className="call-us">
                      <figure>
                        <img
                          src="https://www.thechardhamyatra.com/wp-content/themes/chardham-pkg-theme/images/PHn2.png"
                          alt="Call Us"
                          width="36"
                          height="36"
                        />
                      </figure>
                      <div className="call-us-details">
                        Call Us for details
                        <h4>+91 7290024809</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-form">
                <div className="home-enquiry">
                  <h3>Get The Best Chardham Packages</h3>
                  <form
                    action="#"
                    method="post"
                    className="wpcf7-form init"
                    aria-label="Contact form"
                    novalidate="novalidate"
                    data-status="init"
                  >
                    
                    <div className="sed-rw">
                      <fieldset>
                        <legend>Name</legend>
                        <p>
                          <span className="wpcf7-form-control-wrap" data-name="Name">
                            <input
                              size="40"
                              className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required demoInputBox"
                              aria-required="true"
                              aria-invalid="false"
                              placeholder="name"
                              type="text"
                              name="Name"
                            />
                          </span>
                        </p>
                      </fieldset>
                    </div>
                    <div className="sed-rw">
                      <fieldset>
                        <legend>Email</legend>
                        <p>
                          <span className="wpcf7-form-control-wrap" data-name="email">
                            <input
                              size="40"
                              className="wpcf7-form-control wpcf7-email wpcf7-text wpcf7-validates-as-email demoInputBox"
                              aria-invalid="false"
                              placeholder="email"
                              type="email"
                              name="email"
                            />
                          </span>
                        </p>
                      </fieldset>
                    </div>
                    <div className="sed-rw">
                      <fieldset>
                        <legend>Phone</legend>
                        <p>
                          <span className="wpcf7-form-control-wrap" data-name="phone">
                            <input
                              size="40"
                              className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel demoInputBox"
                              aria-required="true"
                              aria-invalid="false"
                              placeholder="phone"
                              type="tel"
                              name="phone"
                            />
                          </span>
                        </p>
                      </fieldset>
                    </div>
                    <div className="sed-rw">
                      <fieldset>
                        <legend>City</legend>
                        <p>
                          <span className="wpcf7-form-control-wrap" data-name="city">
                            <input
                              size="40"
                              className="wpcf7-form-control wpcf7-text demoInputBox"
                              aria-invalid="false"
                              placeholder="city"
                              type="text"
                              name="city"
                            />
                          </span>
                        </p>
                      </fieldset>
                    </div>
                    <div className="sed-rw">
                      <fieldset>
                        <legend>Number Of Persons</legend>
                        <p>
                          <span className="wpcf7-form-control-wrap" data-name="Persons">
                            <input
                              className="wpcf7-form-control wpcf7-number wpcf7-validates-as-number demoInputBox"
                              aria-invalid="false"
                              placeholder="number of persons"
                              type="number"
                              name="Persons"
                            />
                          </span>
                          <br />
                          <span className="wpcf7-form-control-wrap page-title" data-name="page-title">
                            <input
                              type="hidden"
                              name="page-title"
                              className="wpcf7-form-control wpcf7-hidden wpcf7dtx wpcf7dtx-hidden"
                              aria-invalid="false"
                              value="contact us"
                            />
                          </span>
                        </p>
                      </fieldset>
                    </div>
                    <div className="sed-rw">
                      <p>
                        <input
                          className="wpcf7-form-control wpcf7-submit has-spinner send sendContact btn btn-primary"
                          type="submit"
                          value="Submit"
                        />
                        <span className="wpcf7-spinner"></span>
                      </p>
                    </div>
                    <div className="wpcf7-response-output" aria-hidden="true"></div>
                  </form>
                </div>

                <div className="sucsses-msgs success-sec-package-page" id="sucsses-msg1" >
                  <div className="pop3">
                    <h3>Why Travel with us?</h3>
                    <ul>
                      <li>
                        <figure>
                          <img
                            src="https://www.thechardhamyatra.com/wp-content/themes/chardham-pkg-theme/images/badge.png"
                            alt="Best Price Guaranteed"
                          />
                        </figure>
                        <h4>
                          Best Price <br />
                          Guaranteed
                        </h4>
                      </li>
                      <li>
                        <figure>
                          <img
                            src="https://www.thechardhamyatra.com/wp-content/themes/chardham-pkg-theme/images/customize.png"
                            alt="Package Customization"
                          />
                        </figure>
                        <h4>
                          Package <br />
                          Customization
                        </h4>
                      </li>
                      <li>
                        <figure>
                          <img
                            src="https://www.thechardhamyatra.com/wp-content/themes/chardham-pkg-theme/images/assistance.png"
                            alt="24*7 Trip Assistance"
                          />
                        </figure>
                        <h4>
                          24*7 Trip <br />
                          Assistance
                        </h4>
                      </li>
                    </ul>
                  </div>
                  </div>
                  
              </div>
           </div>
                 
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
