# Add an API Claim to Connect a Micro Frontend to a Microservice
Micro frontends typically require data or logic provided by microservices. The connection between a micro frontend (MFE) and a microservice (MS) is configured as an API claim in the bundle project `entando.json`. See [API Management](../../../docs/getting-started/ent-api.md) for more information. 

:::tip Note
API claims in Entando can be used for microservices within the same bundle or for microservices within another bundle in the same namespace. This tutorial demonstrates the first case. 

Entando recommends creating REST APIs in microservices instead of extending the App Engine as previously done.
::: 

## Prerequisites
* A working instance of Entando
* An existing [React Config MFE](../mfe/widget-configuration.md) bundle project. The configuration MFE tutorial is a good starting point since it already has the settings in place to handle the `config` JSON context. 
  * (Optional) Use `ent bundle init --from-hub YOUR-PROJECT-NAME` to initialize your project using the `Entando 7.1 Tutorials → e71-simple-mfe-with-config` bundle.

## Step 1. Create a Simple Node.js Microservice
1. Generate the basic microservice configuration and placeholder directory:
``` shell
ent bundle ms add simple-node-ms --stack=node 
```
2. Change to the `microservices/simple-node-ms` directory and initialize a node application with a few dependencies:
``` shell
npm init --yes
npm install --save express express-urlrewrite cors morgan
```
3. Create `index.js` to provide two simple controllers - the first to supply a simple "Hello World" service and the second as a basic health check service:
``` javascript
const express = require('express');
const rewrite = require('express-urlrewrite')
const cors = require('cors');
const logger = require('morgan');
const contextPath = process.env.SERVER_SERVLET_CONTEXT_PATH

const app = express();
app.use(rewrite(contextPath + '/*', '/$1'));
app.use(logger('dev'));
app.use(cors());

//Hello World API
app.get('/api/hello', function (req, res) {
    const helloResponse = {"greeting":"Hello World!", "timestamp":Date.now()};
    res.status(200).json(helloResponse);
});

//Health API
const healthResponse = {"status":"UP"};
app.get('/api/health', function (req, res) {
    res.status(200).json(healthResponse);
});

const port = 8081;
app.listen(port, function () {
    console.log('Listening to Port ' + port);
}); 
```

4. Edit `package.json` and add basic start and build commands to the `scripts` structure to enable ent integration:
```json
 "start": "node index.js",
 "build": "echo \"No build required\"",
```
5. Test the service locally by running the following command from the root directory of your bundle project:
``` shell
ent bundle run simple-node-ms 
```
* Access <http://localhost:8081/api/hello> to see a `Hello World!` response with a timestamp. 
* Access <http://localhost:8081/api/health> to see a standard `{"status:"UP"}` response.

>Note: In local development, the run command can be used to modify the port number so multiple microservices can run parallel on different ports, but in production, microservices must run on port 8081. 
  
6. Finally, create `microservices/simple-node-ms/Dockerfile` so ent knows how to assemble the Docker image for the service:
```
FROM node:16-slim
WORKDIR /app
COPY . .
RUN npm install --production

EXPOSE 8081
CMD [ "node", "index.js" ]
```

## Step 2. Use an API Claim to connect the MFE to the MS
1. Create an API Claim to connect the MFE to the MS. If different names were used for the MFE or MS, update the command accordingly. The `serviceUrl` parameter is used to set up `microfrontends/simple-mfe/public/mfe-config.json` for local testing and should match the settings in `entando.json`. 
``` shell
ent bundle api add simple-mfe simple-node-api --serviceName=simple-node-ms --serviceUrl=http://localhost:8081
```

2. Update the MFE to use the MS by replacing `microfrontends/simple-mfe/src/App.js` with the following:
``` javascript
import {useState} from "react";
import './App.css';

const API_HELLO_PATH = '/api/hello'

function App({config}) {
    const {systemParams} = config || {};
    const { api } = systemParams || {};
    const url = api && api["simple-node-api"].url

    const [payload, setPayload] = useState("")

    async function callTheApi() {
        try {
            const apiResponse = await fetch(url + API_HELLO_PATH);

            if (apiResponse.ok) {
                const apiJson = await apiResponse.json();
                setPayload(<>{apiJson.greeting}<br/>{apiJson.timestamp}</>);
            } else {
                setPayload('Server responded with an error');
            }
        } catch (error) {
            setPayload(error.message);
        }
    }

    return (
    <div className="App">
      <div>
        <button onClick={callTheApi}>Call the Node API</button>
      </div>
      <div>
        <span>{payload}</span>
      </div>
    </div>
  );
}

export default App;
```
This code uses the provided `config` settings to determine the URL for the `simple-node-api` to call the microservice.

3. Test the updated MFE. Restart the MS if you shut it down after completing the local test earlier.
``` shell
ent bundle run simple-mfe
```

4. Confirm the MFE is functional by clicking on `Call the Node API` and observing the response. The timestamp should update each time you click the button. If you have any issues, check your browser console and the logs for the microservice.

## Build and Install the Bundle
1. From the project root directory, [build and install](../pb/publish-project-bundle.md) the bundle:
   <EntandoInstallBundle/>

2. Log in to your App Builder.
    * Add the `simple-mfe` widget to a page
    * Publish the page
    * Confirm the microservice can be called successfully by clicking the `Call the Node API` button.
