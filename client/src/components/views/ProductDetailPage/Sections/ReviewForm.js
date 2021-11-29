import axios from "axios";
import React, { useEffect, useState } from "react";

import { Form, Input, Button, Rate } from "antd";

const { TextArea } = Input;
const ReviewForm = () => {
  return (
    <Form>
      <h2>Reviews</h2>
      <Rate allowHalf defaultValue={2.5} />
      <TextArea />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ReviewForm;
