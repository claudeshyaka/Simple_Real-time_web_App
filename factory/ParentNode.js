// const Node = require("./Node");

class ParentNode {
  constructor(name, length, min = 0, max = 10, childNodes) {
    this.name = name;
    this.length = length;
    this.min = min;
    this.max = max;
    this.childNodes = childNodes;
  }
}

module.exports = ParentNode;
