import React from "react";

import { Button, Img, List, Text } from "components";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import page404 from "../styles/imgs/page/page-404.png";
import Breadcrumb from "components/Breadcrumb";

const NotFound = () => {
  return (
    <>
      <LandingPageHeader />
      <main class="main page-404">
      <div className="container-fluid">
          <Breadcrumb activepage={"Page Not Found"} />
        </div>
        <div class="page-content pt-8 pb-8">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-8 col-lg-10 col-md-12 m-auto text-center">
                <div className="flex flex-col justify-center items-center">
                  <p class="mb-20">
                    <img src={page404} alt="" class="hover-up" />
                  </p>
                  <h1 class="display-2 mb-30">Page Not Found</h1>
                  <p class="font-lg text-grey-700 mb-30">
                    The link you clicked may be broken or the page may have been
                    removed.
                    <br />
                    visit the{" "}
                    <a href="index.html">
                      {" "}
                      <span> Homepage</span>
                    </a>{" "}
                    or{" "}
                    <a href="page-contact.html">
                      <span>Contact us</span>
                    </a>{" "}
                    about the problem
                  </p>
                  <div class="search-form">
                    <form action="#">
                      <input type="text" placeholder="Search…" />
                      <button type="submit">
                        <i class="fi-rs-search"></i>
                      </button>
                    </form>
                  </div>
                  <a
                    class="btn btn-default submit-auto-width font-xs hover-up mt-30"
                    href="index.php"
                  >
                    <i class="fi-rs-home mr-5"></i> Back To Home Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingPageFooter />
    </>
  );
};

export default NotFound;
