import { Alert } from "react-bootstrap";
import React, { useState } from "react";
import paragon from "../assets/paragon.png";

export default function Header({ setQuery }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const clickHandler = () => {
    if (input === "") {
      setError("Please Fill Input Before Searching!");
    } else {
      setError("");
      setQuery(input);
      localStorage.removeItem("q");
    }
  };

  const enterHandler = (e) => {
    if (e.code === "Enter") {
      if (input === "") return setError("Please Fill Input Before Searching!");

      setError("");
      setQuery(input);
      localStorage.removeItem("q");
    }
  };

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <img src={paragon} alt="logo" />
          <h2>Paragon Movie Search</h2>
        </div>

        <div className="header-right">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={enterHandler}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={clickHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Alert
          variant="danger"
          style={{
            marginLeft: "25%",
            marginRight: "25%",
            marginBottom: "1rem",
          }}
        >
          {error}
        </Alert>
      )}
    </div>
  );
}
