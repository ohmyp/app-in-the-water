import React from 'react';
import {
  Avatar, Button,
  CellButton,
  Gradient,
  Group,
  Header, Panel,
  PanelHeader,
  PanelHeaderBack, Placeholder,
  SimpleCell, Text,
  Title
} from "@vkontakte/vkui";
import {Icon28AddOutline, Icon28SchoolOutline} from "@vkontakte/icons";

const trips = [
  {
    date: '26.10.2022',
    km: 78,
  }, {
    date: '24.10.2022',
    km: 21,
  }, {
    date: '09.09.2022',
    km: 1487,
  },
]


export const Profile = ({setActiveModal, fetchedFriends, geo, id, go, additional, user}) => {
  return (
    <Panel id={id} className={'add-trip'}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go('home')}/>}>
        Профиль
      </PanelHeader>
      <Placeholder
        icon={<Avatar size={96} src={user.photo_200}/>}
        header={user.first_name + ' ' + user.last_name}
        action={<Button size="m">Поделиться с друзьями</Button>}
      >
        Всего поездок: {trips.length}
      </Placeholder>
      <Group mode="plain" style={{background: 'white'}}>
        <Header>Статистика поездок</Header>
        {trips.map(trip => <SimpleCell
          before={<Icon28SchoolOutline/>}
        >
          {trip.date}, {trip.km} км.
        </SimpleCell>)}
      </Group>
    </Panel>
  );
};

export default Profile;
