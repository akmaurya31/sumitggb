import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { useSelector } from "react-redux";
import product_1_1 from "../../styles/imgs/shop/product-1-1.jpg";
import { CardSkeleton } from "components/LandingPageCard/CardSkeleton";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Brands.scss";

const BrandPage = () => {
  const data = useSelector(
    (state) => state?.DashboardReducer?.dashboardData?.data
  );
  const { loading } = useSelector((state) => state?.DashboardReducer);
  const skl = [
    1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 1, 2, 3,
    4, 5, 6,
  ];
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        scroll: "smooth",
      });
    };

    scrollToTop();
    return () => {};
  }, [loading]);
  return (
    <>
      <LandingPageHeader />

      <main className="main">
        {loading ? (
          <div className="container-fluid pb-30">
            <div className="brand-page-cards grid gap-[15px]">
              {skl?.map((sk) => (
                <CardSkeleton height={150} width={""} />
              ))}
            </div>
          </div>
        ) : (
          <div className="container-fluid pb-30">
            <div className="brand-page-cards grid gap-[15px]">
              {data?.brandList?.map((logo, index) => (
                <Link
                  to={{
                    pathname: "/products",
                    search: `brand=` + logo.name.replace(/\s+/g, "-"),
                  }}
                  state={{
                    value: logo.idbrand,
                    type: "brand",
                  }}
                >
                  <div
                    key={index}
                    className={`card-2 bg-${
                      index + 9
                    } wow animate__animated animate__fadeInUp brand-class mb-0`}
                    data-wow-delay={`.${index}s`}
                  >
                    <figure
                      className="img-hover-scale overflow-hidden flex items-center justify-center"
                      style={{ height: 73 }}
                    >
                      <img
                        src={
                          process.env.REACT_APP_BRANDS_URL +
                          logo.image
                        }
                        alt=""
                        onError={(e) => {
                          e.target.src = product_1_1;
                        }}
                      />
                    </figure>
                    <h6 className="heading-sm-1 ">
                      <span
                        className="text-decoration-none"
                        style={{ fontSize: 12 }}
                      >
                        {logo.name}
                      </span>
                    </h6>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      
        <LandingPageFooter />
      </main>
    </>
  );
};

export default BrandPage;
