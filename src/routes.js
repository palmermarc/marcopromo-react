import React from 'react';
import { Route, IndexRoute } from 'react-router';



export default Routes (
  <Route path="/">
    <Route exact path="/" component={ItemList} />
    <Route exact path="copy/" component={CopiesList} />
    <Route exact path="copy/:copyid/" component={editCopy} />
    <Route exact path="user/logout/" component={LogoutPage} />
    <Route exact path="user/login/" component={Login} />
  </Route>
);
