import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';

const App = () => {

    return (
        // Оборачиваем все приложение в BrowserRouter
        <Router>
            <div className="app">
                {/* в AppHeader нас находятся Link управляющие роутингом */}
                <AppHeader />
                <main>
                    {/* Оборачиваем в Switch, который будет переключать отдельные Route,
                    теперь в версии router 6 вместо него Routes */}

                    <Routes>
                        {/* Этот Route отрисуется когда в адресной строке браузера будет главная страница в точности, в версии oruter 6 компоненты недолжны быть дочерними элементами а помещаются в атрибут element, и атрибут exact больше не нужен */}
                        <Route path="/" element={<MainPage />} />
                        {/* Этот Route отрисуется когда в адресе добавится /comics */}
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SingleComicPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;