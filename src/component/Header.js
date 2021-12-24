import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title }) => {
  //you can destructure, look at title in args where props would be.

  const onClick = (e) => {
    console.log("test");
  };
  return (
    <header className="header">
      <h1>Task Tracker {title}</h1>
      <Button color="green" text="Add" onClick={onClick} />
      {/* <h1 style={headingStyle}>Hello from React</h1> */}
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker",
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
// //css in js
// const headingStyle = { color: "Red", backgroundColor: "black" };
export default Header;
