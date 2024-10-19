import { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const AlertModal = (props) => {
  const [openalert, setOpenalert] = useState(props.is_show);
  
  const outtime=props.outtime?props.outtime:1500;
  if(openalert){
    setTimeout(
      () => setOpenalert(false), 
      outtime
    );
  }
  const onCloseModal = () => setOpenalert(false);
  
  return (
    <>
    
      <Modal open={openalert} classNames={{
        overlay: 'alertOverlay',
        modal: 'alertModal',
      }} closeButton={false}  onClose={onCloseModal} center>
        <div className="modal-dialog" >
            <div className="modal-content">
              <div className="modal-body p-3">
                <p style={{ color: "#000000" }}>
                  {props.Msg}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      
    </>
  );
};

export default AlertModal;
