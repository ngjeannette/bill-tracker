import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import "../App.scss";
function Table(props) {
  const [tableData, setTableData] = useState([]);
  const [formatTableData, setFormatTableData] = useState([]);
  const [formatTableHeader, setFormatTableHeader] = useState([]);
  useEffect(() => {
    setTableData(props.tableData);
    // format the table data
    let tabledata = props.tableData.map((item) => {
      let tableobject = {};
      tableobject.date = new Date(item.date).toDateString();
      tableobject.billname = item.billname;
      tableobject.billamount = item.billamount;
      return tableobject;
    });
    setFormatTableData(tabledata);
    // format table header
    let headers = {
      date: "Date".replace(/,/g, ""), // remove commas to avoid errors
      billname: "Description",
      billamount: "Amount ($)",
    };
    setFormatTableHeader(headers);
  }, [props.tableData]);

  function convertToCSV(objArray) {
    var array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line !== "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  }

  function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + ".csv" || "export.csv";

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  function download(formatArray, formatHeader) {
    var headers = formatHeader;

    let itemsNotFormatted = formatArray;

    var itemsFormatted = [];

    // format the data
    itemsNotFormatted.forEach((item) => {
      itemsFormatted.push({
        // remove commas to avoid errors,
        date: item.date.replace(/,/g, ""),
        billname: item.billname,
        billamount: item.billamount,
      });
    });

    var fileTitle = "billing ";

    // call the exportCSVFile() function to process the JSON and trigger the download
    exportCSVFile(headers, itemsFormatted, fileTitle);
  }

  return (
    <>
      <div className="table-page">
        {tableData.length > 0 && (
          <div>
            <Button
              onClick={() => {
                download(formatTableData, formatTableHeader);
              }}
            >
              Click to Download CSV
            </Button>
          </div>
        )}

        {tableData.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => {
                  return (
                    <tr>
                      <th>{new Date(item.date).toDateString()}</th>
                      <th>{item.billname}</th>
                      <th>{item.billamount}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div>empty</div>
        )}
      </div>
    </>
  );
}
export default Table;
