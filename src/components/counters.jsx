import React, { Component } from "react";
import { Link } from "react-router-dom";
import Counter from "./counter";
import ItemForm from "./forms";
import "../static/counters.css";

class Counters extends Component {
  state = {
    isAddingItem: false,
  };

  toggleItemFormOn = () => {
    this.setState({ isAddingItem: true });
  };

  toggleItemFormOff = () => {
    this.setState({ isAddingItem: false });
  };

  render() {
    const {
      onReset,
      onIncrement,
      onDelete,
      onDecrement,
      counters,
      onRestart,
      onAddItem,
    } = this.props;

    let total_counter = { id: "final", name: "Total:", price: 0.0, value: 0 };

    return (
      <div>
        <button className="btn btn-primary m-2" onClick={this.toggleItemFormOn}>
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
        <button
          className="btn btn-success m-2"
          onClick={onReset}
          disabled={counters.length === 0 ? "disabled" : ""}
        >
          <i className="fa fa-refresh" aria-hidden="true" />
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={onRestart}
          disabled={counters.length !== 0 ? "disabled" : ""}
        >
          <i className="fa fa-recycle" aria-hidden="true" />
        </button>
        {this.state.isAddingItem && (
          <ItemForm
            onSubmitItem={onAddItem}
            toggleItemFormOff={this.toggleItemFormOff}
          />
        )}
        {counters.map((counter) => {
          total_counter["value"] += counter["value"];
          total_counter["price"] += counter["price"] * counter["value"];
          return (
            <Counter
              key={counter.id}
              counter={counter}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onDelete={onDelete}
            />
          );
        })}
        {total_counter["value"] > 0 && (
          <div>
            <Counter key={total_counter.id} counter={total_counter} />
            <Link
              to={{
                pathname: "/checkout",
                state: { items: counters, total: total_counter },
              }}
            >
              <button className="checkoutbtn" onClick={this.handleCheckout}>
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Counters;
