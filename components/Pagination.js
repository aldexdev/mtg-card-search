import { useState } from "react";
import axios from "axios";
import { useScrollTo } from "react-use-window-scroll";

function Pagination(props) {
  const [count, setCount] = useState(0);
  const scrollTo = useScrollTo();

  const pushPageUrl = (cardsObj) => {
    props.setPagUrls((pagUrls) => [...pagUrls, cardsObj]);
  };

  const incrementCount = async () => {
    // Update state with incremented value
    setCount(count + 1);
  };

  const decrementCount = () => {
    // Update state with decremented value
    setCount(count - 1);
  };

  // Get from API the next bundle of cards
  const nextCards = async () => {
    await incrementCount();
    try {
      const res = await axios.get(props.pagUrls[count].next_page);
      const data = await res.data;
      await props.setCards(data);
      await pushPageUrl(data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  // Get from API the previous bundle of cards
  const prevCards = () => {
    decrementCount();
    const data = props.pagUrls[count - 1];
    props.setCards(data);
  };

  return (
    <nav className="pagination">
      <button
        onClick={async () => {
          await prevCards();
          await scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        disabled={count === 0 ? true : false}
      >
        {" "}
        ← Prev
      </button>
      <button
        onClick={async () => {
          await nextCards();
          await scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        disabled={!("next_page" in props.cards) ? true : false}
      >
        Next →
      </button>
    </nav>
  );
}

export default Pagination;
