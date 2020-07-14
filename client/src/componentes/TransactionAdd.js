import React, { useRef } from 'react'
import TransactionService from '../services/TransactionsService';
import Modal from 'react-modal';


Modal.setAppElement('#modal');



export default function TransactionAdd({ transactionData, fnReload }) {

    //estado do componente e gerenciamento do modal
    const title = useRef("Inclusão de lançamento");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        if (transactionData !== null) {
            title.current = "Edição de lançamento";
        }
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    //componente de adição
    if (transactionData === null) {
        transactionData = {
            _id: 0,
            description: "",
            value: 0,
            category: "",
            type: "",
            yearMonthDay: "",
            yearMonth: "",
            year: "",
            month: "",
            day: ""
        }
    }

    const insertUpdateTransaction = () => {
        if(transactionData.yearMonthDay !== ""){
            let strDate = transactionData.yearMonthDay.split('-');
            transactionData.day = parseInt(strDate[2]);
            transactionData.month = parseInt(strDate[1]);
            transactionData.year = parseInt(strDate[0]);
            transactionData.yearMonth = `${strDate[0]}-${strDate[1]}`;
        }
        if (transactionData._id === 0) {
            console.log("Inserindo");
            delete transactionData._id;
            console.log(transactionData);
            TransactionService.create(transactionData).then((response) => {
                if(response.status === 200) {
                    alert("Nova transação criada com sucesso");
                    console.log(response.data);
                    fnReload();
                }
                else{
                    alert(`Erro ao criar transação ${response.data}`);
                }
            });
            closeModal();
        }
        else {
            console.log("Editando");
            TransactionService.update(transactionData._id, transactionData).then((response) => {
                if(response.status === 200) {
                    alert("Transação editada com sucesso");
                    console.log(response.data);
                    fnReload();
                }
                else{
                    alert(`Erro ao criar transação ${response.data}`)
                }
            });
            closeModal();
        }
    }

    const onChangeField = (event) => {
        const {name, value} = event.target;
        switch(name)
        {
            case 'type':
                transactionData.type = value;
                break;
            case 'category':
                transactionData.category = value;
                break;
            case 'description':
                transactionData.description = value;
                break;
            case 'value':
                transactionData.value = parseFloat(value);
                break;
            case 'date':
                transactionData.yearMonthDay = value;
                break;
        }

        
    }


    return (
        <div>
            {(() => {
                if (transactionData._id !== 0) {
                    return (<button onClick={openModal}>Edit</button>)
                }
                else {
                    return <button onClick={openModal} className="waves-effect waves-light btn"><i className="material-icons left">control_point</i>NOVO LANÇAMENTO</button>
                }
            })()}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Gerenciamento de Lançamentos"
                style={customStyles}
            >

                <div className="row">
                    <div className="col s12">
                        <div className="col s6">
                            {title.current}
                        </div>
                        <div className="col s6 right-align">
                            <button onClick={closeModal}>X</button>
                        </div>
                    </div>

                    <form className="col s12" >
                        <div className="row">
                            <div className="input-field col s6">
                                <label>
                                    <input  name="type" 
                                            type="radio" 
                                            value="-" 
                                            defaultChecked={transactionData.type === "-"} 
                                            disabled={transactionData.type !== ""}
                                            onChange={onChangeField}
                                    />
                                    <span>Despesa</span>
                                </label>
                            </div>
                            <div className="input-field col s6">
                                <label>
                                    <input  name="type" 
                                            type="radio" 
                                            value="+" 
                                            defaultChecked={transactionData.type === "+"} 
                                            disabled={transactionData.type !== ""}
                                            onChange={onChangeField}
                                    />
                                    <span>Receita</span>
                                </label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Categoria" 
                                    id="category" 
                                    type="text" 
                                    name="category"
                                    className="validate" 
                                    defaultValue={transactionData.category} 
                                    onChange={onChangeField}
                                />
                            </div>
                            <div className="input-field col s12">
                                <input 
                                    placeholder="Descrição" 
                                    id="description" 
                                    name="description"
                                    type="text" 
                                    className="validate" 
                                    defaultValue={transactionData.description} 
                                    onChange={onChangeField}
                                />
                            </div>
                            <div className="input-field col s12">
                                <input 
                                    placeholder="Valor" 
                                    id="value" 
                                    name="value"
                                    step="0.01"
                                    type="number" 
                                    className="validate" 
                                    defaultValue={transactionData.value}
                                    onChange={onChangeField}
                                />
                            </div>
                            <div className="input-field col s12">
                                <input 
                                    type="date" 
                                    name="date"
                                    className="validate" 
                                    defaultValue={transactionData.yearMonthDay} 
                                    onChange={onChangeField}
                                />
                            </div>
                            <div className="col s12 right-align">
                                <button type="button" onClick={insertUpdateTransaction} className="waves-effect waves-light btn">Salvar</button>
                            </div>
                        </div>
                    </form>
                    {JSON.stringify(transactionData)}
                </div>
            </Modal>
        </div>



    )
}
