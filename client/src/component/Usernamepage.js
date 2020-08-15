import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import axios from "axios";

function UserNamePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  let addUsernameToAxios = () => {
    let data = {};
    data.username = username;
    data.password = password;
    axios
      .post("/user/add", data)
      .then((res) => {
        setShowMessage(true);
      })
      .catch((error) => {
        if (error.response.data.includes("duplicate")) {
          setUsername("duplicate");
        } else {
          setUsername("error");
        }
      })
      .finally(() => {
        setShowMessage(true);
      });
  };

  let messageElement = <Message success header="User Created" />;

  if (username === "duplicate") {
    messageElement = <Message warning header="Username already used" />;
  } else if (username === "error") {
    messageElement = (
      <Message warning header="Username needs to be at least 1 character" />
    );
  }

  return (
    <div className="username-page">
      <h2>Sign Up</h2>
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
            setShowMessage(false);
          }}
        />
        <Button
          type="submit"
          onClick={() => {
            addUsernameToAxios();
          }}
        >
          Submit
        </Button>
        {showMessage && messageElement}
      </Form>
    </div>
  );
}

export default UserNamePage;
