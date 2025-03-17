import { redirect } from 'next/navigation';
import Header from '@/components/header';
import { createClient } from '@/utils/supabase/server';
import styles from './private.module.css';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  status: boolean;
}

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect('/login');
  }

  const { data: dogs, error: dogsError } = await supabase
    .from('dogs')
    .select('*')
    .order('name', { ascending: true });

  return (
    <>
      <Header />
      <div className={styles.container}>
        <p className={styles.textFormat}>
          hello {userData.user.email}, welcome to the ADMIN PAGE woah. so powerful.
        </p>

        <section className={styles.dogsSection}>
          <h2>dog adoption table</h2>

          <form action="/api/dogs" method="POST" className={styles.form}>
            <input type="text" name="name" placeholder="name" required />
            <input type="text" name="breed" placeholder="breed" required />
            <input type="number" name="age" placeholder="age" required />
            <label htmlFor="status">status:</label>
            <select name="status" id="status" defaultValue="true">
              <option value="true">available</option>
              <option value="false">not available</option>
            </select>
            <button type="submit">add dog</button>
          </form>

          {dogsError ? (
            <p>oh no, dogs not loaded oops: {dogsError.message}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>name</th>
                  <th>breed</th>
                  <th>age</th>
                  <th>status</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {dogs?.map((dog: Dog) => (
                  <tr key={dog.id}>
                    <td>{dog.name}</td>
                    <td>{dog.breed}</td>
                    <td>{dog.age}</td>
                    <td>{dog.status ? 'available' : 'not available'}</td>
                    <td>
                      <form action={`/api/dogs/${dog.id}`} method="POST" className={styles.deleteForm}>
                        <input type="hidden" name="_method" value="DELETE" />
                        <button type="submit" className={styles.deleteButton}>
                          delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </>
  );
}