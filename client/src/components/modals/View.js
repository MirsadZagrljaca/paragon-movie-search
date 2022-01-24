import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function View({ selected, openEdit }) {
  return (
    <div>
      <Modal show={true}>
        <div className="view-modal">
          <div className="view-modal-left">
            <img src={selected.cover} alt="selected" />
          </div>

          <div className="view-modal-right">
            <div className="view-modal-right-title">
              <h2>{selected.title}</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </div>

            <div className="view-modal-right-info">
              <p>Year: {selected.year}</p>
              <p>Rank: {selected.rank}</p>
              <p>Type: {selected.type}</p>
              <Button variant="outline-primary" onClick={() => openEdit()}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
