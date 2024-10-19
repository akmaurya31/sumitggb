import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css'; // Add custom styles here if needed

const ModalComponent = () => {
    const handleSubmit = () => {
        // Your form submission logic here
    };

    return (
        <div className="modal fade show" id="packageModal" tabIndex="-1" role="dialog" aria-modal="true" style={{ paddingRight: '17px', display: 'block' }}>
            <div className="modal-dialog" role="document" id="packageLeadForm">
                <div className="modal-content packageModal autoModalPopup" id="getQuotesPopUp">
                    <div className="row m-0">
                        <div className="d-none d-md-block col-md-4 package-modal-side-container">
                            <div className="heading">Over 25 Million+ Happy Holidify Users</div>
                            <div className="side-icon icons-technical-support"></div>
                            <div className="sub-heading">3000+ travel agents across the world</div>
                            <div className="side-icon icons-wedding-gift"></div>
                            <div className="sub-heading">Get amazing deals on packages</div>
                            <div className="side-icon icons-documents"></div>
                            <div className="sub-heading">Get plans from destination experts</div>
                        </div>
                        <div className="col-12 col-md-8 package-modal-main-container">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h4 className="modal-title" id="packageModalHeading">Get the best offers on Delhi Packages</h4>
                            <p className="sub-heading-text" id="packageModalSubheading" style={{ display: 'none' }}>Compare package quotes from top travel agents</p>
                            <div className="auto-popup-image-section" id="popupImageSection">
                                <div className="col-4 p-0">
                                    <img className="package-modal-image" src="https://www.holidify.com/images/bgImages/DELHI.jpg" alt="Delhi Packages" />
                                </div>
                                <div className="col-8">
                                    <p className="package-modal-title">Delhi Packages</p>
                                    <p className="package-modal-price">Starting ₹4,299 only/-</p>
                                    <p className="sub-heading">Compare upto 3 quotes for free</p>
                                </div>
                            </div>
                            <form method="post" id="Form" className="lead-form" action="javascript:void(0);">
                                <div className="input-container row no-gutters paddingMobile">
                                    <input type="text" id="namePopup" name="name" placeholder="Enter Name" required />
                                    <p className="errorMessage">Please enter your name</p>
                                    <i className="icon">
                                        {/* Replace with your SVG or icon component */}
                                    </i>
                                </div>
                                <div className="input-container row no-gutters paddingMobile">
                                    <div className="col-4 col-md-3 packageCountryCode CountryCode">
                                        <button className="btn btn-default dropdown-toggle categoryBtn col-xs-12 col-md-12" type="button" id="countryButton" data-toggle="dropdown">
                                            <span className="flag flag-in" data-tcid="88" data-phone="+91" alt="India"> </span> +91 <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu countryListDropdown">
                                            <li><span className="flag flag-in" data-tcid="88" data-phone="+91" alt="India"> </span> India (+91) </li>
                                        </ul>
                                    </div>
                                    <div className="col-8 col-md-9" style={{ paddingLeft: '10px' }}>
                                        <input type="tel" id="phonePopup" name="tel" placeholder="Enter Mobile" style={{ paddingLeft: '50px' }} required />
                                        <i className="icon" style={{ left: '10px' }}>
                                            {/* Replace with your SVG or icon component */}
                                        </i>
                                    </div>
                                </div>
                                <div className="input-container row no-gutters paddingMobile">
                                    <input type="text" id="emailPopup" name="email" placeholder="Enter Email ID" required />
                                    <i className="icon">
                                        {/* Replace with your SVG or icon component */}
                                    </i>
                                </div>
                                <div className="row no-gutters mb-1 mt-3 package-secondary-details align-items-center">
                                    <div className="col-12 details-sub-heading">
                                        <b>How should we contact you?</b>
                                    </div>
                                    <div className="col-12">
                                        <div className="row no-gutters" id="communicationPreference">
                                            <div className="col-6">
                                                <label className="filter-heading-regular col-12 filterpreBooking">
                                                    <img src="/res/images/icons/whatsapp.svg" className="pl-1" alt="WhatsApp" />
                                                    &nbsp;&nbsp;WhatsApp
                                                    <input className="form-check-input priceFilterCheckBox" type="radio" name="communication" value="WhatsApp" />
                                                    <div className="checkbox-hole"> </div>
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <label className="filter-heading-regular col-12 filterpreBooking">
                                                    <img src="/res/images/icons/circle-phone.svg" className="pl-1" alt="Phone" />
                                                    &nbsp;&nbsp;Phone
                                                    <input className="form-check-input priceFilterCheckBox" type="radio" name="communication" value="Phone" />
                                                    <div className="checkbox-hole"> </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-gutters package-secondary-details connectAgents d-none">
                                    <label className="filter-heading-regular col-12 filterpreBooking">
                                        &nbsp;&nbsp;I want package offers from upto 3 agents
                                        <input className="form-check-input priceFilterCheckBox" type="checkbox" name="connectAgents" checked />
                                        <div className="checkbox-hole"> </div>
                                    </label>
                                </div>
                                <div className="input-container row no-gutters mobileView text-center">
                                    <input type="hidden" id="buttonPositionPopup" value="Packages_callMe_timeout" />
                                    <input type="hidden" id="packageIdPopup" value="" />
                                    <input type="hidden" id="tourPackageIdPopup" value="" />
                                    <button type="button" className="btn GetCallBack text-center" id="packageSubmitButton" onClick={handleSubmit}>Get Free Package Quotes</button>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-12">
                                        <p className="text-privacy">*Final prices will be shared by our partner agents based on your requirements.</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-dialog" style={{ display: 'none' }}>
                <div className="modal-content packageModal">
                    <div className="modal-body text-center col-md-12" id="packageFormLoadingDiv" style={{ paddingTop: '20px' }}></div>
                </div>
            </div>
            <div className="modal-dialog" id="otpDiv" role="document"></div>
        </div>
    );
};

export default ModalComponent;
