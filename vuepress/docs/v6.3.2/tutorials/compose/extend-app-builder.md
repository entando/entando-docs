---
redirectFrom: /v6.3.2/tutorials/customize-the-platform/extend-app-builder.html
---

# Tutorial: Extending the App Builder

Apps for the Entando App Builder are developed as standalone
applications which can be run using `npm start` in standalone mode.

Each application should be deployed in npm using the `@entando`
namespace and will export into their dist folder several items used by
the App Builder when integrating it into the full application.

## Creating a Basic Application

To create a basic application, use the [entando
fpg](<https://github.com/entando/fpg>) running the
`npx @entando/fpg ab-app <appName>` command.

**the `appName` should only contain alphanumeric characters and
underscores, and should begin with a letter.**

This will create inside the working directory, a boilerplate app-builder
app in a directory named `<appName>` argument.

i.e.

using the command `npm @entando/fpg ab-app testing` inside your home
directory, a directory named `testing` will be created containing the
app.

All dependencies will already be installed allowing you to `cd` inside
the project directory and run `npm start` to start the app running.

## Understanding the Stand Alone Environment

Each app for the App Builder, can run in both a stand alone mode and an
integrated mode. Using `npm start` will use standalone mode.

In this environment you’ll be looking at the user interface of the app
inside a default page. This page, which includes a default menu, will
not be exported and therefore can be customized.

To better understand which elements and components are being exported to
App Builder, it is best to understand the anatomy of the app.

# Exports

Each app will have a `babel.js` export file similar to:

```js
    import menu from 'ui/common/LinkMenu';
    import { cms as state } from 'state/rootReducer';
    import { routes, routesDir } from 'ui/App';
    import en from 'locales/en';
    import it from 'locales/it';

    const testing = {
      id: 'testing',
      menu,
      state,
      routes,
      routesDir,
      locales: {
        en,
        it,
      },
    };

    export default testing;
```

# id: is the app id.

This parameter is used by App Builder to differentiate all integrated
apps.

# menu: is a React component containing all the menu elements.

These elements are used inside the standalone environment and inside the
integrated environment as a second level menu. The boilerplate app
contains a basic menu.

```js
    import React from 'react';
    import { LinkMenuItem } from '@entando/menu';
    import { FormattedMessage } from 'react-intl';

    const LinkMenu = () => (
      <>
        <LinkMenuItem
          id="menu-SECTION_ID"
          label={<FormattedMessage id="testing.menu.SECTION_NAME" defaultMessage="SECTION_NAME" />}
          to='/use/const/here/imported/from/routes'
        />
      </>
    );

    export default LinkMenu;
```

## Customizing the Menu

For this exercise, we will create two links inside the menu. The first
will link to a page listing all the users inside the entando instance.
The second will list all the existing page templates inside the Entando
instance.

For this example we’re using existing APIs from the Entando core just
for simplicity, you can instead call any API or data source.

In your app project, open `src/ui/common/LinkMenu.js` and update the
const to the code below.

```js
    const LinkMenu = () => (
      <>
        <LinkMenuItem
          id="menu-userList"
          label={<FormattedMessage id="testing.menu.userList" defaultMessage="User List" />}
          to='/use/const/here/imported/from/routes'
        />
        <LinkMenuItem
          id="menu-pageModelList"
          label={<FormattedMessage id="testing.menu.pageModelList" defaultMessage="Page Model List" />}
          to='/use/const/here/imported/from/routes'
        />
      </>
    );
```

it is important that both the `<LinkMenuItem>` id property and the
\`\<FormattedMessage\>\`properties inside label have the correct values
assigned, i.e.:

the LinkMenuItem id will be **menu-userList** while the FormattedMessage
id will be **testing.menu.userList** and the defaultMessage will be
**User List**.

# locales

The locales files are objects that contain all of the i18n locales of
the app.

By default the boilerplate contains both the english and italian i18n
files.

In your app project in `src/locales/en.js` and `src/locales/it.js` you
can see your labels.

```js
    export default {
      locale: 'en',
      messages: {
        'testing.title': '',
        'testing.label.errors': '',
        'testing.label.cancel': '',
        'testing.chooseAnOption': '',
        'testing.tip': '',
        'testing.new': '',
        'testing.save': '',
        'testing.saveAndApprove': '',
        'testing.unpublish': '',
        'testing.setContentAs': '',
        'testing.cancel': '',
        'testing.saveAndContinue': '',
        'testing.stickySave.status': '',
        'testing.stickySave.lastAutoSave': '',
      },
    };
```

While running in standalone mode the boilerplate does not offer a way
for the user pick a locale, but both will be loaded inside app-builder
and will be consumed as intended by it, using the correct one based on
the user-picked language.

It is of course possible to change the standalone app to give the user
the option to choose the locale in here as well, but this is not
something will be covering in this tutorial.

## Customizing the menu labels

To customize the existing menu labels, we’ll add the new label ids
inside both the english and Italian locale files:

> **Note**
>
> If you named your app something besides `testing` you’ll need to fix
> these tags to match the name of your app.

```js
    ...
    messages: {
        ...
        'testing.menu.userList': 'List of Users',
        'testing.menu.pageModelList': 'Page Models',
        ...
    },
    ...
```

The key in the messages object matches the id of the
\`\<FormattedMessage\>\`component we placed inside the menu, while its
value is the actual string that will be displayed depending on the
currently active language.

# Routes and RoutesDir

Both of these elements are imported from `src/ui/App.js`. The first one
is a collection of actual `<Route>` components, and the second one is an
object containing each route data, i.e.:

```js
    export const routesDir = [
      {
        path: ROUTE_TESTING,
        component: <>app component</>,
      },
    ];
```

The constant `ROUTE_TESTING` is imported from `src/app-init/routes.js`

## Customizing the Routes

Next we will create the two routes for the two links we have created by
creating first the two constants needed.

In your IDE open `src/app-init/routes.js`

```js
    export const ROUTE_TESTING = '/testing';
    export const ROUTE_USER_LIST = '/testing/user-list';
    export const ROUTE_PAGE_MODELS = '/testing/page-models';
```

> **Note**
>
> Change the value of `testing` to what you selected for the name of
> your App extension.

The value of each constant will be the path of the route. It is
important that each route is a subroute of the id of the app itself,
otherwise this may cause name collision when running inside the
integrated environment of app-builder.

Both routes are next imported inside `App.js`:

Update the imports with your new ROUTE tags.

```js
    import {
      ROUTE_TESTING,
      ROUTE_USER_LIST,
      ROUTE_PAGE_MODELS,
    } from 'app-init/routes';
```

and then add to the `routesDir` constant:

```js
    export const routesDir = [
      {
        path: ROUTE_TESTING,
        component: <>app component</>,
      },
      {
        path: ROUTE_USER_LIST,
        render: () => <>user list</>,
      },
      {
        path: ROUTE_PAGE_MODELS,
        render: () => <>page models</>,
      },
    ];
```

Next, import the routes constants inside `LinkMenu.js` and change
accordingly the **to** property of the `<LinkMenuItem>` component:

```js
    ...
    import {
      ROUTE_USER_LIST,
      ROUTE_PAGE_MODELS,
    } from 'app-init/routes';

    const LinkMenu = () => (
      <>
        <LinkMenuItem
          id="menu-userList"
          label={<FormattedMessage id="tatata.menu.userList" defaultMessage="User List" />}
          to={ROUTE_USER_LIST}
        />
        <LinkMenuItem
          id="menu-pageModelList"
          label={<FormattedMessage id="tatata.menu.pageModelList" defaultMessage="Page Model List" />}
          to={ROUTE_PAGE_MODELS}
        />
      </>
    );
    ...
```

Next clicks on the links in the menu will change the routes and display
the content defined in the `App.js` file.

## state

The state in src/babel.js is the combined reducer of the app, the
rootReducer.js contains the combined reducer of the app and exports it,
but also contains the entire reducer of the app when running in
standalone mode.

```js
    export const testing = combineReducers({
      // implement here your app specific reducers
    });

    export default combineReducers({
      apps: combineReducers({ testing }),
      api,
      currentUser,
      form,
      loading,
      locale,
      messages,
      modal,
      pagination,
    });
```

The app specific reducers are stored inside the `apps` object, this is
done to avoid possible name collisions with any reducer stored inside
app-builder when running the app in integrated mode.

## Customizing the Reducers

Next we will be creating the two reducers for the user list and page
models. They will be created inside two new directories
`src/state/apps/testing/userList/` and
`src/state/apps/testing/pageModels`. The `types.js` files will contain
the two action types that we’ll need.

`userList/types.js`

    // eslint-disable-next-line import/prefer-default-export
    export const ADD_USERS = 'apps/testing/add-users';

`pageModels/types.js`

    // eslint-disable-next-line import/prefer-default-export
    export const ADD_PAGE_MODELS = 'apps/testing/page-models/add-page-models';

The value of both constants contain the whole namespace
`apps/testing/REDUCER` this is done to avoid any possible name collision
when running the app in integrated mode.

Next create both actions files:

`userList/actions.js`

```js
    import {
      ADD_USERS,
    } from 'state/apps/testing/userList/types';

    // eslint-disable-next-line import/prefer-default-export
    export const addUsers = users => ({
      type: ADD_USERS,
      payload: users,
    });
```

`pageModels/actions.js`

```js
    import {
      ADD_PAGE_MODELS,
    } from 'state/apps/testing/pageModels/types';

    // eslint-disable-next-line import/prefer-default-export
    export const addPageModels = pageModels => ({
      type: ADD_PAGE_MODELS,
      payload: pageModels,
    });
```

then the selectors:

`userList/selectors.js`

```js
    import { createSelector } from 'reselect';

    export const getUserList = state => state.apps.testing.userList;
    export const getList = createSelector(getUserList, userList => userList.list);
```

`pageModels/selectors.js`

```js
    import { createSelector } from 'reselect';

    export const getPageModels = state => state.apps.testing.pageModels;
    export const getList = createSelector(getPageModels, pageModels => pageModels.list);
```

And finally the reducers. The default state is going to contain some
sample data for us to display.

`userList/reducer.js`

```js
    import { ADD_USERS } from 'state/apps/testing/userList/types';

    const defaultState = {
      list: [
        {
          username: 'admin',
          registration: '2018-01-08 00:00:00',
          lastLogin: '2018-01-08 00:00:00',
          lastPasswordChange: '2018-01-08 00:00:00',
          status: 'active',
          passwordChangeRequired: true,
          profileAttributes: {
            fullName: 'admin',
            email: 'admin@entando.com',
          },
        },
        {
          username: 'user1',
          registration: '2018-01-08 00:00:00',
          lastLogin: '2018-01-08 00:00:00',
          lastPasswordChange: '2018-01-08 00:00:00',
          status: 'disabled',
          passwordChangeRequired: true,
          profileAttributes: {
            fullName: 'User Name',
            email: 'user1@entando.com',
          },
        },
      ],
    };

    const reducer = (state = defaultState, action = {}) => {
      switch (action.type) {
        case ADD_USERS: {
          return { ...state, list: action.payload };
        }

        default: return state;
      }
    };

    export default reducer;
```

`pageModels/reducer.js`

```js
    import { ADD_PAGE_MODELS } from 'state/apps/testing/pageModels/types';

    const defaultState = {
      list: [
        {
          code: 'home',
          descr: 'Home Page',
          configuration: {
            frames: [
              {
                pos: 0,
                descr: 'Navbar',
                sketch: {
                  x1: 0,
                  y1: 0,
                  x2: 2,
                  y2: 0,
                },
              },
              {
                pos: 1,
                descr: 'Navbar 2',
                sketch: {
                  x1: 3,
                  y1: 0,
                  x2: 5,
                  y2: 0,
                },
              },
            ],
          },
          template: '<html></html>',
        },
        {
          code: 'service',
          descr: 'Service Page',
          configuration: {
            frames: [
              {
                pos: 0,
                descr: 'Navbar',
                sketch: {
                  x1: 0,
                  y1: 0,
                  x2: 2,
                  y2: 0,
                },
              },
              {
                pos: 1,
                descr: 'Navbar 2',
                sketch: {
                  x1: 3,
                  y1: 0,
                  x2: 5,
                  y2: 0,
                },
              },
            ],
          },
          template: '<html></html>',
        },
      ],
    };

    const reducer = (state = defaultState, action = {}) => {
      switch (action.type) {
        case ADD_PAGE_MODELS: {
          return { ...state, list: action.payload };
        }

        default: return state;
      }
    };

    export default reducer;
```

Last, we can add the two reducers just created to the
`src/state/rootReducer.js`

```js
    ...
    import userList from 'state/apps/testing/userList/reducer';
    import pageModels from 'state/apps/testing/pageModels/reducer';

    export const testing = combineReducers({
      pageModels,
      userList,
    });
    ...
```

we will now be able to see with the `reduxDevTools` in our browser. To
view this state in your reduxDevTools go to:

`State -→ apps -→ testing -→ pageModels` and
`State -→ apps -→ testing -→ userList`

# Creating the UI Components

At this point, both routes created should be rendering a simple string.
We will next create the actual component that will be rendered inside
the page.

## userList

Inside `src/ui/userList/` create the `List` component. Create the
`userList` directory and `List.js` file in that directory.

```js
    import React from 'react';

    import {
      Grid,
      TablePfProvider,
    } from 'patternfly-react';

    const List = () => {
      const data = [
        {
          username: 'admin',
          registration: '2018-01-08 00:00:00',
        },
        {
          username: 'user1',
          registration: '2018-01-08 00:00:00',
        },
      ];

      const tr = data.map(row => (
        <tr>
          <td>{row.username}</td>
          <td>{row.registration}</td>
        </tr>
      ));

      return (
        <Grid fluid>
          <TablePfProvider
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <td>username</td>
                <td>registration</td>
              </tr>
            </thead>
            <tbody>
              {tr}
            </tbody>
          </TablePfProvider>
        </Grid>
      );
    };

    export default List;
```

Next, change the route inside `src/ui/App.js`. Add the import below and
update the component to reference the List component created in the
prior step.

```js
    ...
    import List from 'ui/userList/List';
    ...
      {
        path: ROUTE_USER_LIST,
        component: List,
      },
    ...
```

The table will now display correctly when clicking on the menu item.

### connecting to the store

Next let’s connect the component to the store to get the data from the
reducer.

The first step is creating the `ListContainer.js` next to the `List`
component file.

```js
    import { connect } from 'react-redux';
    import { getList } from 'state/apps/testing/userList/selectors';

    import List from 'ui/userList/List';

    export const mapStateToProps = state => ({
      data: getList(state),
    });

    export default connect(
      mapStateToProps,
      null,
    )(List);
```

And then update the List component to receive the property. The List
file should now look like this:

```js
    import React from 'react';
    import PropTypes from 'prop-types';

    import {
      Grid,
      TablePfProvider,
    } from 'patternfly-react';

    const List = ({ data }) => {
      const tr = data.map(row => (
        <tr>
          <td>{row.username}</td>
          <td>{row.registration}</td>
        </tr>
      ));

      return (
        <Grid fluid>
          <TablePfProvider
            striped
            bordered
            hover
          >
            <thead>
            <tr>
              <td>username</td>
              <td>registration</td>
            </tr>
            </thead>
            <tbody>
            {tr}
            </tbody>
          </TablePfProvider>
        </Grid>
      );
    };

    export default List;
```

Make sure that you remove the predefined `data` const since the data
will now be coming from the reducer, on top of defining PropTypes rules
for validating and giving a default for the injected property `data`.

Once complete, update the component used in the route inside `App.js`.
Update the import to the container and update the component in
`ROUTE_USER_LIST` to the new ListContainer.

```js
    ...
    import ListContainer from 'ui/userList/ListContainer';
    ...
      {
        path: ROUTE_USER_LIST,
        component: ListContainer,
      },
    ...
```

Go back to your app. We will now see the data inside the table
reflecting the content of the storage.

## Page Models

inside `src/ui/pageModels/` we are going to create the `List` component

```js
    import React from 'react';
    import PropTypes from 'prop-types';

    import {
      Grid,
      TablePfProvider,
    } from 'patternfly-react';

    const List = ({ data }) => {
      const tr = data.map(row => (
        <tr>
          <td>{row.username}</td>
          <td>{row.registration}</td>
        </tr>
      ));

      return (
        <Grid fluid>
          <TablePfProvider
            striped
            bordered
            hover
          >
            <thead>
            <tr>
              <td>username</td>
              <td>registration</td>
            </tr>
            </thead>
            <tbody>
            {tr}
            </tbody>
          </TablePfProvider>
        </Grid>
      );
    };

    List.propTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({})),
    };

    List.defaultProps = {
      data: [],
    };

    export default List;
