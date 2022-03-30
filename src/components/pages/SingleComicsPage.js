import './singleComicPage.scss';
import { useEffect, useState, } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SingleComicPage = () => {
    const { comicId } = useParams();

    const [comics, setComics] = useState(null);
    const { loading, error, getComics, clearError } = useMarvelService();

    useEffect(() => {
        updateComics()
    }, [comicId])

    const updateComics = () => {
        getComics(comicId).then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        setComics(newComics)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comics) ? <View comics={comics} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ comics }) => {
    const { thumbnail, title, description, pageCount, language, price } = comics;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;