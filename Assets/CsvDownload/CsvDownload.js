import React from "react";

const TableToCSVButton = ({ tableData }) => {
  const convertToExcel = (tableData) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const keys = Object.keys(tableData[0]);
    csvContent += keys.join(",") + "\n";

    tableData.forEach((item) => {
      const row = keys.map((key) => item[key]);
      csvContent += row.join(",") + "\n";
    });

    return csvContent;
  };

  const downloadAsExcel = () => {
    const csvContent = convertToExcel(tableData);

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div
      onClick={downloadAsExcel}
      className="flex flex-row justify-between items-center bg-[#0283c3] px-2 py-1 rounded gap-2 cursor-pointer"
    >
      <p className="text-white font-semibold">Download CSV</p>
      <i className="fas fa-download text-white"></i>
    </div>
  );
};

export default TableToCSVButton;
