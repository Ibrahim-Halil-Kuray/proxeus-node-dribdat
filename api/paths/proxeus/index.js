module.exports = function () {
  let operations = {
    GET,
    POST,
    PUT,
    DELETE,
  };

  function GET(req, res, next) {
    res.status(200).json([
      { id: 0, message: "First node" },
      { id: 1, message: "Second node" },
    ]);
  }

  function POST(req, res, next) {
    console.log(`About to create node: ${JSON.stringify(req.body)}`);
    res.status(201).send();
  }

  function PUT(req, res, next) {
    console.log(`About to update node id: ${req.query.id}`);
    res.status(200).send();
  }

  function DELETE(req, res, next) {
    console.log(`About to delete node id: ${req.query.id}`);
    res.status(200).send();
  }

  GET.apiDoc = {
    summary: "Fetch nodes.",
    operationId: "getExternalNodes",
    responses: {
      200: {
        description: "List of nodes.",
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/ExternalNode",
          },
        },
      },
    },
  };

  POST.apiDoc = {
    summary: "Create node.",
    operationId: "createExternalNode",
    consumes: ["application/json"],
    parameters: [
      {
        in: "body",
        name: "node",
        schema: {
          $ref: "#/components/schemas/ExternalNode",
        },
      },
    ],
    responses: {
      201: {
        description: "Created",
      },
    },
  };

  PUT.apiDoc = {
    summary: "Update node.",
    operationId: "updateExternalNode",
    parameters: [
      {
        in: "query",
        name: "id",
        required: true,
        type: "string",
      },
      {
        in: "body",
        name: "node",
        schema: {
          $ref: "#/components/schemas/ExternalNode",
        },
      },
    ],
    responses: {
      200: {
        description: "Updated ok",
      },
    },
  };

  DELETE.apiDoc = {
    summary: "Delete node.",
    operationId: "deleteExternalNode",
    consumes: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "id",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Delete",
      },
    },
  };

  return operations;
};