```

Next change the route inside `src/ui/App.js`

```js
    ...
    import ListPageModels from 'ui/pageModels/List';
    ...
      {
        path: ROUTE_PAGE_MODELS,
        component: ListPageModels,
      },
    ...
```

The table will now be displayed correctly when clicking on the menu
item.

### Connecting to the Store

Next, connect the component to the store to get the data from the
reducer.

The very first thing we’ll do is create the `ListContainer.js` next to
the `List` component file.

```js
    import { connect } from 'react-redux';
    import { getList } from 'state/apps/testing/pageModels/selectors';

    import List from 'ui/pageModels/List';

    export const mapStateToProps = state => ({
      data: getList(state),
    });

    export default connect(
      mapStateToProps,
      null,
    )(List);
```

And then update the List component to receive the property. The whole
List component will have this content:

```js
    import React from 'react';
    import PropTypes from 'prop-types';

    import {
      Grid,
      TablePfProvider,
    } from 'patternfly-react';

    const List = ({ data }) => {
      const tr = data.map(row => (
        <tr>
          <td>{row.code}</td>
          <td>{row.descr}</td>
        </tr>
      ));


      return (
        <Grid fluid>
          <TablePfProvider
            striped
            bordered
            hover
          >
            <thead>
            <tr>
              <td>code</td>
              <td>descr</td>
            </tr>
            </thead>
            <tbody>
            {tr}
            </tbody>
          </TablePfProvider>
        </Grid>
      );
    };

    List.propTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({})),
    };

    List.defaultProps = {
      data: [],
    };
    export default List;
