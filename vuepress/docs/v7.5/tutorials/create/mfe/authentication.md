# Authentication

Entando employs Keycloak as a central point of authentication to provide a single, unified view of identity. To set up a Keycloak server, please refer to the [Keycloak
documentation](https://www.keycloak.org/documentation.html).

As all micro frontends use the same Keycloak instance, it should be
initialized on a container of all widgets.

In the conference-details micro frontend from the [Entando JHipster Blueprint tutorial](../ms/generate-microservices-and-micro-frontends.md), the authentication implementation assumes that Keycloak is
initialized outside of the widget. As shown below, the Keycloak server’s `keycloak.js` is called in the micro frontend's `index.html`.

``` html
    <head>
        <script src="keycloak.js"></script>
        <script>
            var keycloak = new Keycloak();
            keycloak
              .init({ onLoad: 'check-sso' })
              .success(onInit);
        </script>
    </head>
```
> **Note**
>
> keycloak.js is provided by your Keycloak server at
> `<SERVER_URL:PORT>/auth/js/keycloak.js`

Keycloak is initialized by passing the server path, realm and
client ID information and calling the `init({/* options */})` function.
``` js
    const keycloak = Keycloak({
      url: 'http://localhost:9080/auth',
      realm: 'jhipster',
      clientId: 'jhipster-entando-react-client',
    });

    keycloak
      .init({ onLoad: 'check-sso' })
      .success(onInit);
```
Depending on the Keycloak version you are using, the `init()` function can
return a Promise (newer versions support `promiseType: 'native'`
option) like this: 
``` js
    keycloak
      .init({ onLoad: 'check-sso', promiseType: 'native' })
      .then(authenticated => {
        alert(authenticated ? 'Authenticated' : 'Not authenticated');
      })
      .catch(() => {
        alert('Failed to initialize');
      });
```
All the Keycloak events are customized so that widgets can
react to them as needed.
``` js
    function createKcDispatcher(payload) {
      return () => window.dispatchEvent(new CustomEvent('keycloak', { detail: payload }));
    }

    keycloak.onReady = createKcDispatcher({ eventType: 'onReady' });
    keycloak.onAuthSuccess = createKcDispatcher({ eventType: 'onAuthSuccess' });
    keycloak.onAuthError = createKcDispatcher({ eventType: 'onAuthError' });
    keycloak.onAuthRefreshSuccess = createKcDispatcher({ eventType: 'onAuthRefreshSuccess' });
    keycloak.onAuthRefreshError = createKcDispatcher({ eventType: 'onAuthRefreshError' });
    keycloak.onAuthLogout = createKcDispatcher({ eventType: 'onAuthLogout' });
    keycloak.onTokenExpired = createKcDispatcher({ eventType: 'onTokenExpired' });
    const onInit = createKcDispatcher({ eventType: 'onInit' });
```
The Keycloak object is then stored in the `window.entando` object for MFEs
to have access to it.
```
    window.entando = {
      ...(window.entando || {}),
      keycloak,
    };
```
For the MFE, the Keycloak
object is accessed and passed to the component via a Keycloak context in the custom element.
```
    const getKeycloakInstance = () =>
      (window &&
        window.entando &&
        window.entando.keycloak &&
        { ...window.entando.keycloak, initialized: true }
      ) || { initialized: false };


    // ...

    constructor(...args) {
      // ...
      this.keycloak = getKeycloakInstance();
    }

    connectedCallback() {
      // ...
      ReactDOM.render(
        <KeycloakContext.Provider value={this.keycloak}>
          <ConferenceDetailsContainer />
        </KeycloakContext.Provider>,
        this.mountPoint
      );
    }
```
On the component side, different content can be shown, depending on
the authentication status.

At `auth/KeycloakViews.js`:
``` js
    export const AuthenticatedView = ({ children, keycloak }) => {
      const authenticated = keycloak.initialized && keycloak.authenticated;
      return authenticated ? children : null;
    };

    export const UnauthenticatedView = ({ children, keycloak }) => {
      const authenticated = keycloak.initialized && keycloak.authenticated;
      return !authenticated ? children : null;
    };
```
At `components/ConferenceDetailsContainer.js`:
``` js

    render() {
      const { conference, loading } = this.state;
      const { t, keycloak } = this.props;

      return (
        <ThemeProvider theme={this.theme}>
          <UnauthenticatedView keycloak={keycloak}>
            {t('common.notAuthenticated')}
          </UnauthenticatedView>
          <AuthenticatedView keycloak={keycloak}>
            {loading && t('common.loading')}
            {!loading && <ConferenceDetails conference={conference} />}
          </AuthenticatedView>
        </ThemeProvider>
      );
    }
```
> **Note**
>
> The `withKeycloak` HOC allows props to access the Keycloak object:
> `export default withKeycloak(ConferenceDetailsContainer);`

**Next Steps**

* To apply more fine-grained access controls, see the [Role Based Access Controls tutorial](../ms/add-access-controls.md).
* Learn more about the [Entando Identity Management System](../../../docs/consume/identity-management.md).
