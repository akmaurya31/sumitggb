import Product from "components/Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";

import product_1_1 from "../../styles/imgs/shop/product-1-1.jpg";
import { CardSkeleton } from "components/LandingPageCard/CardSkeleton";
import "../LandingPageCard/CategorySection.scss"
import "./TopCategory.scss"
import no_image from "../../assets/images/no-image.jpeg";

export const TopCategory = ({ title, data, loading, isSeeall, url }) => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
    },

    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };


  const CardItem = ({ logo, index, domain, url }) => {
    
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
          className={`LL42 card-2 LL31  overflow-hidden bg-11  brand-class flex flex-col justify-center items-center `}
          // style={{marginBottom:0,padding:10}}
        >
          <figure className="img-hover-scale overflow-hidden">
            <Link
              to={{
                pathname: "products",
                search: `${url}=` + logo.name.replace(/\s+/g, "-"),
                // search: `id=${logo?.idsub_category}&${url}=` + logo.name.replace(/\s+/g, "-"),
              }}
              state={{ value:val1, type: url }}
              attr61={JSON.stringify(logo)}
              attr62={url}
              attr63={val1}
            >
              <img
                src={
                  logo.image === "no-image.png" || logo.image === "no-name.png" ||
                  logo.sub_cat_img === "no-image.png" || logo.subcat_icon === "no-name.png"
                    ? no_image
                    : domain + logo.sub_cat_img
                }
                alt={logo.description}
              />
            </Link>
          </figure>
        </div>
        <h6 className="heading-sm-1 ">
          <Link
            to={{
              pathname: "products",
              search: `${url}=` + logo.name.replace(/\s+/g, "-"),
            }}
            state={{ value: val1, type: url }}
            className="text-decoration-none"
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
        <div className="category-cards top-category">
          {loading ? (
            <Carousel responsive={responsive}>
              <CardSkeleton height={240} width={""} />
              <CardSkeleton height={240} width={""} />
              <CardSkeleton height={240} width={""} />
              <CardSkeleton height={240} width={""} />
              <CardSkeleton height={240} width={""} />
            </Carousel>
          ) : (
            <Carousel responsive={responsive}>
              {data?.map((prd, index) => {
                return (
                  <CardItem
                    logo={prd}
                    index={index}
                    key={index}
                    domain={process.env.REACT_APP_CATEGORY_URL}
                    url={url}
                  />
                );
              })}
            </Carousel>
          )}
        </div>
  
    </>
  );
};
