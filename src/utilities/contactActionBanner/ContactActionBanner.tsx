import { Link } from "react-router-dom";
const namespace = "contact-action-banner";
const ContactActionButton = () => {
  return (
    <div className={`${namespace}`}>
      <h3>CONNECT WITH US</h3>
      <Link to="/contact">CONTACT</Link>
    </div>
  );
};
export default ContactActionButton;
