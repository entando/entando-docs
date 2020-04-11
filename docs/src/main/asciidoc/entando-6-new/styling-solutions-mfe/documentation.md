# Styling Solutions for MFEs in Entando

this guide is used to explain how to properly style a MFEs in Entando.

By default we will fallback on our [guidelines and standards for FE applications](https://confluence.entando.org/display/E5/Sass).

When it comes to MFE we are probably going to deal with the Shadow DOM on top of wanting to give options to override styles for client's theming purposes.

## Shadow DOM

the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) allows to create sandboxed Web Components which can be injected inside the DOM without any conflicts among one another.

The biggest advantage and drawback of the shadow dom is that because of its sandboxing nature external/global css styles won't be applied to anything within the shadow dom.
This basically means that any CSS present inside the DOM head will be completely ignored by the components within the shadow dom.

This makes sure that external CSS that do not belong to the widget won't have any impact on it allowing the widget to preserve its intended look and feel. On the other hand this makes it more difficult to change the look and feel of the widget without re-transpiling it.

This of course also applies to any other possible resource that is normally being linked inside the head.

Any import of CSS files or SASS files is normally being added to the head and the only way to change this behavior would be to eject the app and change the webpack configuration.

This is why we will have to inject the widget's required CSS inside the shadow dom and not inside the DOM.

### Injecting regular CSS stylesheets

Usually when adding a CSS/SASS stylesheet to a react app we will just import the file and that will be magically appended inside the document when in dev mode or added to the production html code after build.

```js
import 'bootstrap-italia/dist/css/bootstrap-italia.min.css';

// results into the style element being appended at the bottom of the <head> or the
// link element being created inside the <head> after build
```

This solution won't work with the shadow DOM, as it has already been stated, because all the CSS injected inside the <head> will be ignored and it is not possible changing this behaviour without ejecting the react app and changing the configuration of webpack.

It is although possible to append link elements within the shadow dom and load the CSS for the given widget.

```js
// Apply external styles to the shadow dom
const linkElem = document.createElement('link');
linkElem.setAttribute('rel', 'stylesheet');
linkElem.setAttribute('href', 'style.css');

// Attach the created element to the shadow dom
shadow.appendChild(linkElem);
```

To do this we will have to manually write the full relative or absolute path to the CSS file. This is usually being handled by webpack itself, which will also append an hash to the filename to make it unique and ensure that browser caching won't effect eventual updates of the build.

Therefore to achieve the intended result we will have to actually manually copy the file in the public directory of our react project and put it into the chosen path that will be used when injecting the link element.

This will make the CSS work in dev mode, but to make this work as intended in the production environment we either have to setup different paths for dev and production or we will have to choose a path that we are sure is going to be valid in both instances.

To check on which environment the app is currently running we can just check the `process.env.NODE_ENV` variable, which development value is `development`.

Because we'd be adding the CSS file manually we won't have any hash in the file name, so caching could be an issue for users.

### Using JSS

JSS is a javascript library used to better handle CSS in projects.
I won't be detailing everything the library offers, for that I recomment checking the [official documentation](https://cssinjs.org/).

In a nutshell JSS allows to re use defined styles across components and create the CSS file on the file with just the definitions needed by the components themselves, on top of supporting easy theming.

```js
import React from 'react'
import {render} from 'react-dom'
import {createUseStyles} from 'react-jss'

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createUseStyles({
  myButton: {
    color: 'green',
    margin: {
      // jss-expand gives more readable syntax
      top: 5, // jss-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '& span': {
      // jss-nested applies this to a child span
      fontWeight: 'bold' // jss-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: 'italic'
  }
})

const Button = ({children}) => {
  const classes = useStyles()
  return (
    <button className={classes.myButton}>
      <span className={classes.myLabel}>{children}</span>
    </button>
  )
}

const App = () => <Button>Submit</Button>

render(<App />, document.getElementById('root'))
```

The biggest perk of JSS is that it lets us define the insertion point for the CSS file.

```js
import * as React from 'react';
import { render } from 'react-dom';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';

import { App } from '@myApp/core';

class MyWebComponent extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const mountPoint = document.createElement('span');
    const reactRoot = shadowRoot.appendChild(mountPoint);
    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot
    });

    render(
      <StylesProvider jss={jss}>
        <App />
      </StylesProvider>,
      mountPoint
    );
  }
}
customElements.define('my-web-commponent', MyWebComponent);
```

This allows us to seamlessly use the shadow DOM without any of the complicated setup that is currently required when injecting manually the CSS into the project.

