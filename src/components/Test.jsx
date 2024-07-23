import { useEffect } from "react";

import axios from "axios";

const Test = () => {
  const fetch = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    try {
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => fetch, []);

  return <div />;
};
export default Test;
