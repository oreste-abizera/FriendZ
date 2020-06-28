import React, { Component } from "react";
import axios from "axios";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }
  handleChange = (e) => {
    this.setState({
      selectedImage: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.selectedImage) {
      window.displayError("Please select an image");
    } else {
      let data = new FormData();
      data.append("file", this.state.selectedImage);
      axios
        .post("http://localhost:7000/upload", data, {
          authorization: "Bearer token",
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <form
        className="col-10 col-md-8 mx-auto mt-4"
        onSubmit={this.handleSubmit}
      >
        <input
          type="file"
          accept="image/*"
          onChange={this.handleChange}
        ></input>
        <input type="submit" className="btn btn-success btn-block"></input>
      </form>
    );
  }
}
