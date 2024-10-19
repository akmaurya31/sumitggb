import React from "react";

// import { Button, Img, List, Text } from "components";
import { Link } from "react-router-dom";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import Breadcrumb from "components/Breadcrumb";

const PolicyPage = () => {
  return (
    <>
      <LandingPageHeader/>
      <main className="main pages">
      <div className="container-fluid">
          <Breadcrumb activepage={"Privacy Policy"} />
        </div>
        <div className="page-content ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                      <div className="single-header style-2">
                        <h2>PRIVACY POLICY</h2>
                        <div className="entry-meta meta-1 meta-3 font-xs mt-15 mb-15">
                          <span className="post-by">By <Link to="/">Ghar Ghar Bazaar</Link></span>

                        </div>
                      </div>
                      <div className="single-content mb-50">
                        <h4>Personal Information</h4>
                        <p>This Privacy Policy provides succinctly the manner your data is collected and used by Ghargharbazaar on the Site. As a visitor to the site/customer you are advised to please read the Privacy Policy carefully. By accessing the services provided by the site you agree to the collection and use of your data by Ghargharbazaar in the manner provided in this Privacy Policy.</p>
                        <h4>What information is, or may be, collected form you?</h4>
                        <p>As part of the registration process on the Site, Ghargharbazaar may collect the following personally identifiable information about you: Name including first and last name, alternate Email address, Mobile/ Telephone number and contact details, Postal code, Demographic profile (like your age, gender, occupation, education, address etc.) and information about the pages on the site you visit/access, the links you click on the site, the number of times you access the page and any such browsing information.</p>
                        <h4>How do we Collect the Information ?</h4>
                        <p>GharGharBazaar will collect personally identifiable information about you only as part of a voluntary registration process, on-line survey or any combination thereof. The Site may contain links to other Web sites. GharGharBazaar is not responsible for the privacy practices of such web sites which it does not own, manage or control. The Site and third-party vendors, including Google, use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the Double Click cookie) together to inform, optimize, and serve ads based on someone's past visits to the Site.</p>
                        <h4>How is information used ?</h4>
                        <p>Even being a new company our vast experience in e-commerce segment keeps us on top layer with respect to other performers. Although there are many local and national competitors doing their business from long, few startups are also being added every quarter in this business. Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt Ltd)competes with various other startups in the online grocery segment. Competitors include Ghar Ghar Bazaar, Bigbasket, Peppertapetc. Various city - specific online retail stores have also come up, which are giving tough competition to Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.). Even bigger e-commerce players such as Amazon India and Snapdeal have also started selling groceries online, which is creating new challenges for Ghargharbazaar.</p>


                        <h4>With whom your information will be shared</h4>
                        <p>Even being a new company our vast experience in e-commerce segment keeps us on top layer with respect to other performers. Although there are many local and national competitors doing their business from long, few startups are also being added every quarter in this business. Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt Ltd)competes with various other startups in the online grocery segment. Competitors include Ghar Ghar Bazaar, Bigbasket, Peppertapetc. Various city - specific online retail stores have also come up, which are giving tough competition to Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.). Even bigger e-commerce players such as Amazon India and Snapdeal have also started selling groceries online, which is creating new challenges for Ghargharbazaar.</p>


                        <h4>Policy updates</h4>
                        <p>Even being a new company our vast experience in e-commerce segment keeps us on top layer with respect to other performers. Although there are many local and national competitors doing their business from long, few startups are also being added every quarter in this business. Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt Ltd)competes with various other startups in the online grocery segment. Competitors include Ghar Ghar Bazaar, Bigbasket, Peppertapetc. Various city - specific online retail stores have also come up, which are giving tough competition to Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.). Even bigger e-commerce players such as Amazon India and Snapdeal have also started selling groceries online, which is creating new challenges for Ghargharbazaar.</p>

                        <h4>Contact Information</h4>
                        <p>Even being a new company our vast experience in e-commerce segment keeps us on top layer with respect to other performers. Although there are many local and national competitors doing their business from long, few startups are also being added every quarter in this business. Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt Ltd)competes with various other startups in the online grocery segment. Competitors include Ghar Ghar Bazaar, Bigbasket, Peppertapetc. Various city - specific online retail stores have also come up, which are giving tough competition to Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.). Even bigger e-commerce players such as Amazon India and Snapdeal have also started selling groceries online, which is creating new challenges for Ghargharbazaar.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingPageFooter/>
    </>
  );
};

export default PolicyPage;
