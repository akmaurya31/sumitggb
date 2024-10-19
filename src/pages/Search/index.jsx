import React from "react";

import "../../styles/index.css";

import "../../styles/normalize.css";
import "../../styles/uicons-regular-straight.css";
import "../../styles/magnific-popup.css";
import "../../styles/select2.min.css";
import "../../styles/perfect-scrollbar.css";

import SearchHeader from "components/Search/SearchHeader";
import { SearchComponent } from "components/Search";
import "./SearchMain.scss"

const SearchPage = () => {
  return (
    <main className="main search ">
      <SearchHeader />
      <SearchComponent />
    </main>
  );
};

export default SearchPage;