function Footer() {
  let thisYear = new Date().getFullYear();
  return (
    <footer className="center">
      <p> Alejandro Delgado ©™ {thisYear}</p>
    </footer>
  );
}

export default Footer;
