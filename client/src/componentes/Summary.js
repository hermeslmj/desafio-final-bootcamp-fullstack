import React from 'react'
import NumberFormatter from '../helpers/number-formatter';

export default function Summary({ transactions }) {


    const calculateReceita = () => {
        
        if(transactions.length > 0) {
            
            let receitasArr =  transactions.transactions.filter(t => t.type === '+');
            return receitasArr.reduce( (total, transact) => {
                return total + transact.value;
            }, 0);
        }
        return 0;
        
    }

    const calculateDespesa = () => {
        
        if(transactions.length > 0) {
            
            let receitasArr =  transactions.transactions.filter(t => t.type === '-');
            return receitasArr.reduce( (total, transact) => {
                return total + transact.value;
            }, 0);
        }
        
        return 0;
    }

    let receitas = calculateReceita();
    let despesas = calculateDespesa();
    let saldo = receitas - despesas;  

    return (
        
        <div className="row" style={{border: "1px solid black"}}>
            <div className="col s3">
                <span>Lançamentos:</span>
                <span>{transactions.length}</span>
            </div>
            <div className="col s3">
                <span>Receitas:</span>
                <span>
                    {NumberFormatter.format(receitas)}
                </span>
            </div>
            <div className="col s3">
                <span>Despesas:</span>
                <span>{NumberFormatter.format(despesas)}</span>
            </div>
            <div className="col s3">
                <span>Saldo:</span>
                <span>{NumberFormatter.format(saldo)}</span>
            </div>
        </div>
    )
}
