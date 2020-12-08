import * as React from 'react';
import { useKeycloak } from '@react-keycloak/web';

console.log(" ..... starting KeycloakTest");

const KeycloakTest: React.FunctionComponent = () => {
  const { keycloak, initialized } = useKeycloak();
  return (
    <div>
      <div>
        <strong>Anyone can access this page</strong>

        {initialized ?
          keycloak.authenticated && <pre >{JSON.stringify(keycloak, undefined, 2)}</pre>
          : <h2>keycloak initializing ....!!!!</h2>
        }
      </div>
      <div>
        {keycloak && !keycloak.authenticated &&
                <li><a className="btn-link" onClick={() => keycloak.login()}>Login</a></li>
        }
      </div>
      <div>
        <strong>
          {keycloak && keycloak.authenticated &&
                <li>
                    <a className="btn-link" onClick={() => keycloak.logout()}>Logout ({
                        keycloak.tokenParsed.preferred_username
                    })</a>
                </li>
          }
        </strong>
      </div>
    </div>
  )
};

export { KeycloakTest };
