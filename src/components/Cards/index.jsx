import { FormatDateTime } from "components/DateTimeFormate"
import moment from "moment"

export const CardMember = ({ children, className }) => {
  return (
    <div className={`bg-[#E9F0DF] rounded-[25px] ${className}`}>
      {children}
    </div>
  )
}

export const BorderBox = ({ children, className }) => {
  return (
    <div className={`border-[1px] border-solid border-[#eee] ${className}`}>
      {children}
    </div>
  )
}
export const CouponCard = ({ coupon, className }) => {
  return (
    <div className="coupon-card bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2 px-3 rounded-lg shadow-lg max-w-md mx-auto w-full">

      <div className="text-2xl font-bold mb-2">
        {coupon?.name}
      </div>
      {/* <BadgePro PR={coupon?.discount_percentage} /> */}
      <div className="text-base mb-1">Get <span className="text-yellow-400 font-bold">{coupon?.discount_percentage}% OFF</span> your next purchase!</div>

      <div className="mt-3 mb-2">
        <p className="text-slate-100 text-xs mb-0">Maximum Amount <span className="font-semibold text-yellow-400">₹{coupon?.uptomax_amount}</span></p>
        <p className="text-slate-100 text-xs mb-1">Expire On {" "}
        {/* <span className="font-semibold text-yellow-400">{moment(coupon?.active_till).format("DD/MM/YYYY")}</span> */}
        <span className="font-semibold text-yellow-400">{FormatDateTime({text: coupon?.active_till, isTime: false})}</span>
        </p>
      </div>
      <div className="">
        <button className="button text-decoration-none btn-sm flex items-center gap-3  bg-white">Apply</button>
      </div>
    </div>
  )
}
export const NoDataFound = ({ title, className }) => {
  return (
    <div className={`h-40 flex justify-center items-center border-solid border-[0.1px] border-[#00000014] ` + className}>
      <h6 className="text-base text">{title}</h6>{" "}
    </div>
  )
}

