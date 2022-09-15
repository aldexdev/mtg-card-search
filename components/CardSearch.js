import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

function CardSearch(props) {
  //HOOKS
  const [searchVal, setSearch] = useState("");
  const [options, setOptions] = useState({});
  const [optionsVisible, setOptionsVisible] = useState(true);

  // Sets the search value from the user input
  const onTextChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setOptionsVisible(true);
  };

  // Call the API for autocomplete suggestions
  useEffect(() => {
    if (searchVal.length > 1) {
      searchCardOptions(searchVal);
    }
  }, [searchVal]);

  const searchCardOptions = async (searchVal) => {
    try {
      const res = await axios.get(
        `https://api.scryfall.com/cards/autocomplete?q=${searchVal}`
      );
      const data = await res.data;
      await setOptions(data);
    } catch {
      console.log(`Error: ${err.message}`);
    }
  };

  // Set search value from suggestions list
  const suggestionSelected = async (item) => {
    await setSearch(item);
    await setOptionsVisible(false);
    await setOptions({});
  };

  // Call the API for individual card
  const searchCard = async (e) => {
    props.setCards(null);
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.scryfall.com/cards/search?q=${searchVal}&pretty=true`
      );
      const data = await res.data;
      await props.setCards(data);
      setSearch("");
      setOptionsVisible(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <SearchWrapper>
      <form>
        <input
          value={searchVal}
          onChange={onTextChange}
          type="text"
          placeholder="Search Cards"
        />
        <button type="submit" value="Submit" onClick={searchCard}>
          Search
        </button>
      </form>
      <ul>
        {options.data && optionsVisible
          ? options.data.map((item) => (
              <li key={item}>
                <span
                  onClick={async () => {
                    await suggestionSelected(item);
                    searchCard;
                  }}
                >
                  {item}
                </span>
                <hr></hr>
              </li>
            ))
          : null}
      </ul>
    </SearchWrapper>
  );
}

export default CardSearch;

// Search card's style
const SearchWrapper = styled.div`
  form {
    display: flex;
    margin: 0;
    width: 350px;
  }
  input {
    flex: 1;
    border-radius: 5px;
    height: 39px;
    margin-right: 5px;
  }
  button {
    flex: 0.2;
    border-radius: 5px;
    height: 38px;
    :hover {
      cursor: pointer;
    }
  }
  ul {
    margin: 0;
    position: absolute;
    z-index: 1;
    padding: 0;
    width: auto;
  }
  li {
    list-style-type: none;
    margin: 0 2px 0 0;
    padding: 12px;
    background-color: white;
    :hover {
      cursor: pointer;
    }
    hr {
      border: 0;
      height: 1px;
      background: #333;
      background-image: linear-gradient(to right, #ccc, #333, #ccc);
    }
  }
`;
