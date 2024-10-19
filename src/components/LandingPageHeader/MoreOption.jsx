import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import * as React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function MenuListComposition({ data, pathName }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="flex cat-itm gap-1"
        style={{ alignItems: "center" }}
      >
        More
        <FaAngleDown style={{ fontSize: 12, marginTop: 3 }} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  //   onKeyDown={handleListKeyDown}
                  style={{ height: 400, overflow: "auto" }}
                >
                  {data?.map((dt) => {

                    // console.log("pathName == dt?.name", pathName + " == " + dt?.name)
                    // console.log("pathName == dt?.name", pathName == dt?.name)
                    return (
                      <Link
                        to={{
                          pathname: "/products",
                          search: "category=" + dt.name.replace(/\s+/g, '-'),
                        }}
                        state={{ value: dt.idcategory, type: "category",customavi:"avi98" }}
                      >
                        <MenuItem
                          onClick={handleClose}
                          style={{ fontSize: 15, color: "#666", opacity: 0.8 }}
                        >
                          <div className={`${pathName == dt?.name ? 'cat-itm active text-green-600' : 'cat-itm'}`}>{dt.name}</div>
                        </MenuItem>
                      </Link>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
