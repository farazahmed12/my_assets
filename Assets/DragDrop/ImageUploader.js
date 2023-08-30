import axios from "axios";
import React, { useState } from "react";

const ImageUploader = ({ imageFiles, setImageFiles }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFilesChange(files);
  };

  const handleFilesChange = (files) => {
    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFilesChange(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // delete image
  const handleDeleteImage = (e) => {
    const findOne = imageFiles.find((x) => x == e);
    const finfOneFilter = imageFiles.filter((x) => x !== findOne);
    setImageFiles(finfOneFilter);
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "50px",
          textAlign: "center",
        }}
        className="cursor-move "
      >
        <p>Drag & drop or click here to upload images</p>
      </div>

      <div className="flex flex-row justify-evenly gap-4 items-center">
        {" "}
        <hr className="my-4 w-full " />
        <p className="font-bold">OR</p>
        <hr className="my-4 w-full  " />
      </div>

      <div className="flex flex-row justify-center mb-2 ">
        <div className="self-center flex flex-col w-6/12">
          <input
            className=" w-12/12 text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
            id="multiple_files"
            type="file"
            ref={(input) => input && input.setAttribute("accept", "image/*")}
            multiple
            onChange={handleFileSelect}
          />
        </div>
      </div>
      <div className="h-60  overflow-y-scroll hover:overflow-y-auto">
        <div className="flex flex-row flex-wrap gap-4 mt-10 h-3/5  ">
          {imageFiles.length > 0 &&
            imageFiles.map((file, index) => (
              <div key={index} className="relative">
                <div
                  onClick={() => handleDeleteImage(file)}
                  className=" absolute top-0 right-0 bg-red-400 rounded-full w-6 h-6 flex justify-center text-white cursor-pointer"
                >
                  X
                </div>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded preview ${index + 1}`}
                  className="h-32 w-32 rounded  object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
