import "./styles.css";

import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import axios from "axios";

export default function App() {
  const [limit, setLimit] = useState(5);
  const [backData, setBackData] = useState([]);
  const [data, setData] = useState([]);

  const loadData = (numberOfRecords) => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${numberOfRecords}&offset=${backData.length}`
      )
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData(5);
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#34495e",
        color: "white",
        marginBottom: "20px",
      }}
    ></div>
  );
}
