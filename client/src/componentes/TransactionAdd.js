import React, {useRef} from 'react'
import TransactionService from '../services/TransactionsService';
import Modal from 'react-modal';


Modal.setAppElement('#modal');



export default function TransactionAdd({ transactionData }) {

    
    const title = useRef("Inclusão de lançamento");

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

    const insertUpdateTransaction = () => {
        if (transactionData === null) {
            
        }
        else {
            console.log("novo registro sendo submtido");
            closeModal();
        }
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        if(transactionData !== null) {
            title.current = "Edição de lançamento";
        }
        setIsOpen(true);
    }

    function afterOpenModal() {

    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
        {(() => {
            if(transactionData !== null) {
                return (<button onClick={openModal}>Edit</button>)
            }
            else {
                return <button onClick={openModal} className="waves-effect waves-light btn"><i className="material-icons left">control_point</i>NOVO LANÇAMENTO</button>
            }
          })()}
        
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
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
                                    <input name="group1" type="radio" value="-" />
                                    <span>Despesa</span>
                                </label>
                            </div>
                            <div className="input-field col s6">
                                <label>
                                    <input name="group1" type="radio" value="+" />
                                    <span>Receita</span>
                                </label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Categoria" id="category" type="text" className="validate" />
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Descrição" id="description" type="text" className="validate" />
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Valor" id="value" type="text" className="validate" defaultValue="0" />
                            </div>
                            <div className="input-field col s12">
                                <input type="date" className="validate" />
                            </div>
                            <div className="col s12 right-align">
                                <button type="button" onClick={insertUpdateTransaction}  className="waves-effect waves-light btn">Salvar</button>
                            </div>
                        </div>
                    </form>
                    {JSON.stringify(transactionData)}
                </div>
            </Modal>
        </div>



    )
}
