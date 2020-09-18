import React, { useState } from "react";
import "../static/form.css";

const twoDecimalPlaces = /\.\d{2}$/g;
const oneDecimalPlaces = /\.\d{1}$/g;
const noDecimalPlaces = /\.\d{0}$/g;

const validateDollar = (dollar) => {
  const pattern = new RegExp(/^[0-9]+((,\d{3}){1})?/);
  console.log(isNaN(dollar.replace(/,/gi, "")));
  return !isNaN(dollar.replace(/,/gi, "")) && pattern.test(dollar)
    ? true
    : false;
};

const validateCents = (cents) => {
  if (
    cents === undefined ||
    cents === "" ||
    (cents.length <= 2 && !isNaN(cents))
  )
    return true;
  return false;
};

const formatPrice = (price) => {
  price = String(price).replace(/,/gi, "");
  if (price.match(oneDecimalPlaces)) price += "0";
  else if (price.match(noDecimalPlaces)) price += "00";
  else if (!price.match(twoDecimalPlaces)) price += ".00";
  return price;
};

const ItemForm = (props) => {
  const [item, setItem] = useState({ name: "", price: "" });
  const [errors, setErrors] = useState({});

  const updateErors = (errors) => setErrors(errors);
  const updateItem = (item) => setItem(item);

  const handleChange = (event) => {
    const newItem = JSON.parse(JSON.stringify(item));
    newItem[event.target.name] = event.target.value;
    updateItem(newItem);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log(formatPrice(item["price"]));
      const formattedItem = { name: item.name, price: formatPrice(item.price) };
      props.onSubmitItem(formattedItem);
      props.toggleItemFormOff();
    }
  };

  const validate = () => {
    /*
      validate name and price. If either name or price are empty, output error. If price is not in valid format output error
     */
    const { name, price } = item;
    let errors = {};
    let isValid = true;
    if (!name) {
      isValid = false;
      errors["name"] = "Please enter a name";
    }
    if (!price) {
      isValid = false;
      errors["price"] = "Please enter a price";
    }
    let [dollars, cents] = price.split(".");
    if (!(validateDollar(dollars) && validateCents(cents))) {
      isValid = false;
      errors["price"] = "Enter valid price e.g 1, 1.00";
    }
    updateErors(errors);
    return isValid;
  };

  return (
    <div>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-3">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={item["name"]}
              onChange={handleChange}
              placeholder="Item name"
              id="name"
            />
            <p className="form-control-feedback text-danger">
              {errors["name"]}
            </p>
          </div>
          <div className="col-xs-3">
            <label htmlFor="price">Price:</label>
            <input
              className="form-control"
              type="text"
              name="price"
              value={item["price"]}
              onChange={handleChange}
              placeholder="0.00"
              id="price"
            />
            <p className="form-control-feedback text-danger">
              {errors["price"]}
            </p>
          </div>
          <div className="col-auto">
            <label>&nbsp;</label>
            <button className="btn btn-primary form-control" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
