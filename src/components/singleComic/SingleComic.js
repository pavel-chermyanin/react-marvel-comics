import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';


const SingleComic = (props) => {

    const [comics, setComics] = useState(0);
    const {loading, error, getComics} = useMarvelService();

    useEffect(() => {
        getComics(props.id).then(onComicsLoaded)
    }, [])

    const onComicsLoaded = (newComics) => {
        setComics(newComics)
    }

    return (
        <div className="single-comic">
            <img src={comics.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comics.title}</h2>
                <p className="single-comic__descr">{comics.description}</p>
                <p className="single-comic__descr">{comics.pageCount}</p>
                <p className="single-comic__descr">{comics.language}</p>
                <div className="single-comic__price">{comics.price}</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComic;