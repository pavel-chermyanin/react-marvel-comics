import { Component } from "react/cjs/react.development";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import GrayShadow from "../grayShadow/GrayShadow";


class App extends Component {

    // selectedChar отправляем в CharList, и там по клику на item вернется колбэк, в App изменится state, и новый props уйдет в CharInfo, в произодйдет запрос на сервер на получение персонажа по id
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }


    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    {/* ErrorBoundary Позволяет отлавливать ошибки с помощью хука componentDidCatch() */}
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected} />
                        </ErrorBoundary>
                        {/* GrayShadow позволяет оборачивать своих потомков дополнительным функционалом при помощи React.Children */}
                        <GrayShadow>
                            <ErrorBoundary>
                                <CharInfo charId={this.state.selectedChar} />
                            </ErrorBoundary>
                        </GrayShadow>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;