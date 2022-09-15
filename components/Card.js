import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

function Card(card) {
  const [flip, setFlip] = useState(false);

  return (
    <CardWrapper>
      {card.card.image_uris ? (
        <Image
          alt={card.card.name}
          blurDataURL={card.card.image_uris.small}
          src={card.card.image_uris.normal}
          placeholder="blur"
          width={312}
          height={438}
        />
      ) : (
        // It is a dual card
        <DualCard>
          <div className={`card ${flip ? "flip" : ""}`}>
            <div className="front">
              <Image
                alt={card.card.name}
                blurDataURL={card.card.card_faces[0].image_uris.small}
                src={card.card.card_faces[0].image_uris.normal}
                onClick={() => setFlip(!flip)}
                placeholder="blur"
                width={312}
                height={438}
              />
              <div className="card-details">
                <span>Click to flip the card</span>
              </div>
            </div>
            <div className="back">
              <Image
                alt={card.card.name}
                blurDataURL={card.card.card_faces[1].image_uris.small}
                src={card.card.card_faces[1].image_uris.normal}
                onClick={() => setFlip(!flip)}
                placeholder="blur"
                width={312}
                height={438}
              />
              <div className="card-details">
                <span>Click to flip the card</span>
              </div>
            </div>
          </div>
        </DualCard>
      )}
    </CardWrapper>
  );
}

export default Card;

const CardWrapper = styled.div`
  display: block;
  img {
    border-radius: 4%;
  }
`;

// DualCard style
const DualCard = styled.div`
  position: relative;
  width: 312px;
  height: 475px;

  .card {
    position: absolute;
    width: 100%;
    height: 100%;
    perspective: 1000px;
    cursor: pointer;
    transition: 50ms;
    transform-style: preserve-3d;
  }

  .card.flip {
    transform: rotateY(0.5turn);
  }

  .card .front,
  .card .back {
    border-radius: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    margin: 0;
    padding: 0;

    .card-details {
      border-radius: 15%;
      color: white;
      margin-top: -5px;
      width: 275px;
      padding: 5px;
      background: rgb(2, 0, 36);
      background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(109, 69, 171, 1) 50%,
        rgba(5, 80, 96, 1) 100%
      );
      text-align: center;
    }
  }

  .card .back {
    transform: rotateY(0.5turn);
  }

  .arrow-right {
    width: 25px;
    z-index: 10;
    border: 10px solid blue;
  }
`;
