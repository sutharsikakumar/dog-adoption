import DogFetch from "@/components/dog-fetcher"
import Header from "@/components/header"
import { logout } from "./logout/actions";
import styles from "./logout/logout.module.css"

export default function Home() {
  return (
    <>
      <Header />
      <form action={logout}>
       <button type="submit" className={styles.logoutButton}>
         if you think you are logged in, click here to logout
       </button>
     </form>
      <DogFetch />
    </>
  );
}
