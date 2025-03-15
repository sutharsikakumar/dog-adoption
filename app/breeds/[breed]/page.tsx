"use client"; 


import { useParams } from "next/navigation"; 
import React, { useEffect, useState } from "react"; 
import Header from "@/components/header"; 
import styles from "./breedmore.module.css"; 

const breedImageUrl = "https://dog.ceo/api/breed/";

export default function BreedDetail() { 
  const { breed } = useParams();
  const [breedImages, setBreedImages] = useState<string[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => { 
    if (breed) { 
      fetchBreedImages(breed as string); 
    } 
  }, [breed]); 

  const fetchBreedImages = async (breed: string) => { 
    try { 
      setLoading(true); 
      const res = await fetch(`${breedImageUrl}${breed}/images`); 
      const data = await res.json(); 
      setBreedImages(data.message);
      setLoading(false); 
    } catch (error) { 
      console.error("Error fetching breed images:", error); 
      setLoading(false); 
    } 
  }; 

  return ( 
    <div> 
      <Header /> 
      <div className={styles.center}> 
        <h1>pictures of {breed}</h1> 
        <div className={styles.breedGallery}> 
          {breedImages.map((image, index) => ( 
            <img key={index} src={image} alt={`${breed} ${index}`} className={styles.breedImage} /> 
          ))} 
        </div> 
      </div> 
    </div> 
  ); 
}
