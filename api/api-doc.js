const apiDoc = {
  swagger: "2.0",
  basePath: "/",
  info: {
    title: "Proxeus API.",
    version: "1.0.0",
  },
  definitions: {
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
    ExternalNodeInstance: {},
    ExternalQuery: {}
  },
  paths: {},
};

module.exports = apiDoc;
