import React, { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { BASE_URL } from "src/base_url";
import { toast } from "react-toastify";
import ImageListing from "./ImageListing";
import SmallLoader from "../PageChange/SmallLoader";

function GalleryModal({
  setModalVisible,
  modalVisible,
  selectedImages,
  setSelectedImages,
  fetchedSingleProduct,
  userRole,
}) {
  // states
  const [tab, setTab] = useState("browse");
  const [imageFiles, setImageFiles] = useState([]);
  const [browseImageURL, setbrowseImageURL] = useState([]);
  const [galleryID, setgalleryID] = useState("");
  const [deleteImages, setdeleteImages] = useState([]);
  const [loading, setloading] = useState(false);
  let userID;

  // get users
  const getUserData = () => {
    if (typeof window !== "undefined") {
      const usrData = localStorage.getItem("userData");
      return usrData ? JSON.parse(usrData) : {};
    }
    return {};
  };
  const userData = useState(getUserData)[0];

  const config = {
    headers: {
      Authorization: `Bearer ` + userData?.jwt,
    },
  };
  const config1 = {
    headers: {
      Authorization: `Bearer ` + userData?.jwt,
      "Content-Type": "multipart/form-data",
    },
  };

  if (userRole == "ADMIN") {
    userID = fetchedSingleProduct?.data?.attributes?.seller?.data?.id;
  } else if (userRole == "SELLER") {
    userID = userData?.seller?.id;
  }

  // handle get images for specific seller
  const getImagesforGallery = (sellerId) => {
    axios
      .get(
        `${BASE_URL}/api/image-galleries/${sellerId}?populate[0]=all_media`,
        config
      )
      .then((res) => {
        setbrowseImageURL(res?.data?.data?.attributes?.all_media?.data);
        if (fetchedSingleProduct?.data?.attributes.product_images == null) {
          setSelectedImages([]);
        } else {
          setSelectedImages(
            res?.data?.data?.attributes?.all_media?.data.filter((x) =>
              fetchedSingleProduct?.data?.attributes.product_images.some(
                (y) => y == x.attributes.url
              )
            )
          );
        }
      })
      .catch((error) => {
        toast.error(error?.message, { autoClose: 2000 });
      });
  };

  // handle get gallery ID
  const getGalleryId = () => {
    axios
      .get(`${BASE_URL}/api/sellers/${userID}?populate[0]=gallery`, config)
      .then((res) => {
        const sellerID = res?.data?.data?.attributes?.gallery?.data?.id;

        setgalleryID(sellerID);
        getImagesforGallery(sellerID);
      })
      .catch((error) => {
        toast.error(error?.message, { autoClose: 2000 });
      });
  };

  // handle delete Image from URL (pushing to array)
  const handleDeleteImagefromURL = (id) => {
    deleteImages.push(id);

    const filArray = browseImageURL.filter((x) => x?.id != id);
    setbrowseImageURL(filArray);
  };

  useEffect(() => {
    getGalleryId();
  }, [tab]);

  // handle image upload
  const handleImageUpload = () => {
    if (imageFiles.length > 0 && tab == "upload") {
      setloading(true);
      const formData = new FormData();
      imageFiles.map((img) => formData.append("files.all_media", img));
      formData.append("data", JSON.stringify({}));
      axios
        .put(`${BASE_URL}/api/image-galleries/${galleryID}`, formData, config1)
        .then((res) => {
          toast.success("Images Uploaded Successfully", { autoClose: 2000 });
        })
        .catch((error) => {
          toast.error(error?.message, { autoClose: 2000 });
        })
        .finally(() => {
          setloading(false);
          setImageFiles([]);
          setTab("browse");
          setSelectedImages([]);
        });
    } else {
      toast.error("Atleast one image must be uploaded", { autoClose: 2000 });
    }
  };

  // image delete
  const handleImageDelete = () => {
    setloading(true);
    for (let index = 0; index < deleteImages.length; index++) {
      axios
        .delete(`${BASE_URL}/api/upload/files/${deleteImages[index]}`, {
          headers: {
            Authorization: `Bearer ` + userData?.jwt,
          },
        })
        .then((res) => {
          if (deleteImages[deleteImages.length - 1] == deleteImages[index]) {
            toast.success("Images Deleted Successfully");
          }
        })
        .catch((error) => {
          toast.error(error.message, { autoClose: 2000 });
        });
    }
  };

  return (
    <div
      className={`${
        !modalVisible ? "hidden" : "flex  flex-col"
      }  fixed  items-center justify-center p-10 inset-0 w-full h-full bg-[rgba(0,0,0,0.5)]`}
    >
      <div className=" flex flex-col relative bg-white p-5 w-full md:w-10/12 h-5/5 overflow-y-auto">
        <div className="flex flex-row justify-end space-x-3 sm:space-x-6 ">
          {deleteImages.length > 0 && (
            <div
              className=" bg-red-600 text-white text-sm sm:text-md w-24 flex justify-center items-center hover:scale-105 duration-150  py-1 mb-2 rounded cursor-pointer uppercase"
              onClick={() => {
                handleImageDelete();
                setImageFiles([]);
                setdeleteImages([]);
                setloading(false);
                setModalVisible(!modalVisible);
              }}
            >
              {loading ? (
                <SmallLoader width="w-4" height="h-4" />
              ) : (
                `delete ( ${deleteImages.length} )`
              )}
            </div>
          )}
          <div
            className=" bg-black text-white text-sm sm:text-md w-16 flex justify-center items-center hover:scale-105 duration-150 px-2 py-1 mb-2 rounded cursor-pointer uppercase"
            onClick={() => {
              setModalVisible(!modalVisible);
              setImageFiles([]);
              setdeleteImages([]);
              setSelectedImages([]);
            }}
          >
            <span>cancel</span>
          </div>{" "}
          <div
            className=" bg-[#0283c3] text-white w-16 flex justify-center items-center text-sm sm:text-md hover:scale-105 duration-150 px-2 py-1 mb-2 rounded cursor-pointer uppercase"
            onClick={() => {
              if (tab == "upload") {
                // POST

                handleImageUpload();
              } else if (tab == "browse") {
                setModalVisible(!modalVisible);
                setdeleteImages([]);
              }
            }}
          >
            {loading ? <SmallLoader width="w-4 h-4 " /> : "finish"}
          </div>
        </div>

        <div className="mb-4 border-b border-gray-200 ">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="mr-2">
              <button
                className={`inline-block p-2 sm:p-3 ${
                  tab == "browse"
                    ? "bg-gray-200 "
                    : " hover:bg-gray-50 border-transparent"
                } rounded-t-lg uppercase text-gray-500`}
                type="button"
                onClick={() => setTab("browse")}
              >
                Browse
              </button>
            </li>
            <li className="mr-2">
              <button
                className={`inline-block p-2 sm:p-3  ${
                  tab == "upload"
                    ? "bg-gray-200"
                    : "hover:bg-gray-50 border-transparent "
                } rounded-t-lg uppercase text-gray-500`}
                type="button"
                onClick={() => setTab("upload")}
              >
                Upload
              </button>
            </li>
          </ul>
        </div>
        <div>
          {/* images browse tab */}
          {tab == "browse" && (
            <div className="p-4 rounded-lg bg-gray-100">
              <ImageListing
                data={browseImageURL}
                handleDeleteImagefromURL={handleDeleteImagefromURL}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            </div>
          )}

          {/* upload tab */}
          {tab == "upload" && (
            <div className=" p-4 rounded-lg bg-gray-100">
              <ImageUploader
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
              />
              {/* <p className="text-sm text-gray-500 ">
                This is some placeholder content the{" "}
                <strong className="font-medium text-gray-800 ">Upload</strong>.
              </p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;
