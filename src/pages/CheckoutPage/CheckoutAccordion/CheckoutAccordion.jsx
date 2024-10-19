import React, { useEffect, useState } from "react";
import "./CheckoutAccordion.scss";
import Netbanking from "./Netbanking/Netbanking";
import AddDebitCreditCard from "./AddDebitCreditCard/AddDebitCreditCard";
import AddUPI from "./AddUPI/AddUPI";
import { FaWallet } from "react-icons/fa6";
import Radio from "@mui/material/Radio";
import { FormControlLabel, RadioGroup } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DeliverySlots from "./DeliverySlots";

const CheckoutAccordion = ({
  payment,
  setPaymentType,
  iddelivery_slots,
  setIddelivery_slots,
  classNameBody,
}) => {
  const [openAccordion, setOpenAccordion] = useState(
    iddelivery_slots.length == 0 ? "slot" : ""
  );
  const [openAccordionPayment, setOpenAccordionPayment] = useState(
    iddelivery_slots.length == 0 ? "slot" : ""
  );
  const [openAccordionCash, setOpenAccordionCash] = useState(
    iddelivery_slots.length == 0 ? "slot" : ""
  );

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };
  const toggleAccordionPayment = (id) => {
    setOpenAccordionPayment(openAccordionPayment === id ? null : id);
  };
  // const toggleAccordionCash = (id) => {
  //   setOpenAccordionCash(openAccordionCash === id ? null : id);
  // };

  useEffect(() => {
    if (iddelivery_slots.length > 0) {
      setTimeout(() => {
        setOpenAccordionPayment('add-credit');
      }, [1000])
    }
  }, [iddelivery_slots])

  const AccordionData = [
    {
      title: "Delivery Slots",
      content: (
        <DeliverySlots
          setIddelivery_slots={setIddelivery_slots}
          iddelivery_slots={iddelivery_slots}
        />
      ),
      id: "slot",
    },
    {
      title: "Payment Method",
      content: (
        <>
          <AddDebitCreditCard
            setPaymentType={setPaymentType}
            payment={payment}
          />
        </>
      ),
      id: "add-credit",
    },

    // {
    //   title: "Cash on delivery",
    //   content: (
    //     <div className="flex items-center gap-1">
    //       <RadioGroup
    //         aria-labelledby="demo-controlled-radio-buttons-group"
    //         name="controlled-radio-buttons-group"
    //         value={payment}
    //         onChange={(e) => setPaymentType(e.target.value)}
    //       >
    //         <FormControlLabel
    //           value="cash"
    //           control={<Radio />}
    //           label={
    //             <>
    //               <PaymentsIcon style={{ fontSize: 30 }} />
    //               <span> (cash on delivery)</span>
    //             </>
    //           }
    //         />
    //       </RadioGroup>
    //     </div>
    //   ),
    //   id: "cash",
    // },
  ];

  const AccordionItem = ({ title, content, id }) => {
    const isOpen = openAccordion === id;
    const isOpenPayment = openAccordionPayment === id;
    const isOpenCash = openAccordionCash === id;

    return (
      <div className="accordion-item" key={id}>
        <h2
          className={` accordion-header  ${iddelivery_slots.length == 0
              ? "cursor-not-allowed opacity-30"
              : "cursor-pointer"
            }`}
        >
          <button
            className={`accordion-button  ${iddelivery_slots.length == 0
                ? "cursor-not-allowed "
                : isOpen
                  ? ""
                  : "collapsed"
              }`}
            type="button"
            onClick={
              iddelivery_slots.length == 0
                ? () => { }
                : id == "slot"
                  ? () => toggleAccordion(id)
                  : id == "add-credit"
                    ? () => toggleAccordionPayment(id)
                    : // : id == "cash"
                    // ? () => toggleAccordionCash(id)
                    null
            }
            // aria-expanded={isOpen ? "true" : "false"}
            aria-expanded={
              isOpen
                ? "true"
                : isOpenPayment
                  ? "true"
                  // : isOpenCash
                  // ? "true"
                  : "false"
            }
            aria-controls={id}
          >
            {title}
          </button>
        </h2>
        <div
          id={id}
          // className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          className={`accordion-collapse collapse ${isOpen ? "show" : isOpenPayment ? "show" : isOpenCash ? "show" : ""
            }`}
          aria-labelledby={id}
        >
          <div className={`accordion-body ${classNameBody}`}>{content}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="accordion" id="accordionParentCheckout">
      {AccordionData.map((item) => (
        <AccordionItem
          title={item.title}
          key={item.id}
          id={item.id}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default CheckoutAccordion;
