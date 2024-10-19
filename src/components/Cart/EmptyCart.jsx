import { Img } from "components";
import EmptyImage from "assets/images/emp_empty_cart.png";
export const EmptyCart = () => {
  return (
    <div style={{ minHeight: "84vh", maxHeight: "100%" }}>
      <div
        className=" flex flex-col gap-4"
        style={{
          borderRadius: "15px",
          backgroundColor: "#fff",
          paddingLeft: 16,
          paddingTop: 12,
          paddingRight: 16,
          paddingBottom: 16,
        }}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <div style={{ width: 150, height: 150 }}>
            <Img src={EmptyImage} />
          </div>
          <h6 className="free-del-text" style={{ fontSize: 16 }}>
            You don't have any items in your cart
          </h6>
          <p className="ship-text" style={{ fontSize: 14 }}>
            Your favourite items are just a click away
          </p>
        </div>
      </div>
    </div>
  );
};
