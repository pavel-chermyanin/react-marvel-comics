import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=4a9575917104ab1d75f2fc9150473928';
    const _baseOffset = 1376;

    // Функция запрашивает данные по указанному url, возвращает js объект при успехе иначе ошибку
    // перед функцией указывается async
    // getResource = async (url) => {
    //     // здесь указываем await, значит ждем пока promise зарезолвится
    //     let res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status ${res.status}`);
    //     }
    //     // здесь ждем пока данные перейдут из формата JSON в объект JS
    //     return await res.json();
    // }

    // ассинхронная функия, которая обращается к серверу(точнее запрашиваем всех персонажей)
    // далее возвращаемое значение прогоняем через map
    // в map каждый item запускаем с функцией _transformCharacter
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    // функция получает объект персонажа, и возвращает новый объект с нужными нам свойствами
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = 1000) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description || 'There is no description',
            language: comics.textObjects.language || 'en-us',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
        }
    }

    return {
        loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics, getCharacterByName
    }
}


export default useMarvelService;