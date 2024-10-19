import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import React, { useState, useEffect } from "react";
import "./AddDebitCreditCard/AddDebitCreditCard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ButtonLoader, Loader } from "components/Loader";
import "./DeliverySlots.scss";
import moment from "moment";
import { ConvertTo24Hour } from "components/DateTimeFormate";

const dateOptions = {
  weekday: "short", // Display the abbreviated name of the day of the week (e.g., Mon)
  month: "short", // Display the abbreviated name of the month (e.g., Feb)
  day: "numeric", // Display the day of the month as a number (e.g., 5)
  year: "numeric", // Display the year as a number (e.g., 2024)
};

const DeliverySlots = ({ iddelivery_slots, setIddelivery_slots }) => {
  const { slots, slots_loading } = useSelector((state) => state.Slots);

  const [selectSlots, setSlots] = useState([]);
  const [isDate, setDate] = useState();
  const [dates, setDates] = useState([]);
  // const [selectDate, setSelectDate] = useState();
  const [dateDisable, setDateDisable] = useState(false);

  useEffect(() => {
    setSlots(slots);
    // setIddelivery_slots(slots)
  }, [slots]);

  const dt = new Date(selectSlots[0]?.date) + "";
  const today = dt?.split(" ");
  //  console.log("selectSlots", selectSlots);

  // useEffect(() => {
  //   setDate(today[2]);
  //   // setSelectDate(moment().format("YYYY-MM-DD"));
  //   // if (selectSlots.length == 0) {
  //   //   setSelectDate("");
  //   // } else {
  //   //   // setSelectDate(dates[0]);
  //   // }
  // }, [dates]);

  const handleChange2 = (event) => {
    // console.log("event",event.target.value)
    setIddelivery_slots(event.target.value);
  };

  // console.log("selectDate", selectDate);
  // console.log("selectDate", moment(selectDate).format("YYYY-MM-DD"));
  const calculateDates = () => {
    const currentDate = new Date();
    const nextDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
      nextDates.push(
        date.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          disable: "boolean",
        })
      );
    }

    setDates(nextDates);
  };

  useEffect(() => {
    calculateDates();
    if (dates[3]) {
      setDateDisable(true);
    }
  }, []);

  const isSlotAvailable = (startTime, endTime) => {
    const currentTime = new Date();
    const startParts = startTime?.split(":");
    const endParts = endTime?.split(":");
    const start = new Date(currentTime);
    const end = new Date(currentTime);

    start.setHours(parseInt(startParts[0], 10));
    start.setMinutes(parseInt(startParts[1], 10));
    end.setHours(parseInt(endParts[0], 10));
    end.setMinutes(parseInt(endParts[1], 10));

    // Check if current time is within the slot
    return currentTime >= start && currentTime <= end;
  };

  // ========================
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  function getFormattedTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 hour to 12 hour format
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return formattedHours + ":" + formattedMinutes + " " + ampm;
  }

  // console.log("currentTime", currentTime)
  // ==============================
  const slotsdates = selectSlots?.map((db, index) => {
    return { slotsdate: db.date };
  });

  const formattedDatesArray = slotsdates?.map((item) => {
    const dateObj = new Date(item.slotsdate);
    return dateObj.toLocaleDateString("en-US", dateOptions);
  });

  const compareDates = (a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  };

  // Sort the array using the custom comparison function
  formattedDatesArray?.sort(compareDates);

  // console.log("date formattedDatesArray", formattedDatesArray);

  const mergedArray = dates?.map((date, index) => {
    return {
      date: date,
      slotsdate: formattedDatesArray[index] ? formattedDatesArray[index] : "", // Add slotsdate if available
    };
  });

  // console.log("dates selectSlots", selectSlots)
  // console.log("dates slotsdates", slotsdates)
  // console.log("dates", dates)
  // console.log("dates mergedArray", mergedArray)

  const selectSlotsDateAndTime = selectSlots.map((item) => {
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString("en-US", dateOptions);
    return { ...item, date: formattedDate };
  });

  selectSlotsDateAndTime.forEach((item) => {
    item.slots.sort((a, b) => {
  
      const startTimeA = new Date("2000-01-01T" + ConvertTo24Hour(a.start).replace(' ', 'T'));
      const startTimeB = new Date("2000-01-01T" + ConvertTo24Hour(b.start).replace(' ', 'T'));
      return startTimeA - startTimeB;
    });
  });

  // console.log("date selectSlotsDateAndTime", selectSlotsDateAndTime)


  // Today Date
  const currentDate = new Date().toLocaleDateString("en-US", dateOptions);

  const todayLastSloat = selectSlotsDateAndTime.map((db, index) => {
    return db.slots[db.slots.length - 1];
  });
  // console.log("date lastObject ",todayLastSloat[0]?.end)

  // console.log("date mergedArray", mergedArray);

  // =====================
  const [selectDate, setSelectDate] = useState(() => {
    const storedValue = localStorage.getItem("selectDate");
    return storedValue ? storedValue : '';
  });

  useEffect(() => {
    localStorage.setItem("selectDate", selectDate);
  }, [selectDate]);

  return (
    <>
      {!slots_loading ? (
        <>
          <div className="11mobile-view delivery-slots">
            <div className="header w-full"></div>
            <div className="grid grid-cols-7 w-full">
              {mergedArray &&
                mergedArray?.map((db, index) => {
                  return (
                    <div
                      key={index}
                      className={` ${
                        selectDate == db.date
                          ? "date-green flex justify-center items-center flex-col cursor-default"
                          : db.slotsdate == db.date ||
                            formattedDatesArray[0] == db.date ||
                            formattedDatesArray[1] == db.date ||
                            formattedDatesArray[2] == db.date ||
                            formattedDatesArray[3] == db.date ||
                            formattedDatesArray[4] == db.date ||
                            formattedDatesArray[5] == db.date ||
                            formattedDatesArray[6] == db.date
                          ? "bg-white flex justify-center items-center flex-col cursor-pointer"
                          : currentDate == db.date &&
                            ConvertTo24Hour(currentTime && currentTime) >
                              ConvertTo24Hour(
                                todayLastSloat[0]?.end && todayLastSloat[0]?.end
                              )
                          ? "bg-[#00000017] cursor-not-allowed opacity-30 flex justify-center items-center flex-col"
                          : "bg-[#00000017] cursor-not-allowed opacity-30 flex justify-center items-center flex-col"
                      } `}
                      onClick={
                        selectSlots?.length == 0
                          ? () => {}
                          : db?.slotsdate == db?.date ||
                            formattedDatesArray[0] == db.date ||
                            formattedDatesArray[1] == db.date ||
                            formattedDatesArray[2] == db.date ||
                            formattedDatesArray[3] == db.date ||
                            formattedDatesArray[4] == db.date ||
                            formattedDatesArray[5] == db.date ||
                            formattedDatesArray[6] == db.date
                          ? () => setSelectDate(db?.date)
                          : () => {}
                      }
                    >
                      <h6 className="text-sm mb-1">
                        {db?.date?.split(" ")[1]}
                      </h6>
                      <h3 className="mb-1">
                        {db?.date?.split(" ")[2].replace(/,/g, "")}
                      </h3>
                      <h6 className="text-sm mb-1">
                        {db?.date.split(" ")[0].replace(/,/g, "")}
                      </h6>
                    </div>
                  );
                })}
            </div>

            {selectSlotsDateAndTime.length > 0 ? (
              selectSlotsDateAndTime.map((slot, index) => {
                return (
                  <>
                    {slot?.date === selectDate && (
                      // moment(selectDate).format("YYYY-MM-DD") && (
                      <div className="body mb-2 mt-3">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name={"controlled-radio-buttons-group"}
                            value={iddelivery_slots}
                            onChange={handleChange2}
                          >
                            <div className="grid sm:grid-cols-1 grid-cols-2 gap-2">
                              {slot?.slots?.map((sloti, key) => {
                                // console.log("date sloti", slot.date + " === " + currentTime)
                                // console.log("sloti",sloti)
                                return (
                                  <>
                                    {currentDate == slot.date &&
                                    ConvertTo24Hour(
                                      currentTime && currentTime
                                    ) >
                                      ConvertTo24Hour(
                                        sloti.end && sloti.end
                                      ) ? (
                                      <div className="hidden bg-[#00000017] p-[10px] pl-[46px] opacity-30 cursor-not-allowed">
                                        {sloti.start + " - " + sloti.end}
                                      </div>
                                    ) : (
                                      <div className={"w-full"}>
                                        <FormControlLabel
                                          className={"w-full"}
                                          value={sloti.iddelivery_slots}
                                          key={key}
                                          control={<Radio />}
                                          label={
                                            sloti.start + " - " + sloti.end
                                          }
                                        />
                                      </div>
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </div>
                    )}
                  </>
                );
              })
            ) : (
              <div className="pt-3 text-red-500 text-sm font-medium">
                Slots are Unavailable! Please Try After Some Time
              </div>
            )}
          </div>
        </>
      ) : (
        <ButtonLoader color={"black"} size={8} />
      )}
    </>
  );
};

export default DeliverySlots;
