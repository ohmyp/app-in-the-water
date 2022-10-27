import FriendsIcon from "../img/friends.svg";
import {Div, ModalCard, Text} from "@vkontakte/vkui";
import React from "react";
import {modalList} from "../utils/modal";

export const ModalFriendsRating = ({ setActiveModal, fetchedFriends }) => {
  return (
    <ModalCard
      id={modalList.FRIENDS}
      onClose={() => setActiveModal(null)}
      header={'Рейтинг друзей'}
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
            Оставляйте чекины
          </Div>
          <Text className={'subheader_text'}>
            А тут скоро появится рейтинг ваших друзей
          </Text>
        </div>
      }
    </ModalCard>
  )
}
