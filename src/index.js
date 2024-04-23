import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ContextProvider } from './contexts/ContextProvider'
import { AuthProvider } from '@asgardeo/auth-react'

import { registerLicense } from '@syncfusion/ej2-base'

// interface Config {
//   redirectUrl: string;
//   asgardeoClientId: string;
//   asgardeoBaseUrl: string;
//   choreoApiUrl: string;
// }

// declare global {
//   interface Window {
//     config: Config;
//   }
// }

if (!window.config) {
  window.config = {
    redirectUrl:
      'https://a83c46bf-66bc-4e76-b71d-193f75dad355.e1-us-cdp-2.choreoapps.dev',
    // redirectUrl: 'http://localhost:3000',
    asgardeoClientId: '0mbhHtAAlkuKn801MENwuwxEY60a',
    asgardeoBaseUrl: 'https://api.asgardeo.io/t/thedeveloperlife',
    choreoApiUrl:
      'https://2b2e76c4-bc0a-4c0c-890e-65afe26e1d00-dev.e1-us-cdp-2.choreoapis.dev/smarttouchbackend/backend-service/smarttouch-management-7ee',
    // apiUrl: 'http://localhost:8080/v1',
    apiUrl:
      'https://2b2e76c4-bc0a-4c0c-890e-65afe26e1d00-dev.e1-us-cdp-2.choreoapis.dev/smarttouchbackend/backend-service/smarttouch-management-7ee/v1.0',
    scope: [
      'openid',
      'app_roles',
      'email',
      'groups',
      'phone',
      'profile',
      'urn:thedeveloperlife:backendservicesmarttouchm:create_contact'
    ]
  }
}

const authConfig = {
  signInRedirectURL: window.config.redirectUrl,
  signOutRedirectURL: window.config.redirectUrl,
  clientID: window.config.asgardeoClientId,
  baseUrl: window.config.asgardeoBaseUrl,
  enablePKCE: false,
  scope: window.config.scope
}

registerLicense(
  'ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5XdkZiXXpZc3RQQmld'
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AuthProvider>
  </React.StrictMode>
)
