import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import { Provider } from "react-redux"
import store from "./redux/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <BrowserRouter>
                  <Header/>
                  <div className="container">
                      <Switch>
                          <Route exact path="/" component={Home}/>
                          <Route path="/cart" component={Basket}/>
                      </Switch>
                  </div>
                  <Footer/>
              </BrowserRouter>
          </div>
      </Provider>
  );
}

export default App;
