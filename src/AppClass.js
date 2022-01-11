import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null,
  };

  componentDidMount() {
    document.title = `I was clicked ${this.state.count} times`;
    window.addEventListener("mousemove", this.handleMouseMove);
  }
  componentDidUpdate() {
    document.title = `I was clicked ${this.state.count} times`;
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  }
  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  handleMouseMove = (event) => {
    this.setState({
      x: event.pageX,
      y: event.pageY,
    });
  };

  toggleLight = () => {
    this.setState((prevState) => ({
      isOn: !prevState.isOn,
    }));
  };
  render() {
    return (
      <>
        <h2>A Counter</h2>
        <button onClick={this.incrementCount}>
          I was clicked {this.state.count} times
        </button>
        <h2>A light rectangle</h2>
        <div
          style={{
            height: "100px",
            width: "100px",
            backgroundColor: this.state.isOn ? "yellow" : "grey",
            margin: "40px",
          }}
          onClick={this.toggleLight}
        ></div>
        <h2>Mouse Position</h2>
        <p>X Position: {this.state.x}</p>
        <p>Y Position: {this.state.y}</p>
      </>
    );
  }
}

export default App;
