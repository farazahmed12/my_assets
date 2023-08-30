import React from "react";

const ImageListing = ({
  data,
  // handleDeleteImagefromURL,
  selectedImages,
  setSelectedImages,
}) => {
  const handleSelect = (id, item) => {
    const includes = selectedImages.some((x) => x?.id == id);

    if (includes) {
      setSelectedImages(selectedImages.filter((x) => x?.id != id));
    } else {
      setSelectedImages([...selectedImages, item]);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center ">
      {data
        ?.sort((a, b) => b.id - a.id)
        ?.map((item, i) => (
          <div className="relative">
            <img
              key={i}
              className="w-40 h-40 object-cover cursor-pointer"
              onClick={() => handleSelect(item?.id, item)}
              src={item?.attributes?.url}
            />
            {/* <div
            onClick={() => handleDeleteImagefromURL(item?.id)}
            className=" absolute top-0 right-0 bg-red-400 rounded-full w-6 h-6 flex justify-center text-white cursor-pointer"
          >
            X
          </div> */}
            {selectedImages.some((x) => x.id == item?.id) && (
              <div
                onClick={() => handleDeleteImagefromURL(item?.id)}
                className=" absolute top-0 left-0 bg-[#0283c3] rounded-full w-6 h-6 flex justify-center text-white cursor-pointer"
              >
                {selectedImages.findIndex((x) => x?.id == item?.id) + 1}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ImageListing;
