import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import { CardSkeleton } from "components/LandingPageCard/CardSkeleton";
import product_1_1 from "../../styles/imgs/shop/product-1-1.jpg";
import no_image from "../../assets/images/no-image.jpeg";

import SectionTitle from "components/SectionTitle/SectionTitle";
import "./CategorySection.scss";

const CategorySection = ({ data, loading, title, seeall, brand, url }) => {
  const skl = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const CardItem = ({ logo, index, domain, url }) => {
    // console.log('logo',logo)
    let val1='';
    if(url=='brand'){
      val1=logo.idbrand
    }else if(url=='category'){
      val1=logo.idcategory
    }else if(url=='sub_category'){
      val1=logo.idsub_category
    }


    return (
      <div className="img-box ">
        <div
          key={index}
          className={`LL31 card-2 LL31  overflow-hidden bg-11  brand-class flex flex-col justify-center items-center`}

          // style={{marginBottom:0,padding:10}}
        >
          <figure className="img-hover-scale overflow-hidden">
            <Link
              to={{
                pathname: "products",
                search: `${url}=` + logo.name.replace(/\s+/g, "-"),
              }}
              state={{
                value:
                  url == "sub_category"
                    ? logo.idsub_category
                    : url == "brand"
                    ? logo.idbrand
                    : logo.idcategory,
                type: url,
              }}
              attr50={JSON.stringify(logo)}
            >
              <img
                src={
                  logo.image === "no-image.png" || logo.image === "no-name.png"
                    ? no_image
                    : domain + logo.image
                }
                alt={logo.description}
              />
            </Link>
          </figure>
        </div>
        <h6 className="heading-sm-1 LL54">
          <Link
            to={{
              pathname: "products",
              search: `${url}=` + logo.name.replace(/\s+/g, "-"),
            }}
            state={{ value: val1, type: url }}
            className="text-decoration-none"
            attr1={JSON.stringify(logo)}
            attr2={url}
            style={{ fontSize: 12 }}
          >
            {logo.name}
          </Link>
        </h6>
      </div>
    );
  };
  return (
    <>
      <SectionTitle title={title} seeall={seeall} data={data} />

      {loading ? (
        <div className="category-cards grid gap-3 11flex  11mb-4">
          {skl?.map((sk, index) => (
            <CardSkeleton height={120} width={""} key={index} />
          ))}
        </div>
      ) : (
        <div
          className="category-cards grid banner-img mb-sm-0 relative wow animate__animated animate__fadeInUp"
          // style={{ flexFlow: "wrap" }}
          data-wow-delay=".8s"
        >
           
          {brand
            ? data
                ?.slice(0, 10)
                .map((logo, index) => (
                  <>
                    {/* <span>bbnnm1{JSON.stringify(logo)}</span> */}
                    <CardItem
                      logo={logo}
                      key={index}
                      index={index}
                      domain={process.env.REACT_APP_BRANDS_URL}
                      url={url}
                    />
                  </>
                ))
            : data?.map((logo, index) => (
              <>
               {/* <span>bbnnm1{JSON.stringify(logo)}</span> */}
                <CardItem
                  logo={logo}
                  index={index}
                  key={index}
                  domain={process.env.REACT_APP_CATEGORY_URL}
                  url={url}
                />
                </>
              ))}
        </div>
      )}
    </>
  );
};
export { CategorySection };
