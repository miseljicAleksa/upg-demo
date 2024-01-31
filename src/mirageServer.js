import { createServer, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      todo: Model,
    },

    seeds(server) {
      server.create("user", { username: "admin", password: "reactwow" });
      server.create("todo", {
        title: "baci djubre",
        completed: false,
      });
      server.create("todo", {
        title: "operi auto",
        completed: true,
      });
    },

    routes() {
      this.namespace = "api";

      this.post("/auth", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ username, password });
        if (user) {
          const token = generateToken();
          return { token };
        } else {
          return { error: "Invalid username or password" };
        }
      });

      this.get("/todos", (schema) => {
        return schema.todos.all();
      });

      this.post("/todos", (schema, request) => {
        const todo = JSON.parse(request.requestBody);
        return schema.todos.create(todo);
      });

      this.patch("/todos/:id", (schema, request) => {
        const { id } = request.params;
        const updatedTodo = JSON.parse(request.requestBody);
        return schema.todos.find(id).update(updatedTodo);
      });

      this.delete("/todos/:id", (schema, request) => {
        const { id } = request.params;
        schema.todos.find(id).destroy();
      });
    },
  });

  return server;
}

function generateToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
