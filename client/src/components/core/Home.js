import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import base from "../../config";
import { Button } from "react-bootstrap";
import View from "../modals/View";
import Edit from "../modals/Edit";

const KEY = process.env.REACT_APP_API_KEY;

export default function Home() {
  const [query, setQuery] = useState("game of thr");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [fav, setFav] = useState([]);
  const [selected, setSelected] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("q")) {
      setQuery(localStorage.getItem("q"));
      localStorage.removeItem("q");
    }
  }, []);

  useEffect(async () => {
    if (query === "") return;

    let tempDb = [];

    let response = await axios.get(`${base}/movie/all`);

    if (response.data.length > 0) {
      response.data.map((v, i) => {
        if (v.title.toLowerCase().includes(query.toLowerCase())) {
          tempDb.push(v);
        }
      });
    }

    if (tempDb.length === 0) {
      var options = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/auto-complete",
        params: { q: query },
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key": KEY,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          response.data.d.map((v, i) => {
            let tempObj = {};
            if (v.id) {
              tempObj.rapidId = v.id;
            } else {
              tempObj.id = "No ID";
            }

            if (v.i) {
              tempObj.cover = v.i.imageUrl;
            } else {
              tempObj.cover = "No Image";
            }

            if (v.l) {
              tempObj.title = v.l;
            } else {
              tempObj.title = "No Title";
            }

            if (v.y) {
              tempObj.year = v.y;
            } else {
              tempObj.year = "No Year";
            }

            if (v.q) {
              tempObj.type = v.q;
            } else {
              tempObj.type = "No Type";
            }

            if (v.rank) {
              tempObj.rank = v.rank;
            } else {
              tempObj.rank = "No Rank";
            }

            tempObj.isFavourite = false;

            tempDb.push(tempObj);
          });
          setData(tempDb);
        })
        .catch(function (error) {
          setError(error);
        });
    } else if (tempDb.length > 0) {
      setData(tempDb);
    }
  }, [query]);

  useEffect(() => {
    if (data.length === 0) return;

    let tempFav = [];

    data.map((v, i) => {
      if (v.isFavourite) {
        tempFav.push(v);
      }
    });

    setFav(tempFav);
  }, [data]);

  const favHandler = (v) => {
    let newData = data;

    newData.map((value, index) => {
      if (value === v) {
        value.isFavourite = true;
      }
    });

    setData(newData);

    setSelected(v);
    setViewModal(true);
    setEditModal(false);
  };

  const openEdit = () => {
    setViewModal(false);
    setEditModal(true);
  };

  const closeModals = () => {
    localStorage.setItem("q", query);
    window.location.reload();
  };

  return (
    <div>
      <Header setQuery={setQuery} />

      <div className="home">
        <div className="home-right">
          {data &&
            data.map((v, i) => {
              return (
                <div className="single" key={i}>
                  <div className="single-top">
                    <img src={v.cover} alt="single" />
                  </div>
                  <div className="single-bottom">
                    <p>{v.title}</p>
                    <Button
                      variant="outline-secondary"
                      onClick={() => favHandler(v)}
                    >
                      {v.isFavourite ? (
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
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="home-left">
          {fav.length === 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
              style={{
                marginLeft: "5%",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          )}

          {fav &&
            fav.map((v, i) => {
              return (
                <div className="fav-single" key={i}>
                  <p>{v.title}</p>

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
              );
            })}
        </div>
      </div>

      {viewModal && <View selected={selected} openEdit={openEdit} />}
      {editModal && (
        <Edit
          selected={selected}
          closeModals={closeModals}
          setQuery={setQuery}
          query={query}
          setViewModal={setViewModal}
          setEditModal={setEditModal}
        />
      )}
    </div>
  );
}
