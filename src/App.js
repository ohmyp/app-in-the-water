import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import "leaflet/dist/leaflet.css";
import Home from './panels/Home';
import "./app.scss"
import {getModalRoot, modalList} from "./utils/modal";
import {AddTrip} from "./panels/AddTrip";
import {Profile} from "./panels/Profile";
import {Rating} from "./panels/Rating";


const App = () => {
  const [scheme, setScheme] = useState('bright_light')
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [fetchedGeo, setGeo] = useState(null)
  const [fetchedFriends, setFriends] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [additional, setAdditional] = useState(null);

  async function getGeoData() {
    await bridge.send('VKWebAppGetGeodata')
      .then((geo) => {
        console.log(geo)
        if (geo.available === 1) {
          setGeo(geo);
          if (activeModal === 'no_geo') {
            setActivePanel(null)
          }
        } else {
          setActiveModal('no_geo')
        }
      })
      .catch(() => {
        setActiveModal('no_geo')
      })
  }

  async function getFriends() {
    await bridge.send('VKWebAppGetFriends')
      .then((friends) => {
        console.log(friends.users)
        setFriends(friends.users)
      })
      .catch(() => {
        setActiveModal('error')
      })
  }

  async function getScanCode() {
    bridge.send('VKWebAppOpenCodeReader')
      .then((data) => {
        if (data.code_data) {
          console.log(data.code_data)
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  }

  useEffect(() => {
    bridge.subscribe(({detail: {type, data}}) => {
      if (type === 'VKWebAppUpdateConfig') {
        setScheme(data.scheme)
      }
    });

    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }

    fetchData();
    getGeoData();
    // getFriends();
  }, []);

  const go = (e, additional) => {
    setActivePanel(e);
    setAdditional(additional)
  };

  const setModal = (e) => {
    setActiveModal(e)
  }

  const modal = getModalRoot({
    activeModal,
    setActiveModal,
    fetchedFriends,
    geo: fetchedGeo,
    getGeoData
  });

  function viewRender() {
    return (
      <SplitLayout modal={modal}>
        <SplitCol>
          <View activePanel={activePanel}>
            <Home id="home" go={go} setModal={setModal} geo={fetchedGeo}/>
            <AddTrip additional={additional} id="add" go={go} setModal={setModal} geo={fetchedGeo} user={fetchedUser}/>
            <Profile id="profile" go={go} setModal={setModal} geo={fetchedGeo} user={fetchedUser}/>
            <Rating id="rating" go={go} setModal={setModal} geo={fetchedGeo} user={fetchedUser}/>
          </View>
        </SplitCol>
      </SplitLayout>
    )
  }

  return (
    <AdaptivityProvider>
      <ConfigProvider appearance="light">
        <AppRoot>
          {viewRender()}
        </AppRoot>
      </ConfigProvider>
    </AdaptivityProvider>
  );
}

export default App;
