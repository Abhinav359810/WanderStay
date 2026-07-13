import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  useEffect(() => {
    const colorSwitcher = document.querySelector("[data-theme-color-switch]");
    let currentTheme = "light";

    const handleClick = () => {
      const root = document.documentElement;

      if (currentTheme === "dark") {
        root.style.setProperty("--bg-color", "#fff");
        root.style.setProperty("--text-color", "#000");
        colorSwitcher.textContent = "\u{1F319}";
        currentTheme = "light";
      } else {
        root.style.setProperty("--bg-color", "#050505");
        root.style.setProperty("--text-color", "#fff");
        colorSwitcher.textContent = "\u{2600}";
        currentTheme = "dark";
      }

      colorSwitcher.setAttribute("data-theme", currentTheme);
    };

    colorSwitcher.addEventListener("click", handleClick);

    return () => {
      colorSwitcher.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <main className={styles["error-page"]}>
        <div className={styles.container}>
          <div className={styles.eyes}>
            <div className={styles.eye}>
              <div
                className={`${styles["eye__pupil"]} ${styles["eye__pupil--left"]}`}
              ></div>
            </div>

            <div className={styles.eye}>
              <div
                className={`${styles["eye__pupil"]} ${styles["eye__pupil--right"]}`}
              ></div>
            </div>
          </div>

          <div className={styles["error-page__heading"]}>
            <h1 className={styles["error-page__heading-title"]}>
              Looks like you're lost
            </h1>

            <p className={styles["error-page__heading-desciption"]}>
              404 Error
            </p>
          </div>

          <Link
            to="/listings"
            className={styles["error-page__button"]}
          >
            Back to Home
          </Link>
        </div>
      </main>

      <button
        className={styles["color-switcher"]}
        data-theme-color-switch
      >
        🌙
      </button>
    </>
  );
}