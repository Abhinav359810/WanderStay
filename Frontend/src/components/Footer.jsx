import "./Footer.css";

export default function Footer(){
    return (
        <footer>
            <div className="f-info">

                {/* Social Media Icons */}
                <div className="f-info-socials">
                    <i className="fa-brands fa-square-facebook"></i>
                    <i className="fa-brands fa-square-instagram"></i>
                    <i className="fa-brands fa-linkedin"></i>
                </div>

                {/* Brand Info. */}
                <div className="f-info-brand">
                    &copy; WanderStay Private Limited 
                </div>

                {/* Links */}
                <div className="f-info-links">
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                </div>

            </div>
        </footer>
    );
}