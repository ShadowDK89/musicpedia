import React, { useEffect, useState } from "react";
import { TCarousel } from "../../Models/TCarousel";
import Carousel from "../Carousel/Carousel";
import "./Home.scss";
import { useAuth } from "../../context/AuthContext";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setMusicianData } from "../../redux/ducks/musicianSlice";
import { TMusicianData } from "../../Models/TMusicianData";
import { db } from "../../services/firebase";

const Home = () => {
  const defaultCarousel: TCarousel[] = [];
  const [popularSearches, setPopularSearches] = useState(defaultCarousel);
  const [latestSearches, setLatestSearches] = useState(defaultCarousel);
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();
  const music = useAppSelector((state: any) => state.musicianData);

  useEffect(() => {
    setPopularSearches([
      {
        name: "Wolf",
        source: "https://www.powerofmetal.dk/interviews14/images/wolfband.jpg",
      },
      {
        name: "Almanac",
        source: "https://www.almanac.band/images/slide-52.jpg",
      },
      {
        name: "Battle Beast",
        source:
          "https://www.nuclearblast.de/en/data/bands/battle-beast/bandfotos/2018/battlebeast-2018-2.jpg",
      },
      {
        name: "Wolf",
        source: "https://www.powerofmetal.dk/interviews14/images/wolfband.jpg",
      },
      {
        name: "Battle Beast",
        source:
          "https://www.nuclearblast.de/en/data/bands/battle-beast/bandfotos/2018/battlebeast-2018-2.jpg",
      },
      {
        name: "Almanac",
        source: "https://www.almanac.band/images/slide-52.jpg",
      },
    ]);

    setLatestSearches([
      {
        name: "Almanac",
        source: "https://www.almanac.band/images/slide-52.jpg",
      },
      {
        name: "Battle Beast",
        source:
          "https://www.nuclearblast.de/en/data/bands/battle-beast/bandfotos/2018/battlebeast-2018-2.jpg",
      },
    ]);
  }, []);

  useEffect(() => {}, []);

  async function setNewData() {
    let updateFirstDoc = db
      .collection("references")
      .doc("0quY0P0KJxesnpNiJ46p");

    return updateFirstDoc
      .update({
        refs: [
          {
            articleWritten: new Date(),
            rating: [],
            recieved: new Date(),
            referenceNumber: 1,
            source: "https://prettyreckless.com",
            title: "Battle Beast's Homepage",
          },
          {
            articleWritten: new Date(),
            rating: [],
            recieved: new Date(),
            referenceNumber: 2,
            source: "https://another-page.com",
            title: "Different Page",
          },
          {
            articleWritten: new Date(),
            rating: [],
            recieved: new Date(),
            referenceNumber: 1,
            source: "https://shitty-site.com",
            title: "Shitty page",
          },
        ],
      })
      .then(() => {
        console.log("successful!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*     useEffect(() => {
        const test:TMusicianData = {
            id: '1',
            name: 'Ett band',
            origin: [],
            genres:[],
            shortDesc: 'Beskrivning',
            yearsActive: '',
            imgBanner: '',
            imgMusician: '',
            members: [],
            discography: [],
            longDesc: {articleSections: []},
            asociatedActs: []
        }

        dispatch(setMusicianData(test))
        
    }, [dispatch])
    console.log(music); */

  return (
    <div className="home-component">
      <div className="welcome-text">
        {currentUser ? <h3>Welcome {currentUser.email.substr(0, 4)}</h3> : ""}
      </div>
      <div>
        <section className="carousel-search">
          <h2>Populära sökningar</h2>
          <Carousel imgArr={popularSearches}></Carousel>
        </section>
        <section className="carousel-search">
          <h2>Senaste sökningar</h2>
          <Carousel imgArr={latestSearches}></Carousel>
        </section>
      </div>
    </div>
  );
};
export default Home;
