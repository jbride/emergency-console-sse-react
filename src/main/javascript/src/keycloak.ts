import Keycloak from 'keycloak-js';

console.log('configuring keycloak for auth server. SSO_URL = '+process.env.SSO_URL);
export const keycloak = new Keycloak({
    "principal-attribute": "preferred_username",
    "realm": process.env.SSO_REALM,
    "url":  process.env.SSO_URL,
    "ssl-required": "external",
    "resource": process.env.SSO_CLIENT,
    "public-client": true,
    "clientId": process.env.SSO_CLIENT,
    "enable-cors": true,
    "pkceMethod": "S256"
});

// https://access.redhat.com/articles/5266931
keycloak.init({pkceMethod: 'S256'});
