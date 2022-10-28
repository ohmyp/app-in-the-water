import React from 'react';
import {
  Avatar, Button,
  CellButton,
  Gradient,
  Group,
  Header, Panel,
  PanelHeader,
  PanelHeaderBack, Placeholder, RichCell,
  SimpleCell, Text,
  Title, UsersStack
} from "@vkontakte/vkui";
import {Icon28AddOutline, Icon28SchoolOutline} from "@vkontakte/icons";

const users = [
  {
    name: 'Оля Душеба',
    trips: 6,
    km: 7503,
    avatar: 'https://sun9-24.userapi.com/s/v1/ig2/BnpjjL5a3ObwXPPCGQgUtLHHbjLjqixsrxrGb0tgKM_JmD37I3Q4v0Yft5wUx-tgJHfv0FgWslKL9ir08BpWdxL-.jpg?size=400x400&quality=95&crop=348,477,708,708&ava=1',
  },
  {
    name: 'Ангелина Поповская',
    trips: 5,
    km: 3203,
    avatar: 'https://sun9-86.userapi.com/s/v1/ig2/uJUgFts7mwPCBI7cq6IFyKOBqZ4BlyhxiW93OWLnyTkiEsQqT2JPYcS3gYpoVqWpSkL_qoXs3TMNrEq0KYJXdlnp.jpg?size=400x400&quality=95&crop=588,29,877,877&ava=1',
  },
  {
    name: 'Даниил Смирнов',
    trips: 2,
    km: 1344,
    avatar: 'https://sun9-52.userapi.com/s/v1/ig2/8KsyWNQMakOhxzN_aJIr6VXlO_8z5ryxfGWGmReXI8b9YxW9ZVXWVxCLsnCCze2m59YwXw7dSNvxwpgJHs8bjchz.jpg?size=400x400&quality=95&crop=703,142,1164,1164&ava=1',
  },
  {
    name: 'Александр Калиш',
    trips: 0,
    km: 0,
    avatar: 'https://sun9-43.userapi.com/s/v1/ig2/da8H-9bCFlDIWDXJZs4GnstCuATxx_5RxLt-IDjwni3kd8agoIpn2F9etpxCSEjdcJqfOu64hEvet6YOJXVc711T.jpg?size=400x400&quality=95&crop=388,60,868,868&ava=1',
  },
]

export const Rating = ({ setActiveModal, fetchedFriends, geo, id, go, additional, user }) => {
  return (
    <Panel id={id} className={'add-trip'}>
      <PanelHeader left={<PanelHeaderBack onClick={() => go('home')} />}>
        Рейтинг
      </PanelHeader>
      <Group mode="plain" style={{background:'white'}}>
        <Header>Топ пользователей</Header>
        <Group>
          {users.map((u, i) =>
            <RichCell
              before={<Avatar src={u.avatar} size={72} />}
              text={`${i+1}-е место`}
              caption={`${u.trips} поездок, ${u.km} км`}
              disabled
            >
              {u.name}
            </RichCell>)}

        </Group>
        <Group style={{position: 'fixed', bottom: 0, width: '100vw', left: 0}}>
          <RichCell
            before={<Avatar src={users[3].avatar} size={72} />}
            text={`${4}-е место`}
            caption={`${users[3].trips} поездок, ${users[3].km} км`}
            disabled
          >
            {users[3].name}
          </RichCell>
        </Group>
      </Group>
    </Panel>
  );
};

