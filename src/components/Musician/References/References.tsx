import React, { useEffect, useState } from 'react'
import { TReference, TSources } from '../../../Models/TSources';
import { db } from '../../../services/firebase'
import { useAuth } from '../../../context/AuthContext';
import AddReference from './AddReference/AddReference';
import './References.scss'


type TReferencesProps = {
    referenceData: TSources
}

const References:React.FC<TReferencesProps> = ({ referenceData }) => {
    const defaultReference:TSources = {
        id:'',
        refs: []
    }
    const [referenceList, setReferenceList] = useState(defaultReference);
    const [userInputRating, setUserInputRating] = useState(0);
    const [showIsRatingOk, setShowIsRatingOk] = useState(false);
    const [showAddReference, setShowAddReference] = useState(false);
    const [refNumControl, setRefNumControl] = useState(0);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    useEffect(() => {
        if(referenceData){
            setReferenceList(referenceData);
        }
        else {
            return
        }
        
    }, [referenceData]);

    function getUserRating(e:React.MouseEvent <HTMLInputElement>) {
        let userRating =  parseInt(e.currentTarget.value);
        let refNum = parseInt(e.currentTarget.dataset.id!);
        setShowIsRatingOk(true);
        
        if(userRating !== undefined && refNum !== undefined){
            setUserInputRating(userRating);
            setRefNumControl(refNum);
        }
    }

    function applyRating(){
        if(currentUser){
            setError('');
            const docRef = db
            .collection('references')
            .doc(referenceList.id);

        return db.runTransaction((transaction) => {
            return transaction.get(docRef).then((doc) => {
                if(!doc.exists){
                    throw "Document does not exist!";
                }
                let rating:number[] = []
                
                rating = doc.data()?.refs[refNumControl - 1].rating;
                rating.push(userInputRating);

                let newRefs = {
                    refs: referenceList.refs
                }
                newRefs.refs[refNumControl - 1].rating.push(userInputRating);

                let refs = newRefs.refs;
                transaction.update(docRef, { refs } );

                return rating;
            })
            .then(() => {
                setShowIsRatingOk(false);
                
            }).catch(() => {
                setError('Something went wrong, please try again!');
            })
        })
        } else {
            setError('You have to be logged in to vote');
        }
    }

    function cancelRating() {
        setShowIsRatingOk(false);
        setError('');
    }

    function openModal() {
        setShowAddReference(!showAddReference);
    }

    async function handleSubmit(newReference:TReference) {
        let getRefNum = referenceList.refs.length + 1;
        newReference.referenceNumber = getRefNum;
        
        if(currentUser){
            setError('');
            const docRef = db
            .collection('references')
            .doc(referenceList.id);
        
        return db.runTransaction((transaction) => {
            return transaction.get(docRef).then((doc) => {
                if(!doc.exists){
                    throw "Document does not exist!";
                }
                let refs = referenceList.refs;
                refs.push(newReference);
                
                transaction.update(docRef, { refs } );

            })
            .then(() => {
                setShowAddReference(false);
                
            }).catch(() => {
                setError('Something went wrong, please try again!');
            })
        })
        } else {
            setError('You have to be logged in to vote');
        }
    }

    
    function displayRatingHtml(ref:TReference) {
        return(
            <React.Fragment>
                <input data-id={ref.referenceNumber} type="radio" id={`${ref.referenceNumber}-star1`} name="star" value="5" onClick={getUserRating}/>
                <label htmlFor={`${ref.referenceNumber}-star1`} title="Amazing"></label>
                <input data-id={ref.referenceNumber} type="radio" id={`${ref.referenceNumber}-star2`} name="star" value="4" onClick={getUserRating}/>
                <label htmlFor={`${ref.referenceNumber}-star2`}title="Good"></label>
                <input data-id={ref.referenceNumber} type="radio" id={`${ref.referenceNumber}-star3`} name="star" value="3" onClick={getUserRating}/>
                <label htmlFor={`${ref.referenceNumber}-star3`}  title="Average"></label>
                <input data-id={ref.referenceNumber} type="radio" id={`${ref.referenceNumber}-star4`} name="star" value="2" onClick={getUserRating}/>
                <label htmlFor={`${ref.referenceNumber}-star4`} title="Not Good"></label>
                <input data-id={ref.referenceNumber} type="radio" id={`${ref.referenceNumber}-star5`} name="star" value="1" onClick={getUserRating}/>
                <label htmlFor={`${ref.referenceNumber}-star5`} title="Bad"></label>
            </React.Fragment>
        )
    }

    const rateMeHtml = 
    <div className="rate-me">
        <h5>Is this ok?</h5>
        <a href="#" onClick={applyRating}>Yes</a>
        <a href="#" onClick={cancelRating}>No</a>
    </div>;


    if(referenceData.id !== ''){
        return(
            <section className="references musician-page">
                <div className="ref-container">
                    <div className="ref-heading list-container">
                        <h1>Reference List</h1>
                        <p>Help evaluate if the reference is correct.
                        Together we make this site reliable.</p>
                        <div className="add-source-form">
                            <button type="button" onClick={openModal}>Add Reference</button>
                            {showAddReference && <AddReference
                            sendSubmit={handleSubmit}
                            toggleModal={() => { setShowAddReference(false) }} />}
                        
                        </div>
                        {error && <h4 className="error-message">{error}</h4>}
                    </div>
                        <div className="ref-list-container">
                            <ul className="ul-layout">
                                {referenceList.refs.map((ref) => {
                                    return(
                                        <li key={ref.referenceNumber}>
                                            <div className="ref-number-container">
                                                <span>{ref.referenceNumber}</span>
                                            </div>
                                            <div className="ref-info-left">
                                                <div className="ref-info-headings">
                                                    <p>Title:</p>
                                                    <p>Source:</p>
                                                    <p>Written:</p>
                                                    <p>Recieved:</p>
                                                </div>
                                                <div className="ref-info-text">
                                                    <p>{ref.title}</p>
                                                    <a href={ref.source}>{ref.source}</a>
                                                    <p className="ref-date">
                                                        <span>{ref.articleWritten.getDate()}</span>
                                                        <span>/</span>
                                                        <span>{ref.articleWritten.getMonth()}</span>
                                                        <span className="date-spacer">-</span>
                                                        <span>{ref.articleWritten.getFullYear()}</span>
                                                    </p>
                                                    <p className="ref-date">
                                                        <span>{ref.recieved.getDate()}</span>
                                                        <span>/</span>
                                                        <span>{ref.recieved.getMonth()}</span>
                                                        <span className="date-spacer">-</span>
                                                        <span>{ref.recieved.getFullYear()}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="ref-rating">
                                                <div className="rate-stars">
                                                    {displayRatingHtml(ref)}
                                                </div>
                                                {showIsRatingOk && refNumControl === ref.referenceNumber ? 
                                                rateMeHtml : <a href="#">Rate me</a>}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
            </section>
        )
    }

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

export default References;