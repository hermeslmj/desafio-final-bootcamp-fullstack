import React from 'react'

export default function Transaction({ transaction }) {
    return (
        <div className="row">
            <div className="col s1">{transaction.day}</div>
            <div className="col s6">{transaction.category} - {transaction.description}</div>
            <div className="col s3">{transaction.value}</div>
            <div className="col s1">Edit</div>
            <div className="col s1">Remove</div>
        </div>
    )
}
