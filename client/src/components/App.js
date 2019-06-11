import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import history from "../history";
import FactoryList from "./factories/FactoryList";
import FactoryEdit from "./factories/FactoryEdit";
import FactoryDelete from "./factories/FactoryDelete";
import FactoryDetail from "./factories/FactoryDetail";
import FactoryCreate from "./factories/FactoryCreate";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={FactoryList} />
            <Route path="/factory/new" exact component={FactoryCreate} />
            <Route path="/factories/edit/:_id" exact component={FactoryEdit} />
            <Route
              path="/factories/delete/:_id"
              exact
              component={FactoryDelete}
            />
            <Route path="/factories/:_id" exact component={FactoryDetail} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
