import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: sessionStorage.getItem("counters")
      ? JSON.parse(sessionStorage.getItem("counters"))
      : [],
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value++;
    sessionStorage.setItem("counters", JSON.stringify(counters));
    this.setState({ counters });
  };

  handleAddItem = (item) => {
    const counters = this.state.counters.concat({
      id: Math.floor(Math.random() * 100000),
      price: item["price"],
      name: item["name"],
      value: 0,
    });
    this.setState({ counters });
    sessionStorage.setItem("counters", JSON.stringify(counters));
    console.log("Stored Items:", localStorage.getItem("counters"));
    console.log("counters", counters);
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counters[index] };
    counters[index].value--;
    sessionStorage.setItem("counters", JSON.stringify(counters));
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    sessionStorage.setItem("counters", JSON.stringify(counters));
    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    sessionStorage.setItem("counters", JSON.stringify(counters));
    this.setState({ counters });
  };

  handleRestart = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        <NavBar
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            onRestart={this.handleRestart}
            onAddItem={this.handleAddItem}
          />
        </main>
      </div>
    );
  }
}

export default App;
