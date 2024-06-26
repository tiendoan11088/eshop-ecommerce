import React from 'react'
import styles from './Card.module.scss'
React

// eslint-disable-next-line react/prop-types
const Card = ({children, cardClass}) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>
      {children}
    </div>
  )
}

export default Card
