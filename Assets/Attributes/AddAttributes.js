import React, { useState } from "react";

const AddAttributesInput = ({ attributes, setAttributes }) => {
  const handleAddAttribute = (e) => {
    e.preventDefault();
    const Temp = attributes == null ? [] : [...attributes];
    Temp.push({ name: "", options: [{ value: "" }] });

    setAttributes(Temp);
  };

  const handleAttributeNameChange = (index, event) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].name = event.target.value;
    setAttributes(updatedAttributes);
  };

  const handleOptionValueChange = (attributeIndex, optionIndex, event) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[attributeIndex].options[optionIndex].value =
      event.target.value;
    setAttributes(updatedAttributes);
    // handleAddOption(event, attributeIndex);
  };
  const handleOptionValueChangeAdition = (
    attributeIndex,
    optionIndex,
    event
  ) => {
    handleAddOption(event, attributeIndex, event.target.value);
    event.target.value = "";
    event.target.blur();
    setTimeout(() => {
      document.getElementById(`id-${attributeIndex}-${optionIndex}`).focus();
    }, 100);
  };

  const handleAddOption = (e, attributeIndex, value = "") => {
    e.preventDefault();
    const updatedAttributes = [...attributes];
    updatedAttributes[attributeIndex].options.push({ value: value });
    setAttributes(updatedAttributes);
  };

  // delete value
  const handleValueDelete = (e, attributeIndex, optionIndex) => {
    let updatedAtt = [...attributes];
    const newArray = updatedAtt[attributeIndex].options.filter(
      (x, i) => i != optionIndex
    );
    updatedAtt[attributeIndex].options = newArray;
    setAttributes(updatedAtt);
  };

  // delete attribute
  const handleAttributeDelete = (id) => {
    let updatedArray = [...attributes];
    const newArr = updatedArray.filter((item, i) => i != id);
    console.log("newArr ==>", newArr);
    setAttributes(newArr);
  };

  return (
    <div>
      <div>
        {attributes?.map((attribute, attributeIndex) => (
          <div key={attributeIndex}>
            <div className="flex flex-row items-center">
              <input
                type="text"
                placeholder="Title"
                value={attribute.name}
                className="my-2 w-11/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) =>
                  handleAttributeNameChange(attributeIndex, event)
                }
              />
              <i
                className="fas fa-trash cursor-pointer ml-4"
                onClick={() => handleAttributeDelete(attributeIndex)}
              ></i>
            </div>

            {attribute?.options?.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex flex-row items-center space-x-4"
              >
                <input
                  key={optionIndex}
                  id={`id-${attributeIndex}-${optionIndex}`}
                  type="text"
                  value={option.value}
                  placeholder="Add Attributes"
                  className="my-2 w-10/12 sm:w-10/12 ml-4 sm:ml-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(event) =>
                    handleOptionValueChange(attributeIndex, optionIndex, event)
                  }
                />
                {attribute?.options?.length > 1 && (
                  <i
                    className="fas fa-trash cursor-pointer"
                    onClick={(e) =>
                      handleValueDelete(e, attributeIndex, optionIndex)
                    }
                  ></i>
                )}
              </div>
            ))}
            {attribute?.options?.length > 0 && (
              <div className="flex flex-row items-center space-x-4">
                <input
                  type="text"
                  placeholder="Add Attributes"
                  className="my-2 w-10/12 md:w-8/12 lg:w-10/12 sm:w-10/12 ml-4 sm:ml-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(event) =>
                    handleOptionValueChangeAdition(
                      attributeIndex,
                      attribute.options.length,
                      event
                    )
                  }
                />
              </div>
            )}
            <div className="grid justify-end">
              <button
                className="rounded-full text-white text-1xl bg-[#0283c3] hover:opacity-95 w-[2rem] h-[2rem]"
                onClick={(e) => handleAddOption(e, attributeIndex)}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <button
          className="my-2 text-white bg-[#0283c3]  focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2  "
          onClick={handleAddAttribute}
        >
          Add Attributes
        </button>
      </div>
    </div>
  );
};

export default AddAttributesInput;
