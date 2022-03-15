import { Component } from 'react/cjs/react.development';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    // если объект подрузился обновляем state и устанавливаем loading true, чтобы сменить Spinner на View
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    // сначала генерируем случайное id
    // далее используем экземпляр класса MarvelService
    // и вызываем на нем метод getCharacter со случайным id, который вернет объект случайного персонажа с нужными нам свойствами
    // этот объект помещаем аргументом в функцию onCharLoaded, которая обновляет state
    // в случае ошибки меняем в state error на true, loading на false
    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        // если нет загрузки или нет ошибки, тогда отобрази контент
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button
                    onClick={this.updateChar} 
                    className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

// наш динамически подгружаемый компонент
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const ImgNotAvailable = thumbnail.includes('image_not_available');
    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className={`randomchar__img ${ImgNotAvailable ? 'notFound' : ''}`} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description : 'нет информации'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;