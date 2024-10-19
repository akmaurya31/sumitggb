import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const AlertModal2 = ({ isOpen, onClose, children, title, titleMember, classNameTitle }) => {
  return (
    <>
      <Modal
        open={isOpen}
        closeButton={true}
        onClose={onClose}
        center
        classNames={{
          overlay: "alertOverlay1",
          modal: "alertModal2",
        }}
      >
        {title && (
          <div
            className="pt-1 pb-2 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
          >
            <div className={"text-base font-medium " + classNameTitle}>{title} <span className="text-green-700 ">{titleMember && titleMember}</span></div>
          </div>
        )}

        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AlertModal2;
