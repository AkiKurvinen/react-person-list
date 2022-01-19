import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
// @ts-ignore
import BootstrapTable from "react-bootstrap-table-next";
// @ts-ignore
import paginationFactory from "react-bootstrap-table2-paginator";
// @ts-ignore
import cellEditFactory from "react-bootstrap-table2-editor";

import Form from "react-bootstrap/Form";
import nextId from "react-id-generator";
import { Row, Col } from "react-bootstrap";

function HRSystem() {
  // Form fields
  const [formFname, setFormFname] = useState("");
  const [formLname, setFormLname] = useState("");
  const [formAge, setFormAge] = useState("0");
  const [formIsNotValid, setFormIsNotValid] = useState(true);

  const testData = [
    {
      id: parseInt(nextId().substring(2)),
      fname: "Aarne",
      lname: "Adam-Alfa",
      age: "10",
    },
    {
      id: parseInt(nextId().substring(2)),
      fname: "Bertta",
      lname: "Bertil-Bravo",
      age: "20",
    },
    {
      id: parseInt(nextId().substring(2)),
      fname: "Celcius",
      lname: "Cesar-Charlie",
      age: "30",
    },
    {
      id: parseInt(nextId().substring(2)),
      fname: "Daavid",
      lname: "David-Delta",
      age: "40",
    },
  ];

  const [data, setData] = useState(() => {
    return testData;
  });

  // Check form input and enable/disable submit button
  useEffect(() => {
    if (formFname && formLname && formAge && parseInt(formAge) > 0) {
      setFormIsNotValid(false);
    } else {
      setFormIsNotValid(true);
    }
  }, [formFname, formLname, formAge, data]);

  const addPersonTolist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const human = {
      id: parseInt(nextId().substring(2)),
      fname: formFname,
      lname: formLname,
      age: formAge,
    };

    const newData: any = [...data, human];

    setData(newData);
    setFormAge("0");
    setFormFname("");
    setFormLname("");
  };

  function handleDelete(row: Object) {
    const obj = JSON.parse(JSON.stringify(row));
    const deleteId: number = obj.id;
    const newData: any = data.filter((item) => item.id !== deleteId);

    setData(newData);
  }

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
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "age",
      text: "Age",
      sort: true,
      sortFunc: (
        a: number,
        b: number,
        order: string,
        dataField: any,
        rowA: any,
        rowB: any
      ) => {
        if (order === "desc") {
          return b - a;
        }
        return a - b;
      },
      validator: (newValue: number) => {
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
    <div>
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
      <hr />
      <h3>Add person</h3>

      <Form onSubmit={addPersonTolist}>
        <Row>
          <Col>
            <Form.Group controlId="formFname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First name..."
                value={formFname}
                onChange={(e) => setFormFname(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last name..."
                value={formLname}
                onChange={(e) => setFormLname(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={formAge}
                onChange={(e) => setFormAge(e.target.value.replace(/^0+/, ""))}
              />
            </Form.Group>
          </Col>
          <Col xs="auto" className="d-flex align-items-end">
            <Button variant="primary" type="submit" disabled={formIsNotValid}>
              Add person
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default HRSystem;
