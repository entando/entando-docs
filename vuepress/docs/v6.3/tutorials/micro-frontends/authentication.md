# Authentication

Keycloak is used for authentication.

To set up keycloak server, please refer to Keycloak
[documentation](https://www.keycloak.org/documentation.html).

As all MFE widgets use the same Keycloak instance, it should be
initialized on a container of all widgets.

Using Details widget generated using Entando JHipster blueprint as an
example, let’s get familiar with authentication implementation.

As mentioned before, widget auth implementation assumes that Keycloak is
initialized outside of the widget. In Details example, it is done in
index.html where Keycloak server’s keycloak.js is used.

    <head>
        <script src="keycloak.js"></script>
        <script>
            var keycloak = new Keycloak();
            keycloak
              .init({ onLoad: 'check-sso' })
              .success(onInit);
        </script>
    </head>

> **Note**
>
> keycloak.js is provided by your Keycloak server at
> `<SERVER_URL:PORT>/auth/js/keycloak.js`

Keycloak is initialized by passing Keycloak server path, realm and
client ID and calling `init({/* options */})` function.

    const keycloak = Keycloak({
      url: 'http://localhost:9080/auth',
      realm: 'jhipster',
      clientId: 'jhipster-entando-react-client',
    });

    keycloak
      .init({ onLoad: 'check-sso' })
      .success(onInit);

Depending on Keycloak version you are using, `init()` function can
return a Promise (newer versions support `promiseType: 'native'`
option).

    keycloak
      .init({ onLoad: 'check-sso', promiseType: 'native' })
      .then(authenticated => {
        alert(authenticated ? 'Authenticated' : 'Not authenticated');
      })
      .catch(() => {
        alert('Failed to initialize');
      });

All the Keycloak events are made custom events - this way widgets could
react to them if a need arises.

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

Keycloak object is then stored into `window.entando` object for widgets
to have access to.

    window.entando = {
      ...(window.entando || {}),
      keycloak,
    };

On the widget side inside the custom element creation logic Keycloak
object is accessed and passed into the component via Keycloak context

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

And on the component side you can show different content depending on
the authentication status

At `auth/KeycloakViews.js`

    export const AuthenticatedView = ({ children, keycloak }) => {
      const authenticated = keycloak.initialized && keycloak.authenticated;
      return authenticated ? children : null;
    };

    export const UnauthenticatedView = ({ children, keycloak }) => {
      const authenticated = keycloak.initialized && keycloak.authenticated;
      return !authenticated ? children : null;
    };

At `components/ConferenceDetailsContainer.js`

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

> **Note**
>
> Keycloak object is accessible via props because of `withKeycloak` HOC:
> `export default withKeycloak(ConferenceDetailsContainer);`

**Next Steps**

To apply more fine-grained access controls, see [this tutorial](../backend-developers/add-access-controls.md).