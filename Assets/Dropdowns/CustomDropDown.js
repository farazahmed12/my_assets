import React, { useState, useRef } from "react";

const CustomDropdown = ({
  onClickSelect,
  options,
  selected,
  showDropdown,
  setshowDropdown,
  refer,
  width = "w-[10rem] sm:w-[15rem]",
  widthListItem = " w-[10rem] sm:w-[15rem]",
  heightList = "",
  zIndex,
  label = "",
}) => {
  return (
    <div
      className={`overflow-y-visible h-12 sm:h-20 ${zIndex} mr-2  `}
      ref={refer}
    >
      {label && (
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white uppercase"
        >
          {label}
        </label>
      )}
      <div
        onClick={setshowDropdown}
        className={`text-white ${width} cursor-pointer bg-[#0283c3]  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center`}
        type="button"
      >
        <div className="flex flex-row justify-between items-center">
          <p>{selected ? selected.label : "All"}</p>

          <i className="fas fa-angle-down mx-2"></i>
        </div>
      </div>

      <div
        className={`${
          showDropdown ? "" : "hidden "
        } bg-white  divide-y divide-gray-100 rounded-lg shadow ${widthListItem} `}
      >
        <ul
          className={`py-2 rounded-lg text-sm text-gray-700  overflow-y-auto ${heightList}`}
        >
          {options?.map((opt, i) => {
            return (
              <li
                key={i}
                onClick={() => onClickSelect(opt)}
                className=" block cursor-pointer px-4 py-2 hover:bg-[#0283c3] hover:text-[white]  "
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomDropdown;
