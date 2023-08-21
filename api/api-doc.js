const apiDoc = {
  openapi: "3.0.2",
  info: {
    title: "Proxeus API.",
    version: "1.0.0",
  },
  paths: {},
  components: {
    schemas: {
      ExternalNode: {
        type: "object",
        properties: {
          ID: {
            type: "string",
          },
          Name: {
            type: "string",
          },
          Detail: {
            type: "string",
          },
          Url: {
            type: "string",
          },
          Secret: {
            type: "string",
          },
        },
        required: ["ID", "Name"],
      },
      ExternalNodeInstance: {
        type: "object",
        properties: {
          ID: {
            type: "string",
          },
          NodeName: {
            type: "string",
          },
          Config: {
            type: "object",
          },
        }
      },
      ExternalQuery: {
        type: "object",
        properties: {
          ExternalNode: {
            "$ref": "#/components/schemas/ExternalNode",
          },
          ExternalNodeInstance: {
            "$ref": "#/components/schemas/ExternalNodeInstance",
          },
        }
      }
    },
    securitySchemes: {
      api_key: { "type": "apiKey", "name": "api_key", "in": "header" }
    }
  }

};

module.exports = apiDoc;
