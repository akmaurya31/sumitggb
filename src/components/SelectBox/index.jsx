import React from "react";
import Select, { components } from "react-select";

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontFamily: data.label
    };
  },
}

const SelectBox = (props) => {

  const { options, handleChange, icon, defaultValue, className } = { ...props };
  const VALUE_PREFIX = props.valuePrefix;
  return (
    <Select
      options={options}
      // placeholder="All"
      defaultValue={defaultValue}
      onChange={handleChange}
      className="z-30"
      // isClearable
      components={{
        SingleValue: ({ children, ...props }) => {
          return (
            <components.SingleValue className={className} {...props}>
              <div className="item">{icon} {VALUE_PREFIX + children}</div>
            </components.SingleValue>
          );
        },

        Placeholder: ({ children, ...props }) => {
          return (
            <components.Placeholder {...props}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {icon}
                <div style={{ fontSize: 12 }}>{VALUE_PREFIX + children}</div>
              </div>
            </components.Placeholder>
          );
        },

        IndicatorSeparator: () => null,
      }}
      styles={{
        valueContainer: () => ({
          height: 30,
          minWidth: 110,
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,

        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: 10,
        }),
        option: (base, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...base,
            backgroundColor: isFocused ? "#e8e8e8" : "white",
            fontSize: 12,
            borderBottom: '1px solid #e8e8e8',
            padding: 8,
            color: isSelected ? '#0c831f' : '',
            cursor: isSelected ? 'default' : 'pointer',
          };
        },
      }}
    />
  );
};

export { SelectBox };
