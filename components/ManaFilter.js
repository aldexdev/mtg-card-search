import React, { useEffect } from "react";
import { mana } from "../utils/mana";
import styled from "styled-components";

function ManaFilter(props) {
  useEffect(() => {
    props.setFilteredCards(null);
    if (props.cards) {
      console.log(props.cards);
      const filterCards = props.cards.data.filter((card) => {
        // Loop through the cards and check if the color matches
        if (card.colors) {
          return Object.entries(props.checkedMana).some(([key, value]) =>
            value === true ? card.colors.includes(key) : ""
          );
        }
      });

      const filteredCards = { ...props.cards, data: filterCards };

      props.setFilteredCards(filteredCards);
    }
  }, [props.checkedMana, props.cards]);

  const handleChange = (e) => {
    props.setCheckedMana({
      ...props.checkedMana,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <ManaWrapper>
      {mana.map(({ title, color, image }, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              name={color}
              checked={props.checkedMana[title]}
              onChange={handleChange}
            />
            <img alt={title} src={`/${image}`} width={15} height={15} />
          </div>
        );
      })}
    </ManaWrapper>
  );
}

export default ManaFilter;

const ManaWrapper = styled.div`
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    img {
      align-self: center;
    }
  }

  input {
    display: block;
  }
  
  label {
    color: white;
  }
`;
