import React from "react";
import ReactDOM from "react-dom";
import { App } from '@app/index';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { keycloak } from './keycloak';
import { KeycloakTest } from '@app/test/KeycloakTest';
import { KafkaTest } from '@app/test/KafkaTest';

const REACT_VERSION = React.version;

console.log("..... starting REACT version = "+REACT_VERSION+" ; NODE_ENV = "+process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  const config = {
    rules: [
      {
        id: 'color-contrast',
        enabled: false
      }
    ]
  };
}

const tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');
function onKeycloakTokens(tks) {
  localStorage.setItem('kcTokens', JSON.stringify(tks));
  //store.dispatch({ type: "UPDATE_TOKEN", token: tks.token, loggedUser: keycloak.tokenParsed ? keycloak.tokenParsed['preferred_username'] : keycloak.subject });

  setInterval(() => {
    keycloak.updateToken(10).error(() => keycloak.logout());
  }, 10000);
}

function onKeycloakEvent(event, error) {
  if (event === 'onAuthLogout') {
    localStorage.removeItem('kcTokens');
    //store.dispatch({ type: "UPDATE_TOKEN", token: '', loggedUser: '' });
  }
}

ReactDOM.render(
/*
<App />,
*/
/*
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
    >
      <KeycloakTest />
    </ReactKeycloakProvider>
  </React.StrictMode>,
*/
  <KafkaTest />,
  document.getElementById('root') as HTMLElement 
);
