import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import General from "./General/General";
import "./Musician.scss";
import { TMusicianData } from "../../Models/TMusicianData";
import Details from "./Details/Details";
import Discography from "./Discography/Discography";
import Members from "./Members/Members";
import AsociatedActs from "./AsociatedActs/AsociatedActs";
import References from "./References/References";
import { db } from "../../services/firebase";
import { TReference, TSources } from "../../Models/TSources";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setMusicianData } from "../../redux/ducks/musicianSlice";
import { setReferencesData } from "../../redux/ducks/referencesSlice";
import { RootState } from "../../redux/store";

type TMusician = {
  id: string;
};

type TMusicianProps = {
  keepInMemory(musician: TMusicianData): void;
  musicianData: TMusicianData;
};

const Musician: React.FC<TMusicianProps> = ({ musicianData, keepInMemory }) => {
  let { path, url } = useRouteMatch();
  let { id } = useParams<TMusician>();
  const dispatch = useAppDispatch();
  const musicianStoreData = useAppSelector(
    (state: RootState) => state.musicianData.musicianData
  );
  const referenceStoreData = useAppSelector(
    (state: RootState) => state.sources
  );
  const defaultMusician: TMusicianData = {
    id: "",
    name: "",
    genres: [],
    origin: [],
    shortDesc: "",
    yearsActive: "",
    imgBanner: "",
    imgMusician: "",
    members: [],
    discography: [],
    longDesc: {
      articleSections: [],
    },
    asociatedActs: [],
  };
  const defaultReferences: TReference = {
    title: "",
    source: "",
    articleWritten: new Date(),
    recieved: new Date(),
    rating: [],
    referenceNumber: 0,
  };
  const detaultSource: TSources = {
    id: "",
    refs: [defaultReferences],
  };
  const [localMusicianData, setLocalMusicianData] = useState(defaultMusician);
  const [referenceList, setReferenceList] = useState(detaultSource);

  useEffect(() => {
    getMusicianData();
  }, []);

  async function getMusicianData() {
    if (musicianData.id !== id) {
      const result = await db.collection("musicians").doc(id).get();
      if (result.exists) {
        const newMusician = result.data() as TMusicianData;
        newMusician.id = result.id;
        const refs = result.data();

        if (refs?.referenceDoc) {
          const getRefs = await refs.referenceDoc.get();
          if (getRefs.exists) {
            const newRefs = getRefs.data();
            newRefs.id = getRefs.id;

            let tempRefs = getRefs.data().refs;
            let datesToConvert: TReference = defaultReferences;
            for (let i = 0; i < tempRefs.length; i++) {
              datesToConvert.articleWritten =
                tempRefs[i].articleWritten.toDate();
              datesToConvert.recieved = tempRefs[i].recieved.toDate();
              newRefs.refs[i].articleWritten = datesToConvert.articleWritten;
              newRefs.refs[i].recieved = datesToConvert.recieved;
            }
            dispatch(setReferencesData(newRefs));
            setReferenceList(newRefs);
          }
        }
        dispatch(setMusicianData(newMusician));
        setLocalMusicianData(newMusician);
        fetchComplete(newMusician);
      }
    } else {
      //setLocalMusicianData(musicianStoreData);
    }
  }

  let backgroundImg: React.CSSProperties = {
    backgroundImage: `url('')`,
  };

  if (musicianData.imgBanner !== "") {
    backgroundImg = {
      backgroundImage: `url(${musicianData.imgBanner})`,
    };
  }

  function fetchComplete(musician: TMusicianData) {
    keepInMemory(musician);
  }
  return (
    <Router>
      <div key={musicianStoreData.id} className="musician-main">
        <section
          className="musician-banner keep-height"
          style={backgroundImg}
        ></section>
        <div className="musician-container">
          <div className="musician-nav-container">
            <div className="musician-nav keep-height">
              <NavLink to={`${url}`}>
                <button>General</button>
              </NavLink>
              <NavLink to={`${url}/details`}>
                <button>Details</button>
              </NavLink>
              <NavLink to={`${url}/discography`}>
                <button>Discography</button>
              </NavLink>
              <NavLink to={`${url}/members`}>
                <button>Members</button>
              </NavLink>
              <NavLink id="asociated-acts-btn" to={`${url}/asociated-acts`}>
                <button>Asociated Acts</button>
              </NavLink>
              <NavLink to={`${url}/references`}>
                <button>References</button>
              </NavLink>
            </div>
          </div>
          <Switch>
            <Route exact path={`${path}`}>
              <General musicianData={musicianStoreData} />
            </Route>
            <Route path={`${path}/details`}>
              <Details musicianData={musicianStoreData} />
            </Route>
            <Route path={`${path}/discography`}>
              <Discography musicianData={musicianStoreData} />
            </Route>
            <Route path={`${path}/members`}>
              <Members musicianData={musicianStoreData} />
            </Route>
            <Route path={`${path}/asociated-acts`}>
              <AsociatedActs musicianData={musicianStoreData} />
            </Route>
            <Route path={`${path}/references`}>
              <References />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Musician;
