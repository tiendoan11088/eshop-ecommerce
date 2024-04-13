import { useState } from 'react'
import styles from './auth.module.scss'
import registerImg from '../../assets/register.png' 
import {Card} from './../../components/index'
import { Link, useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../firebase/config'
import { Loader} from '../../components/index'
import { toast } from 'react-toastify'


const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setcPassword] = useState("")
  const [isLoading, setIsLoading] = useState("")

  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault() // when dubmit dose not reload the page
    if(password !== cPassword){
      toast.error("Password do not match!")
    }
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false)
        toast.success("Registration Successful...")
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      });
  }

  return  (
    <>
    {isLoading && <Loader/>}
      <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input type="text" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            <input type="password" placeholder='Confirm Password' value={cPassword} onChange={(e)=>setcPassword(e.target.value)} required />
            <button type="submit" className='--btn --btn-primary --btn-block'>Register</button>
            
          </form>
          <span className={styles.register}>
            <p> Already have a account ?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Register" width='400' />
      </div>
      </section>
    </>
  )
}

export default Register
