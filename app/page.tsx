import Hero from "@/components/hero";
import DogFetch from "@/components/dog-fetcher"
import styles from './globals.css'

export default function Home() {
  return (
    <>
      <Hero />
      <DogFetch className={styles.DogDisplay}/>
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
      <DogFetch />
    </>
  );
}
