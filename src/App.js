import React from "react";
import "./App.css";
import DetailsPage from "./Components/detailsPage";
import QueryForm from "./Components/queryForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="style1">
        <Switch>
          <Route exact path="/" component={QueryForm} />
          <Route exact path="/details" component={DetailsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
