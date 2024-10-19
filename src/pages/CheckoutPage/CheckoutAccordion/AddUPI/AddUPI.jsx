import React from "react";
import "./AddUPI.scss";
import bhim from "../../../../assets/images/bank/upi/bhim.jpg";
import gpay from "../../../../assets/images/bank/upi/gpay.jpg";
import paytm from "../../../../assets/images/bank/upi/paytm.jpg";
import phonepe from "../../../../assets/images/bank/upi/phonepe.jpg";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import { TextField } from "@mui/material";
import { Button } from "components";

const cardData = [gpay, phonepe, bhim, paytm];

const AddUPI = ({setPaymentType}) => {
  const Checkout=()=>{
    setPaymentType('upi')
  }
  return (
    <div className="upi-card-parent relative">
      <div className="flex gap-1 mb-2">
        <CheckCircleOutlineOutlinedIcon className="absolute left-2 text-[#26aab3]" />
        <p>Add new UPI</p>
      </div>
      <div className="card-img mb-3">
        {cardData.map((item, key) => (
          <img key={key} src={item} onClick={Checkout}/>
        ))}
      </div>
     
    </div>
  );
};

export default AddUPI;
