import React, { useEffect, useState } from 'react'
import { upperCaseLetter } from '../../../Functions/functions';
import { TMusicianAsociated } from '../../../Models/TMusicianAsociated';
import { TMusicianData } from '../../../Models/TMusicianData';
import './AsociatedActs.scss'

type TAsociatedProps = {
    musicianData:TMusicianData;
}

const AsociatedActs:React.FC<TAsociatedProps> = ({ musicianData }) => {
    const defaultMember:TMusicianAsociated[] = [];
    const [musicianAsociated, setMusicianAsociated] = useState(defaultMember);

    useEffect(() => {
        if(musicianData.asociatedActs){
            setMusicianAsociated(musicianData.asociatedActs);
        } else {
            return
        }
    }, [musicianData]);

    const asociatedHtml = musicianAsociated.map((a) => {
        return(
                <div className="asociated-act-info">
                    <h3>{upperCaseLetter(a.name)}</h3>
                    <ul className="ul-layout">
                        {musicianAsociated.map((details) => {
                            return(
                                <li key={details.name} className="li-layout">
                                {details.instrument.map((instrument, i) => {                 
                                    if(i < details.instrument.length - 1){
                                        return(
                                        <p key={instrument}>{upperCaseLetter(instrument)}/</p>
                                        )
                                    } else {
                                        return(
                                        <p key={instrument}>{upperCaseLetter(instrument)}</p>
                                        )
                                    }
                                })}
                                    <p>{details.yearsActive}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
        )
    })

    if(musicianData.id !== ''){
        return (
            <section className="asociated-acts musician-page">
                <div className="asociated-acts-list list-container">
                    {asociatedHtml}
                </div>
            </section>
        )
    }
    else {
        return(
            <h1>Loading...</h1>
        )
    }
}

export default AsociatedActs;