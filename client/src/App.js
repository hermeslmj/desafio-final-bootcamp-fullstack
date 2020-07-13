import React, { useState, useEffect } from 'react';
import Header from './componentes/Header';
import DataRange from './componentes/DataRange';
import Summary from './componentes/Summary';
import TransactionService from './services/TransactionsService';
import Loader from './componentes/Loader';
import TransactionList from './componentes/TransactionList';


export default function App() {

  const [retrievingData, setRetrievingData] = useState(false);
  const [dateRange, setDateRange] = useState("2019-01");
  const [transactions, setTransactions] = useState([]);

  const onDataChange = (newDate) => {
    if(newDate !== dateRange)
      setDateRange(newDate);
  }


  useEffect( () => {
      setRetrievingData(true);
      const getAllTransactions = async () => {
        
        try {
          TransactionService.getAll(dateRange).then((response) => {
            setTransactions(response.data);
            setRetrievingData(false);
          })
          .catch((e) => {
            console.log(e);
          });
        }
        catch(err) {
          console.log(err);
        }
      }

      getAllTransactions();
    }, [dateRange]);




  return (
    <div className="container">
      <Header />
      <DataRange onChangeDateCbk={onDataChange} />
      <Loader show={retrievingData} />
      <Summary transactions={transactions} />
      <TransactionList transactionsList={transactions} />
      
      
    </div>
  );
}
