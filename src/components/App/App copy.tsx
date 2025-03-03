import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppRootProps } from '@grafana/data';
import { ROUTES } from '../../constants';
import Causely from 'pages/causely/PageFour';
import { prefixRoute } from 'utils/utils.routing';

function App2(props: AppRootProps) {
  return (
    // <Routes>
    //   <Route path={ROUTES.Causely} element={<Causely />} />
    //   <Route path={`${ROUTES.Three}/:id?`} element={<PageThree />} />

    //   {/* Full-width page (this page will have no side navigation) */}
    //   <Route path={ROUTES.Four} element={<PageFour />} />

    //   {/* Default page */}
      
    // </Routes>
    <Switch>
      <Route exact path={prefixRoute(`${ROUTES.Causely}`)} component={Causely} />
      {/* Default page */}
      <Route component={Causely} />
  </Switch>
  );
}

export default App2;