```

Next make sure that you remove the predefined `data` const since the
data will be coming from the reducer, on top of defining PropTypes rules
for validating and giving a default for the injected property `data`.

Once complete, update the component used in the route inside `App.js`

```js
    ...
    import PageModelsListContainer from 'ui/pageModels/ListContainer';
    ...
      {
        path: ROUTE_PAGE_MODELS,
        component: PageModelsListContainer,
      },
    ...
```

You will now see the data inside the table reflecting the content of the
storage.

# Connecting the app to an Entando core instance

By default the app is using mocks and not connecting to any Entando core
instance.

Because the app is making use of `@entando/apimanager` we can easily
change this by setting up two `.env` variables inside the `.env` file in
the project root:

```
    REACT_APP_DOMAIN=http://localhost:8080/entando-app
    REACT_APP_USE_MOCKS=false
```

The `REACT_APP_DOMAIN` must pointing towards the domain and container
where the Entando instance is running and **must not** contain trailing
slashes.

Once this is done to make the change happen we will have to stop the app
using `ctrl + c` and re run it with `npm start`.

Now the toast stating *This application is using mocks* won’t be popping
up anymore.

You can make sure that the configuration is correct by looking at the
network section in the browser dev tools. By default the app
automatically makes an admin login against a plain Entando instance to
authenticate the user and to be able to consume any protected api.

This is not an ideal scenario and it is meant to be used only for
debugging purposes for many reasons:

-   the username and password should never be hardcoded in your app

-   if authentication is required the user should be the one performing
    the login action

-   the plain default passwords in use won’t be useful against a proper
    production instance of Entando

## Adding the API Calls

We are now going to add api calls for both users and page models to
retrieve the data live instead of relying on our store’s default state.

Inside `src/api` create the `users.js` file:

```js
    import { makeRequest, METHODS } from '@entando/apimanager';

    // eslint-disable-next-line import/prefer-default-export
    export const getUsers = (page = { page: 1, pageSize: 10 }, params = '') => (
      makeRequest(
        {
          uri: `/api/users${params}`,
          method: METHODS.GET,
          mockResponse: {},
          useAuthentication: true,
        },
        page,
      )
    );
