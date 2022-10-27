import React from 'react';
import PropTypes from 'prop-types';
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import {Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, TabbarItem, Tabbar} from '@vkontakte/vkui';
import "./home.scss"
import {
    Icon28CupOutline,
    Icon28LocationMapOutline,
    Icon28NewsfeedOutline, Icon28UserCircleOutline,
    Icon28UserOutline,
    Icon32CameraOutline
} from "@vkontakte/icons";
import CameraIcon from '../img/camera.svg';
import CupIcon from '../img/cup.svg';
import CheckInIcon from '../img/checkin.svg';
import {MapAllWithHOC, MapWithHOC} from "../utils/MapsAll";

const video_src = 'https://vk.com/s/v1/doc/KNYglYKraWbUssswC7ZXo2S6AbuqCzLCYIkESh_C1dvdsvF5bnM'
const Home = ({id, go, setModal, geo}) => {

    return (
      <Panel id={id}>
          {geo && <MapAllWithHOC mapStatus={'main'} setModal={setModal} geo={geo} go={go}/>}
      </Panel>
    );
}

export default Home;
