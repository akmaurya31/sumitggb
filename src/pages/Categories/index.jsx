import { fetchCategoryList } from "Actions/category/action";
import Breadcrumb from "components/Breadcrumb";
import LandingPageHeader from "components/LandingPageHeader";
import { Loader } from "components/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const { category_data, loading } = useSelector((state) => state.CategoryReducer);
  console.log("Category_data", category_data);
  const dispatchEvent = useDispatch();
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        scroll: "smooth",
      });
    };

    scrollToTop();
    return () => { };
  }, [loading]);
  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
      dispatchEvent(fetchCategoryList(null));
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      setIsTokenExpired(token_date < currentTimestamp);
      dispatchEvent(fetchCategoryList(token));
    }
  }, [isTokenExpired, token, token_date]);
  return (
    <>
      <LandingPageHeader />
      <main className="main pb-16">
        <div className="container-fluid mb-30 ">
          <Breadcrumb sublink={localStorage.getItem("seeallcat")} activepage={"All Category"} />
        </div>
        <div className="container-fluid mb-30 ">
          {loading ? (
            <Loader />
          ) : (
            <>
              {" "}
              {category_data?.data?.map((mn) => {
                return (
                  <div className="mb-3 ">
                    <span className="cat-title">{mn?.category?.name}</span>
                    <div className="cat-sub-item-grid mt-3">
                      {/* {[{name: 'Exotic Meat'}, {name: 'Exotic'}, {name: 'Exotic'}, {name: 'Exotic'}]?.map((sb) => { */}
                      {mn?.subcategories?.map((sb) => {
                        return (
                          <Link
                            to={{
                              pathname: "/products",
                              search:
                                `sub_category=` + sb.name.replace(/\s+/g, "-"),
                            }}
                            state={{
                              value: sb.idsub_category,
                              type: "sub_category",
                            }}
                            className="sub-cat-title"
                          >
                            {sb?.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </main>
    </>
  );
};
export default CategoriesPage;
