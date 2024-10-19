import React, { useEffect, useState } from "react";
import "./Netbanking.scss";
import axis from "../../../../assets/images/bank/axis.jpg";
import hdfc from "../../../../assets/images/bank/hdfc.jpg";
import icici from "../../../../assets/images/bank/icici.jpg";
import kotak from "../../../../assets/images/bank/kotak.jpg";
import sbi from "../../../../assets/images/bank/sbi.jpg";
import search from "../../../../assets/images/img_search_gray_600.svg";
import arrowdown from "../../../../assets/images/img_arrowdown_gray_700.svg";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const bankData = [
  {
    title: "Axis",
    image: axis,
  },
  {
    title: "Hdfc",
    image: hdfc,
  },
  {
    title: "ICICI",
    image: icici,
  },
  {
    title: "kotak",
    image: kotak,
  },
  {
    title: "SBI",
    image: sbi,
  },
];

const Netbanking = ({ setPaymentType }) => {
  const [bank, setBank] = useState("");
  const [selectbank, setSelectBank] = useState("");

  const handleChange = (event) => {
    setSelectBank(event.target.value);
    setBank(event.target.value);
  };

  useEffect(() => {
    setSelectBank(bank);
  }, [bank]);
  useEffect(() => {
    if (selectbank) {
      setPaymentType("internet_banking");
    }
  }, [selectbank]);
  return (
    <>
      <div className="bank-cards flex gap-3 flex-wrap items-center">
        {bankData.map((item, key) => (
          <div
            className={`card ${bank == item.title && " set-border"}`}
            key={key}
            onClick={() => setBank(item.title)}
          >
            <CheckRoundedIcon className="ckecksign" />
            <img src={item.image} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center  11bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3 px-2">
        <img className="w-5" src={search} />

        <select
          value={selectbank}
          onChange={handleChange}
          id="countries_disabled"
        >
          <option selected>All Banks</option>
          {bankData.map((item, key) => (
            <option key={key} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
        <img className="w-5" src={arrowdown} />
      </div>
    </>
  );
};

export default Netbanking;
