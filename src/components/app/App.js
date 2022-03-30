import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from '../pages';








const App = () => {


    return (
        // Оборачиваем все приложение в BrowserRouter
        <Router>
            <div className="app">
                {/* в AppHeader нас находятся Link управляющие роутингом */}
                <AppHeader />
                <main>
                    {/* Оборачиваем в Switch, который будет переключать отдельные Route */}
                    <Switch>
                        {/* Этот Route отрисуется когда в адресной строке браузера будет главная страница в точности */}
                        <Route exact path="/">
                           <MainPage/>
                        </Route>
                        {/* Этот Route отрисуется когда в адресе добавится /comics */}
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;