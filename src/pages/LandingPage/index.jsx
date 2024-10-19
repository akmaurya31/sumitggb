import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

import "../../styles/normalize.css";
import "../../styles/uicons-regular-straight.css";
import "../../styles/magnific-popup.css";
import "../../styles/select2.min.css";
import "../../styles/perfect-scrollbar.css";

import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { Img } from "components";
import { useSelector } from "react-redux";

const LandingPagePage = () => {
  const storeids = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
 
  return (
    <>
      <LandingPageHeader />
      <LandingPageCard />
      {storeids && storeids.length !== 0 && <LandingPageFooter />}
    </>
  );
};

export default LandingPagePage;
