
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewCartButton = () => {
    
    const navigate = useNavigate();
    // View Cart button
    const { cart_result, cart_id, fetch_cart } = useSelector(
        (state) => state.CartReducer
    );
    const total = cart_result?.length
        ? cart_result.reduce(
            (accumulator, currentValue) => accumulator + currentValue.quantity,
            0
        )
        : 0;

    const NaviMyCart = () => {
        navigate("/mycart");
    };

    return (
        <div className="mobile-view" onClick={NaviMyCart}>
            <div className="view-cart-btn">
                <div className="shoppig flex gap-2 items-center">
                    <ShoppingCartOutlinedIcon className="cart-icon" />
                    <div>
                        <span>{total && total + " items"}</span>
                        {/* {!cart_loading && ( */}
                        {total > 0 && fetch_cart?.total && (
                            <h6 className="amount mb-0">
                                ₹
                                {new Intl.NumberFormat("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(fetch_cart?.total.grand)}
                            </h6>
                        )}

                        {/* ) } */}
                    </div>
                </div>
                <div className="view">
                    <span>
                        View Cart
                        <ArrowRightOutlinedIcon />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ViewCartButton
