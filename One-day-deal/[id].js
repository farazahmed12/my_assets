const Todaydeals = ({
  fetchedAll1Products,
  fetchedAllShops,
  error,
  error2,
  error3,
  query,
  fetchedSingleDeal,
}) => {
  const [dealName, setdealName] = useState("");
  const [bannerImage, setBannerImage] = useState([]);
  const [bannerImagePreview, setBannerImagePreview] = useState([]);
  const [startDateTimeStamp, setstartDateTimeStamp] = useState("");
  const [endDateTimeStamp, setendDateTimeStamp] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedAllSmallProducts, setFetchedAllSmallProducts] = useState(
    fetchedAll1Products?.map((item) => {
      return {
        ...item,
        selected: false,
      };
    })
  );
  const [fetchedAllMediumProducts, setfetchedAllMediumProducts] = useState(
    fetchedAll1Products?.map((item) => {
      return {
        ...item,
        selected: false,
      };
    })
  );
  const [fetchedallLargeProducts, setfetchedallLargeProducts] = useState(
    fetchedAll1Products?.map((item) => {
      return {
        ...item,
        selected: false,
      };
    })
  );
  const [fetchedAllShops1, setfetchedAllShops1] = useState(
    fetchedAllShops?.map((item) => {
      return {
        ...item,
        selected: false,
      };
    })
  );

  // router
  const router = useRouter();

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
      "Content-Type": "multipart/form-data",
    },
  };

  // handle product small select checkbox
  const handleSmallProductSelectCheck = (item) => {
    setFetchedAllSmallProducts((prevState) =>
      prevState?.map((x, i) => {
        if (x.id === item.id) {
          return {
            ...x,
            selected: !x.selected,
          };
        }
        return x;
      })
    );
  };
  // filtered small products
  const filteredSmallProducts = fetchedAllSmallProducts.filter(
    (x) => x.selected == true
  );
  // expected small products
  const expectedSmallProducts = filteredSmallProducts?.map((x) => ({
    id: x.id,
  }));

  // handle product medium select checkbox
  const handleMediumProductSelectCheck = (item) => {
    setfetchedAllMediumProducts((prevState) =>
      prevState?.map((x, i) => {
        if (x.id === item.id) {
          return {
            ...x,
            selected: !x.selected,
          };
        }
        return x;
      })
    );
  };

  // filterd medium products
  const filteredMediumProducts = fetchedAllMediumProducts.filter(
    (x) => x.selected == true
  );

  // expected medium products
  const expectedMediumProducts = filteredMediumProducts?.map((x) => ({
    id: x.id,
  }));

  // handle product Large select checkbox
  const handleLargeProductSelectCheck = (item) => {
    setfetchedallLargeProducts((prevState) =>
      prevState?.map((x, i) => {
        if (x.id === item.id) {
          return {
            ...x,
            selected: !x.selected,
          };
        }
        return x;
      })
    );
  };

  // filterd Large products
  const filteredLargeProducts = fetchedallLargeProducts.filter(
    (x) => x.selected == true
  );

  // expected medium products
  const expectedLargeProducts = filteredLargeProducts?.map((x) => ({
    id: x.id,
  }));

  const [selectedShops, setSelectedShops] = useState([]);

  // handle Shop select checkbox
  const handleShopSelectCheck = (item) => {
    const includes = selectedShops?.includes(item);

    if (includes) {
      setSelectedShops(selectedShops.filter((newItem) => newItem != item));
    } else {
      setSelectedShops([...selectedShops, item]);
      console.log(selectedShops);
    }

    // setfetchedAllShops1((prevState) =>
    //   prevState?.map((x, i) => {
    //     if (x.id === item.id) {
    //       return {
    //         ...x,
    //         selected: !x.selected,
    //       };
    //     }
    //     return x;
    //   })
    // );
  };

  // filtered shops
  const filterdShops = fetchedAllShops1.filter((x) => x.selected == true);

  // expected filtered shops
  const expectedFilteredShops = filterdShops?.map((x) => ({
    id: x.id,
  }));

  // handle Image remove
  const handleImageRemove = () => {
    setBannerImage([]);
    setBannerImagePreview([]);
  };

  // image upload
  const handleImageUpload = (e) => {
    let selectedFile = [];
    const targetFiles = e.target.files;

    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFile.push(URL.createObjectURL(file));
    });
    setBannerImage(targetFilesObject);
    setBannerImagePreview(selectedFile);
  };

  // modal states
  const [smallModalVisible, setSmallModalVisible] = useState(false);
  const [mediumModalVisible, setMediumModalVisible] = useState(false);
  const [largeModalVisible, setlargeModalVisible] = useState(false);
  const [shopModalVisible, setshopModalVisible] = useState(false);

  // Time Management
  const [dateStartValue, setStartDateValue] = useState("");
  const [timeStartValue, setStartTimeValue] = useState("00:00");
  const [dateEndValue, setEndDateValue] = useState("");
  const [timeEndValue, setEndTimeValue] = useState("23:59");
  const [startDateTimeSubmitted, setstartDateTimeSubmitted] = useState(false);
  const [endDateTimeSubmitted, setendDateTimeSubmitted] = useState(false);

  // getting start date
  const handleStartDateChange = (event) => {
    setStartDateValue(event.target.value);
  };

  // getting end date
  const handleEndDateChange = (event) => {
    setEndDateValue(event.target.value);
  };

  // handle start time
  const handleStartDateTimeSubmit = () => {
    const currentDate = new Date();

    if (dateStartValue != "" && timeStartValue != "") {
      const date = new Date(dateStartValue);
      const time = new Date(`1970-01-01T${timeStartValue}`);
      if (currentDate > date) {
        toast.error(`Entered date is earlier than today's date.`, {
          autoClose: 2000,
        });
      } else {
        const dateTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          time.getHours(),
          time.getMinutes(),
          time.getSeconds()
        );
        setstartDateTimeStamp(dateTime.toISOString());
        setstartDateTimeSubmitted(true);
      }
    } else {
      toast.error("Please Fill Start Date & Time Correctly", {
        autoClose: 2000,
      });
    }
  };

  // handle End time
  const handleEndDateTimeSubmit = () => {
    const currentDate = new Date();
    if (dateEndValue != "" && timeEndValue != "") {
      const startDate = new Date(dateStartValue);
      const date = new Date(dateEndValue);
      const time = new Date(`1970-01-01T${timeEndValue}`);
      if (startDate >= date || currentDate >= date) {
        toast.error(`Entered date is earlier than Starting date.`, {
          autoClose: 2000,
        });
        if (currentDate > date) {
          toast.error(`Entered date is earlier than Today's date.`, {
            autoClose: 2000,
          });
        }
      } else {
        const dateTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          time.getHours(),
          time.getMinutes(),
          time.getSeconds()
        );
        setendDateTimeStamp(dateTime.toISOString());
        setendDateTimeSubmitted(true);
      }
    } else {
      toast.error("Please Fill End Date & Time Correctly", { autoClose: 2000 });
    }
  };

  // small products
  const smallProducts = {
    placement: "small",
    products: {
      connect: expectedSmallProducts,
      disconnect: [],
    },
  };

  // medium products
  const mediumProducts = {
    placement: "medium",
    products: {
      connect: expectedMediumProducts,
      disconnect: [],
    },
  };

  // large products
  const largeProducts = {
    placement: "large",
    products: {
      connect: expectedLargeProducts,
      disconnect: [],
    },
  };

  // deal submit
  const handleDealSubmit = () => {
    const validateDate = {
      dealName,
      fetchedAllSmallProducts,
      fetchedAllMediumProducts,
      fetchedallLargeProducts,
      fetchedAllShops1,
      dateStartValue,
      dateEndValue,
    };

    const errorInput = todayDealsSchema.validate(validateDate, {
      abortEarly: false,
    });

    if (errorInput?.error?.details?.length > 0 || bannerImage.length == 0) {
      toast.error(errorInput?.error?.details[0]?.message, {
        autoClose: 2000,
      });
      if (bannerImage.length == 0) {
        toast.error("Deal Banner is required", {
          autoClose: 2000,
        });
      }
    } else {
      // const data = {
      //   startDateTime: "2023-08-11T19:00:00.000Z",
      //   endDateTime: "2023-08-13T18:59:00.000Z",
      //   name: "amazing 123",
      //   dealProducts: [
      //     {
      //       placement: "small",
      //       products: {
      //         connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      //         disconnect: [],
      //       },
      //     },
      //     {
      //       placement: "medium",
      //       products: {
      //         connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      //         disconnect: [],
      //       },
      //     },
      //     {
      //       placement: "large",
      //       products: {
      //         connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      //         disconnect: [],
      //       },
      //     },
      //   ],
      //   shops: { connect: [{ id: 4 }, { id: 3 }], disconnect: [] },
      // };
      const data = {
        startDateTime: startDateTimeStamp,
        endDateTime: endDateTimeStamp,
        name: dealName,
        dealProducts: [
          expectedSmallProducts.length > 0 && smallProducts,
          expectedMediumProducts.length > 0 && mediumProducts,
          expectedLargeProducts.length > 0 && largeProducts,
        ],
        shops: {
          connect: expectedFilteredShops,
          disconnect: [],
        },
      };

      // console.log("data ==>", JSON.stringify(data));

      let formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("files.dealMainBanner", bannerImage[0]);

      setLoading(true);
      axios
        .post(`${BASE_URL}/api/todays-deals`, formData, config)
        .then((res) => {
          toast.success("Deal Created Succesfully !", {
            autoClose: 1500,
            onClose: () => router.back(),
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message, {
            autoClose: 2000,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const stringifyData = {
    startDateTime: "2023-08-11T19:00:00.000Z",
    endDateTime: "2023-08-13T18:59:00.000Z",
    name: "amazing 123",
    dealProducts: [
      {
        placement: "small",
        products: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
          disconnect: [],
        },
      },
      {
        placement: "medium",
        products: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
          disconnect: [],
        },
      },
      {
        placement: "large",
        products: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
          disconnect: [],
        },
      },
    ],
    shops: { connect: [{ id: 4 }, { id: 3 }], disconnect: [] },
  };

  useEffect(() => {
    if (error || error2) {
      toast.error(error || error2, {
        autoClose: 2000,
      });
    }
  }, []);

  return (
    <>
      {query == "create" ? (
        <div className="min-h-screen relative">
          <Header
            name="Today Deals"
            buttonName={"Submit"}
            loading={loading}
            buttonOnClick={() => handleDealSubmit()}
          />
          <ToastContainer
            position="top-right"
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <div className="p-4">
            <div className="flex flex-wrap rounded-xl bg-white p-6 mx-0 my-4 py-8">
              {/* section 1 */}
              <div className="w-full lg:w-6/12 px-4 my-6">
                <div className="relative z-0 w-full mb-6 group	">
                  <InputField
                    value={dealName}
                    onChange={(e) => setdealName(e.target.value)}
                    type={"text"}
                    label={"Deal Name"}
                    placeholder={"Deal Name"}
                  />
                </div>
              </div>
              {/* section 2 Start date & Time */}
              <div className="w-full lg:w-6/12 px-4 my-6">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4  mb-6  	">
                  <InputField
                    parentCustomStyles={"grow"}
                    label={"Start Date"}
                    type={"date"}
                    value={dateStartValue}
                    onChange={handleStartDateChange}
                  />
                  <InputField
                    readOnly={true}
                    parentCustomStyles={"grow-0"}
                    inputCustomStyles={"cursor-not-allowed opacity-60"}
                    type={"time"}
                    label={"Start Time"}
                    value={timeStartValue}
                  />
                  {/* Sumbit Button */}
                  <div className="grow-0 self-end ">
                    <i
                      onClick={handleStartDateTimeSubmit}
                      className={`${
                        startDateTimeSubmitted ? "bg-green-300" : "bg-white"
                      } fa-solid fa-check p-3 rounded-full border cursor-pointer`}
                    ></i>
                  </div>
                </div>
              </div>
              {/* section 3 End Date & Time */}
              <div className="w-full lg:w-6/12 px-4 my-6">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 mb-6  	">
                  <InputField
                    parentCustomStyles={"grow"}
                    label={"End Date"}
                    type={"date"}
                    value={dateEndValue}
                    onChange={handleEndDateChange}
                  />
                  <InputField
                    readOnly={true}
                    parentCustomStyles={"grow-0"}
                    inputCustomStyles={"cursor-not-allowed opacity-60"}
                    type={"time"}
                    label={"End Time"}
                    value={timeEndValue}
                  />
                  {/* Sumbit Button */}
                  <div
                    className="grow-0 self-end "
                    onClick={handleEndDateTimeSubmit}
                  >
                    <i
                      className={`${
                        endDateTimeSubmitted ? "bg-green-300" : "bg-white"
                      } fa-solid fa-check p-3 rounded-full border cursor-pointer`}
                    ></i>
                  </div>
                </div>
              </div>
              {/* section 4 Shops */}
              <div className="w-full lg:w-6/12 px-4 my-6 ">
                <div className=" z-0 w-full mb-6 group	">
                  <div
                    className="bg-[#0283c3] hover:opacity-95 p-2 mt-8 rounded cursor-pointer flex flex-row justify-center space-x-5"
                    onClick={() => setshopModalVisible(true)}
                  >
                    <p className="text-sm text-center font-medium text-white uppercase">
                      Shops
                    </p>
                    {expectedFilteredShops?.length > 0 && (
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold w-6  p-1 text-center rounded-full">
                        {expectedFilteredShops?.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* section 5 Products small */}
              <div className="w-full lg:w-6/12 px-4 my-6 ">
                <div className=" z-0 w-full mb-6 group	">
                  <div
                    className="bg-[#0283c3] hover:opacity-95  p-2 mt-8 rounded flex flex-row justify-center space-x-5 cursor-pointer"
                    onClick={() => setSmallModalVisible(true)}
                  >
                    <p className="text-sm text-center font-medium text-white uppercase">
                      Products ( Small )
                    </p>
                    {expectedSmallProducts?.length > 0 && (
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold w-6  p-1 text-center rounded-full">
                        {expectedSmallProducts.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* section 6 Products medium */}
              <div className="w-full lg:w-6/12 px-4 my-6 ">
                <div className=" z-0 w-full mb-6 group	">
                  <div
                    className="bg-[#0283c3] hover:opacity-95  p-2 mt-8 rounded cursor-pointer flex flex-row justify-center space-x-5"
                    onClick={() => setMediumModalVisible(true)}
                  >
                    <p className="text-sm text-center font-medium text-white uppercase">
                      Products ( Medium )
                    </p>
                    {expectedMediumProducts?.length > 0 && (
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold w-6  p-1 text-center rounded-full">
                        {expectedMediumProducts.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* section 7 Products Large */}
              <div className="w-full lg:w-6/12 px-4 my-6 ">
                <div className=" z-0 w-full mb-6 group	">
                  <div
                    className="bg-[#0283c3] hover:opacity-95  p-2 mt-8 rounded flex flex-row justify-center space-x-5 cursor-pointer"
                    onClick={() => setlargeModalVisible(true)}
                  >
                    <p className="text-sm text-center font-medium text-white uppercase">
                      Products ( Large )
                    </p>
                    {expectedLargeProducts?.length > 0 && (
                      <span class="bg-blue-100 text-blue-800 text-xs font-semibold w-6  p-1 text-center rounded-full">
                        {expectedLargeProducts.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* section 8 Image */}
              <div className="w-full lg:w-6/12 px-4 my-6">
                <div className="relative w-full mb-6 group">
                  <div className="flex flex-row">
                    {bannerImagePreview.length > 0 && (
                      <div className="relative mx-6">
                        <div
                          onClick={() => handleImageRemove()}
                          className=" absolute top-0 right-0 bg-red-400 rounded-full w-6 h-6 flex justify-center text-white cursor-pointer"
                        >
                          X
                        </div>
                        <img
                          src={bannerImagePreview[0]}
                          className="rounded m-2 h-52 w-52"
                        />
                      </div>
                    )}
                  </div>

                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="multiple_files"
                  >
                    Upload Deals Banner
                  </label>
                  <input
                    className="block  w-full text-sm text-gray-50 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Small modal */}
          <Modal
            dataLength={expectedSmallProducts?.length}
            title={"Small Products"}
            subTitle={`${expectedSmallProducts.length} items selected`}
            setModalVisible={setSmallModalVisible}
            modalVisible={smallModalVisible}
            moduslusLength={4}
          >
            <div className=" flex flex-row justify-center flex-wrap w-full">
              {fetchedAllSmallProducts?.map((item, i) => (
                <div className="w-[60%] sm:w-[20%] md:w-[30%] lg:w-[20%] h-[16rem] sm:h-[20rem] relative mx-4 mt-8 mb-4 bg-white  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img
                    onClick={() => handleSmallProductSelectCheck(item)}
                    className="rounded w-full h-50 sm:h-[70%] object-cover cursor-pointer"
                    src={
                      item?.attributes?.productImages?.data?.[0]?.attributes
                        ?.url
                    }
                  />

                  <div className="py-2 px-1">
                    <h5 className="mb-2 text-md font-semibold text-center tracking-tight text-gray-900 dark:text-white">
                      {item?.attributes?.productName.length > 16
                        ? item?.attributes?.productName.slice(0, 15) + "...."
                        : item?.attributes?.productName}
                    </h5>

                    <p className=" text-xs font-semibold text-center text-gray-700 dark:text-gray-400">
                      {item?.attributes?.price?.price} AED
                    </p>
                  </div>
                  <input
                    onChange={() => handleSmallProductSelectCheck(item)}
                    checked={item.selected ? true : false}
                    type="checkbox"
                    className="form-checkbox absolute top-2 border rounded  text-[#0283c3] ml-1 w-5 h-5 ease-linear transition-all duration-150  cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </Modal>
          {/* Medium modal */}
          <Modal
            dataLength={expectedMediumProducts?.length}
            title={"Medium Products"}
            subTitle={`${expectedMediumProducts.length} items selected`}
            setModalVisible={setMediumModalVisible}
            modalVisible={mediumModalVisible}
            moduslusLength={3}
          >
            <div className=" flex flex-row justify-center flex-wrap w-full">
              {fetchedAllMediumProducts?.map((item, i) => (
                <div className="w-[60%] sm:w-[20%] md:w-[30%] lg:w-[20%] h-[16rem] sm:h-[20rem] relative mx-4 mt-8 mb-4 bg-white  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img
                    onClick={() => handleMediumProductSelectCheck(item)}
                    className="rounded w-full h-50 sm:h-[70%] object-cover cursor-pointer"
                    src={
                      item?.attributes?.productImages?.data?.[0]?.attributes
                        ?.url
                    }
                  />

                  <div className="py-2 px-1">
                    <h5 className="mb-2 text-md font-semibold text-center tracking-tight text-gray-900 dark:text-white">
                      {item?.attributes?.productName.length > 16
                        ? item?.attributes?.productName.slice(0, 15) + "...."
                        : item?.attributes?.productName}
                    </h5>

                    <p className=" text-xs font-semibold text-center text-gray-700 dark:text-gray-400">
                      {item?.attributes?.price?.price} AED
                    </p>
                  </div>
                  <input
                    onChange={() => handleMediumProductSelectCheck(item)}
                    checked={item?.selected ? true : false}
                    type="checkbox"
                    className="form-checkbox absolute top-2 border rounded  text-[#0283c3] ml-1 w-5 h-5 ease-linear transition-all duration-150 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </Modal>
          {/* Large modal */}
          <Modal
            dataLength={expectedLargeProducts?.length}
            title={"Large Products"}
            subTitle={`${expectedLargeProducts.length} items selected`}
            setModalVisible={setlargeModalVisible}
            modalVisible={largeModalVisible}
            moduslusLength={2}
          >
            <div className=" flex flex-row justify-center flex-wrap w-full">
              {fetchedallLargeProducts?.map((item, i) => (
                <div className="w-[60%] sm:w-[20%] md:w-[30%] lg:w-[20%] h-[16rem] sm:h-[20rem] relative mx-4 mt-8 mb-4 bg-white  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img
                    onClick={() => handleLargeProductSelectCheck(item)}
                    className="rounded w-full h-50 sm:h-[70%] object-cover cursor-pointer"
                    src={
                      item?.attributes?.productImages?.data?.[0]?.attributes
                        ?.url
                    }
                  />

                  <div className="py-2 px-1">
                    <h5 className="mb-2 text-md font-semibold text-center tracking-tight text-gray-900 dark:text-white">
                      {item?.attributes?.productName.length > 16
                        ? item?.attributes?.productName.slice(0, 15) + "...."
                        : item?.attributes?.productName}
                    </h5>

                    <p className=" text-xs font-semibold text-center text-gray-700 dark:text-gray-400">
                      {item?.attributes?.price?.price} AED
                    </p>
                  </div>
                  <input
                    onChange={() => handleLargeProductSelectCheck(item)}
                    checked={item?.selected ? true : false}
                    type="checkbox"
                    className="form-checkbox absolute top-2 border rounded  text-[#0283c3] ml-1 w-5 h-5 ease-linear transition-all duration-150 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </Modal>
          {/* Shop Modal */}
          <Modal
            dataLength={expectedFilteredShops?.length}
            title={"Shops"}
            subTitle={`${selectedShops?.length} items selected`}
            setModalVisible={setshopModalVisible}
            modalVisible={shopModalVisible}
          >
            <div className=" flex flex-row justify-center flex-wrap w-full">
              {fetchedAllShops1?.map((item, i) => (
                <div className="w-[60%] sm:w-[20%] md:w-[40%] lg:w-[20%] h-[10%] sm:h-[20rem] relative mx-4 mt-8 mb-4 bg-white  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img
                    onClick={() => handleShopSelectCheck(item)}
                    className="rounded w-full h-[60%] sm:h-[70%] object-cover cursor-pointer"
                    src={
                      item?.attributes?.shopBanner?.data?.[0]?.attributes?.url
                    }
                  />

                  <div className="py-2 px-1">
                    <h5 className="mb-2 text-md font-semibold text-center tracking-tight text-gray-900 dark:text-white">
                      {item?.attributes?.name.length > 16
                        ? item?.attributes?.name.slice(0, 15) + "...."
                        : item?.attributes?.name}
                    </h5>
                    <p className=" text-xs font-semibold text-center text-gray-700 dark:text-gray-400">
                      {item?.attributes?.deals?.data.length > 1
                        ? `${item?.attributes?.deals?.data.length} products`
                        : `${item?.attributes?.deals?.data.length} product`}
                    </p>
                  </div>
                  <div className="absolute top-2 rounded-full w-7 h-7 text-center border-0 text-white font-bold bg-[#0283c3]">
                    {selectedShops.indexOf(item) + 1}
                  </div>
                  {/* <input
                    onChange={() => handleShopSelectCheck(item)}
                    checked={item?.selected ? true : false}
                    type="checkbox"
                    className="form-checkbox absolute top-2 border rounded  text-[#0283c3] ml-1 w-5 h-5 ease-linear transition-all duration-150 cursor-pointer"
                  /> */}
                </div>
              ))}
            </div>
          </Modal>
        </div>
      ) : (
        <DealDetails data={fetchedSingleDeal} error={error3} />
      )}
    </>
  );
};

Todaydeals.layout = Admin;

export default Todaydeals;

export async function getServerSideProps(context) {
  const userDataCookie = context.req.cookies?.userData;
  const query = context.query.id;
  let allProducts = [];
  let allShops = [];
  let singleDealData = [];
  let errorProducts = "";
  let errorCategories = "";
  let errorSingleDeal = "";

  try {
    const res = await axios.get(
      `${BASE_URL}/api/products?populate[0]=productImages&populate[1]=price&populate[2]=description&populate[3]=description.feature&populate[4]=product.attributes&pagination[pageSize]=100&pagination[page]=0`,
      {
        headers: {
          Authorization: `Bearer ` + userDataCookie,
        },
      }
    );
    allProducts = res.data.data;
  } catch (error) {
    errorProducts = error.message;
  }
  try {
    const shopRes = await axios.get(
      `${BASE_URL}/api/shops?populate[0]=shopBanner&populate[1]=deals&populate[2]=deals.productImages`
    );
    allShops = shopRes.data.data;
  } catch (error) {
    errorCategories = error.message;
  }

  if (query != "create") {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/todays-deals/${query}?populate[dealProducts][populate]=*&populate[shops][populate]=&populate[0]=product.attributes`
      );
      singleDealData = res.data.data;
    } catch (error) {
      errorSingleDeal = error.message;
    }
  }

  return {
    props: {
      fetchedAll1Products: allProducts,
      fetchedAllShops: allShops,
      fetchedSingleDeal: singleDealData,
      error: errorProducts,
      error2: errorCategories,
      error3: errorSingleDeal,
      query,
    },
  };
}
