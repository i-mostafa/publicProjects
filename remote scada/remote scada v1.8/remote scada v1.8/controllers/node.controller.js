const { set } = require("mongoose");
const { update } = require("../models/dbmodels/node.model");
const NodeModel = require("../models/dbmodels/node.model");
const nodeModel = require("../models/node.model");
const rsaModel = require("../models/rsa.model");
exports.addNode = (req, res, next) => {
  let nodeData = req.body;
  const query = {
    lastModifier: req.session.userName,
    nodeName: nodeData.nodeName,
    description: nodeData.description,
    nodeId: Date.now(),
    ports: {
      ADC_0: { state: "ANALOG", value: 0 },
      D0: { state: nodeData.GPIO_0, value: "LOW" },
      D1: { state: nodeData.GPIO_1, value: "LOW" },
      D2: { state: nodeData.GPIO_2, value: "LOW" },
      D3: { state: nodeData.GPIO_3, value: "LOW" },
      D4: { state: nodeData.GPIO_4, value: "LOW" },
      D5: { state: nodeData.GPIO_5, value: "LOW" },
      D6: { state: nodeData.GPIO_6, value: "LOW" },
      D7: { state: nodeData.GPIO_7, value: "LOW" },
      D8: { state: nodeData.GPIO_8, value: "LOW" },
      D9: { state: nodeData.GPIO_9, value: "LOW" },
      D10: { state: nodeData.GPIO_10, value: "LOW" },
    },
  };
  nodeModel.addBureRecordToDb(NodeModel, query);
  res.redirect("/addNode");
};

exports.getCurrentNodes = (req, res, next) => {
  nodeModel.getFilteredData(NodeModel).then((nodes) => {
    res.render("currentNodes", {
      nodes: nodes,
      role: req.session.role,
      userName: req.session.userName,
    });
  });
};

exports.getNodeData = (req, res, next) => {
  let nodeId = req.query.nodeId;
  req.session.nodeId = nodeId;
  nodeModel.getAllFromDB(NodeModel).then((nodes) => {
    nodeId ? void 0 : (nodeId = nodes[0].nodeId);
    nodeModel.getFilteredData(NodeModel, { nodeId: nodeId }).then((node) => {
      res.render("readStatus", {
        node: node[0],
        nodes: nodes,
        role: req.session.role,
        userName: req.session.userName,
      });
    });
  });
};
exports.getNodeJson = (req, res, next) => {
  let nodeId = req.query.nodeId;
  nodeModel.getAllFromDB(NodeModel).then((nodes) => {
    nodeId ? void 0 : (nodeId = nodes[0].nodeId);
    nodeModel.getFilteredData(NodeModel, { nodeId: nodeId }).then((node) => {
      res.json(node);
      //console.log(node);
    });
  });
};

exports.controlNodeData = (req, res, next) => {
  let nodeId = req.query.nodeId;
  req.session.nodeId = nodeId;
  nodeModel.getAllFromDB(NodeModel).then((nodes) => {
    nodeId ? void 0 : (nodeId = nodes[0].nodeId);
    nodeModel.getFilteredData(NodeModel, { nodeId: nodeId }).then((node) => {
      res.render("controlRoom", {
        node: node[0],
        nodes: nodes,
        role: req.session.role,
        userName: req.session.userName,
      });
    });
  });
};

exports.nodeRequest = (nodeId, data, res) => {
  //console.log(data);
  data.lastRequest = new Date.now();
  nodeModel
    .updateOneInDB(NodeModel, { nodeId: nodeId }, data)
    .then(async (nodeData) => {
      let portNames = Object.keys(nodeData.ports);
      let stringNodeData = "";
      for (let index = 0; index < portNames.length; index++) {
        stringNodeData += `${nodeData.ports[portNames[index]].state}:${
          nodeData.ports[portNames[index]].value
        }&`;
      }
      console.log(stringNodeData);
      let enc = await rsaModel.cbcEnc(stringNodeData);
      res.end(enc);
    });
};

exports.extractNodeData = (msg) => {
  let result = {};
  let portNames = [
    "ADC_0",
    "D0",
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "D10",
  ];
  let block = msg.split("=")[2];
  let dataSets = block.split("&");

  for (let index = 0; index < dataSets.length; index++) {
    let setData = dataSets[index].split(":");
    if (setData[0] === "ANALOG" || setData[0] === "INPUT") {
      result[`ports.${portNames[index++]}.value`] = setData[1];
    }
  }

  console.log(result);
  return result;
};
exports.toggleNodePort = (req, res, next) => {
  console.log(req.query);
  let nodeId = req.query.nodeId;
  let port = req.query.port;
  let update = {};
  update[`ports.${port}.value`] = req.query.state === "HIGH" ? "LOW" : "HIGH";
  update.lastModifier = req.session.userName;
  nodeModel
    .updateOneInDB(NodeModel, { nodeId: nodeId }, update)
    .then((node) => {
      res.json({ state: node.ports[port].value });
    });
};
exports.updatePWMNode = (req, res, next) => {
  console.log(req.query);
  let nodeId = req.query.nodeId;
  let port = req.query.port;
  let update = {};
  update[`ports.${port}.value`] =
    parseInt(req.query.value) > 100
      ? 100
      : parseInt(req.query.value) < 0
      ? 0
      : req.query.value;
  update.lastModifier = req.session.userName;
  nodeModel
    .updateOneInDB(NodeModel, { nodeId: nodeId }, update)
    .then((node) => {
      res.json({ state: node.ports[port].value });
    });
};
