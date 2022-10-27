import FriendsIcon from "../img/friends.svg";
import {Div, ModalCard, Text} from "@vkontakte/vkui";
import React from "react";
import {modalList} from "../utils/modal";

export const ModalProfile = ({ setActiveModal, fetchedFriends }) => {
  return (
    <ModalCard
      id={modalList.PROFILE}
      onClose={() => setActiveModal(null)}
      header={'Профиль'}
    >
      {fetchedFriends.length === 0 &&
        <div>
          <div className={'centered-div'}>
            <img
              src={FriendsIcon}
              className={'stickers'}
            />
          </div>
          <Div className={'header_text'}>
            Ваш профиль
          </Div>
          <Text className={'subheader_text'}>
            А тут скоро появится профиль
          </Text>
        </div>
      }
    </ModalCard>
  )
}
