import {MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import React, {useState} from "react";
import * as PropTypes from "prop-types";
import CupIcon from "../img/cup.svg";
import CameraIcon from "../img/camera.svg";
import CheckInIcon from "../img/checkin.svg";
import {
  Icon24DismissDark,
  Icon28BackspaceOutline,
  Icon28DoneOutline,
  Icon28PinDotOutline,
  Icon28PinOutline
} from "@vkontakte/icons";
import {modalList} from "./modal";
import {useAppearance} from "@vkontakte/vkui";

const colors = {
  PLANE: '#1746A2',
}

const mapModes = {
  MAIN: 'main',
  ADD: 'add',
}

const MComponent = ({geo, setModal, mapStatus, go}) => {
  const [points, setPoints] = useState([]);
  const [newPoints, setNewPoints] = useState([]);
  const map = useMap();
  const appearance = useAppearance();

  const addPoint = () => {
    const added = map.getCenter();
    setNewPoints([...newPoints, added]);
  }

  const removeLastPoint = () => {
    const arr = newPoints;
    newPoints.pop();
    setNewPoints([...arr])
  }

  const exitAdding = () => {
    setNewPoints([])

  }

  const confirmAdd = () => {
    newPoints.length > 1 && setPoints([...points, newPoints]);
    setNewPoints([]);
  }

  const addButtons = <>
    <Icon28PinDotOutline className={'add-center-dot'}/>
    <div className={'controls'}>
      <div
        className={appearance === 'light' ? 'controls-button light' : 'controls-button'}
        onClick={() => exitAdding()}
      >
        <Icon24DismissDark/>
      </div>
      <div
        className={appearance === 'light' ? 'controls-button-big light' : 'controls-button'}
        onClick={() => removeLastPoint()}
      >
        <Icon28BackspaceOutline/>
      </div>
      <div
        className={appearance === 'light' ? 'controls-button-big light' : 'controls-button'}
        onClick={() => addPoint()}
      >
        <Icon28PinOutline/>
      </div>
      <div
        className={appearance === 'light' ? 'controls-button light' : 'controls-button'}
        onClick={() => confirmAdd()}
      >
        <Icon28DoneOutline/>
      </div>
    </div>
  </>
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
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={[point[point.length-1].lat, point[point.length-1].lng]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Polyline key={point} positions={point}/>
          </>
        )
      })}
      <Polyline pathOptions={colors.PLANE} positions={newPoints}/>
      {addButtons}
    </>
  );
}

export const MapAddWithHOC = ({geo, setModal, mapStatus, go}) => {

  return (
    <MapContainer center={[geo.lat, geo.long]} zoom={15}>
      <MComponent mapStatus={mapStatus} geo={geo} setModal={setModal} go={go}/>
    </MapContainer>
  );
}
