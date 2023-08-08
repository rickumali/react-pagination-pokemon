import "./styles.css";

import { Fragment, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import axios from "axios";

export default function App() {
  const [limit, setLimit] = useState(10);
  const [backData, setBackData] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [active, setActive] = useState(1);
  const [next, setNext] = useState(2);

  const pageClick = async (pageNumber) => {
    pageNumber = pageNumber <= 0 ? 1 : pageNumber;

    if (backData.length < pageNumber * limit) {
      await loadData(pageNumber * limit, pageNumber);
    } else {
      setData(backData.slice((pageNumber - 1) * limit, pageNumber * limit));
    }
    setActive(pageNumber);
    if (pageNumber >= next + 8) setNext(next + 1);
    if (pageNumber !== 1 && pageNumber <= next) setNext(next - 1);
  };

  const PaginationComponent = (next) => {
    let numbers = [];
    for (
      let number = next;
      number <= count / limit && number <= next + 8;
      number++
    ) {
      numbers.push(
        <Pagination.Item
          key={number}
          active={number == active}
          onClick={() => {
            pageClick(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
    return numbers;
  };

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
    <div>
      <div
        style={{
          padding: "30px",
          backgroundColor: "#34495e",
          color: "white",
          marginBottom: "20px",
        }}
      >
        {data.map((d) => {
          return (
            <Fragment>
              <p>
                {d.name} {d.url}
              </p>
              <hr />
            </Fragment>
          );
        })}
        <Pagination>
          {<Pagination.Prev onClick={() => pageClick(active - 1)} />}
          {PaginationComponent(next)}
          {<Pagination.Next onClick={() => pageClick(active + 1)} />}
        </Pagination>
      </div>
    </div>
  );
}
