import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react'
import { useAuth } from '../../../../context/AuthContext';
import { TReference } from '../../../../Models/TSources';
import './AddReference.scss'

type TAddReference = {
    sendSubmit(reference:TReference):void;
    toggleModal(bool: boolean):void;
}

const AddReference:React.FC<TAddReference> = ({ sendSubmit, toggleModal }) => {
    const defaultRefernceInput: TReference = {
        title: '',
        source: '',
        articleWritten: new Date(),
        recieved: new Date(),
        rating: [],
        referenceNumber:0
    }

    const [newReference, setNewReference] = useState(defaultRefernceInput);
    const { currentUser } = useAuth();

    function updateInput(e:ChangeEvent <HTMLInputElement>){
        let value = e.target.value;
        let type = e.target.id;

        if(value !== undefined && type !== undefined){
            setNewReference({...newReference,[type]:value});            
        }
    }

    function setNewDate(e:ChangeEvent <HTMLInputElement>) {
        let value = e.currentTarget.value;

        let getYear = value.substr(0,4);
        let getMonth = value.substr(5,2);
        let getDate = value.substr(8,2);
        
        let getYearToInt = parseInt(getYear);
        let getMonthToInt = parseInt(getMonth);
        let getDateToInt = parseInt(getDate);
        
        let setNewDate = new Date();
        setNewDate.setFullYear(getYearToInt);
        setNewDate.setMonth(getMonthToInt - 1);
        setNewDate.setDate(getDateToInt);

        setNewReference({...newReference, articleWritten: setNewDate});

    }

    function handleSubmit(e:FormEvent <HTMLFormElement>){
        e.preventDefault();
        sendSubmit(newReference);
    }

    const addRefernceHtml = 

    <div className="add-ref-container">
        <h2>Add New Reference</h2>
        <form onSubmit={handleSubmit} className="add-ref-form">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={updateInput} required />
            <label htmlFor="source">Source</label>
            <input type="text" id="source" onChange={updateInput} required />
            <label htmlFor="articleWritten">Article Written</label>
            <input type="date" id="articleWritten" onChange={setNewDate} required />
            <button className="" type="submit">
                Add Reference
            </button>
        </form>
        <div className="cancel-add">
            <span onClick={() => {toggleModal(false)}}>Cancel</span>
        </div>
    </div>

        if(currentUser){
            return (
                <div className="add-ref">
                    {addRefernceHtml}
                </div>
            )
        }
        else{
            return (
                <React.Fragment>

                    <div className="not-logged-in">
                        {<h1>YOU HAVE TO BE LOGGED IN</h1>}
                    </div>
                </React.Fragment>
            )
        }

}

export default AddReference
