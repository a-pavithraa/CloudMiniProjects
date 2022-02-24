import { B2C_AUTHORITY, B2C_CLIENT_ID, KNOWN_AUTHORITIES, LOGOUT_URI, READ_SCOPE, REDIRECT_URI } from "./Constants";

export const msalConfig = {
    auth: {
        clientId: B2C_CLIENT_ID,       
        authority: B2C_AUTHORITY,
        redirectUri: REDIRECT_URI,
        knownAuthorities: [KNOWN_AUTHORITIES],
        postLogoutRedirectUri: LOGOUT_URI

    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};



// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: [READ_SCOPE]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};