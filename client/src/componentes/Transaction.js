import React from 'react'
import NumberFormatter from '../helpers/number-formatter';
import TransactionAdd from './TransactionAdd';
import TransactionService from '../services/TransactionsService';

export default function Transaction({ transaction, fnReload }) {
    const removeTransaction = (event) => {
        const id = event.target.id;
        TransactionService.remove(id).then((response) => {
            if(response.status === 200){
                alert(`Sucesso: ${response.data}`);
                fnReload();
            }else{
                alert(`Falha: ${response.data}`);
            }

        });
    }
    return (
        <div className="row">
            <div className="col s1">{transaction.day}</div>
            <div className="col s6">{transaction.category} - {transaction.description}</div>
            <div className="col s3">{NumberFormatter.format(transaction.value)}</div>
            <div className="col s1"><TransactionAdd transactionData={transaction} fnReload={fnReload} /></div>
            <div className="col s1"><button onClick={removeTransaction} id={transaction._id}>Remove</button></div>
        </div>
    )
}
