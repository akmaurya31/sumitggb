import { Img } from "components";
import Prod1 from 'styles/imgs/shop/product-1-1.jpg'
export const CartCard = ({ productData, loading }) => {
  // console.log(productData);
  return (
    <div>
      <div className="cart-card">
        <div className="image-container">
          {/* <span className="card-badge bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 text-center">{title}</span> */}
          <div className="image-container2">

            <Img src={productData?.barcode ? process.env.REACT_APP_PRODUCTS_URL + productData.barcode + ".jpg" : Prod1
            }
              alt={productData?.description}
              onError={(e) => {
                e.target.src = Prod1;
              }} />
          </div>
        </div>
        <div className="card-title-con">
          <div className="card-title-con1">
            <div className="card-item-title">{productData.prod_name}</div>
            <div>
              <span className="card-price">₹{productData.selling_price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};