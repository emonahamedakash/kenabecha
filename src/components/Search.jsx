import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import "./Search.css";

const Search = () => {
  const { state } = useLocation();
  const { searchText } = state;
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    fetchProducts().then();
  }, [searchText]);

  const fetchProducts = async () => {
    let temp = [];
    await axios
      .get(`${baseUrl}/api/search/${searchText}`)
      .then((response) => {
        console.log({ response });

        response.data.forEach((res) => {
          temp.push(res);
        });
        setSearchResults(temp);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const navigate = useNavigate();

  return (
    <div className="search__container">
      <p>
        Showing search results for <b>'{searchText}'</b>
      </p>
      <div className="search__list">
        {searchResults.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            No Product Found❌
          </h2>
        ) : (
          searchResults.map((result, i) => {
            const { image, title, price, rating, category } = result;
            return (
              <div className="search__list__card" key={i}>
                <div className="image__container">
                  <img src={image} alt={title} />
                </div>
                <div className="product__details">
                  <h2>Title: {title}</h2>
                  <p>Price: {price}</p>
                  <p>Rating: {rating}</p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/product", {
                      state: { product: result },
                    })
                  }
                >
                  See Details
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Search;
