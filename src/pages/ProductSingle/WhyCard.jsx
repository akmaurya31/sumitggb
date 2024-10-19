import { Img } from "components";

export const WhyCard = ({ src, subTitle, subTitle2 }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="why-icon-wrp">
        <div className="why-icon-inline">
          <Img src={src} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="why-in-text">{subTitle}</span>
        <span className="why-in-text-2">{subTitle2}</span>
      </div>
    </div>
  );
};
