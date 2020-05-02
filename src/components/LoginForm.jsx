import React from "react";
import { Button, Form, Input, Label, Segment } from "semantic-ui-react";

const LoginForm = (props) => {
  return (
    <Segment raised>
      <Form inline onSubmit={props.submitFormHandler} id="login-form">
        <Label pointing="right">Email</Label>
        <Input name="email" type="email" id="email"></Input>

        <Label pointing="right">Password</Label>
        <Input name="password" type="password" id="password"></Input>
        <Button basic type="submit" content="Submit" id="submit" />
      </Form>
    </Segment>
  );
};

export default LoginForm;
