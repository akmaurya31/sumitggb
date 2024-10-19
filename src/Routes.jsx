import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
import React from "react";
import { PageLoader } from "components/PageLoader";

// import PrivateRoute from './PrivateRoute';
const AboutUs = React.lazy(() => import("pages/AboutUs"));
const Landwishbasket = React.lazy(() => import("pages/Landwishbasket"));
const InstantDiscountpage = React.lazy(() => import("pages/InstantDiscountpage"));
const Productwishbasket = React.lazy(() => import("pages/Productwishbasket"));
const Businesswishbasket = React.lazy(() => import("pages/Businesswishbasket"));
const CheckoutPage = React.lazy(() => import("pages/CheckoutPage"));
const ContactPage = React.lazy(() => import("pages/ContactPage"));
const Disclaimer = React.lazy(() => import("pages/Disclaimer"));
const Error = React.lazy(() => import("pages/Error"));
const Franchise = React.lazy(() => import("pages/Franchise"));
const Partner = React.lazy(() => import("pages/Partner"));
const PrivacyPolicy = React.lazy(() => import("pages/Policy"));
const Products = React.lazy(() => import("pages/Products"));
const ProductSingle = React.lazy(() => import("pages/ProductSingle"));
const Profile = React.lazy(() => import("pages/Profile"));
const Refund = React.lazy(() => import("pages/Refund"));
const Seller = React.lazy(() => import("pages/Seller"));
const Spotlight = React.lazy(() => import("pages/Spotlight"));
const Term = React.lazy(() => import("pages/Term"));
const Warehouse = React.lazy(() => import("pages/Warehouse"));
const LandingPage = React.lazy(() => import("pages/LandingPage"));
const BrandPage = React.lazy(() => import("./pages/Brands/index"));
const SearchPage = React.lazy(() => import("./pages/Search/index"));
const MyCart = React.lazy(() => import("./components/MyCart/index"));
const InstantDiscount = React.lazy(() =>
  import("pages/MembershipPlan/InstantDiscount")
);
const ProductDiscount = React.lazy(() =>
  import("pages/MembershipPlan/ProductDiscount")
);
const LandDiscount = React.lazy(() =>
  import("pages/MembershipPlan/LandDiscount")
);
const CopartnerDiscount = React.lazy(() =>
  import("pages/MembershipPlan/Co-PartnerDiscount")
);
const ProductPricePage = React.lazy(() => import("pages/ProductPrice"));
const CategoriesPage = React.lazy(() => import("pages/Categories"));
const OrderSuccess = React.lazy(() => import("pages/Order/Success"));
const OrderDetail = React.lazy(() => import("pages/Order/orderDetail"));
const Joinus = React.lazy(() => import("pages/Joinus"));

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/s/" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/error" element={<Error />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/Landwishbasket" element={<Landwishbasket />} />
          <Route path="/instantdiscountpage" element={<InstantDiscountpage />} />
          <Route path="/Productwishbasket" element={<Productwishbasket />} />
          <Route path="/Businesswishbasket" element={<Businesswishbasket />} />
          <Route path="/Franchise" element={<Joinus />} />

          <Route path="/checkout/" element={<CheckoutPage />} />
          {/* <Route path="/checkout" element={<PrivateRoute component={CheckoutPage}/>} /> */}

          <Route path="/profile/" element={<Profile />} />
          {/* <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> */}

          <Route path="/profile/:name" element={<Profile />} />
          {/* <Route path="/profile/:name" element={<PrivateRoute><Profile /></PrivateRoute>} /> */}

          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/products" element={<Products />} />

          <Route path="/prn/:name/:id" element={<ProductSingle />} />

          <Route path="/refund" element={<Refund />} />
          <Route path="/spotlight" element={<Spotlight />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/term" element={<Term />} />
          <Route path="/brand-list" element={<BrandPage />} />
          <Route path="/instant-discount-plan" element={<InstantDiscount />} />
          <Route path="/product-discount-plan" element={<ProductDiscount />} />
          <Route path="/land-discount-plan" element={<LandDiscount />} />
          <Route
            path="/copartner-discount-plan"
            element={<CopartnerDiscount />}
          />
          <Route path="/product-price/:price" element={<ProductPricePage />} />

          <Route path="/categories" element={<CategoriesPage />} />
          {/* Order success page */}
          <Route path="/order-confirmation" element={<OrderSuccess />} />
          <Route path="/mycart" element={<MyCart />} />

          {/* order detail */}
          <Route path="/order-detail/:order_id" element={<OrderDetail />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
