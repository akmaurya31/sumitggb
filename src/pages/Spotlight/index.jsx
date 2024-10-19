import React from "react";

import { Button, Img, List, Text } from "components";
import LandingPageHeader from "components/LandingPageHeader";
import LandingPageFooter from "components/LandingPageFooter";
import page404 from '../../styles/imgs/page/page-404.png';

const SpotlightPage = () => {
  return (
    <>
      <LandingPageHeader />
       {/* html not found */}
      <LandingPageFooter />
    </>
  );
};

export default SpotlightPage;