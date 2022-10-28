import {
  ANDROID,
  Avatar,
  Button,
  Div, Group, IconButton, IOS,
  ModalCard,
  ModalPage,
  ModalPageHeader, Panel, PanelHeader, PanelHeaderBack, PanelHeaderButton, PanelHeaderClose,
  Placeholder, Search, Tabs, TabsItem, useAdaptivity,
  usePlatform, View,
  ViewWidth, VKCOM
} from "@vkontakte/vkui";
import {modalList} from "../utils/modal";
import FriendsIcon from "../img/friends.svg";
import React, {useState} from "react";
import {
  Icon16Dropdown,
  Icon24Cancel,
  Icon24Dismiss,
  Icon24Done,
  Icon24ScanViewfinderOutline,
  Icon56UsersOutline
} from "@vkontakte/icons";
import Persik from '../img/persik.png'
import * as PropTypes from "prop-types";
import Home from "../panels/Home";
import {MapWithHOC} from "../utils/MapsAll";
import {MapAddWithHOC} from "../utils/MapsAdd";
import bridge from "@vkontakte/vk-bridge";
import { decode } from "bcbp";
let airports = require('airport-codes');

export const AddTrip = ({ setActiveModal, fetchedFriends, geo, id, go, additional, user }) => {
  const {viewWidth} = useAdaptivity();
  const isMobile = viewWidth <= ViewWidth.MOBILE;
  const platform = usePlatform();
  const [expanded, setExpanded] = React.useState(false);
  const toggle = React.useCallback(() => setExpanded(!expanded), [expanded]);
  const onClose = () => setActiveModal(null)
  const [page, setPage] = useState('city')
  const [search, setSearch] = useState('')
  console.log(additional);
  return (
    <Panel id={id} className={'add-trip'}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go('home')} />}>
        Откуда
      </PanelHeader>
      <Tabs mode={'segmented'}>
        <TabsItem
          id="tab-news"
          aria-controls="tab-content-news"
          onClick={() => setPage('city')}
          selected={page === 'city'}
        >
          Города
        </TabsItem>
        <TabsItem
          id="tab-recommendations"
          aria-controls="tab-content-recommendations"
          onClick={() => setPage('map')}
          selected={page === 'map'}

        >
          Выбрать на карте
        </TabsItem>
        {additional === 'plane' &&
            <IconButton
                id="tab-recommendations"
                aria-controls="tab-content-recommendations"
                onClick={() => {
                  setPage('scan')
                  bridge.send('VKWebAppOpenCodeReader').then((res) =>
                  {
                    console.log(res)
                    let bp = decode(res)
                    let dep = airports.findWhere({ iata:bp.legs[0].departureAirport})
                    let des = airports.findWhere({ iata:bp.legs[0].arrivalAirport})
                    let data = {
                      from: [dep.latitude, dep.longitude],
                      to: [des.latitude, dep.longitude]
                    }

                  })
                    .catch((e) => console.log(e))
                }}
                selected={page === 'scan'}
            >
              <Icon24ScanViewfinderOutline/>
            </IconButton>}
      </Tabs>
      {page === "city" && <Group>
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          after={'Отмена'}
          before={null}
        />
      </Group>}
      {page === "map" && <>
        <MapAddWithHOC mapStatus={'add'} setModal={setActiveModal} geo={geo} user={user} additional={additional} go={go}/>
      </>}
    </Panel>
  )
}
