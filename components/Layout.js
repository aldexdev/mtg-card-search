import styled from "styled-components";
import Header from "./Header.js";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <LayoutStyles>
      <Header />
      {children}
      <Footer />
    </LayoutStyles>
  );
}

export default Layout;

const LayoutStyles = styled.div`
  min-height: 100vh;
  margin: 0;
`;
