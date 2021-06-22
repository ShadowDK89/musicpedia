import React, { useEffect, useState } from 'react'
import { upperCaseLetter } from '../../../../../Functions/functions';
import { TTracklist } from '../../../../../Models/TDiscography';
import './Lyrics.scss'

type TLyricsProps = {
    trackLyrics:TTracklist;
    musicianName: string;
    closeModal():void;
}

const Lyrics:React.FC<TLyricsProps> = ({ trackLyrics, musicianName, closeModal }) => {
    const defaultTracklist:TTracklist = {
        title: '',
        trackNumber: 0,
        lyrics: '',
        musicBy: [],
        writtenBy: []
    }
    const [trackInfo, setTrackInfo] = useState(defaultTracklist);

    useEffect(() => {
        if(trackLyrics){
            setTrackInfo(trackLyrics);
        }
    }, [trackLyrics]);

    function closeLyrics(){
        closeModal();
    }


    return (
        <div className="lyrics-container musician-page">
            <div className="close-button">
                <span onClick={closeLyrics}>X</span>
            </div>
            <div className="lyrics-heading">
                <h1>{upperCaseLetter(musicianName)} - {trackInfo.title}</h1>
                <div className="author">
                    <p className="author-heading">Music: </p>
                    <div>
                    {trackInfo.musicBy.map((m) => {
                        return (<p key={m}>{upperCaseLetter(m)}</p>)
                        })}
                    </div>
                </div>
                <div className="author">
                    <p className="author-heading">Lyrics: </p>
                    <div>
                    {trackInfo.writtenBy.map((m) => {
                        return (<p key={m} className="author-name">{upperCaseLetter(m)}</p>)
                        })}
                    </div>
                </div>
            </div>
            <section className="lyrics-text">
                <p>{trackInfo.lyrics}</p>
            </section>
        </div>
    )
}

export default Lyrics;