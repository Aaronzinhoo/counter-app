import React, { Component } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

class Counter extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <span style={{ fontSize: 24 }} className={this.getBadgeClasses()}>
              {this.props.counter.name}
            </span>
          </div>
          <div className="col-md-3">
            <span style={{ fontSize: 24 }} className={this.getBadgeClasses()}>
              {this.formatPrice()}
            </span>
          </div>
          <div className="col-md-1">
            <span style={{ fontSize: 24 }} className={this.getBadgeClasses()}>
              {this.formatCount()}
            </span>
          </div>
          <div className="col-md-4">
            {this.props.onIncrement && (
              <button
                className="btn btn-secondary"
                onClick={() => this.props.onIncrement(this.props.counter)}
              >
                <i className="fa fa-plus-circle" aria-hidden="true" />
              </button>
            )}
            {this.props.onDecrement && (
              <button
                className="btn btn-info m-2"
                onClick={() => this.props.onDecrement(this.props.counter)}
                disabled={this.props.counter.value === 0 ? "disabled" : ""}
              >
                <i className="fa fa-minus-circle" aria-hidden="true" />
              </button>
            )}
            {this.props.onDelete && (
              <button
                className="btn btn-danger"
                onClick={() => this.props.onDelete(this.props.counter.id)}
              >
                <i className="fa fa-trash-o" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  getBadgeClasses = () => {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  };

  formatCount = () => {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  };

  formatPrice = () => {
    let { price } = this.props.counter;
    return formatter.format(price);
  };
}

export default Counter;
