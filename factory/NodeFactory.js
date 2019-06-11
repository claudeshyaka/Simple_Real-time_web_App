const ChildNode = require("./ChildNode");
const ParentNode = require("./ParentNode");

const NodeFactory = (name, length, min, max) => {
  if (length < 0 || length > 15) {
    return new Error("Up to 15 nodes can be generated");
  } else if (min > max) {
    return new Error("Invalid range");
  } else {
    // Generate an array of child nodes
    const childNodeArray = [...new Array(length)].map(() => {
      return new ChildNode(Math.round(Math.random() * (max - min + 1)) + min);
    });

    const Node = new ParentNode(name, length, min, max, childNodeArray);

    return Node;
  }
};

module.exports = NodeFactory;
