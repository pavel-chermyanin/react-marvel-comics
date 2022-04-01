import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import Spinner from "../spinner/Spinner";

// Динамические импорты позволяют загружать приложение частями
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
    return (
        // Оборачиваем все приложение в BrowserRouter
        <Router>
            <div className="app">
                {/* в AppHeader нас находятся Link управляющие роутингом */}
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}>
                        {/* Оборачиваем в Switch, который будет переключать отдельные Route,
                    теперь в версии router 6 вместо него Routes */}

                        <Routes>
                            {/* Этот Route отрисуется когда в адресной строке браузера будет главная страница в точности, в версии oruter 6 компоненты недолжны быть дочерними элементами а помещаются в атрибут element, и атрибут exact больше не нужен */}
                            <Route path="/" element={<MainPage />} />
                            {/* Этот Route отрисуется когда в адресе добавится /comics */}
                            <Route path="/comics" element={<ComicsPage />} />
                            {/* строку :comicId отловит useParams, находящийся внутри, отправится запрос на получение comic, компонент отрисуется заново */}
                            <Route path="/comics/:comicId" element={<SingleComicPage />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>

                </main>
            </div>
        </Router>
    )
}

export default App;