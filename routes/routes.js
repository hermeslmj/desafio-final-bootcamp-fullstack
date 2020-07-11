const express = require('express');
const transactionService = require('../services/transactionService');
const transactionRouter = express.Router();

transactionRouter.post('/', async(req, res) => {
    try {
        const newTransaction = await transactionService.createTransaction(req.body);
        res.send(newTransaction);
    } catch (error) {
        res.status(500).send({"message": error});
    }
});

transactionRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTransaction = await transactionService.updateTransaction(id, req.body);
        if(updatedTransaction) {
            res.send(updatedTransaction);
        }else{
            res.status(500).send({"message": `Não foi possível atualizar a transaction de id ${id}`});    
        }
        
    } catch (error) {
        res.status(500).send({"message": error});
    }
});

transactionRouter.get('/byId/:id', async (req, res) => {
    try{
        const id = req.params.id;
        if( id && id != "" ) {
            const transaction = await transactionService.getTransactionById(id);
            if(transaction) {
                res.send(transaction);
            }
            else{
                res.status(404).send({"message": `Transação não encontrada com o id: ${id}`});
            }
            
        }
        else{
            res.status(500).send({"message": "Envio de um id é obrigatório"});
        }
        
    }
    catch(error) {
        console.log(error);
        res.status(500).send({"message": error});
    }
}) 

transactionRouter.get('/:periodo', async (req, res) => {
    try{
        const periodo = req.params.periodo;
        if( periodo && periodo != "" ) {
            const transactions = await transactionService.getTransanctionsByPeriod(periodo);
            res.send({length: transactions.length, transactions: transactions});
        }
        else{
            res.status(500).send({"message": "Envio de um período é obrigatório"});
        }
        
    }
    catch(error) {
        console.log(error);
        res.status(500).send({"message": error});
    }
});


transactionRouter.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        if( id && id != "" ) {
            if(await transactionService.deleteTransactionById(id)){
                res.send("Transação apagada com sucesso");
            }
            else
            {
                res.status(500).send(`Não foi possível apagar a transação com id: ${id}`);
            }
            
        }
        else{
            res.status(500).send({"message": "Envio de um id é obrigatório"});
        }
        
    }
    catch(error) {
        console.log(error);
        res.status(500).send({"message": error});
    }
});

module.exports = transactionRouter;


