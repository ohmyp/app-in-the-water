import {
  AppRoot,
  Avatar,
  Button,
  Div,
  File, Link,
  ModalCard,
  ModalRoot, Progress,
  RichCell,
  SubnavigationButton,
  Textarea
} from "@vkontakte/vkui";
import FriendsIcon from "../img/friends.svg";
import UploadIcon from "../img/uploading.svg";
import {Icon24CameraOutline} from "@vkontakte/icons";
import ErrorIcon from "../img/error.svg";
import MissedIcon from "../img/missed.svg";
import React from "react";
import PropTypes from "prop-types";
import {FriendsRating, ModalFriendsRating} from "../modals/ModalFriendsRating";
import {ModalTest} from "../modals/Test";
import {ModalProfile} from "../modals/ModalProfile";

export const modalList = {
  FRIENDS: 'friends',
  CHECKINS: 'checkins',
  CHECKIN: 'checkin',
  ERROR: 'error',
  NO_GEO: 'no_geo',
  MISSED: 'missed',
  UPLOADING: 'uploading',
  ADD_DESTINATION: 'add_destination',
  TEST: 'test',
  PROFILE: 'profile'
}


export const getModalRoot = ({activeModal, setActiveModal, fetchedFriends, geo, getGeoData}) => (
  <ModalRoot activeModal={activeModal}>
    {ModalTest({ setActiveModal, fetchedFriends })}
    {ModalFriendsRating({ setActiveModal, fetchedFriends })}
    {ModalProfile({ setActiveModal, fetchedFriends, geo })}
    <ModalCard
      id={modalList.ERROR}
      onClose={() => setActiveModal(null)}
      icon={
        <img
          src={ErrorIcon}
          className={'stickers'}
        />
      }
      header={'Что-то пошло не так'}
      subheader={
        <div>
          Наши котики-инженеры уже разбираются. Если ошибка появляется не в первый раз -
          <Link href="#"> напишите нам</Link>
        </div>
      }
    >
      <Div className={'centered-div'}>
        <Button>
          Понятно
        </Button>
      </Div>
    </ModalCard>
    <ModalCard
      id={modalList.NO_GEO}
      onClose={() => setActiveModal(null)}
      icon={
        <img
          src={ErrorIcon}
          className={'stickers'}
        />
      }
      header={'Не знаем где вы'}
      subheader={
        <div>
          Не смогли получить ваше местоположение
        </div>
      }
    >
      <Div className={'centered-div'}>
        <Button
          onClick={() => getGeoData()}
        >
          Повторить
        </Button>
      </Div>
    </ModalCard>
    <ModalCard
      id={modalList.MISSED}
      onClose={() => setActiveModal(null)}
      icon={
        <img
          src={MissedIcon}
          className={'stickers'}
        />
      }
      header={'Ваш чекин перехватили'}
      subheader={'И мы не смогли получить его на наших серверах. Попробуйте загрузить его снова'}
    >
      <Div className={'centered-div'}>
        <Button>
          Повторить загрузку
        </Button>
      </Div>
    </ModalCard>
    <ModalCard
      id={modalList.UPLOADING}
      onClose={() => setActiveModal(null)}
      icon={
        <img
          src={UploadIcon}
          className={'stickers'}
        />
      }
      header={'Загружаем твой чекин'}
      subheader={'Нам нужно немного времени, чтобы обработать всю красоту, которая была отснята, и загрузить её на сервер'}
    >
      <Div>
        <Progress value={40}/>
      </Div>
      <Div className={'centered-div'}>
        <Button>
          Отменить загрузку
        </Button>
      </Div>
    </ModalCard>
  </ModalRoot>
);

getModalRoot.propTypes = {
  fetchedFriends: PropTypes.array,
  activeModal: PropTypes.string.isRequired,
  setActiveModal: PropTypes.func.isRequired,
}
