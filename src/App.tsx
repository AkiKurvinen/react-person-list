import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Button from "react-bootstrap/Button";
// @ts-ignore
import BootstrapTable from "react-bootstrap-table-next";
// @ts-ignore
import paginationFactory from "react-bootstrap-table2-paginator";
// @ts-ignore
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "./App.css";

function App() {
  const testData = [
    { id: 1, fname: "George", lname: "Monkey", age: 10 },
    { id: 2, fname: "Jeffrey", lname: "Giraffe", age: 20 },
    { id: 3, fname: "Alice", lname: "Giraffe", age: 30 },
    { id: 4, fname: "Matti", lname: "Tiger", age: 40 },
  ];

  const [data, setData] = useState(() => {
    return testData;
  });

  //const getData = () => {
  // setData(testData);
  // };

  function handleDelete(row: Object) {
    const obj = JSON.parse(JSON.stringify(row));
    const deleteId: number = obj.id;
    console.log(obj.id);

    const newData: any = data.filter((item) => item.id !== deleteId);
    console.log(newData);

    setData(newData);
  }

  // useEffect(() => {
  // getData();
  //}, []);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "fname",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "lname",
      text: "last Name",
      sort: true,
    },
    {
      dataField: "age",
      text: "Age",
      sort: true,
      validator: (newValue: number, rows: any, column: any) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Plese enter a number",
          };
        } else {
          return true;
        }
      },
    },
    {
      dataField: "Delete",
      text: "Delete",
      events: {
        onClick: (
          e: any,
          column: any,
          columnIndex: any,
          row: Object,
          rowIndex: number
        ) => {
          handleDelete(row);
        },
      },
      formatter: (cellContent: any, rowIndex: any) => {
        return <Button className="btn btn-danger btn-xs">Delete</Button>;
      },
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Human Resources Application</h1>
        <p>&#9432; Double click to edit fields. (ID not editable)</p>
      </header>
      <main>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          striped
          hover
          pagination={paginationFactory()}
          cellEdit={cellEditFactory({
            mode: "dbclick",
            blurToSave: true,
            nonEditableRows: () => [0],
          })}
        />
      </main>
    </div>
  );
}

export default App;
