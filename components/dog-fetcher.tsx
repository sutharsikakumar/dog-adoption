"use client";
import styles from "./dog.module.css";

import React, { useEffect, useState } from "react";

const imageUrl = "https://dog.ceo/api/breeds/image/random/32";

export default function DogFetch() {
  const [imgs, setImgs] = useState<string[]>([]);

  const fetchImages = async () => {
    const res = await fetch(imageUrl);
    const data = await res.json();
    setImgs(data.message);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className={styles.center}> 
      {imgs.map((img, index) => (
        <img key={index} src={img} alt="dog" className={styles.dogFormat} />
      ))}
    </div>
  );
}
