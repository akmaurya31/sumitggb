import React,{ useEffect, useMemo, useState } from "react";
import "react-responsive-modal/styles.css";
import "tailwindcss/tailwind.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AddressPost,
  fetchAllAddressData,
  updateAddressPost,
} from "Actions/address/action";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import axios from "axios";


const AddressForm = ({ addressDetails, isReadOnly, isLoader, onAddressSubmit,onCloseModal,gmapData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedTag, setSelectedTag] = useState(addressDetails.tag || "Home");
  const [issetLoader, setLoader] = useState(false);
  const [addressDetails2, setAddressDetails2] = useState({...addressDetails});
  const dispatch = useDispatch();
  const [alertAddAddress, setAlertAddAddress] = useState(false);
  const [alertUpdateAddress, setAlertUpdateAddress] = useState(false);
  const [open, setOpen] = useState(false);


  const onOpenModal = (data) => {
    // reset()
    setOpen(true);
    // setAdd(true);
    // setEdit(false)
  };

  // const token = ""; // Assuming token comes from props
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );

  const handleAddressChange = (value) => {
    setAddressDetails2((prevDetails) => ({
      ...prevDetails, // Keep previous details
      ...value // Update the address details with the new value
    }));
  };
  const setAddressDetails= (value) => {
    console.log(addressDetails.name,value,"valuevalue")
  };

  const selectTag = (tag) => {
    setSelectedTag(tag);
    setAddressDetails({ ...addressDetails, tag });
  };


  const onAddressSubmit1 = async (data) => {
      setLoader(true)
      setAlertUpdateAddress(false);
      setAlertAddAddress(false);
      if (true) {
      //  const axis = await handleGeocode(data.address);

        data.lat=gmapData?.lat;  //wtihout pass by form
        data.long=gmapData?.lng;
        // data.lat=
        // data.long=
        data.status = 1;
        data.tag = selectedTag?selectedTag:addressDetails2?.tag;
        if (addressDetails2?.idcustomer_address) {
          data.id =  addressDetails2?.idcustomer_address;
          
          await dispatch(
            updateAddressPost(token, "api/customer-address", data)
          );
          await dispatch(fetchAllAddressData(token, "customer-address"));
          await onCloseModal();
        }else{
          await setOpen(false);
          await dispatch(AddressPost(token, "api/customer-address", data));
          await dispatch(fetchAllAddressData(token, "customer-address"));
          await onCloseModal();
        }

      }
  };
 

  return (
    <div className="col-span-6 sm:col-span-12 sm:px-2">
      <form className="m-2" onSubmit={handleSubmit(onAddressSubmit1)}>
        <h4 className="text-black text-xl font-extrabold">Enter complete address</h4>
        <p className="text-sm text-gray-500">
          This allows us to find you easily and give you a timely delivery experience.
        </p>

        {/* Name Input */}
        <div className="mb-1">
          <input
            className="input-style-address w-full h-10  rounded p-2 border-[2px] border-[#d6d6d6]"
            readOnly={isReadOnly}
            {...register("name", { required: "First Name is required" })}
            value={addressDetails2.name}
            onChange={(e) => handleAddressChange({ ...addressDetails2, name: e.target.value })}
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Address Input */}
        <div className="mb-1">
          <input
            className="input-style-address w-full h-10 border-[2px] rounded p-2"
            readOnly={isReadOnly}
            {...register("address", { required: "Address is required" })}
            value={gmapData && gmapData.address!=null ? gmapData.address : addressDetails2.address}
            onChange={(e) => handleAddressChange({ ...addressDetails2, address: e.target.value })}
            placeholder="Address"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        {/* Landmark Input */}
        <div className="mb-1">
          <input
            className="input-style-address w-full h-10 border-[2px] rounded p-2"
            readOnly={isReadOnly}
            {...register("landmark")}
            value={addressDetails2.landmark}
            onChange={(e) => handleAddressChange({ ...addressDetails2, landmark: e.target.value })}
            placeholder="Landmark"
          />
          {errors.landmark && <p className="text-red-500 text-sm">{errors.landmark.message}</p>}
        </div>

        {/* Pincode Input */}
        <div className="mb-1">
          <input
            className="input-style-address w-full h-10 border-[2px] rounded p-2"
            readOnly={isReadOnly}
            {...register("pincode", { required: "Pincode is required" })}
            value={addressDetails2.pincode}
            onChange={(e) => handleAddressChange({ ...addressDetails2, pincode: e.target.value })}
            placeholder="Pincode"
          />
          {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
        </div>

        {/* Phone Input */}
        <div className="mb-1">
          <input
            className="input-style-address w-full h-10 border-[2px] rounded p-2"
            readOnly={isReadOnly}
            {...register("phone", {
              required: "Mobile No is required",
              maxLength: { value: 10, message: "Mobile No should have 10 digits" },
              minLength: { value: 10, message: "Mobile No should have 10 digits" },
            })}
            value={addressDetails2.phone}
            onChange={(e) => handleAddressChange({ ...addressDetails2, phone: e.target.value })}
            placeholder="Phone"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Is Default Address Checkbox */}
        <div className="flex items-center mb-1">
          <input
            className="form-checkbox border-[2px] rounded h-4 w-4 mr-2"
            defaultChecked={addressDetails2.is_default}
            type="checkbox"
            {...register("is_default")}
            onChange={(e) => handleAddressChange({ ...addressDetails2, is_default: e.target.checked })}
          />
          <label className="text-sm">Is Default Address?</label>
        </div>

        {/* Save address as */}
        <span className="text-sm text-gray-500">Save address as</span>
        <ul className="flex space-x-4 my-2">
          {["Home", "Work", "Other"].map((tag) => (
            <li key={tag} className="border-[2px] border-[#d6d6d6] rounded">
              <a
                className={`cursor-pointer   ${selectedTag === tag ? "font-bold text-green-600 " : "text-gray-600"}`}
                onClick={() => selectTag(tag)}
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>

        <input
          type="hidden"
          {...register("tag", { required: "Tag is required" })}
          value={selectedTag}
        />
        {errors.tag && <p className="text-red-500 text-sm">{errors.tag.message}</p>}

        {/* Submit Button */}
        <div className="text-center mt-5 mx-4">
          {isLoader ? (
            <button
              className="bg-gray-400 text-white cursor-not-allowed w-full py-2  rounded mx-2"
              disabled
            >
              <ClipLoader color="white" size={20} />
            </button>
          ) : (
            <button className="bg-green-700 text-white w-full py-2 hover:bg-green-800 rounded mx-2">
              Save Address
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
