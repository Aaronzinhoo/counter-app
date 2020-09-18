import React from "react";
import { Table } from "react-bootstrap";
import formatPrice from "./priceFormatter";

const headers = ["Product ID", "Product Name", "Quantity", "Price Per Unit"];

const Checkout = (props) => {
  const total_counter = props.location.state.total;
  const tableRow = ({ id, name, value, price }) => (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{value}</td>
      <td>{formatPrice(price)}</td>
    </tr>
  );

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Your Reciept</h1>
      <Table hover responsive>
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.location.state.items.map((item) => tableRow(item))}
          <tr style={{ backgroundColor: "lightgreen" }}>
            <td></td>
            <td style={{ fontWeight: "bold" }}>{total_counter.name}</td>
            <td style={{ fontWeight: "bold" }}>{total_counter.value}</td>
            <td style={{ fontWeight: "bold" }}>
              {formatPrice(total_counter.price)}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Checkout;
