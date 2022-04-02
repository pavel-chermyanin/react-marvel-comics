import { useState } from "react/cjs/react.development";
import Helmet from "react-helmet";
import React from 'react'

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import CharForm from "../form/Form";


function MainPage() {
    // selectedChar отправляем в CharList, и там по клику на item вернется колбэк, в App изменится state, и новый props уйдет в CharInfo, в произодйдет запрос на сервер на получение персонажа по id
    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal" />
                <title>Marvel information portal</title>    
            </Helmet>
            {/* ErrorBoundary Позволяет отлавливать ошибки с помощью хука componentDidCatch() */}
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                {/* GrayShadow позволяет оборачивать своих потомков дополнительным функционалом при помощи React.Children */}
                <div className="char__sidebar">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <CharForm />

                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage