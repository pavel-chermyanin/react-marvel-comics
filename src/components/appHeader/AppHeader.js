import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';


const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    {/* NavLink дает класс активной ссылке */}
                    <li>
                        <NavLink
                            end
                            style={({ isActive }) => ({
                                color: isActive ? '#f90013' : 'inherit',
                            })}
                            to="/">Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            // NavLink принимает атрибут style, который принимает функцию, которая получает параметром объект, из которого мы деструктурируем поле isActive. Функция возвращает объект со стилями
                            style={({ isActive }) => ({
                                color: isActive ? '#f90013' : 'inherit',
                            })}
                            to="/comics">Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;