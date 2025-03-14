"use client";
import styles from "./dog-fetch.module.css";

import React, { useEffect, useState } from "react";

const imageUrl = "https://dog.ceo/api/breeds/image/random";

export default function DogFetch() {
  const [img, setImg] = useState<string | undefined>(undefined);

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const data = await res.json();
    setImg(data.message);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      {img && <img src={img} alt="dogs" />}
    </>
  );
}
