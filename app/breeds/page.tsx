"use client";
import Header from "@/components/header";
import styles from "./breeds.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const breedsUrl = "https://dog.ceo/api/breeds/list/all";

export default function DogFetch() {
  const [breeds, setBreeds] = useState<string[]>([]);

  const fetchBreeds = async () => {
    const res = await fetch(breedsUrl);
    const data = await res.json();
    const breedNames = Object.keys(data.message);
    setBreeds(breedNames);
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.center}>
        <h1>click on your breed of choice</h1>
        <ul className={styles.breedList}>
          {breeds.map((breed, index) => (
            <li key={index} className={styles.breedItem}>
              <Link href={`/breeds/${breed}`} className={styles.breedItem}>
                {breed}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