Some components libraries support JSS out of the box, without the need to create the JSS file, other times though it will be necessary to actually convert the CSS into JSS using the [`jss cli`](https://cssinjs.org/cli?v=v5.0.2).

### Events Retargeting

By default events are triggered inside the dom and not inside the shadow dom, so when an element is clicked by the user or any other event is fired we need to propagate them properly inside the shadow dom.

the [`react-shadow-dom-retarget-events`](https://www.npmjs.com/package/react-shadow-dom-retarget-events) package can be used to easily achieve the result.

```js
import React from 'react';
import retargetEvents from 'react-shadow-dom-retarget-events';

class App extends React.Component {
  render() {
  	return <div onClick={() => alert('I have been clicked')}>Click me</div>;
  }
}

const proto = Object.create(HTMLElement.prototype, {
  attachedCallback: {
    value: function() {
      const mountPoint = document.createElement('span');
      const shadowRoot = this.createShadowRoot();
      shadowRoot.appendChild(mountPoint);
      ReactDOM.render(<App/>, mountPoint);
      retargetEvents(shadowRoot);
    }
  }
});
document.registerElement('my-custom-element', {prototype: proto});
```

## CSS Libraries

Entando Widgets should be created with either of the following libraries. Other libraries might be used, but no official support is being given at the moment.

### Material UI

[Material UI](https://material-ui.com/getting-started/installation/) is the default library used for entando widgets.
It natively offers all the necessary components and uses JSS to actually inject the styles, requiring therefore just to set up the injection point for the JSS to use it within the shadow dom

```js
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: reactRoot,
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

Material UI offers by default all the components that might be necessary for the app and thanks to theming it is easy to customize the default look.

#### Theming

Themes allow for easy customization and to pass changes throughout the components.
Unfortunately theming require re-transpilation of the project and therefore cannot be used for branding purposes.

Although it is useful to actually implement theming at least to apply default changes to the UI to make it use the default Entando Branding.

Proper documentation on how to use themes can be found on the [official website](https://material-ui.com/styles/advanced/).

there is currently an entando theme in [frontend-libraries](https://github.com/entando/frontend-libraries/tree/master/packages/entando-ui).

As we can see inside the code theming can be used both to change the default props being passed to any of the Material-UI components or to even apply styles automatically to any component inside the <ThemeProvider>

```js
import entandoUI from '@entando/ui';
import { ThemeProvider } from '@material-ui/core/styles';

const app = () => (
  <ThemeProvider theme={entandoUI}>
    <Container>
      <Table />
      <TextInput />
      <Buttons />
      <Radios />
    </Container>
  </ThemeProvider>
);
```

### Bootstrap Italia

Most of the Italian projects will make use of bootstrap italia, which is basically the industry standard when it comes to government websites.

Bootstrap Italia offers already a library of [React Components](https://github.com/italia/design-react-kit).

Not all the components have been implemented, but the [story book](https://italia.github.io/design-react-kit/?path=/story/introduzione-introduzione--benvenuto) shows what currently exists.

Everything is currently documented in italian and the documentation is currently lacking. On top of that the examples often list tags of components that don't actually exist but are meant as placeholders/abbreviations for other existing components:

i.e.

```
  <CompleteHeader
    theme=""
    townName="Nome del Comune"
    townTagLine="Uno dei tanti Comuni d Italia"
  />
```

<CompleteHeader/> is not an actual component exported by the library, but is just a reference to their header implementation.
Checking the Header -> Complete Header documentation we can actually see how that should be implemented, but its sample once again is actually referencing not actual components but other parts of the documentation:

i.e.

```
<Headers shadow={false}>
  <SlimHeader theme="" />
  <div className="it-nav-wrapper">
    <CenterHeader theme="" />
    <NavHeader theme="" />
  </div>
</Headers>
```

Once again <SlimHeader/> does not actually exists, but it is a reference to the Header -> Header Slim portion of the documentation.

This makes navigatint the entire documentation extremely troublesome and can lead to a lot of debugging to actually understand what is going on.

The component library **does not** include the bootstrap italia CSS, which needs to be installed manually:

```
npm i bootstrap-italia typeface-lora typeface-roboto-mono typeface-titillium-web
```

Bootstrap Italia does not support JSS out of the box, but it can be converted using the JSS CLI tool.

```
npx jss-cli convert bootstrap-italia.min.css > bootstrap-italia.js
```

### Known issues with other libraries

ReactStrap currently is missing some options for some of its components that make it impossible to use it with the shadow DOM.

This applies to components that either inject components outisde of the shadow DOM or that register listeners in the document and not inside the shadow DOM.

Issues are [currently open](https://github.com/reactstrap/reactstrap/issues/1691) inside reactstrap.

## Styling override

Per requirements widgets UI should allow overriding to accomodate clients branding needs.

To make this work every single widget needs to implement the same stylesheet: `entando.css` which should be located within the public files of the entando backend.

This file might not exist, causing no change to the component, but the user can create it inside the admin console using the file browser.

The file should be included either inside the shadow dom at the very end of the other stylesheets or inside the head tag at the very bottom, to ensure that its selectors are actually acting on the elements.

The following CSS classes should be added on the widgets element to allow proper customization through styles override:

Entando\_\_text--primary = for titles
Entando\_\_text--secondary = for regular text
Entando\_\_text--call-to-action = for links and such
Entando\_\_text--muted = for faded text
Entando\_\_background--primary = background primary color
Entando_\_background--secondary = background secondary color
Entando\_\_logo = for the company logo

These styles should be used to implement the default entando branding on the widget.
