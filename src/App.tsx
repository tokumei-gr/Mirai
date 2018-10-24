import * as React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { compose } from 'redux';
import Bar from './components/appbar';
import materialize from './materialize';
import Anime from './routes/anime';
import Home from './routes/home';
import Settings from './routes/settings';
import User from './routes/user';
import { MIR_PLAY_SHOW } from './store/mutation-types';

// Main component entry point of the application.
class App extends React.Component<any> {
  public state = {
    loading: true,
    crash: ''
  };

  constructor(props: any) {
    super(props);
    this.props.removeDataFromMir(null);
  }

  public render() {
    return (
      <div style={{ flex: 1 }}>
        <Bar location={this.props.location} history={this.props.history} />
        <Switch location={this.props.location}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/user" exact={true} component={User} />
          <Route path="/settings" exact={true} component={Settings} />
          <Route path="/anime" exact={true} component={Anime} />
        </Switch>
      </div>
    );
  }
}

// Materialize the component entry point.
const mApp = materialize(App);

// Use Redux for global state management, we'd really not want to mess with prop fuckery in the long-term.
export const loadPlayer = (play: any) => ({
  type: MIR_PLAY_SHOW,
  play
});

const mapPTS = (dispatch: Dispatch) => ({
  removeDataFromMir: (play: any) => dispatch(loadPlayer(play))
});

export default withRouter(
  compose(
    firestoreConnect()(
      connect(
        ({ mir }: any) => ({
          mir
        }),
        mapPTS
      )(mApp)
    )
  )
);
