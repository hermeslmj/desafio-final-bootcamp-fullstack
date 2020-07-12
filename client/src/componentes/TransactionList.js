import React, { useState  } from 'react'
import Transaction from './Transaction'

export default function TransactionList({ transactionsList }) {

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
                    <a href="#" className="waves-effect waves-light btn"><i className="material-icons left">control_point</i>NOVO LANÇAMENTO</a>
                </div>
                <div className="col s9">
                    <input placeholder="Filtro" id="filtro" type="text" className="validate" defaultValue={filter} onKeyUp={onChangeFilter} />
                </div>
            </div>

            {
                transactions.filter(x => (filter !== "") ? x.description.toLowerCase().includes(filter.toLowerCase())  : x ).map((element) => {
                    return (<Transaction key={element._id} transaction={element} />)
                })
            }


        </div>
    )
}
