import React from "react";

const Img = ({
  className,
  src = "defaultNoData.png",
  alt = "testImg",
  style,
  ...restProps
}) => {
  
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      {...restProps}
      loading={"lazy"}
      style={style}
    />
  );
};
export { Img };
