import { useState } from "react";
import Head from "next/head";
import Card from "../components/Card";
import CardSearch from "../components/CardSearch";
import SetsSearch from "../components/SetsSearch";
import Pagination from "../components/Pagination";
import ManaFilter from "../components/ManaFilter";
import styled from "styled-components";

export default function Home() {
  const [cards, setCards] = useState(null);
  const [filteredCards, setFilteredCards] = useState(null);
  const [pagUrls, setPagUrls] = useState([]);
  const [checkedMana, setCheckedMana] = useState({});

  return (
    <PageWrapper>
      <Head>
        <title>MTG Card Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchStyles>
        <SetsSearch
          setCards={setCards}
          setPagUrls={setPagUrls}
          setFilteredCards={setFilteredCards}
        />
        <ManaFilter
          setCards={setCards}
          cards={cards}
          checkedMana={checkedMana}
          setCheckedMana={setCheckedMana}
          setFilteredCards={setFilteredCards}
        />
        <CardSearch
          setCards={setCards}
          setCheckedMana={setCheckedMana}
          checkedMana={checkedMana}
        />
      </SearchStyles>
      <CardsWrapper>
        {filteredCards && Object.values(checkedMana).includes(true)
          ? [
              filteredCards.data.length === 0 ? (
                <p>
                  No results available
                </p>
              ) : (
                filteredCards.data.map((card) => (
                  <Card card={card} key={card.id} />
                ))
              ),
            ]
          : cards &&
            cards.data.map((card) => <Card card={card} key={card.id} />)}
      </CardsWrapper>
      {cards !== null && cards && pagUrls.length >= 1 ? (
        <Pagination
          cards={cards}
          setPagUrls={setPagUrls}
          pagUrls={pagUrls}
          setCards={setCards}
        />
      ) : (
        ""
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
`;

// Card's view style
const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  p {
    text-align: center;
    color: white;
    font-size: 1.5rem;
  }
`;

// Search Inputs style
const SearchStyles = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  margin-bottom: 20px;
  padding: 0 20px;

  div {
    padding: 10px;
    justify-self: center;
  }

  @media only screen and (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;
