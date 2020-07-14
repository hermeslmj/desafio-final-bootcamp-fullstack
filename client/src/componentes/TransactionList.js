import React, { useState  } from 'react'
import Transaction from './Transaction'
import TransactionAdd from './TransactionAdd';

export default function TransactionList({ transactionsList, fnReload }) {

    let transactions = transactionsList.transactions;

    const [filter, setFilter] = useState("");

    const onChangeFilter = (event) => {
        if (event.target.value !== filter) {
            setFilter(event.target.value);
        }
    }

    if (transactions === undefined) {
        transactions = [];

    }
    return (
        <div>
            <div className="row input-field">
                <div className="col s3">
                    <TransactionAdd transactionData={null} fnReload={fnReload}  />
                </div>
                <div className="col s9">
                    <input placeholder="Filtro" id="filtro" type="text" className="validate" defaultValue={filter} onKeyUp={onChangeFilter} />
                </div>
            </div>

            {
                transactions.filter(x => (filter !== "") ? x.description.toLowerCase().includes(filter.toLowerCase())  : x ).map((element) => {
                    return (<Transaction key={element._id} transaction={element} fnReload={fnReload} />)
                })
            }


        </div>
    )
}
