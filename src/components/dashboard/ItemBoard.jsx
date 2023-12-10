import React from 'react'
import styles from './ItemBoard.module.css'
const ItemBoard = ({ title, result, Icon, colorIcon, backgroundIcon }) => {
    return (
        <React.Fragment>
            <div className={styles.itemBoard}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.result}>{result}</p>
                <div className={styles.icon} style={{ backgroundColor: backgroundIcon, color: colorIcon }}><Icon /></div>
            </div>
        </React.Fragment>
    )
}

export default ItemBoard
