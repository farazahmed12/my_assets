import React from "react";
import InputTextArea from "./InputTextArea";
import InputQuillEditor from "./InputQuillEditor";

const AddFeaturesInput = ({ features, setFeatures }) => {
  const handleAddFeature = (e) => {
    e.preventDefault();
    setFeatures([...features, { title: "", values: [""] }]);
  };

  const handleFeatureNameChange = (index, event) => {
    const updatedAttributes = [...features];
    updatedAttributes[index].title = event.target.value;
    setFeatures(updatedAttributes);
  };

  const handleOptionValueChange = (attributeIndex, optionIndex, event) => {
    const updatedAttributes = [...features];
    updatedAttributes[attributeIndex].values[optionIndex] = event;
    setFeatures(updatedAttributes);
  };

  const handleAddOption = (attributeIndex, e) => {
    e.preventDefault();
    const updatedAttributes = [...features];
    updatedAttributes[attributeIndex].values.push("");
    setFeatures(updatedAttributes);
  };

  // delete feature
  const handleDeleteFeature = (id) => {
    let updatedArr = [...features];
    const newArr = updatedArr.filter((item, i) => i != id);
    setFeatures(newArr);
  };

  // delete option
  const handleDeleteOption = (featureIndex, optionIndex) => {
    let updatedArray = [...features];
    const newArr = updatedArray[featureIndex].values.filter(
      (item, i) => i != optionIndex
    );
    updatedArray[featureIndex].values = newArr;

    setFeatures(updatedArray);
  };

  return (
    <div>
      <div>
        {features?.map((feature, featureIndex) => (
          <div key={featureIndex}>
            <div className="flex flex-row items-center">
              <input
                type="text"
                placeholder="Title"
                value={feature.title}
                className="my-2  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) =>
                  handleFeatureNameChange(featureIndex, event)
                }
              />
              <i
                className="fas fa-trash cursor-pointer ml-4"
                onClick={() => handleDeleteFeature(featureIndex)}
              ></i>
            </div>

            {feature.values.map((option, optionIndex) => {
              return (
                <div className="flex flex-row items-center justify-end">
                  <InputQuillEditor
                    value={option}
                    onChange={(event) => {
                      handleOptionValueChange(featureIndex, optionIndex, event);
                    }}
                    placeholder={"Add Features"}
                    key={optionIndex}
                  />

                  {feature.values.length > 1 && (
                    <i
                      className="fas fa-trash cursor-pointer ml-4"
                      onClick={() =>
                        handleDeleteOption(featureIndex, optionIndex)
                      }
                    ></i>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <button
          className="my-2 text-white bg-[#0283c3]  focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2  "
          onClick={(e) => handleAddFeature(e)}
        >
          Add Features
        </button>
      </div>
    </div>
  );
};

export default AddFeaturesInput;
