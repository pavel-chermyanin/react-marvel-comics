

class MarvelService{

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=4a9575917104ab1d75f2fc9150473928';

    // Функция запрашивает данные по указанному url, возвращает js объект при успехе иначе ошибку
    // перед функцией указывается async
    getResource = async (url) => {
        // здесь указываем await, значит ждем пока promise зарезолвится
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        // здесь ждем пока данные перейдут из формата JSON в объект JS
        return await res.json();
    }

    // ассинхронная функия, которая обращается к серверу(точнее запрашиваем всех персонажей)
    // далее возвращаемое значение прогоняем через map
    // в map каждый item запускаем с функцией _transformCharacter
    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=310&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    // функция получает объект персонажа, и возвращает новый объект с нужными нам свойствами
    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}


export default MarvelService;