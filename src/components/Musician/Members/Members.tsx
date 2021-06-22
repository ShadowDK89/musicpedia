import React, { useEffect, useState } from 'react'
import { ChangeEvent } from 'react';
import { upperCaseLetter } from '../../../Functions/functions';
import { TMembers } from '../../../Models/TMembers';
import { TMusicianData } from '../../../Models/TMusicianData';
import './Members.scss'

type TMembersProps = {
    musicianData:TMusicianData;
}


const Members:React.FC<TMembersProps> = ({musicianData}) => {
    const defaultMember:TMembers[] = [];

    const [musicianMembers, setMusicianMembers] = useState(defaultMember);
    const [showLive, setShowLive] = useState(true);
    const [showStudio, setShowStudio] = useState(true);

    useEffect(() => {
        if(musicianData.members){
            setMusicianMembers(musicianData.members);
        } else {
            return
        }
    }, [musicianData]);

    function filterMembers(e:ChangeEvent <HTMLSelectElement>){
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
    let type = '';
    const memberSelectHtml = musicianMembers.map((member, i) => {

        if(member.type !== type || type !== musicianMembers[i].type){
            type = member.type;
            return(
                <option key={member.type} value={member.type}>{upperCaseLetter(member.type)}</option>
            )
        } else {
            return ''
        }
    })

    const studioMembersHtml = musicianMembers.map((member) => {
        if(member.type === 'studio'){
            return(
                <li className="member-list-item li-layout" key={member.name}>
                    <div>
                        <p>{member.name}</p>
                    </div>
                    <div>
                        <p>
                            {member.instrument.map((instrument, i) => {                 
                                if(i < member.instrument.length - 1){
                                    return(
                                    upperCaseLetter(instrument) + ', '
                                    )
                                } else {
                                    return(
                                    upperCaseLetter(instrument)
                                    )
                                }
                            })}
                        </p>
                    </div>
                    <div>
                        <p>{member.activeYears}</p>
                    </div>
                </li>
            );
        } else {
            return ''
        }
    })

    const liveMembersHtml = musicianMembers.map((member) => {        
        if(member.type === 'live'){
            return(
                <li className="member-list-item li-layout" key={member.name}>
                    <div>
                        <p>{member.name}</p>
                    </div>
                    <div>
                        <p>
                            {member.instrument.map((instrument, i) => {                 
                                if(i < member.instrument.length - 1){
                                    return(
                                    upperCaseLetter(instrument) + ', '
                                    )
                                } else {
                                    return(
                                    upperCaseLetter(instrument)
                                    )
                                }
                            })}
                        </p>
                    </div>
                    <div>
                        <p>{member.activeYears}</p>
                    </div>
                </li>
            );
        } else {
            return ''
        }
    })

    if(musicianData.id !== ''){
        return (
            <section className="members musician-page">
                <div className="members-container">
                    <div className="members-list-selection">
                        <div className="selection-type">
                            <select name="member-type" onChange={filterMembers}>
                                <option value="all" >Show All</option>
                                {memberSelectHtml}
                            </select>
                        </div>
                    </div>
                        <div className="members-list-container">
                            {showStudio ? 
                                <div className="studio-members list-container">
                                <h3>Studio Members</h3>
                                <ul className="member-list ul-layout">
                                    {studioMembersHtml}
                                </ul>
                            </div> : <React.Fragment />}
                            {showLive ? 
                                <div className="live-members list-container">
                                <h3>Live Members</h3>
                                <ul className="member-list ul-layout">
                                    {liveMembersHtml}
                                </ul>
                            </div> : <React.Fragment />}
                        </div>
                    </div>
            </section>
        )
    }
    else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default Members;