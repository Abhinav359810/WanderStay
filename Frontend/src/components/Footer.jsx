import { Link } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
    return (
        <footer className="campus-footer">
            <div className="footer-container">
                {/* Brand */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <i className="fa-solid fa-house-chimney"></i>
                        <span>CampusNest</span>
                    </div>
                    <p>
                        Helping students find comfortable homes near their college.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="footer-links">
                    <Link to="/listings">
                        Explore
                    </Link>
                    <Link to="/privacy">
                        Privacy
                    </Link>
                    <Link to="/terms">
                        Terms
                    </Link>
                </div>

                {/* Socials */}
                <div className="footer-socials">
                    <a href="#" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="#" aria-label="GitHub">
                        <i className="fa-brands fa-github"></i>
                    </a>
                </div>
            </div>

            {/* Bottom */}
            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} CampusNest. All rights reserved.
                </p>
            </div>
        </footer>
    );
}