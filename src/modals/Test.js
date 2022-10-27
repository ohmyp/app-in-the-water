import {Avatar, Button, Div, ModalCard, Placeholder} from "@vkontakte/vkui";
import {modalList} from "../utils/modal";
import FriendsIcon from "../img/friends.svg";
import React from "react";
import {Icon56UsersOutline} from "@vkontakte/icons";
import Persik from '../img/persik.png'

export const ModalTest = ({ setActiveModal, fetchedFriends }) => {
  return (
    <ModalCard
      id={modalList.TEST}
      onClose={() => setActiveModal(null)}
      header={'Добро пожаловать!'}
    >
      <Placeholder
        icon={<img width='96px' src={Persik} alt=""/>}
        header="Отслеживание поездок"
        action={<Button
          onClick={() => setActiveModal(null)}
          size="m"
        >Поехали</Button>}
      >
        Добавляйте поездки и делитесь ими с друзьями
      </Placeholder>
    </ModalCard>
  )
}
