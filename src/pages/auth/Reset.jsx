import styles from './auth.module.scss'
import resetImg from '../../assets/forgot.png'
import { Card } from '../../components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../../firebase/config'
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify'
import { Loader } from '../../components/index' 



const Reset = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState("")

  const resetPassword = (e) => {
    e.preventDefault()
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        toast.success("Check your email")
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      });
  }

  return (
    <>
    {isLoading && <Loader />}
  <section className={`container ${styles.auth}`}>
  <div className={styles.img}>
    <img src={resetImg} alt="Reset Password" width='400' />
  </div>
  <Card>
    <div className={styles.form}>
      <h2>Reset password</h2>
      <form onSubmit={resetPassword}>
        <input type="text" placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} />
        <button type="submit" className='--btn --btn-primary --btn-block'>Reset Password</button>

        <div className={styles.links}>
          <p>
            <Link to="/login">- Login</Link>
          </p>
          <p>
            <Link to="/register">- Register</Link>
          </p>
        </div>

      </form>

    </div>
  </Card>
</section>
</>
)       
}

export default Reset
