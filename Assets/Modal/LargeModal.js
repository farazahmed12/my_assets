import React from "react";
import { toast, ToastContainer } from "react-toastify";
import InputField from "../Input/InputField";
import Loader from "../PageChange/Loader";

function Modal({
  children,
  setModalVisible,
  modalVisible,
  title,
  subTitle,
  dataLength,
  moduslusLength,
  isSearchable = false,
  searchQuery = "",
  setSearchQuery = "",
  handleSearchSubmit,
  loading = false,
}) {
  const handleModalClose = () => {
    if (moduslusLength == undefined) {
      setModalVisible(!modalVisible);
    } else if (dataLength % moduslusLength == 0) {
      setModalVisible(!modalVisible);
    } else {
      toast.error(`Items length should be multiple of ${moduslusLength}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className={`${
        !modalVisible ? "hidden" : "flex flex-col"
      } absolute top-0  items-center justify-center p-10 inset-0 w-full h-full bg-[rgba(0,0,0,0.5)]`}
    >
      <div className="flex flex-col sm:flex-row justify-between border-b-2 items-center w-full p-4 relative bg-white">
        <div>
          <p className="text-sm font-medium text-gray-900  dark:text-white mb-2 uppercase">
            {title}
          </p>
          <p className="text-xs font-medium text-gray-500">{subTitle}</p>
        </div>

        {isSearchable && (
          <form
            onSubmit={(e) => handleSearchSubmit(e)}
            className="flex flex-row justify-center items-end mr-0 sm:mr-20 my-4 sm:my-0"
          >
            <InputField
              type={"text"}
              label={"Search"}
              width="w-full"
              placeholder={"Search Here..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              parentCustomStyles="w-[14rem] sm:w-[20rem] "
            />

            <i
              itemType="submit"
              onClick={(e) => handleSearchSubmit(e)}
              className="fas fa-magnifying-glass text-2xl m-2  cursor-pointer"
            ></i>
          </form>
        )}

        <div className="absolute top-2 right-2">
          {dataLength > 0 ? (
            <div
              onClick={handleModalClose}
              className="bg-[#0283c3] uppercase py-1 px-2 cursor-pointer text-white rounded"
            >
              OK
            </div>
          ) : (
            <div
              className=" bg-black text-white px-3 mb-2 rounded cursor-pointer"
              onClick={() => setModalVisible(!modalVisible)}
            >
              x
            </div>
          )}
        </div>
      </div>
      <div className=" flex flex-col bg-white p-5 w-full h-full overflow-y-auto ">
        {loading == true ? <Loader /> : children}
      </div>
    </div>
  );
}

export default Modal;
