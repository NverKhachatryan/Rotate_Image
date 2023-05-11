import { NextPage } from "next";
import UploadButton from "./components/UploadButton";
import Card from "./components/Card";
import styles from "./styles/HomePage.module.css";
import card from "./card.json";

const HomePage: NextPage = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <h1>Image Rotator</h1>
      </nav>
      <div className={styles.uploadCard}>
        <h2>Upload an Image</h2>
        <UploadButton />
      </div>
      <div className={styles.card}>
        {card.map((c) => {
          return (
            <Card
              id={c.id}
              imageUrl={c.cardImage}
              title={c.title}
              description={c.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
