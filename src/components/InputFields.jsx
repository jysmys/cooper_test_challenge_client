import React from "react";
import { Form, Input, Label, Select } from "semantic-ui-react";

const InputFields = ({ onChangeHandler }) => {
  const genderoptions = [
    { key: "female", value: "female", text: "Female" },
    { key: "male", value: "male", text: "Male" },
  ];
  return (
    <Form.Field inline>
      <Label pointing="below">Distance</Label>
      <Input onChange={onChangeHandler} name="distance" id="distance"></Input>

      <Select
        onChange={onChangeHandler}
        placeholder="gender"
        name="gender"
        id="gender"
        options={genderoptions}
      ></Select>

      <Label pointing="below">
        Age
      </Label>
      <Input onChange={onChangeHandler} name="age" id="age"></Input>
    </Form.Field>
  );
};
export default InputFields;
