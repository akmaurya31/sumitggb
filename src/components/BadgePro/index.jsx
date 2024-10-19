import "./BadgePro.scss";

const BadgePro = ({PR}) => {
  return (
    <div class="ribbon">
        <span class="ribbon2">
          <label className="sm:text-[10px] text-xs mb-0" id="second-title">
            {PR}%
          </label>
          <label className="sm:text-[10px] text-xs mb-0" id="second-title">
            OFF
          </label>
        </span>
      </div>
  );
};

export default BadgePro;