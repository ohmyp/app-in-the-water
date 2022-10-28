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

export const Profile = ({ setActiveModal, fetchedFriends, geo, id, go, additional, user }) => {
  console.log(user)
  return (
    <Panel id={id} className={'add-trip'}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go('home')} />}>
        Профиль
      </PanelHeader>
      <Placeholder
        icon={<Avatar size={96} src={user.photo_200} />}
        header={user.first_name + ' ' + user.last_name }
        action={<Button size="m">Поделиться с друзьями</Button>}
      >
        Всего поездок:
      </Placeholder>
        <Group mode="plain" style={{background:'white'}}>
          <Header>Статистика поездок</Header>
          <SimpleCell
            before={<Icon28SchoolOutline />}
          >
            хуй
          </SimpleCell>
        </Group>
    </Panel>
  );
};

export default Profile;
