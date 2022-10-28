import {MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import React, {Fragment, useState} from "react";
import * as PropTypes from "prop-types";
import CupIcon from "../img/cup.svg";
import CameraIcon from "../img/camera.svg";
import CheckInIcon from "../img/checkin.svg";
import {
  Icon24DismissDark, Icon28AddOutline,
  Icon28BackspaceOutline, Icon28CupOutline,
  Icon28DoneOutline,
  Icon28PinDotOutline,
  Icon28PinOutline, Icon28Profile
} from "@vkontakte/icons";
import {modalList} from "./modal";
import {
  Avatar,
  Button,
  ButtonGroup, Cell,
  Checkbox,
  FormItem,
  FormLayout, Group,
  Input,
  Tabs,
  TabsItem,
  useAdaptivity,
  useAppearance
} from "@vkontakte/vkui";
import {Dropdown} from "@vkontakte/vkui/unstable";

import cari from '../img/car.svg'
import planei from '../img/plane.svg'
import busi from '../img/bus.svg'
import ferryi from '../img/ship.svg'
import traini from '../img/train.svg'

const colors = {
  plane:'#FF5E78',
  car:'#FFC75F',
  bus:'#845EC2',
  train:'#59CE8F',
  ferry:'#3AB0FF',
}

const mapModes = {
  MAIN: 'main',
  ADD: 'add',
}

const pointsDefault = [
  [
    {lat: 59.9333512, lng: 30.3141618, color: colors.train},
    {lat: 38.736946, lng: -9.142685, color: colors.train},
  ],
  [
    {lat: 59.9333512, lng: 30.3141618, color: colors.car},
    {lat: 41.015137, lng: 28.979530, color: colors.car},
  ],
  [
    {lat: 59.9333512, lng: 30.3141618, color: colors.bus},
    {lat: 51.169392, lng: 71.449074, color: colors.bus},
  ],

]

const MComponent = ({geo, setModal, mapStatus, go}) => {
  const [points, setPoints] = useState([]);
  const [dropdown, showDropdown] = useState(false);
  const map = useMap();
  const appearance = useAppearance();
  const openAdd = (type) => {
    go('add', type)
  };
  const defaultButtons = <div className={'controls-all'}>
    <div
      className={appearance === 'light' ? 'controls-button light' : 'controls-button'}
      onClick={() => go('rating')}
    >
      <Icon28CupOutline/>
    </div>
    <div
      className={appearance === 'light' ? 'controls-button-big light' : 'controls-button'}
    >
      <Dropdown
        className={'controls-dropdown'}
        action="click"
        shown={dropdown}
        onShownChange={showDropdown}
        offsetDistance={40}
        offsetSkidding={-60}
        content={
          <Group>
            <Cell onClick={() => openAdd('plane')}
                  before={<Avatar style={{background: '#FF5E78', padding: '10px'}} src={planei}/>}>
              Самолет
            </Cell>
            <Cell onClick={() => openAdd('train')}
                  before={<Avatar style={{background: '#FFC75F', padding: '10px'}} src={traini}/>}>
              Поезд
            </Cell>
            <Cell onClick={() => openAdd('bus')}
                  before={<Avatar style={{background: '#845EC2', padding: '10px'}} src={busi}/>}>
              Автобус
            </Cell>
            <Cell onClick={() => openAdd('car')}
                  before={<Avatar style={{background: '#59CE8F', padding: '10px'}} src={cari}/>}>
              Машина
            </Cell>
            <Cell onClick={() => openAdd('parom')}
                  before={<Avatar style={{background: '#3AB0FF', padding: '10px'}} src={ferryi}/>}>
              Паром
            </Cell>
          </Group>
        }>
        <Icon28AddOutline/>
      </Dropdown>
    </div>
    <div
      className={appearance === 'light' ? 'controls-button light' : 'controls-button'}
      onClick={() => go('profile')}
    >
      <Icon28Profile/>
    </div>
  </div>

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {pointsDefault.map(point => {
        return (
          <Fragment key={point}>
            <Marker position={[point[0].lat, point[0].lng]}>
              <Popup>
                A pretty CSS3 popup. <br/> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={[point[point.length - 1].lat, point[point.length - 1].lng]}>
              <Popup>
                A pretty CSS3 popup. <br/> Easily customizable.
              </Popup>
            </Marker>
            <Polyline pathOptions={{ color: point[0].color }} positions={point}/>
          </Fragment>
        )
      })}
      {defaultButtons}
    </>
  );
}

export const MapAllWithHOC = ({geo, setModal, mapStatus, go}) => {
  console.log(444)
  return (
    <MapContainer center={[geo.lat, geo.long]} zoom={15}>
      <MComponent mapStatus={mapStatus} geo={geo} setModal={setModal} go={go}/>
    </MapContainer>
  );
}
