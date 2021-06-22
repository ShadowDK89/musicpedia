import React, { useEffect, useState } from 'react';
import { TCarousel } from '../../Models/TCarousel';
import Carousel from '../Carousel/Carousel';
import './Home.scss'
import { useAuth } from '../../context/AuthContext'

const Home = () => {
    const defaultCarousel:TCarousel[] = [];
    const [popularSearches, setPopularSearches] = useState(defaultCarousel);
    const [latestSearches, setLatestSearches] = useState(defaultCarousel);
    const { currentUser } = useAuth();


    useEffect(() => {
        setPopularSearches([{name: 'Wolf', source: 'https://www.powerofmetal.dk/interviews14/images/wolfband.jpg'},
        {name: 'Almanac', source: 'https://www.almanac.band/images/slide-52.jpg'},
        {name: 'Battle Beast', source: 'https://www.nuclearblast.de/en/data/bands/battle-beast/bandfotos/2018/battlebeast-2018-2.jpg'},
        {name: 'Wolf', source: 'https://www.powerofmetal.dk/interviews14/images/wolfband.jpg'},
        {name: 'Battle Beast', source: 'https://www.nuclearblast.de/en/data/bands/battle-beast/bandfotos/2018/battlebeast-2018-2.jpg'},
        {name: 'Almanac', source: 'https://www.almanac.band/images/slide-52.jpg'}]);

        setLatestSearches([{name: 'Almanac', source: 'https://www.almanac.band/images/slide-52.jpg'},
        {name: 'Battle Beast', source: 'https://www.nuclearblast.de/en/data/bands/battle-beast/bandfotos/2018/battlebeast-2018-2.jpg'}
        ]);
    }, [])


    return (
        <div className="home-component">
            <div className="welcome-text">
            {currentUser ? <h3>Welcome {currentUser.email.substr(0,4)}</h3> : ''}
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
    )
}
export default Home;