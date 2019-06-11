const express = require("express");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const connectDB = require("./config/db");
const path = require("path");

const Root = require("./models/Root");
const Factory = require("./models/Factory");
const NodeFactory = require("./factory/NodeFactory");

// connect to Database

connectDB();

// Socket.io events

io.on("connection", socket => {
  socket.on("fetch_root", async () => {
    try {
      let root = await Root.findOne({});

      if (root) {
        io.emit("fetched_root", root);
      } else {
        root = new Root();

        const newRoot = await root.save();

        io.emit("fetched_root", newRoot);
      }
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("fetch_factories", async () => {
    try {
      const factories = await Factory.find();

      if (!factories) {
        io.emit("no_factories");
      } else {
        io.emit("fetched_factories", factories);
      }
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("fetch_factory", async id => {
    try {
      const factory = await Factory.findById(id);
      if (!factory) {
        // send a data not found message
      } else {
        io.emit("fetched_factory", factory);
      }
    } catch (err) {
      console.err(err.message);
    }
  });

  // Generate new factory node.
  socket.on("create_factory", async factory_data => {
    const { name, length, min, max } = factory_data;

    const _length = Number.parseInt(length, 10);
    const _min = Number.parseInt(min, 10);
    const _max = Number.parseInt(max, 10);

    try {
      const factory = new Factory(NodeFactory(name, _length, _min, _max));

      const new_factory = await factory.save();

      await Root.updateOne({
        $push: { factories: new_factory._id }
      });

      io.emit("created_factory", new_factory);
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("edit_factory", async ({ id, formValues }) => {
    const { name, length, min, max } = formValues;

    const _length = Number.parseInt(length, 10);
    const _min = Number.parseInt(min, 10);
    const _max = Number.parseInt(max, 10);

    const newFactory = NodeFactory(name, _length, _min, _max);

    try {
      const factory = await Factory.findByIdAndUpdate(
        id,
        {
          $set: {
            name: newFactory.name,
            length: newFactory.length,
            min: newFactory.min,
            max: newFactory.max,
            childNodes: newFactory.childNodes
          }
        },
        { new: true }
      );

      io.emit("edited_factory", factory);
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("delete_factory", async id => {
    try {
      await Factory.findByIdAndRemove(id);

      io.emit("deleted_factory", id);
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("disconnect", () => {
    io.emit("message", "user disconnected");
  });
});

// Static asset in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use("/factory/new", express.static("client/build"));
  app.use("/factories/edit/:_id", express.static("client/build"));
  app.use("/factories/delete/:_id", express.static("client/build"));
  app.use("/factories/:_id", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
