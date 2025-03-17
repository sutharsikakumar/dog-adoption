import { login, signup } from './actions'
import styles from './login.module.css'

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>write your email below</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>make up a password or enter existing password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
            className={styles.input}
          />
        </div>
        
        <div className={styles.buttonGroup}>
          <button 
            formAction={login} 
            className={styles.loginButton}
          >
            login
          </button>
          <button 
            formAction={signup} 
            className={styles.signupButton}
          >
            sign-up
          </button>
        </div>
      </form>
    </div>
  )
}