// Global vendor styles
import 'semantic-ui-css/components/reset.css';
import 'semantic-ui-css/components/site.css';
import 'semantic-ui-css/components/button.css';
import 'semantic-ui-css/components/card.css';
import 'semantic-ui-css/components/checkbox.css';
import 'semantic-ui-css/components/container.css';
import 'semantic-ui-css/components/divider.css';
import 'semantic-ui-css/components/dropdown.css';
import 'semantic-ui-css/components/form.css';
import 'semantic-ui-css/components/grid.css';
import 'semantic-ui-css/components/header.css';
import 'semantic-ui-css/components/icon.css';
import 'semantic-ui-css/components/input.css';
import 'semantic-ui-css/components/item.css';
import 'semantic-ui-css/components/image.css';
import 'semantic-ui-css/components/label.css';
import 'semantic-ui-css/components/list.css';
import 'semantic-ui-css/components/loader.css';
import 'semantic-ui-css/components/menu.css';
import 'semantic-ui-css/components/message.css';
import 'semantic-ui-css/components/segment.css';
import 'semantic-ui-css/components/statistic.css';
import 'semantic-ui-css/components/table.css';
import 'semantic-ui-css/components/transition.css';

import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadComponents } from 'loadable-components';
import { getState } from 'loadable-components';
import App from './components/App';

// Global custom styles
import './index.css';

// Prevent flash of loading component for static pages
window.staticState = () => getState();

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  loadComponents().then(() => {
    hydrate(<App />, rootElement);
  });
} else {
  render(<App />, rootElement);
}

