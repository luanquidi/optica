import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Components
import Nav from './Nav';
import ListaUsuarios from './ListaUsuarios';
import Home from './Home';

function App() {
    return (
        <Fragment>
            <Router>

                {/* -------- Nav -------- */}

                <Nav/>

                {/* -------- EndNav -------- */}

                {/* -------- Contain -------- */}

            
                <div className="container">
                    <Switch>
                        <Route exact path="/home">
                            <Home/>
                        </Route>
                        <Route exact path="/users">
                            <ListaUsuarios/>
                        </Route>
                    </Switch>
                </div>

                {/* -------- EndContain -------- */}

            </Router>
            {/* <div className="Home__movie">
                <img src="https://www.sectorcine.com/wp-content/uploads/2019/09/peliculas-de-caricaturas.jpg" className="Home__movieImg" alt="" />
                <img src="https://www.sectorcine.com/wp-content/uploads/2019/09/peliculas-de-caricaturas.jpg" className="Home__movieImg_blured Home__movieImg" alt="" />
            </div> */}
            
        </Fragment>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}




