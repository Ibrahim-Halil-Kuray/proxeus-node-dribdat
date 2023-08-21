# Proxeus Node for Dribdat

This is a node for [Proxeus](https://github.com/ProxeusApp), which enables running workflows, such as creating documents, connected to the [Dribdat](https://github.com/dribdat) API.

It is developed in JavaScript - scroll down for a developer [quickstart](#quickstart).

## Background

[Proxeus Core](https://github.com/ProxeusApp/proxeus-core) is a workflow engine, composed of one or more interconnected nodes. 
Additional functionality is provided by external nodes which are web servers exposing a well defined API.  Each external node will first register to a running Proxeus Core engine with an Id, Name, and URL. 
Upon registration, the Core will make the registered node type available to users.  The new node type will appear in a list, alongside other nodes. 
The core also has a fixed set of core node types, such as: condition, template, or form nodes.

During workflow design, users can instantiate the new node type in their workflow.  The node will behave the same way as built-in nodes.  External node will expose a web configuration interface that is used by the workflow designer to configure the instantiated node. The configuration is then saved in the core and external nodes do not need to have any storage.  This clearly separate the responsibility between the core and the external nodes.

During execution, when the workflow state reaches the instantiated external node, the core will call the node using HTTP and transmit the workflow state.  The external node will query the node instance configuration from the core, execute its task and return the new state of the workflow.

For more details, visit the [Proxeus Documentation](http://doc.proxeus.com/#/external_workflow_nodes)

## Contract

An external node has an HTTP server that provides the following API after registration with Core:

* GET `/node/:id/config` return the configuraton HTML page for the given node instance.
* POST `/node/:id/config` updated the configuration of the node instance with the give id.
* POST `/node/:id/next` trigger the execution of a node instance.
* POST `/node/:id/remove` remove a node instance, called when a node instance is removed from a workflow definition.
* GET `/health` heartbeat to check that the node is alive.

Proxeus core will provide the following API to external nodes:

* POST `/api/admin/external/register` to register an external node.
* POST `/api/admin/external/config/:id` to store the configuration of a node instance.
* GET `/api/admin/external/config/:id` to read the configuration of a node instance.

This is documented in the OpenAPI website of this project.

## Examples

The following examples are using this library to provide two blockchain external nodes that can be used in any 
Proxeus workflow:

See [ProxeusApp/node-go](https://github.com/ProxeusApp/node-go/) for a prior [implementation](https://github.com/ProxeusApp/node-go/blob/master/node.go) of this API as a Go library. It is used by remote-API nodes like [node-balance-retriever](https://github.com/ProxeusApp/node-balance-retriever).

See [proxeus-zoho-node](https://github.com/ProxeusApp/proxeus-zoho-node) for a Python implementation.

# Quickstart

To run the node, install a recent version of Node.js, then:

```bash
# Install dependencies
npm i

# Run app
npm run start
```

## API documentation

Thanks to its OpenAPI compliance, the app auto-generates the documenation of the API on the fly.

Available in <http://localhost:3030/api>, while the app is running.

## Security notes

During registration, external node will provide a shared secret to be used by the core when calling the external 
node API, including the configuration page.

Current assumption is that external nodes are run by Proxeus operators on a private network.  Also, since the full 
state of a workflow is currently transmitted to the external node, Proxeus operators must be sure that the 
node will use this data as specified.

TODO: add any JS-specific security notes

## Distribution

External nodes are currently distributed as Docker images pulled from well known Docker repositories.  Operators will assemble a Proxeus solution using a Docker Compose configuration file containing a proxeus-core instance, and as many external node instances as required by their use cases.

TODO: add `Dockerfile` and update this section

## License

MIT © [Proxeus Association](https://proxeus.org)

Thanks to [Alain Perkaz](https://aperkaz.github.io) and the [freeCodeCamp post](https://www.freecodecamp.org/news/how-to-build-explicit-apis-with-openapi/) for the bootstrap.
