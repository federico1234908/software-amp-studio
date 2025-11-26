import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AmpRack from './components/AmpRack';
import Controls from './components/Controls';
import PresetBrowser from './components/PresetBrowser';
import AudioIOModal from './components/AudioIOModal';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact component={AmpRack} />
          <Route path="/controls" component={Controls} />
          <Route path="/presets" component={PresetBrowser} />
          <Route path="/audio-io" component={AudioIOModal} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;