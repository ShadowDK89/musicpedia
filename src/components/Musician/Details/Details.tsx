import React, { useEffect, useState } from 'react'
import { TMusicianData } from '../../../Models/TMusicianData';
import './Details.scss'


type TDetailsProps = {
    musicianData:TMusicianData
}

const Details:React.FC<TDetailsProps> = ({ musicianData }) => {
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
        if(musicianData.longDesc){
            setLocalMusicianData(musicianData);
        } else{
            return
        }
    }, [musicianData]);

    const detailsHtml = localMusicianData.longDesc.articleSections.map((section, i) => {
        return(
            <div key={i} className="musician-desc-section">
                <h3>{section.title}</h3>
                <p>{section.content}</p>
            </div>
        )
    })

    if(localMusicianData.id !== ''){
        return(
            <section className="musician-details musician-page">
                <div className="musician-details-container">
                    {detailsHtml}
                </div>
            </section>
        )
    }

    else{
        return (
            <div className="musician-details musician-page">
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default Details;