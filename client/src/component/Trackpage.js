import React, { useState, useEffect } from "react";
import "../App.scss";
import { Link } from "react-router-dom";
import axois from "axios";
import { Doughnut } from "react-chartjs-2";
import Table from "./Table";
import Photo from "../image/mockup-phone.png";

let total12Colors = [
  "#4281A4",
  "#48A9A6",
  "#E4DFDA",
  "#D4B483",
  "#C1666B",
  "#8C7284",
  "#F18F01",
  "#CEE397",
  "#F4E04D",
  "#78C091",
  "#A4BEF3",
  "#FACFAD",
];
function TrackPage(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (props.name) {
      setLoggedIn(true);
      // find data from axios and display
      axois
        .get("/bill")
        .then((response) => {
          let filteredData = response.data.filter(
            (item) => item.username === props.name
          );
          if (filteredData.length > 0) {
            // create a dictionary
            let graphData = filteredData.reduce((acc, curr, i) => {
              let year = new Date(curr.date).getFullYear();
              let month = new Date(curr.date).getMonth();
              let billamount = Number(curr.billamount);

              if (!acc[year]) {
                let addMonthData = {};
                addMonthData[month] = billamount;
                acc[year] = addMonthData;
              } else if (!acc[year][month]) {
                let addMonthData = { ...acc[year] };
                addMonthData[month] = billamount;
                acc[year] = addMonthData;
              } else {
                let addMonthData = { ...acc[year] };
                addMonthData[month] = billamount + addMonthData[month];
                acc[year] = addMonthData;
              }
              return acc;
            }, {});

            // update Graph Data
            let graphDataEntries = Object.entries(graphData).map(
              ([year, data]) => {
                const sortedDataObject = Object.keys(data)
                  .sort()
                  .reduce((sortedData, key) => {
                    sortedData[key] = data[key];
                    return sortedData;
                  }, {});
                return [year, sortedDataObject];
              }
            );

            let newGraphData = graphDataEntries.reduce((acc, curr, index) => {
              let first = curr[0];
              let second = curr[1];
              let graphObject = {};

              let numberMonthsArray = Object.keys(second);
              let wordMonthsArray = convertNumbertoWordMonthArray(
                numberMonthsArray
              );
              let graphArray = Object.values(second);
              let colorsArray = selectColorArray(numberMonthsArray);
              let updateData = {
                labels: wordMonthsArray,
                datasets: [
                  {
                    data: graphArray,
                    backgroundColor: colorsArray,
                    hoverBackgroundColor: colorsArray,
                  },
                ],
              };
              graphObject[first] = updateData;

              acc.push(graphObject);
              return acc;
            }, []);
            setGraphData(newGraphData);

            // update table data
            let sortedArray = filteredData.sort(function (a, b) {
              return new Date(a.date) - new Date(b.date);
            });
            setTableData(sortedArray);
          }
        })
        .catch((error) => console.log(error, "error"));
    } else {
      setLoggedIn(false);
    }
  }, [props.name]);

  useEffect(() => {}, [graphData]);

  useEffect(() => {}, [tableData]);

  let convertNumbertoWordMonthArray = (monthsArray) => {
    let wordMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthsArray.map(
      (monthIndexString) => wordMonths[parseInt(monthIndexString)]
    );
  };

  let selectColorArray = (monthsArray) => {
    return monthsArray.map(
      (monthIndexString) => total12Colors[parseInt(monthIndexString)]
    );
  };

  return (
    <>
      <div className="track-page">
        {loggedIn ? (
          <>
            <div className="graph-page">
              {graphData.length > 0 ? (
                graphData.map((item) => {
                  return (
                    <div
                      className="chart-container"
                      style={
                        ({ position: "relative" },
                        { height: "500px" },
                        { width: "500px" })
                      }
                    >
                      <h2>{Object.keys(item)[0]}</h2>
                      <Doughnut data={Object.values(item)[0]} />
                    </div>
                  );
                })
              ) : (
                <div className="empty-page">
                  <div className="empty-header">
                    <h2>No Bills Available, click on create</h2>
                    <Link to="/create" className="ui button">
                      Create Bills
                    </Link>
                  </div>
                  <div className="image-container">
                    <img src={Photo} alt="phone with chart" />
                  </div>
                </div>
              )}
            </div>

            {tableData.length > 0 && <Table tableData={tableData} />}
          </>
        ) : (
          <div className="empty-page">
            <div className="empty-header">
              <h2>Seems like you're not logged in, Click here to Log in</h2>
              <Link to="/login" className="ui button">
                Login
              </Link>
            </div>
            <div className="image-container">
              <img src={Photo} alt="phone with chart" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TrackPage;
