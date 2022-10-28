import {MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import React, {useState} from "react";
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

const colors = {
  PLANE: '#1746A2',
}

const mapModes = {
  MAIN: 'main',
  ADD: 'add',
}

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
      onClick={() => setModal('friends', null)}
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
            <Cell onClick={() => openAdd('plane')} before={<Avatar />}>
              Самолет
            </Cell>
          <Cell onClick={() => openAdd('train')} before={<Avatar />}>
              Поезд
            </Cell>
          <Cell onClick={() => openAdd('bus')} before={<Avatar />}>
              Автобус
            </Cell>
          <Cell onClick={() => openAdd('car')} before={<Avatar />}>
              Машина
            </Cell>
          <Cell onClick={() => openAdd('parom')} before={<Avatar />}>
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
      {points.map(point => {
        return (
          <>
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
            <Polyline key={point} positions={point}/>
          </>
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
