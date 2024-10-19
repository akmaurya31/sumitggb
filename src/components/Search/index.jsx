import { Loader } from "components/Loader";
import { useEffect, useState } from "react";
import Product from "components/Product";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { NotfoundSearch } from "./NotFound";
import { SearchHistory } from "Actions/products/action";
import "./Search.scss";
import { PageSection } from "components/LandingPageCard/PageSection";
import { fetchDashboardData } from "Actions/dashboard/action";
import ViewCartButton from "components/ViewCartButton";

export const SearchComponent = () => {
  const dispatch = useDispatch();

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const { Search_result, Search_loading, search_history } = useSelector(
    (state) => state.SearchListReducer
  );
  const data = useSelector(
    (state) => state?.DashboardReducer?.dashboardData?.data
  );
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const { loading } = useSelector((state) => state?.DashboardReducer);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("q");
  const id = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );

  useEffect(() => {
    if (
      searchParam !== null &&
      !Search_loading &&
      Search_result?.data?.length
    ) {
      dispatch(SearchHistory(searchParam));
    } else {
      console.log(Search_result);
    }
  }, [Search_result]);
  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
      if (id && id?.length>0) {
        dispatch(fetchDashboardData(null, id[0]?.idstore_warehouse));
      }
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // console.log(token_date < currentTimestamp);
      setIsTokenExpired(token_date < currentTimestamp);
      if (id && id?.length>0) {
        dispatch(fetchDashboardData(token, id[0]?.idstore_warehouse));
      }
    }
  }, [isTokenExpired, token, token_date, id]);

  console.log("Search_result?.data", data);
  return (
    <>
      {/* <main className="main"> */}
      <div
        className="container-fluid pb-16"
        // style={{ maxWidth: "1200px", margin: "0px auto" }}
      >
        <div>
          {Search_loading ? (
            <Loader />
          ) : (
            <>
              <>
                {Search_result?.data?.length == 0 ? null : (
                  <div className="free-del-text">
                    {searchParam == null ? (
                      <>
                        {search_history == null
                          ? ""
                          : "Recent Search for " + search_history}
                      </>
                    ) : (
                      "Showing results for " + searchParam
                    )}
                  </div>
                )}
              </>
              {search_history === null ? (
                <div>
                  <PageSection
                    title={"Deals of the day"}
                    productData={data?.products?.dealOfDay}
                    loading={loading}
                  />
                  <PageSection
                    title={"Most Popular"}
                    productData={data?.products?.mostPopular}
                    loading={loading}
                    isSeeall={true}
                  />

                  <PageSection
                    title={"Frequent Bought"}
                    productData={data?.products?.frequentBought}
                    loading={loading}
                    isSeeall={true}
                  />

                  <PageSection
                    title={"New Arrivals"}
                    productData={data?.products?.newArrival}
                    loading={loading}
                    isSeeall={true}
                  />
                </div>
              ) : (
                <>
                  {" "}
                  {Search_result?.data?.length == 0 ? (
                    <>
                      <NotfoundSearch />
                      <PageSection
                        title={"Deals of the day"}
                        productData={data?.products?.dealOfDay}
                        loading={loading}
                      />
                      <PageSection
                        title={"Most Popular"}
                        productData={data?.products?.mostPopular}
                        loading={loading}
                        isSeeall={true}
                      />

                      <PageSection
                        title={"Frequent Bought"}
                        productData={data?.products?.frequentBought}
                        loading={loading}
                        isSeeall={true}
                      />

                      <PageSection
                        title={"New Arrivals"}
                        productData={data?.products?.newArrival}
                        loading={loading}
                        isSeeall={true}
                      />
                    </>
                  ) : (
                    <div className="product-price-grid 11grid-column pt-3 pb-9">
                      {" "}
                      {Search_result?.data &&
                      Array.isArray(Search_result?.data) ? (
                        Search_result?.data?.map((product, index) => (
                          <div className="" key={index}>
                            <Product
                              prd={product}
                              key={product.idproduct_master}
                            />
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* </main> */}

      <ViewCartButton />
    </>
  );
};
