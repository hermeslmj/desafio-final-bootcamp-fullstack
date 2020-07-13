import React from 'react'
import NumberFormatter from '../helpers/number-formatter';
import TransactionAdd from './TransactionAdd';

export default function Transaction({ transaction }) {
    return (
        <div className="row">
            <div className="col s1">{transaction.day}</div>
            <div className="col s6">{transaction.category} - {transaction.description}</div>
            <div className="col s3">{NumberFormatter.format(transaction.value)}</div>
            <div className="col s1"><TransactionAdd transactionData={transaction} /></div>
            <div className="col s1">Remove</div>
        </div>
    )
}
