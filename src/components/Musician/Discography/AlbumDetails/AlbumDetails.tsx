import React, { useEffect, useState } from 'react'
import { upperCaseLetter } from '../../../../Functions/functions';
import { TDiscography, TTracklist } from '../../../../Models/TDiscography';
import Lyrics from './Lyrics/Lyrics';
import './AlbumDetails.scss'

type TAlbumProps = {
    musicianAlbum:TDiscography;
    musicianName: string;
    closeModal():void;
}

const AlbumDetails:React.FC<TAlbumProps> = ({ musicianAlbum, musicianName, closeModal }) => {
    const defaultAlbum:TDiscography = {
        title: '',
        genre: [],
        lineUp: [],
        tracklist: [],
        release: 0,
        type: '',
        albumImg: ''
    }
    const defaultTrack:TTracklist = {
        title: '',
        trackNumber: 0,
        lyrics: '',
        musicBy: [],
        writtenBy: []
    }
    const [localMusicianAlbum, setLocalMusicianAlbum] = useState(defaultAlbum);
    const [showLyricsModal, setShowLyricsModal] = useState(false);
    const [trackContent, setTrackContent] = useState(defaultTrack)

    useEffect(() => {
        if(musicianAlbum){
            setLocalMusicianAlbum(musicianAlbum);
        }
    }, [musicianAlbum]);

    function closeAlbumDetails(){
        closeModal();
    }

    function openLyrics(e:React.MouseEvent <HTMLParagraphElement>){
        let findTrack = parseInt(e.currentTarget.dataset.id!);

        if(findTrack !== undefined){
            let getTrack = musicianAlbum.tracklist.find((t) => t.trackNumber === findTrack);
            
           if(getTrack !== undefined){
               setTrackContent(getTrack);
               setShowLyricsModal(!showLyricsModal);
            }
        } 
    }

    return (
        <section className="album-details musician-page">
            <div className="close-button">
                <span onClick={closeAlbumDetails}>X</span>
            </div>
            <div className="album-details-header">
                <img className="album-img" src={localMusicianAlbum.albumImg} alt="" />
                <div className="album-desc">
                    <p>{localMusicianAlbum.title}</p>
                    <p>{localMusicianAlbum.release}</p>
                    {localMusicianAlbum.genre.map((g, i) => {                 
                        if(i < localMusicianAlbum.genre.length - 1){
                            return(
                            <p key={g}>{upperCaseLetter(g)}/</p>
                            )
                        } else {
                            return(
                            <p key={g}>{upperCaseLetter(g)}</p>
                            )
                        }
                    })}
                </div>
            </div>
            <section className="album-details-content">
                <ul className="tracklist ul-layout">
                    {localMusicianAlbum.tracklist !== undefined ? localMusicianAlbum.tracklist.map((t, i) => {
                        return(
                            <li key={t.title} className="single-track li-layout">
                                <div className="single-track-left">
                                    <div className="tracknumber">
                                        <p>{t.trackNumber}.</p>
                                    </div>
                                    <div className="track-details">
                                        <p className="track-title">{upperCaseLetter(t.title)}</p>
                                        <div className="authors">
                                            <div className="author-names">
                                                <p className="author-heading">Music by: </p>
                                                <div>
                                                    {t.musicBy.map((m, i) => {
                                                        if (i < t.musicBy.length - 1){
                                                        return(
                                                        <p key={m}>{upperCaseLetter(m)}</p>
                                                        )
                                                    } else {
                                                        return(
                                                        <p key={m}>{upperCaseLetter(m)}</p>
                                                        )
                                                    }
                                                })}
                                                </div>
                                            </div>
                                            <div className="author-names">
                                                <p className="author-heading">Lyrics by: </p>
                                                <div>
                                                    {t.writtenBy.map((w, i) => {                 
                                                        if(i <t.writtenBy.length - 1){
                                                            return(
                                                                <p key={w}>{upperCaseLetter(w)}</p>
                                                                )
                                                            } else {
                                                                return(
                                                                <p key={w}>{upperCaseLetter(w)}</p>
                                                                )
                                                            }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lyrics-link">
                                    <p data-id={t.trackNumber} onClick={ openLyrics }>View Lyrics</p>
                                </div>
                            </li>
                        )
                    }) : <React.Fragment></React.Fragment>}
                </ul>
                    {showLyricsModal ?
                    <Lyrics
                    musicianName={musicianName}
                    trackLyrics={trackContent}
                    closeModal={() => {setShowLyricsModal(!showLyricsModal);}}/>
                    : <React.Fragment />}
                    
            </section>
        </section>
    )
}

export default AlbumDetails;