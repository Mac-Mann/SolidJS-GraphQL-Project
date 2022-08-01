import { PubSub } from "graphql-yoga";

export const pubsub = new PubSub();

let todos = [
    {
      id: "1",
      text: "GraphQL + Soild is Awesome!",
      done: false,
    },
  ];

const TODOS_CHANNEL = "TODOS_CHANNEL";

export const resolvers = {
    Query: {
      getTodos: () => {
        return todos;
      },
    },
    Mutation: {
      addTodo: (
        _: unknown,
        { text }: { text: string },
        { pubsub }: { pubsub: PubSub }
      ) => {
        const newTodo = {
          id: String(todos.length + 1),
          text,
          done: false,
        };
        todos.push(newTodo);
        pubsub.publish(TODOS_CHANNEL, { todos });
        return newTodo;
      },
      setDone: (
        _: unknown,
        { id, done }: { id: string; done: boolean },
        { pubsub }: { pubsub: PubSub }
      ) => {
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) {
          throw new Error("Todo not found");
        }
        todo.done = done;
        pubsub.publish(TODOS_CHANNEL, { todos });
        return todo;
      },
      deleteTodo: (
        _: unknown,
        { id }: { id: string },
        { pubsub }: { pubsub: PubSub }
      ) => {
        const todo = todos.find((todo) => todo.id === id)
        todos = todos.filter((todo) => todo.id !== id);
        pubsub.publish(TODOS_CHANNEL, { todos })
        return todo;
      },
    },
    Subscription: {
      todos: {
        subscribe: () => {
          const iterator = pubsub.asyncIterator(TODOS_CHANNEL);
          pubsub.publish(TODOS_CHANNEL, { todos });
          return iterator;
        },
      },
    },
  };