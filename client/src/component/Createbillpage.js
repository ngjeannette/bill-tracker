import React, { useState, useEffect } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import axios from "axios";
import Photo from "../image/mockup-phone.png";
import { Link } from "react-router-dom";

function CreateBillPage(props) {
  let month = ("0" + (new Date().getMonth() + 1)).slice(-2);
  let date = ("0" + new Date().getDate()).slice(-2);

  let todayDate = new Date().getFullYear() + "-" + month + "-" + date;
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [billname, setBillname] = useState("");
  const [billamount, setBillamount] = useState("");
  const [billInputDate, setBillInputDate] = useState(todayDate);
  const [updateClass, setUpdateClass] = useState({});

  const [showErrorBillName, setShowErrorBillName] = useState(false);
  const [showErrorBillAmount, setShowErrorBillAmount] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  let submitting = () => {
    if (!billInputDate || !billamount || !billname) {
      setShowErrorBillName(!billname);
      setShowErrorBillAmount(!billamount);
      setShowMessage("error");
    } else {
      setShowErrorBillName(false);
      setShowErrorBillAmount(false);
      const newData = {
        username: username,
        billname: billname,
        billamount: Number(billamount),
        date: billInputDate,
      };
      // axios call to add
      axios
        .post("/bill/add", newData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "err");
        })
        .finally(() => {
          setShowMessage(true);
        });
    }
  };

  useEffect(() => {
    if (props.name) {
      setLoggedIn(true);
      setUsername(props.name);
      setUpdateClass({ display: "flex" });
    }
  }, [props.name]);

  let messageElement = <Message success header="Bill Created" />;

  if (showMessage === "error") {
    messageElement = <Message warning header="Incorrect Info" />;
  }

  return (
    <>
      <div className="createbill-page" style={updateClass}>
        {loggedIn ? (
          <Form
            success
            warning
            onSubmit={() => {
              submitting();
            }}
          >
            <Form.Input
              error={showErrorBillName}
              label="Bill Name"
              onChange={(e) => {
                setBillname(e.target.value);
              }}
            />
            <Form.Input
              error={showErrorBillAmount}
              label="Bill Amount"
              type="number"
              onChange={(e) => {
                setBillamount(e.target.value);
              }}
            />
            <Form.Input
              label="Bill Date"
              type="date"
              value={billInputDate}
              onChange={(e) => {
                setBillInputDate(e.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
            {showMessage && messageElement}
          </Form>
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

export default CreateBillPage;
