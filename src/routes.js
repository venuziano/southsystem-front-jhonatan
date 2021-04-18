import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './paginas/Menu';
import Pessoas from './paginas/Pessoas';
import Contas from './paginas/Contas';
import Agencias from './paginas/Agencias';
import Score from './paginas/Score';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/pessoas" component={Pessoas} />
        <Route path="/contas" component={Contas} />
        <Route path="/agencias" component={Agencias} />
        <Route path="/score" component={Score} />

        {/* <Route path="/profile" component={Profile} />
        <Route path="/incidents/new" component={NewIncident} /> */}

      </Switch>
    </BrowserRouter>
  );
}