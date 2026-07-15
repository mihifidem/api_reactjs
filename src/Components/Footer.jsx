import { FaHeart } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        made with <FaHeart className="site-footer__heart" aria-label="heart" /> in Barcelona
      </p>
    </footer>
  );
}
