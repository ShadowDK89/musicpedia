import React, { ChangeEvent, useEffect, useState } from 'react'
import { upperCaseLetter } from '../../../Functions/functions';
import { TDiscography } from '../../../Models/TDiscography';
import { TMusicianData } from '../../../Models/TMusicianData'
import AlbumDetails from './AlbumDetails/AlbumDetails';
import './Discography.scss'

interface TDiscographyProps{
    musicianData:TMusicianData
}

const Discography:React.FC<TDiscographyProps> = ({ musicianData }) => {
    const defaultDiscography:TDiscography[] = [];
    const defaultAlbum:TDiscography = {
        title: '',
        genre: [],
        lineUp: [],
        tracklist: [],
        release: 0,
        type: '',
        albumImg: ''
    }
    const [musicianAlbum, setMusicianAlbum] = useState(defaultAlbum);
    const [musicianDiscography, setMusicianDiscography] = useState(defaultDiscography);
    const [showStudio, setShowStudio] = useState(true);
    const [showLive, setShowLive] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        if(musicianData.discography){
            setMusicianDiscography(musicianData.discography);
        } else {
            return
        }
    }, [musicianData]);

    function filterAlbums(e:ChangeEvent <HTMLSelectElement>) {
       let index = e.target.options.selectedIndex;
       let value = e.target.options[index].value;

        if(value === 'studio'){
            setShowStudio(true);
            setShowLive(false);
        } else if(value === 'live'){
            setShowStudio(false);
            setShowLive(true);
        }
        else if(value === 'all') {
            setShowStudio(true);
            setShowLive(true);
        }
    }

    function showDetails(title:string){
        const getAlbum = musicianDiscography.find((album) => album.title === title);

        if(getAlbum !== undefined){
            setMusicianAlbum(getAlbum);
            setShowDetailsModal(!showDetailsModal);            
        }
    }

    let type = '';
    const albumSelectHtml = musicianDiscography.map((album, i) => {
        if(album.type !== type || type !== musicianDiscography[i].type){
            type = album.type;
            return(
                <option key={album.type} value={album.type}>{upperCaseLetter(album.type)}</option>
            )
        } else {
            return ''
        }
    })

    const studioAlbumsHtml = musicianDiscography.map((album) => {
        if(album.type === 'studio'){
            return(
                <li key={album.title} className="discography-list-item li-layout" onClick={() => {showDetails(album.title)}}>
                    <img src={album.albumImg} alt="" />
                    <p className="album-title">{album.title}</p>
                    <p>{album.release}</p>
                </li>
            );
        } else {
            return ''
        }
    })

    const liveAlbumsHtml = musicianDiscography.map((album) => {        
        if(album.type === 'live'){
            return(
                <li key={album.title} className="discography-list-item li-layout" onClick={() => {showDetails(album.title)}}>
                    <img src={album.albumImg} alt="" />
                    <p className="album-title">{album.title}</p>
                    <p>{album.release}</p>
                </li>
            );
        } else {
            return ''
        }
    })

    if(musicianData.id !== ''){
        return(
            <section className="discography musician-page">
                <div className="discography-list-container">
                <div className="selection-type">
                    <select name="album-type" onChange={filterAlbums}>
                        <option value="all" >Show All</option>
                        {albumSelectHtml}
                    </select>
                </div>
                { showStudio ?
                    <div className="studio-albums list-container">
                        <h3>Studio Albums</h3>
                        <ul className="discography-list ul-layout">
                            {studioAlbumsHtml}
                        </ul>
                    </div>
                    : <React.Fragment />}
                    { showLive ? 
                        <div className="live-albums list-container">
                            <h3>Live Albums</h3>
                            <ul className="discography-list ul-layout">
                                {liveAlbumsHtml}
                            </ul>
                        </div> 
                    : <React.Fragment />}
                </div>
                {showDetailsModal &&
                    <AlbumDetails closeModal={() => { setShowDetailsModal(!showDetailsModal) }}
                    musicianAlbum={musicianAlbum}
                    musicianName={musicianData.name}/>}
            </section>
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

export default Discography;