```

and then create the `pageModels.js` file:

```js
    import { makeRequest, METHODS } from '@entando/apimanager';

    // eslint-disable-next-line import/prefer-default-export
    export const getPageModels = (page = { page: 1, pageSize: 10 }, params = '') => makeRequest({
      uri: `/api/pageModels${params}`,
      method: METHODS.GET,
      mockResponse: {},
      useAuthentication: true,
    }, page);
```

## Creating the Thunk

In order to use the api call we next create a thunk action, which is a
redux action with side effects, like an API call.

inside the `src/state/apps/testing/userList/actions.js` file we are
going to add the new action:

```js
    ...
    import { addErrors } from '@entando/messages';
    import {
      getUsers,
    } from 'api/users';
    ...

    // thunks

    export const fetchUsers = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
      new Promise((resolve) => {
        getUsers(page, params).then((response) => {
          response.json().then((json) => {
            if (response.ok) {
              dispatch(addUsers(json.payload));
            } else {
              dispatch(addErrors(json.errors.map(err => err.message)));
            }
            resolve();
          });
        }).catch(() => {});
      })
    );
```

Next do the same inside `src/state/apps/testing/pageModels/actions.js`:

```js
    ...
    import { addErrors } from '@entando/messages';
    import {
      getPageModels,
    } from 'api/pageModels';
    ...

    // thunks

    export const fetchPageModels = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => (
      new Promise((resolve) => {
        getPageModels(page, params).then((response) => {
          response.json().then((data) => {
            if (response.ok) {
              dispatch(addPageModels(data.payload));
              resolve();
            } else {
              dispatch(addErrors(data.errors.map(err => err.message)));
              resolve();
            }
          });
        }).catch(() => {});
      })
    );
