import React from "react";

const Loader = () => {
  return (
    <>
      <div className="my-8 mx-auto max-w-sm text-center relative z-50 top-0">
        <div className="grid h-screen place-items-start  my-4">
          <i className="fas fa-circle-notch animate-spin text-[#0283c3] mx-auto text-6xl my-6"></i>
        </div>
      </div>
    </>
  );
};

export default Loader;
