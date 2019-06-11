const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const connectDB = require("./config/db");

const Root = require("./models/Root");
const Factory = require("./models/Factory");
const NodeFactory = require("./factory/NodeFactory");

// connect to Database

connectDB();

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

io.on("connection", socket => {
  console.log(`New client connected: ${socket.id}`);

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
    console.log("============================");
    console.log(formValues);
    console.log("============================");
    const { name, length, min, max } = formValues;

    const _length = Number.parseInt(length, 10);
    const _min = Number.parseInt(min, 10);
    const _max = Number.parseInt(max, 10);

    const newFactory = NodeFactory(name, _length, _min, _max);
    console.log("New Factory", newFactory);
    console.log("============================");
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
      // const factory = await Factory.findById(id);

      console.log("new factory data", factory);
      console.log("============================");

      io.emit("edited_factory", factory);
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("delete_factory", async id => {
    try {
      // await Factory.findByIdAndRemove(id);
      // const root = await Root.find();

      console.log("id>>>", id);

      const root = await Root.updateOne(
        {},
        { $pull: { "factory.$.factories": { _id: id } } }
      );

      console.log("Roots nodes", root);
      // await root.save();

      io.emit("deleted_factory");
    } catch (err) {
      console.error(err.message);
    }
  });

  socket.on("delete_all_factories", async () => {});

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("message", "user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
