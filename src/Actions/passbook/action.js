// actions.js
import axios from "axios";

export const FETCH_PASSBOOK_REQUEST = "FETCH_PASSBOOK_REQUEST";
export const FETCH_PASSBOOK_SUCCESS = "FETCH_PASSBOOK_SUCCESS";
export const FETCH_PASSBOOK_FAILURE = "FETCH_PASSBOOK_FAILURE";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchDataRequest = () => ({
  type: FETCH_PASSBOOK_REQUEST,
});

const fetchDataSuccess = (data) => ({
  type: FETCH_PASSBOOK_SUCCESS,
  payload: data,
});

const fetchDataFailure = (error) => ({
  type: FETCH_PASSBOOK_FAILURE,
  payload: error,
});
export const fetchPassbookData = (token) => {
 
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const now = new Date();
      const validTill = now.toISOString().split('T')[0]; 
      // const validFrom = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]; 
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const validFrom = firstDayOfMonth.toLocaleDateString('en-GB').split('/').reverse().join('-'); 
      let data = JSON.stringify({
        valid_from: validFrom,
        valid_till: validTill,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/api/passbook`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      axios
        .request(config)
        .then((response) => {
          dispatch(fetchDataSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchDataFailure(error));
        });
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};

export const fetchPassbookData1 = (token) => {
 
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let data = JSON.stringify({
        valid_from: "",
        valid_till: "",
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/api/get-passbook`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      axios
        .request(config)
        .then((response) => {
          dispatch(fetchDataSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchDataFailure(error));
        });
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};


// export const fetchPassbookData = (token) => {
//   return async (dispatch) => {
//     dispatch(fetchDataRequest());
//     try {
//       const config = {
//         headers: {},
//       };

//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//       const response = await axios.post(`${BASE_URL}/api/get-passbook`, config);
//       dispatch(fetchDataSuccess(response.data));
//     } catch (error) {
//       dispatch(fetchDataFailure(error.message));
//     }
//   };
// };
