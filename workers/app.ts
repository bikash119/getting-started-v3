import { createRequestHandler } from "react-router";
import { Hono } from 'hono';
import { logger } from 'hono/logger';

const app = new Hono()
app.use(logger())
declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

app.use("*", async (c,next) => await next())

app.get("/api", async (c) => c.json({message: "hello world"}))

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);
app.get("*", async (c) => {
  return requestHandler(c.req.raw, {
    cloudflare: { env: c.env as Env, ctx: c.executionCtx as ExecutionContext },
  });
});



export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>;
