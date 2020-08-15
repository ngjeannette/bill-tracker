import React, { useState, useEffect } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import axios from "axios";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {}, [username]);
  useEffect(() => {}, [showMessage]);
  useEffect(() => {}, [password]);

  let checkMatch = (props) => {
    axios
      .get("/user")
      .then((res) => {
        let data = res.data;
        let newData = data.filter((item) => {
          return username === item.username && password === item.password;
        });
        if (newData.length > 0) {
          props.updateData(newData);
        } else {
          setUsername("error");
        }
      })
      .catch((error) => {
        setUsername("error");
      })
      .finally(() => {
        setShowMessage(true);
      });
  };

  let messageElement = <Message success header="Logged In" />;

  if (username === "error") {
    messageElement = <Message warning header="Incorrect Match" />;
  }

  return (
    <div className="username-page">
      <h2>Log In</h2>
      <Form success warning>
        <Form.Input
          label="UserName"
          onChange={(e) => {
            setUsername(e.target.value);
            setShowMessage(false);
          }}
        />
        <Form.Input
          label="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            checkMatch(props);
          }}
        >
          Submit
        </Button>
        {showMessage && messageElement}
      </Form>
    </div>
  );
}

export default LoginPage;
