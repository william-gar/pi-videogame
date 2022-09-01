import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";
import ErrorNotFound from "./components/ErrorNotFound/ErrorNotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/home/:id" component={Detail} />
          <Route exact path="/create-videogame" component={CreateVideogame} />
          <Route path="*" component={ErrorNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
