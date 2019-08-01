// App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import Movie from "./components/movie/Movie";
import NotFound from "./NotFound";
import MyNavbar from "./components/navbar/MyNavbar";

const App = () => {
  return (
    <Router>
      <div>
        <MyNavbar />
        {/* <Header /> */}

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/movie/:movieId" component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
