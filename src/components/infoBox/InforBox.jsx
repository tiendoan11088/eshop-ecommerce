import React from 'react'
import styles from './InforBox.module.scss'
import {Card} from '../index'

const InfoBox = ({cardClass, title, count, icon}) => {
  return (
    <div className={styles['info-box']}>
        <Card cardClass={cardClass}>
            <h4>{title}</h4>
            <span>
                <h3>{count}</h3>
                {icon}
            </span>
        </Card>
    </div>
  )
}

export default InfoBox