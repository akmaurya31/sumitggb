import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Em1 from "assets/images/em1.webp";
import Em2 from "assets/images/em2.webp";
import Em3 from "assets/images/em3.webp";
import Em4 from "assets/images/em4.webp";
import { Img, Input } from "components";

export default function TipToggle({ setTipValue, tipValue }) {
  const [alignment, setAlignment] = React.useState(1);
  const [value, setValue] = React.useState();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setTipValue(newAlignment);
  };

  const OnChangeValue = (e) => {
    setValue(parseInt(e));
  };

  const Add = () => {
    setAlignment(0);
    setTipValue(value);
  };

  return (
    <>
      {alignment == -1 ? (
        <div className="flex gap-2">
          <ToggleButton value={-1} className="gap-1 toggle-title">
            <Img src={Em4} width={19} height={19} />
            Custom
          </ToggleButton>
         <div className="flex flex-col">
         <Input
            variant="outline"
            type="number"
            className="input-class"
            onChange={OnChangeValue}
          />
          {value < 10 && <span className="input-error">Tip amount should be greater than ₹10</span>}
         </div>
          <span>
            {value > 10 ? (
              <button onClick={Add} style={{ color: "rgb(12, 131, 31)" }}>
                Add
              </button>
            ) : (
              <button
                onClick={() => {
                  setAlignment(1);
                  setTipValue(0);
                }}
              >
                Close
              </button>
            )}
          </span>
        </div>
      ) : (
        <ToggleButtonGroup
          color="success"
          value={tipValue}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          className="gap-2"
        >
          <ToggleButton value={20} className="gap-1 toggle-title">
            <Img src={Em1} width={19} height={19} /> ₹20
          </ToggleButton>
          <ToggleButton value={30} className="gap-1 toggle-title">
            <Img src={Em2} width={19} height={19} />
            ₹30
          </ToggleButton>
          <ToggleButton value={50} className="gap-1 toggle-title">
            <Img src={Em3} width={19} height={19} />
            ₹50
          </ToggleButton>
          <ToggleButton value={-1} className="gap-1 toggle-title">
            <Img src={Em4} width={19} height={19} />
            Custom
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  );
}
