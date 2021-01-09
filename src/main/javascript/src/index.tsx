import React from "react";
import ReactDOM from "react-dom";
import { App } from '@app/index';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { KafkaTest } from '@app/test/KafkaTest';
import { ServicesTest } from '@app/test/ServicesTest';
import { Incidents } from '@app/components/Incidents/Incidents'
import { Dashboard } from '@app/components/Dashboard/Dashboard'

import { keycloak } from './keycloak';
import { KeycloakTest } from '@app/test/KeycloakTest';

const REACT_VERSION = React.version;

console.log("..... starting REACT version = "+REACT_VERSION+" ; NODE_ENV = "+process.env.NODE_ENV);

// These get set appropriately when "npm run bdev" is executed  with the corresponding variables set in the shell
console.log("AUTH_URL= "+process.env.AUTH_URL);
console.log("TOKEN= "+process.env.TOKEN);

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

/*
const tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');
function onKeycloakTokens(tks) {
  localStorage.setItem('kcTokens', JSON.stringify(tks));
 
  setInterval(() => {
    keycloak.updateToken(10).error(() => keycloak.logout());
  }, 10000);
}

function onKeycloakEvent(event, error) {
  if (event === 'onAuthLogout') {
    localStorage.removeItem('kcTokens');
  }
}
*/

ReactDOM.render(
  
  <div>
    <React.StrictMode>
      <Dashboard />
      {/* <Incidents /> */}
      
      {/*<ReactKeycloakProvider
        authClient={keycloak}
        onEvent={onKeycloakEvent}
        onTokens={onKeycloakTokens} >
            <KeycloakTest />
        </ReactKeycloakProvider>
      <App />*/}
        
        {/* <KafkaTest />, 
        <ServicesTest />*/}
    </React.StrictMode>,
  </div>,
  
  document.getElementById('root') as HTMLElement 
);