```

Now with two exports, it is safe to remove the
`eslint-disable-next-line` comment on line 5 of both files.

## changing the mapDispatchToProps in the containers

Next, in order to pass the newly created thunk to both List components,
we’ll update the containers accordingly, as:

`src/ui/userList/ListContainer.js`

```js
    ...
    import { fetchUsers } from 'state/apps/testing/userList/actions';
    ...
    export const mapDispatchToProps = dispatch => ({
      fetch: () => dispatch(fetchUsers()),
    });

    export default connect(
      mapStateToProps,
      mapDispatchToProps,
    )(List);
```

`src/ui/pageModels/ListContainer.js`

```js
    ...
    import { fetchPageModels } from 'state/apps/testing/pageModels/actions';
    ...
    export const mapDispatchToProps = dispatch => ({
      fetch: () => dispatch(fetchPageModels()),
    });

    export default connect(
      mapStateToProps,
      mapDispatchToProps,
    )(List);
```

## Updating the List components

Both List components were simple components with only a `render` method,
therefore could be declared as simple constants.

Next we will fetch data during the `componentDidMount` life cycle event
which will require we turn the constant into a class on top of changing
the PropTypes to add the new fetch method passed down to the component.

`src/ui/userList/List.js`

```js
    import React, { Component } from 'react';
    ...
    class List extends Component {
      componentDidMount() {
        const { fetch } = this.props;
        fetch();
      }

      render() {
        const { data } = this.props;
        const tr = data.map(row => (
          <tr>
            <td>{row.username}</td>
            <td>{row.registration}</td>
          </tr>
        ));

        return (
          <Grid fluid>
            <TablePfProvider
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <td>username</td>
                  <td>registration</td>
                </tr>
              </thead>
              <tbody>
                {tr}
              </tbody>
            </TablePfProvider>
          </Grid>
        );
      }
    }

    List.propTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({})),
      fetch: PropTypes.func,
    };

    List.defaultProps = {
      data: [],
      fetch: () => {},
    };
