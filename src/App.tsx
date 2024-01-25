import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet, 
  IonTabBar, 
  IonTabButton, 
  IonTabs, 
  setupIonicReact 
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Details from './pages/Details';
import { ellipse, eyeOutline, listOutline, triangle } from 'ionicons/icons';
import Watchlist from './pages/Watchlist';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/movies" component={Home}/>
        <Route exact path="/movies/:id" component={Details}/>
        <Route exact path="/">
          <Redirect to="/movies" />
        </Route>
        <Route exact path="/watchlist" component={Watchlist}/>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/movies">
            <IonIcon aria-hidden="true" icon={listOutline} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/watchlist">
            <IonIcon aria-hidden="true" icon={eyeOutline} />
            <IonLabel>Watch List</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
