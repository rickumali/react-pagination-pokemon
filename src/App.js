import "./styles.css";

import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import axios from "axios";

export default function App() {
  const [limit, setLimit] = useState(10);
  const [backData, setBackData] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState();

  const loadData = (numberOfRecords, active) => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${numberOfRecords}&offset=${backData.length}`
      )
      .then((res) => {
        let temp = [...backData, ...res.data.results];
        setData(temp.slice((active - 1) * limit, active * limit));
        setBackData([...temp]);
        setCount(res.data.count);
        console.log(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData(10, 1);
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
