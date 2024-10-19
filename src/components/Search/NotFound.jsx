import Notfound from "assets/images/notFoundSr.png";
import { Img } from "components";
export const NotfoundSearch = ({ isSearch }) => {
  return (
    <div className="searchNotfound">
      <div className="search-nt">
        <div className="search-wrp">
          {isSearch ? (
            <div className="search-not-text">
              Delivery Not available Please change location
            </div>
          ) : (
            <div className="search-not-text sm:text-xl">No search result found</div>
          )}
        </div>
      </div>
    </div>
  );
};
