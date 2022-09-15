import styled from "styled-components";

function Header() {
  return (
    <HeaderStyles>
      <div className="header">
        <h1 className="neon">MAGIC THE GATHERING</h1>
        <h2>CARD SEARCH</h2>
      </div>
    </HeaderStyles>
  );
}

export default Header;

const HeaderStyles = styled.div`
  .header {
    font-family: "Gill Sans Extrabold", Helvetica, sans-serif; 
    text-align: center;
  }

  h1 {
    text-align: center;
    color: white;
  }

  h2 {
    padding: 1px;
    font-size: 35px;
    text-align: center;
    color: black;
  }
`;
