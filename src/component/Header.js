import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  //you can destructure, look at title in args where props would be.

  return (
    <header className="header">
      <h1>Task Tracker {title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
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
