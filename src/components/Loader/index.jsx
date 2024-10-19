import { BeatLoader, ClipLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div
      style={{
        height: "75vh",
        display: "flex",
        flexDirection: 'column',
        gap: '20px',
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h6>घर घर बाजार : सोच बदलो दुकान बदलो</h6>
      <ClipLoader color="rgb(12, 131, 31)" size={50} />
    </div>
  );
};
export const ButtonLoader = ({ size, color }) => {
  return <BeatLoader size={size} color={color} />;
};
