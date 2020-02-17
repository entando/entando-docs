# Tutorial: Extending the app-builder

Apps for the app builder are developed as standalone applications which should be able to run with `npm start` in standalone mode.

Each App should be deployed in npm using the `@entando` namespace and will export in their dist folder several items used by the app builder when integrating it

## Creating the Basic App

to create the basic app the easiest solution is using the [entando fpg](https://github.com/entando/fpg) runnig the `npx @entando/fpg ab-app <appName>` command.

This will create inside your working directory a boilerplate app-builder app in a directory named as your `<appName>` argument.

i.e.

if you run the command `npm @entando/fpg ab-app testing` inside your home directory, a directory named `testing` will be created inside your home and it will contain the app.

All the dependencies will be already installed and you can just `cd` inside the project directory and run `npm start` to see your app running.

## Understanding the Stand Alone environment

Each App for the app-builder, as it has been stated already, can run both in a stand alone mode and in an integrated mode.

When you run the app with `npm start` you will be looking at the standalone mode.

In this environment you'll be looking at the screens of your app inside a predefined default page.

this page, which does include a menu, won't be exported directly inside app-builder and therefore it can be customized to change its look and feel.

To better understand which elements and components are being exported to app-builder it is best to understand the anatomy of the app.   

# Exports

Each App will have a `babel.js` export file which will look like this:

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

# id
it is the App id.

This parameter is used by app-builder to differentiate all the possible apps integrated within itself.

# menu
is a React component containing all the menu elements. These elements are being used both inside the standalone environment and the integrated environment as a second level menu.

The boilerplate app contains just a basic menu.

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

We are going to create two links inside the menu for our App. The first link will take us to a page listing all the users inside the entando instance. The second one is going to list all the existing page models inside the entando instance.

For the purposes of this example we're using existing APIs from the Entando core just for the sake of simplicity. You could call any API or data source that makes sense for you.

In your app project open `src/ui/common/LinkMenu.js` and update the const to the code below.

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

it is important that both the `<LinkMenuItem>` id property and the `<FormattedMessage>`properties inside label have the correct values assigned:

the LinkMenuItem id will be **menu-userList** while the FormattedMessage id will be **testing.menu.userList** and the defaultMessage will be **User List**.

# locales

The locales files are objects that contain all of the i18n locales of the app.

By default the boilerplate contains both the english and italian i18n files.

In your app project in `src/locales/en.js` and `src/locales/it.js` you can see your labels.
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



While running in standalone mode the boilerplate does not offer a way for the user pick a locale, but both will be loaded inside app-builder and will be consumed as intended by it, using the correct one based on the user-picked language.

It is of course possible to change the standalone app to give the user the option to choose the locale in here as well, but this is not something will be covering in this tutorial.

## Customizing the menu labels

we are now going to be customizing the existing menu labels and we'll accomplish this by adding the new label ids inside both the english and italian locale files:

NOTE: If you named your app something besides `testing` you'll need to fix these tags to match the name of your app.

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

the key in the messages object matches the id of the `<FormattedMessage>`component we placed inside the menu, while its value is the actual string that will be displayed depending on the currently active language.

# Routes and RoutesDir

both these elements are imported from `src/ui/App.js` and while the first one is a collection of actual `<Route>` components, the second one is an object containing each route data:

```js
export const routesDir = [
  {
    path: ROUTE_TESTING,
    component: <>app component</>,
  },
];
```

the constant `ROUTE_TESTING` is actually being imported from `src/app-init/routes.js`

## Customizing the Routes

We are now going to create the two routes for the two links we have created, by creating first of all the two constants we will need.

In your IDE open `src/app-init/routes.js`

```js
export const ROUTE_TESTING = '/testing';
export const ROUTE_USER_LIST = '/testing/user-list';
export const ROUTE_PAGE_MODELS = '/testing/page-models';
```

NOTE: Change the value of `testing` to what you picked for the name of your App extension.

The value of each constant will be the path of the route. it is important that each route is a subroute of the id of the app itself, otherwise we may end up with name collision when running it inside the integrated environment of app-builder.

both routes are then going to be imported inside the `App.js` file:

Update the imports with your new ROUTE tags.
```js
import {
  ROUTE_TESTING,
  ROUTE_USER_LIST,
  ROUTE_PAGE_MODELS,
} from 'app-init/routes';
```

and then added to the `routesDir` constant:

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

we can now import the routes constants inside the `LinkMenu.js` file and change accordingly the **to** property of the `<LinkMenuItem>` component:

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

now clicking on the links in the menu will actually change the routes and display the content defined in the `App.js` file.

## state

The file `src/state/rootReducer.js` is the combined reducer of the App

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

The app specific reducers are stored inside the `apps` object, this is done to avoid possible name collisions with any reducer stored inside app-builder when running the app in integrated mode.

## Customizing the Reducers

We are now going to be creating the two reducers for both the user list and the page models.

We are going to create these reducers inside two new directories `src/state/apps/testing/userList/` and `src/state/apps/testing/pageModels`. The `types.js` files will contain the two action types that we'll need.

`userList/types.js`

```js
// eslint-disable-next-line import/prefer-default-export
export const ADD_USERS = 'apps/testing/add-users';
```

`pageModels/types.js`

```js
// eslint-disable-next-line import/prefer-default-export
export const ADD_PAGE_MODELS = 'apps/testing/page-models/add-page-models';
```

The value of both constants contain the whole namespace `apps/testing/REDUCER` this is done to avoid any possible name collision whenever running the app in integrated mode.

We are then going to create both actions files:

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

And finally the reducers. The default state is going to contain some sample data for us to display.

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

Finally, we are going to add the two reducers we just created to the `src/state/rootReducer.js`

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

we will now be able to see with the `reduxDevTools` in our browser both states. To view this state in your reduxDevTools go to:

`State --> apps --> testing --> pageModels` and `State --> apps --> testing --> userList`

# Creating the UI Components

right now both routes we created are just rendering a simple string: we are now going to be creating the actual component that will be rendered inside the page.

## userList

Inside `src/ui/userList/` we are going to create the `List` component. Create the `userList` directory and `List.js` file in that directory.

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

we are then going to change the route inside the `src/ui/App.js`. Add the import below and update the component to reference the List component created in the prior step.

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

now the table will be displayed correctly when clicking on the menu item.

### connecting to the store

we are now going to connect the component to the store to get the data from the reducer.

the very first thing we'll do is creating the `ListContainer.js` next to the `List` component file.

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

And then we are going to update the List component to receive the property. The whole of the List file should look like this now:

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

we have to make sure that we remove the predefined `data` const since the data will now be coming from the reducer, on top of defining PropTypes rules for validating and giving a default for the injected property `data`.

Once we are done we are going to update the component used in the route inside `App.js`. Update the import to the container and update the component in `ROUTE_USER_LIST` to the new ListContainer.

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

Go back to your app. We will now see the data inside the table reflecting the content of the storage.

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

We are then going to change the route inside the `src/ui/App.js`

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

Now the table will be displayed correctly when clicking on the menu item.

### Connecting to the Store

We are now going to connect the component to the store to get the data from the reducer.

The very first thing we'll do is creating the `ListContainer.js` next to the `List` component file.

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

And then we are going to update the List component to receive the property. The whole List component will have this content:

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

We have to make sure that we remove the predefined `data` const since the data will now be coming from the reducer, on top of defining PropTypes rules for validating and giving a default for the injected property `data`.

Once we are done we are going to update the component used in the route inside `App.js`

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

We will now see the data inside the table reflecting the content of the storage.

# Connecting the app to an Entando Core instance

By default the app is using mocks and not connecting to any Entando Core instance.

Because the app is making use of `@entando/apimanager` we can easily change this by setting up two `.env` variables inside the `.env` file in the project root:

```
REACT_APP_DOMAIN=http://localhost:8080/entando-app
REACT_APP_USE_MOCKS=false
```

The `REACT_APP_DOMAIN` must pointing towards the domain and container where the Entando instance is running and **must not** contain trailing slashes.

Once this is done to make the change happen we will have to stop the app using `ctrl + c` and re run it with `npm start`.

Now the toast stating _This application is using mocks_ won't be popping up anymore.

We can even make sure that the configuration is correct by looking at the network section in our browser dev tools: by default the app automatically makes an admin login against a plain entando instance to authenticate the user and be able to actually consume any protected api.

Of course this is not an ideal scenario and it is meant to be used only for debugging purposes for many reasons:

- the username and password should never be hardcoded in your app
- if authentication is required the user should be the one performing the login action
- the plain default passwords in use here won't be any good against a proper production instance of entando

## Adding the API Calls

We are now going to be adding the api calls for both users and page models to retrieve the data live instead of relying on our store default state.

inside `src/api` we are going to create the `users.js` file

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

and then we are going to create the `pageModels.js` file

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

to use the api call we are going to create a thunk action, which is a redux action with side effects, like an API call.

inside the `src/state/apps/testing/userList/actions.js` file we are going to add the new action:

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

we'll then do the same inside  `src/state/apps/testing/pageModels/actions.js`:

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

now that we do have two exports we can safely remove the `eslint-disable-next-line` comment on line 5 of both files.

## changing the mapDispatchToProps in the containers

we will now need to actually pass the newly created thunk to both List components, so we'll have to update the containers accordingly

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

## updating the List components

both List components were simple components with only a `render` method, therefore could be declared as simple constants.

Now we are going to be fetching data during the `componentDidMount` life cycle event and therefore we will have to turn the constant into a class on top of changing the PropTypes to add the new fetch method passed down to the component.

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

now that we are fetching data from the server we can safely make the list key in the `defaultState` object an empty array:

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

____

# adding additional dependencies

It might be necessary adding additional dependencies for your project, if the need arises it is important to remember a few rules:

only actual dependencies that are not already included in `app-builder` can be added as pure dependencies.
every other dependency must be either a `devDependency` or `peerDependency`.

if you are not careful with this you may end up with duplicated dependencies that **will** result in possible errors manifesting themselves when running the app inside app-builder.

# running the app in integrated mode within app-builder

After running `npm install` in the app builder the user can run the `npm run app-install <appId>` command to install the app.

This command will trigger a download of the app from npm and the installation of its component within app builder.
After the installation process is complete it will be possible to either `npm start` or `npm build` app builder.

To install a dev app, like the one developed on this tutorial, that has not been published on npm you can use additional flags:

- `-d` specify the relative path where the app is installed. When using this flag the appId should be the normalized app name, without the `@entando/` prefix.
- `-p` specify the package name if it is different from the appId

to use flags you will have to use the double dash in the command:

`npm run app-install --  cms -d ../testing -p @entando/testing`

**before running this command** make sure that you have uninstalled all existing peer and dev dependencies to avoid collision with app builder. To do so just run in the correct order the following commands:

`npm run babel`

`npm i --only=production`

the first one will create the dist directory that will be needed by app builder while the second one will uninstall anything but production dependencies.

if you do still experience problems after running the build command delete the `node_modules` directory before running the second command.
