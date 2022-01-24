import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import base from "../../config";

export default function Edit({ selected, closeModals, setQuery, query }) {
  const [values, setValues] = useState({
    title: "",
    cover: "",
    year: "",
    rank: "",
    type: "",
    error: "",
  });

  const clickHandler = async () => {
    if (selected._id) {
      let updatedMovie = {
        title: values.title || selected.title,
        cover: values.cover || selected.cover,
        year: values.year || selected.year,
        rank: values.rank || selected.rank,
        type: values.type || selected.type,
        isFavourite: true,
      };

      let response = await axios.put(
        `${base}/movie/single/${selected._id}`,
        updatedMovie
      );

      console.log(response);

      if (response.data.error) {
        setValues({ ...values, error: response.data.error });
      } else {
        setQuery(query);
        closeModals();
      }
    } else {
      let newMovie = {
        title: values.title || selected.title,
        cover: selected.cover,
        year: values.year || selected.year,
        rank: values.rank || selected.rank,
        type: values.type || selected.type,
        rapidId: selected.rapidId,
        isFavourite: true,
      };

      let response = await axios.post(`${base}/movie/add`, newMovie);
      console.log(response);

      if (response.data.error) {
        setValues({ ...values, error: response.data.error });
      } else {
        setQuery(query);
        closeModals();
      }
    }
  };

  return (
    <div>
      <Modal show={true}>
        <div className="edit-modal">
          <div className="edit-modal-form">
            {values.cover === "" ? (
              <img
                src={selected.cover}
                alt="edit"
                style={{
                  width: "25rem",
                  height: "25rem",
                  marginBottom: "2rem",
                }}
              />
            ) : (
              <img
                src={values.cover}
                alt="edit"
                style={{
                  width: "25rem",
                  height: "25rem",
                  marginBottom: "2rem",
                }}
              />
            )}

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Title
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Title..."
                defaultValue={selected.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Year
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Title..."
                defaultValue={selected.year}
                onChange={(e) => setValues({ ...values, year: e.target.value })}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Rank
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Title..."
                defaultValue={selected.rank}
                onChange={(e) => setValues({ ...values, rank: e.target.value })}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Type
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Title..."
                defaultValue={selected.type}
                onChange={(e) => setValues({ ...values, type: e.target.value })}
              />
            </div>

            <div className="edit-modal-button">
              <Button variant="outline-primary" onClick={clickHandler}>
                Edit
              </Button>
            </div>

            {values.error && <Alert variant="danger">{values.error}</Alert>}
          </div>
        </div>
      </Modal>
    </div>
  );
}
