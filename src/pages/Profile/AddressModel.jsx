import React, { useState } from "react";
import { Text } from "components";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import GoogleMap from "./GoogleMap";
import AddressForm from "./AddressForm";
import AlertModal from "components/Alert";
import "tailwindcss/tailwind.css";
import { useDispatch, useSelector } from "react-redux";

export const AddressModel = (props) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [gmapData, setGmapData] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const [alertAddAddress, setAlertAddAddress] = useState(false);
  const [alertUpdateAddress, setAlertUpdateAddress] = useState(false);
  const [addressDetails, setAddressDetails] = useState(props.address || {});
  const [isLoader, setIsLoader] = useState(false);
  const token = props.token || ""; // Assuming token comes from props
  const dispatch = useDispatch();
  // const onOpenModal = () => setOpen(true);
  const onOpenModal = (data) => {
    // reset()
    setOpen(true);
    setAdd(true);
    setEdit(false)
  };
  const onCloseModal = () => setOpen(false);
  const handleReadOnlyChange = (readOnly) => {
    setIsReadOnly(readOnly);
  };

  // const [isLoader, setIsLoader] = useState(false);
  // const [isReadOnly, setIsReadOnly] = useState(false);
  const handleAddressSubmit = (data) => {
    setIsLoader(true);
    // Simulate an API call or handle the form submission logic here
    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  };

  const handleGmapData = (data) => {
    setGmapData(data); // Store gmapData in parent state
    setAddressDetails(data); // You can also update addressDetails if needed
  };


  return (
    <>
      {props && props.address ? (
        <Text
          style={{ cursor: "pointer", color: "rgb(49, 134, 22)" }}
          className="text-decoration-none text-sm hover:underline"
          onClick={() => {
            onOpenModal();
            setEdit(true);
            handleReadOnlyChange(false);
            setFormVisible(true);
          }}
        >
          Edit 
        </Text>
      ) : (
        <>
          {token && (
             <></>
          )}
         <span onClick={onOpenModal}>+ Add Address</span> 
        </>
      )}

      <Modal
        open={open}
        classNames={{
          overlay: "addressOverlay",
          modal: "addressModal",
        }}
        onClose={onCloseModal}
        center
      >
        <div className="modal-dialog max-w-3xl mx-auto w-full">
          <div className="modal-content bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="modal-body p-0">
              {alertAddAddress && (
                <AlertModal
                  is_show={alertAddAddress}
                  data={addressDetails}
                  outtime="3000"
                  Msg="Address added successfully"
                />
              )}
              {alertUpdateAddress && (
                <AlertModal
                  is_show={alertUpdateAddress}
                  data={addressDetails}
                  outtime="3000"
                  Msg="Address updated successfully"
                />
              )}

              <div className="container-fluid px-0 overflow-x-hidden">
                <div className="grid grid-cols-12 gap-3">
                  <div className="sm:col-span-12 col-span-6 sm:h-96 relative">
                    <GoogleMap
                      setGmapData={handleGmapData}
                      handleReadOnlyChange={handleReadOnlyChange}
                      setFormVisible={setFormVisible}
                    />
                  </div>
                  {formVisible && (
                    <AddressForm
                      addressDetails={addressDetails}
                      isReadOnly={isReadOnly}
                      isLoader={isLoader}
                      setAddressDetails={setAddressDetails}
                      onAddressSubmit={handleAddressSubmit}
                      onCloseModal={onCloseModal}
                      gmapData={gmapData}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
