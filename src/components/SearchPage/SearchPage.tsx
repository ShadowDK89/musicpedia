import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { upperCaseLetter } from "../../Functions/functions";
import { TSearchResult } from "../../Models/TSearchResult";
import "./SearchPage.scss";
import { db } from "../../services/firebase";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSearchData } from "../../redux/ducks/searchResultSlice";
import { RootState } from "../../redux/store";

type SearchResultProps = {
  searchTerm: string;
  sendMusician(musican: TSearchResult): void;
};

const SearchPage: React.FC<SearchResultProps> = ({
  searchTerm,
  sendMusician,
}) => {
  const defaultSearch: TSearchResult[] = [];
  const [searchList, setSearchList] = useState(defaultSearch);
  const dispatch = useAppDispatch();
  const searchResult = useAppSelector(
    (state: RootState) => state.searchResult.searchResult
  );

  useEffect(() => {
    let searchToLower = searchTerm.toLowerCase();
    if (searchToLower === "") {
      const unsubscibe = db
        .collection("/searchIndex")
        .onSnapshot((snapshot) => {
          const newSearchList: TSearchResult[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            musicianId: doc.data().musicianId,
            name: doc.data().name,
            genres: doc.data().genres,
            origin: doc.data().origin,
          }));
          dispatch(setSearchData(newSearchList));
          setSearchList(newSearchList);
        });
      return () => unsubscibe();
    } else {
      const unsubscibe = db
        .collection("/searchIndex")
        .where("name", "==", searchToLower)
        .onSnapshot((snapshot) => {
          const newSearchList: TSearchResult[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            musicianId: doc.data().musicianId,
            name: doc.data().name,
            genres: doc.data().genres,
            origin: doc.data().origin,
            musicianDoc: doc.data().musicianDoc,
          }));
          dispatch(setSearchData(newSearchList));
          setSearchList(newSearchList);
        });
      return () => unsubscibe();
    }
  }, [searchTerm]);

  function sendMusicianData(e: React.MouseEvent) {
    const mId = e.currentTarget.parentElement?.dataset.id;
    if (mId !== undefined) {
      const getMusician = searchResult.find((musican) => musican.id === mId);
      if (getMusician !== undefined) {
        sendMusician(getMusician);
      }
    }
  }

  let searchResultHtml = searchResult.map((musician: TSearchResult) => {
    return (
      <li key={musician.id} className="li-layout">
        <div data-id={musician.id} className="search-name">
          <Link
            to={`/musician/${musician.musicianId}`}
            onClick={sendMusicianData}
          >
            {upperCaseLetter(musician.name)}
          </Link>
        </div>
        <div className="search-genre">
          {musician.genres.map((g, i) => {
            if (i < musician.genres.length - 1) {
              return <p key={g}>{upperCaseLetter(g)}/</p>;
            } else {
              return <p key={g}>{upperCaseLetter(g)}</p>;
            }
          })}
        </div>
        <div className="search-origin">
          {musician.origin.map((o, i) => {
            if (i < musician.origin.length - 1) {
              return <p key={o}>{upperCaseLetter(o)}/</p>;
            } else {
              return <p key={o}>{upperCaseLetter(o)}</p>;
            }
          })}
        </div>
      </li>
    );
  });

  return (
    <section className="search-page">
      <div className="search-header">
        <h3>Artist Name</h3>
        <h3>Genre</h3>
        <h3>Origin</h3>
      </div>
      <div className="search-result">
        <ul className="ul-layout">{searchResultHtml}</ul>
      </div>
    </section>
  );
};

export default SearchPage;
