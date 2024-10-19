import React from "react";
import "./SectionTitle.scss";
import { Link } from "react-router-dom";

const SectionTitle = ({ title, seeall, data }) => {
  return (
    <div className="section-title wow animate__animated animate__fadeIn flex justify-between items-center ">
      {title && <h5 className="section-home-head mt-4 mb-0">{title}</h5>}

      {seeall && data?.length > 8 && (
        <Link to={seeall} className="seeall text-decoration-none">
          See all
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
