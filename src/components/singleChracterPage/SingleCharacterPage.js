import { useEffect, useState, } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';

const SingleCharacterPage = () => {
    const { charId } = useParams();

    const [char, setChar] = useState(null);
    const { loading, error, getCharacter} = useMarvelService();

    useEffect(() => {
        updateComics()
    }, [charId])

    const updateComics = () => {
        getCharacter(charId).then(onComicsLoaded)
    }

    const onComicsLoaded = (newChar) => {
        setChar(newChar)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail } = char;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>

            </div>
            <Link to="/" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterPage;