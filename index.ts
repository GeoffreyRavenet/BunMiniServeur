Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch(req: Request): Response {
    const url = new URL(req.url)

    if (url.pathname === "/ping") {
      return new Response("pong")
    }

    return new Response(`you requested url ${req.url} with pathname ${url.pathname}`)
  },
})
