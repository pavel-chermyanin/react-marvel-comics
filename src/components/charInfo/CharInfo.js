import { useState, useEffect } from 'react/cjs/react.development';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './charInfo.scss';
import Skeleton from '../skeleton/Skeleton';


const duration = 700;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

const CharInfo = (props) => {

    const [char, setChar] = useState()

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        clearError();

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} loading={loading}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char, loading}) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const ImgNotAvailable = thumbnail.includes('image_not_available');
    return (

        <Transition
            in={!loading}
            timeout={duration}>
            {state => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    <div className="char__basics">
                        <img
                            className={ImgNotAvailable ? 'notFound' : ''}
                            src={thumbnail}
                            alt={name} />
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">{description}</div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comics.length > 0 ? null : 'There is no comics with this character'}
                        {
                            comics.map((item, i) => {
                                if (i > 9) return;

                                return (
                                    <li
                                        key={i}
                                        className="char__comics-item">
                                        {item.name}
                                    </li>
                                )
                            })
                        }


                    </ul>
                </div>
            )}
        </Transition>


    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;