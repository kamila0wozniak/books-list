import React from 'react'
import styles from './BooksList.module.css'

const BooksList = (props) => {
    console.log(props)
    return(
        <div className={styles.list}>
            {props.list.map((book,index) => {
                return <div className={styles.book} key={index} onClick={() => props.deleteHandler(index)}>
                    <h1>{book.title}</h1>
                    <p>{book.author}</p>
                    <p>{book.owner}</p>
                </div>
            })}
        </div>
    )
}

export default BooksList
