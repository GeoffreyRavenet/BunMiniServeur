Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch(req: Request): Response {
    return new Response("Hello World!")
  },
})
