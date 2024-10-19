import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import "./Breadcrumb.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DrawerRight from "components/DrawerRight/DrawerRight";
import CategoryMenu from "components/CategoryMenu/CategoryMenu";
// import Mheader from "components/LandingPageHeader/Mheader";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb({ activepage, sublink, idsub_category }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [openRightDrawer, setOpenRightDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawerRight = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenRightDrawer({ ...openRightDrawer, [anchor]: open });
  };
  return (
    <>
      <div className="breadcrumb " role="presentation" onClick={handleClick}>
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-11">
            <Breadcrumbs
              // maxItems={2}
              aria-label="breadcrumb"
            >
              <Link className="link" underline="hover" color="inherit" to="/">
                {/* Home */}
                <HouseOutlinedIcon className="mb-[2.5px]" />
              </Link>
              {sublink && (
                <Link
                  className="link"
                  underline="hover"
                  color="inherit"
                  to={{
                    pathname: "/products",
                    search: `category=` + sublink.replace(/\s+/g, "-"),
                  }}
                  state={{
                    value: idsub_category,
                    type: "category",
                    customavi:"avi65",
                  }}
                >
                  {sublink}
                </Link>
              )}
              <Link
                underline="hover"
                color="text.primary"
                to={"#"}
                aria-current="page"
                className="link active homeK"
              >
                {activepage}
              </Link>
            </Breadcrumbs>
          </div>
          <div className="col-span-1 text-right">
            <div
              className="mobile-view "
              onClick={toggleDrawerRight("right", true)} >
              <MenuOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
      <DrawerRight id="category-menu-drawer" toggleDrawer={toggleDrawerRight}
        openRightDrawer={openRightDrawer}
        content={<CategoryMenu toggleDrawer={toggleDrawerRight}
          openRightDrawer={openRightDrawer} />} />
    </>
  );
}
