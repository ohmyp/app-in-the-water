import FriendsIcon from "../img/friends.svg";
import {Div, ModalCard, ModalPage} from "@vkontakte/vkui";
import React from "react";
import {modalList} from "../utils/modal";

export const ModalFriendsRating = ({ setActiveModal, fetchedFriends }) => {
  return (
    <ModalPage
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
          <Div className={'subheader_text'}>
            А тут скоро появится рейтинг ваших друзей
          </Div>
        </div>
      }
    </ModalPage>
  )
}