```

`src/ui/pageModels/List.js`

```js
    import React, { Component } from 'react';
    ...
    class List extends Component {
      componentDidMount() {
        const { fetch } = this.props;
        fetch();
      }

      render() {
        const { data } = this.props;
        const tr = data.map(row => (
          <tr>
            <td>{row.code}</td>
            <td>{row.descr}</td>
          </tr>
        ));

        return (
          <Grid fluid>
            <TablePfProvider
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <td>code</td>
                  <td>descr</td>
                </tr>
              </thead>
              <tbody>
                {tr}
              </tbody>
            </TablePfProvider>
          </Grid>
        );
      }
    }

    List.propTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({})),
      fetch: PropTypes.func,
    };

    List.defaultProps = {
      data: [],
      fetch: () => {},
    };
```

## clear the default value of the reducer

Now we should be fetching data from the server, therefore we can safely
make the list key in the `defaultState` object an empty array:

`src/state/apps/testing/userList/reducer.js`

```js
    ...
    const defaultState = {
      list: [],
    };
    ...
```

`src/state/apps/testing/pageModels/reducer.js`

```js
    ...
    const defaultState = {
      list: [],
    };
    ...
```

# adding additional dependencies

It may be necessary to set additional dependencies for your project. If
the need arises, it is important to remember a few rules:

Only actual dependencies that are not already included in `app-builder`
can be added as pure dependencies. Every other dependency must either be
a `devDependency` or `peerDependency`.

If you are not careful you may end up with duplicated dependencies that
**will** result in errors manifesting themselves when running the app
inside App Builder.

# running the app in integrated mode within App Builder

After running `npm install` in the App Builder, the user can run the
`npm run app-install <appId>` command to install the app.

This command will trigger a download of the app from npm and the
installation of its component within App Builder. After the installation
process is complete, it will be possible to either `npm start` or
`npm build` App Builder.

To install a dev app, like the one developed in this tutorial which have
not been previously published on npm, you will need to use additional
flags and will have to run a few additional commands.

**Before running the Install command** make sure that you have
uninstalled all existing peer and dev dependencies to avoid collision
with app builder. To do so, from the app builder app directory
(`testing`, in this tutorial) just run in the correct order the
following commands:

`npm run babel`

`npm i --only=production`

The first will create the dist directory that will be needed by App
Builder while the second one will uninstall anything but production
dependencies.

Next, from the App Builder directory, run the install command with these
additional flags:

-   `-d` specify the relative path where the app is installed. When
    using this flag the appId should be the normalized app name, without
    the `@entando/` prefix.

-   `-p` specify the package name if it is different from the appId

to use flags you will have to use the double dash in the command:

`npm run app-install —  cms -d ../testing -p @entando/testing`

**the value in the `-p` flag should always match the actual name of the
app that is going to be installed inside App Builder**. You can check
your app name inside the `package.json` file of your app.

If you experience problems after running the build command delete the
`node_modules` directory before running the second command.

