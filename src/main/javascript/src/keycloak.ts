import Keycloak from 'keycloak-js';

console.log('configuring keycloak for auth server. AUTH_URL = '+process.env.AUTH_URL);
export const keycloak = new Keycloak({
    "principal-attribute": "preferred_username",
    "realm": process.env.REALM,
    "url":  process.env.AUTH_URL,
    "ssl-required": "external",
    "resource": process.env.CLIENTID,
    "public-client": true,
    "clientId": process.env.CLIENTID,
    "enable-cors": true,
    "pkceMethod": "S256"
});

// https://access.redhat.com/articles/5266931
keycloak.init({pkceMethod: 'S256'});
