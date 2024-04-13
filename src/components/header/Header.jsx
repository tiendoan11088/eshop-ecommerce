import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import {FaShoppingCart, FaTimes, FaUserCircle} from 'react-icons/fa'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import { useState ,useEffect } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth"
import { useDispatch, useSelector} from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice'
import ShowOnLogin from '../../components/hiddenLink/hiddenLink.js'
import { ShowOnLogout } from '../../components/hiddenLink/hiddenLink.js'
import {AdminOnlyLink} from '../adminOnlyRoute/AdminOnlyRoute.jsx'
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity} from '../../redux/slice/cartSlice.js'


const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>shop</span>
      </h2>
    </Link>
  </div>
)



const Header = () => {
  const [ showMenu, setShowMenu] = useState(false);
  const [ displayName, setDisplayName ] = useState("")
  const [scrollPage, setScrollPage] = useState(false)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {
    dispatch(CALCULATE_TOTAL_QUANTITY())
  },[])

  const fixNavbar = () => {
    if(window.scrollY > 50) {
      setScrollPage(true)
    }else {
      setScrollPage(false)
    }
  }
  window.addEventListener("scroll", fixNavbar)


  //monitor current sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        // const uid = user.uid;
        // console.log(user.displayName)

        if(user.displayName == null ){ 
          // const u1 = user.email.slice(0,-10);
          const u1 = user.email.substring(0, user.email.indexOf("@"))
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          setDisplayName(uName)
        }else{
          setDisplayName(user.displayName)
        } 


        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid
        }))
 
      } else {
        setDisplayName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch, displayName])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("logout successfully")
      navigate('/')
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")


  const cart = (
    <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20}/>
      <p>{cartTotalQuantity}</p>
    </Link>
  </span> 
  )

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}

        <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`} >
          <div className={showMenu ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}` : `${styles[`nav-wrapper`]}`}
            onClick={hideMenu}
          >
          </div>
          
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color='#fff' onClick={hideMenu}/>
            </li>
            <li>
                <AdminOnlyLink>
                  <Link to='/admin/home'>
                    <button className="--btn --btn-primary">
                      Admin
                    </button>
                  </Link>
                </AdminOnlyLink>
              </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
              <NavLink className={activeLink} to="/login">Login</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
              <a href="#home" style={{color: '#ff7722'}}>
                <FaUserCircle size={16} />
                Hi, {displayName}
              </a>
              </ShowOnLogin>
              <ShowOnLogout>
               <NavLink className={activeLink} to="/register">Register</NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
               <NavLink className={activeLink} to="/order-history">My Orders</NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink className={activeLink} to="/" onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}> 
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
        </div>
      </div>
    </header>
  )
}

export default Header
