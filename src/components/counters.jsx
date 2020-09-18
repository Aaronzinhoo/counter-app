import React, { Component } from "react";
import Counter from "./counter";
import ItemForm from "./forms";

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
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
