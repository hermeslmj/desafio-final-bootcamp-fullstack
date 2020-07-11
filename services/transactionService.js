const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

async function createTransaction(data) {
    try {
        const newTransaction = new TransactionModel(data);

        await newTransaction.save();
        return newTransaction;

    } catch (error) {
        console.log(error);
        throw "Problema ao criar Transaction";
    }
}

async function getTransanctionsByPeriod(period) {
    try {
        const transactionList = await TransactionModel.find({ yearMonth: period });
        return transactionList;
    }
    catch (err) {
        console.log(err);
        throw "Problema ao retornar lista de transações";
    }

    return [];
}


async function getTransactionById(id) {
    try {
        const transaction = await TransactionModel.findById(id);
        if (transaction) {
            return transaction;
        }
        else {
            return false;
        }

    }
    catch (err) {
        console.log(err);
        throw "Problema ao retornar lista de transações";
    }

    return null;
}

async function deleteTransactionById(id) {
    try {
        await TransactionModel.deleteOne({ _id: id });
        return true;
    }
    catch (err) {
        console.log(err);
        throw "Problema ao retornar lista de transações";
    }

    return false;
}


async function updateTransaction(id, data) {
    
    try {
        const updatedTransaction = await TransactionModel.findByIdAndUpdate({ _id: id }, data, { new: true });
        if(updatedTransaction) {
            return updatedTransaction;
        }
        else {
            return false;
        }

    } catch (error) {
        console.log(error);
        throw "Problema ao editar Transaction";
    }
}




module.exports = { getTransanctionsByPeriod, createTransaction, getTransactionById, deleteTransactionById, updateTransaction }
