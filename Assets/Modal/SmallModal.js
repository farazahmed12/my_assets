import React from "react";
import { toast, ToastContainer } from "react-toastify";
import InputField from "../Input/InputField";
import Loader from "../PageChange/Loader";

function DeleteModal({
  setModalVisible,
  modalVisible,
  loading = false,
  setDeleteItem,
  deleteItem,
  handleDeleteItem,
  name,
}) {
  return (
    <div
      className={`${
        !modalVisible ? "hidden" : "flex  flex-col"
      }  fixed  items-center justify-center p-10 inset-0 w-full h-full bg-[rgba(0,0,0,0.5)]`}
    >
      <div className=" flex flex-col relative bg-white p-5 w-full md:w-5/12 h-54 overflow-y-auto  ">
        <div className="absolute top-2 right-2">
          <div
            className=" bg-black text-white px-3 mb-2 rounded cursor-pointer"
            onClick={() => {
              setModalVisible(!modalVisible);
              setDeleteItem([]);
            }}
          >
            x
          </div>
        </div>
        <h6 className="uppercase font-semibold text-gray-700 text-xl sm:text-2xl mb-1">
          Are you sure ?
        </h6>
        <br />
        <p className="text-md text-gray-600 font-semibold uppercase">
          {`You want to delete `}
          <span className="text-md text-gray-900 font-bold uppercase">
            {name}
          </span>
        </p>
        <div className="flex flex-row justify-center space-x-4 w-full mt-14">
          <button
            onClick={() => {
              setModalVisible(!modalVisible);
              handleDeleteItem(deleteItem[0]?.id);
            }}
            className="flex items-center  space-x-2 bg-[#0283c3] opacity-80 px-4 py-2  rounded-md group hover:opacity-100 transition-all duration-150 hover:scale-110  "
          >
            <i className="fas fa-circle-check text-xl text-white  group-hover:text-white "></i>
            <p className="text-md font-semibold uppercase text-white">delete</p>
          </button>
          <button
            onClick={() => {
              setModalVisible(!modalVisible);
              setDeleteItem([]);
            }}
            className="flex items-center  space-x-2 bg-black opacity-80 px-4 py-2  rounded-md group hover:opacity-100 transition-all duration-150 hover:scale-110  "
          >
            <i className="fas fa-circle-xmark text-xl text-white  group-hover:text-white "></i>
            <p className="text-md font-semibold uppercase text-white">cancel</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
