import {useState} from 'react'
import loginImg from '../../assets/login.png'
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import { Card } from '../../components/index'
import {signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify';
import { Loader } from '../../components/index'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { selectPreviousURL } from '../../redux/slice/cartSlice'
import { useSelector} from "react-redux"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState("")
  const navigate = useNavigate()
  const previousURL = useSelector(selectPreviousURL)

  const redirectUser = () => {
    if(previousURL.includes('cart')){
      return navigate("/cart")
    }
    navigate("/")
  }


  const provider = new GoogleAuthProvider();
  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successfully")
        navigate('/')
      }).catch((error) => {
        toast.error(error.message)
      });

  }

  const loginUser = (e) => {
    e.preventDefault()
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false)
        toast.success('Login Successful')
        redirectUser()
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      });

  }

  return (
  <>
  {isLoading && <Loader/>}
  <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login" width='400' />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input type="text" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className='--btn --btn-primary --btn-block'>Login</button>
            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button className='--btn --btn-danger --btn-block' onClick={SignInWithGoogle}>
            <FaGoogle color='#fff' />
            Login With Google
          </button>
          <span className={styles.register}>
            <p> Dont have a account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
  </section>
  </>
  )
}

export default Login
