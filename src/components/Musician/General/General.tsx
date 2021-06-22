import React, { useEffect, useState } from 'react'
import { upperCaseLetter } from '../../../Functions/functions';
import { TMusicianData } from '../../../Models/TMusicianData';
import './General.scss'

type TGeneralProps = {
    musicianData:TMusicianData
}

const General:React.FC<TGeneralProps> = ({musicianData}) => {
    const defaultMusician:TMusicianData = {
        id: '',
        name: '',
        genres: [],
        origin: [],
        shortDesc: '',
        yearsActive: '',
        imgBanner: '',
        imgMusician: '',
        members: [],
        discography: [],
        longDesc: {
            articleSections: [],
        },
        asociatedActs: [],
      }
    const [localMusicianData, setLocalMusicianData]= useState(defaultMusician);
    
    useEffect(() => {
        if(musicianData.shortDesc){
            setLocalMusicianData(musicianData);
        } else {
            return
        }
    }, [musicianData]);

      if(localMusicianData.id){
        return (
            <React.Fragment>
                <section className="musician-intro musician-page" key={localMusicianData.id}>
                    <div className="general-container">
                        <h2>{upperCaseLetter(localMusicianData.name)}</h2>
                        <div className="intro-box">
                            <img className="musician-img" src={localMusicianData.imgMusician} alt="" />
                            <div className="intro-text">
                                <h3>Years active:</h3>
                                <p>{localMusicianData.yearsActive}</p>
                                <h3>Genres:</h3>
                                {localMusicianData.genres.map((g, i) => {                 
                                    if(i < localMusicianData.genres.length - 1){
                                        return(
                                        <p key={g}>{upperCaseLetter(g)}/</p>
                                        )
                                    } else {
                                        return(
                                        <p key={g}>{upperCaseLetter(g)}</p>
                                        )
                                    }
                                })}
                                <h3>Origin:</h3>
                                {localMusicianData.origin.map((o, i) => {                 
                                    if(i < localMusicianData.origin.length - 1){
                                        return(
                                        <p key={o}>{upperCaseLetter(o)}/</p>
                                        )
                                    } else {
                                        return(
                                        <p key={o}>{upperCaseLetter(o)}</p>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <section className="intro-desc">
                            <h4>This is {upperCaseLetter(localMusicianData.name)}</h4>
                            <p>
                                {localMusicianData.shortDesc}
                            </p>
                        </section>
                    </div>
                </section>
            </React.Fragment>
        )
      }

      else{
        return (
            <div className="musician-intro musician-page">
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default General;