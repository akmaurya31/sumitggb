import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import React, { useState } from "react";
import "./AddDebitCreditCard.scss";

import { AccountBalance, Payment } from "@mui/icons-material";
import { CheckBox } from "components";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";


const AddDebitCreditCard = ({ payment, setPaymentType }) => {
  const [exDate, setExDate] = useState();
  const [isCard, setCard] = useState(false);
  const [value, setValue] = React.useState("female");
  const handleChange = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length == 2) {
    }
  };
  const handleChange2 = (event) => {
    // setValue(event.target.value);
    setPaymentType(event.target.value);
  };
  const handleCard = () => {
    // setPaymentType("card");
    setCard(true);
    if (isCard) {
      setPaymentType("card");
    } else {
      setPaymentType("");
    }
  };
  const handleBank = (e) => {
    if (e) {
      setPaymentType("netbanking");
    } else {
      setPaymentType("");
    }
  };
  const handleUpi = (e) => {
    if (e) {
      setPaymentType("UPI");
    } else {
      setPaymentType("");
    }
  };
  return (
    <div className="debit-card-parent relative mb-6">
      {/* Online */}
      <div className="flex gap-1 mb-2">
        <CheckCircleOutlineOutlinedIcon className="absolute left-2 text-[#26aab3] desktop-view" />
        <p>Online</p>
      </div>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={payment}
          onChange={handleChange2}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <>
                <Payment style={{ fontSize: 30 }} />
                <span>(Card)</span>
              </>
            }
          />
          <FormControlLabel
            value="netbanking"
            control={<Radio />}
            label={
              <>
                <AccountBalance style={{ fontSize: 30 }} />
                <span>(Net-Banking)</span>
              </>
            }
          />
          <FormControlLabel value="UPI" control={<Radio />} label={"UPI"} />
        </RadioGroup>
      </FormControl>

      {/* Cash on delivery */}
      <div className="flex gap-1 mb-2">
        <CheckCircleOutlineOutlinedIcon className="absolute left-2 text-[#26aab3] desktop-view" />
        <p>Cash on delivery</p>
      </div>
      <div className="flex items-center gap-1">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={payment}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label={
                  <>
                    <PaymentsIcon style={{ fontSize: 30 }} />
                    <span> (Cash On Delivery)</span>
                  </>
                }
              />
            </RadioGroup>
          </div>
    </div>
  );
};

export default AddDebitCreditCard;
