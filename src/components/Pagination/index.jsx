import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Pagination = (props) => {
    const { totalPage, pageNo, ChangePageProducts } = { ...props };
    const [dynamicArray, setDynamicArray] = useState([]);
    useEffect(() => {
        setDynamicArray(Array.from({ length: totalPage }, (_, index) => index + 1));
    }, [totalPage]);
    // console.log({ totalPage, pageNo, dynamicArray });

    const ShowOption = [
        { value: "100", label: "100" },
        { value: "150", label: "150" },
        { value: "200", label: "200" },
      ];
      const SortByOption = [
        { value: "Low to High", label: "Low to High" },
        { value: "High to Low", label: "High to Low" },
        { value: "Release Date", label: "Release Date" },
        { value: "Avg. Rating", label: "Avg. Rating" },
      ];
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-start">
                {(pageNo > 1) && <li className="page-item" onClick={() => ChangePageProducts(pageNo - 1)}>
                    <Link className="page-link" to="#"><i className="fi-rs-arrow-small-left"></i></Link>
                </li>}
                {dynamicArray.map((item,index) => (
                    <li className={(pageNo == item) ? "page-item active" : "page-item"} key={index} onClick={() => ChangePageProducts(item)}>
                        <Link className="page-link" to="#">{item}</Link>
                    </li>
                ))}
                {(pageNo != totalPage) && <li className="page-item" onClick={() => ChangePageProducts(pageNo + 1)}>
                    <Link className="page-link" to="#"><i className="fi-rs-arrow-small-right"></i></Link>
                </li>}
            </ul>
        </nav>
    );
};

export default Pagination;