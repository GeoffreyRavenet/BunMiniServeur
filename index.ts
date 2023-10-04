type Techno = {
  id: number
  name: string
}

const technos: Techno[] = [
  { id: 1, name: "node" },
  { id: 2, name: "bun" },
]

Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch(req: Request): Response {
    const url = new URL(req.url)

    if (url.pathname === "/ping") {
      return new Response("pong")
    }

    if (url.pathname === "/technos") {
      return new Response(JSON.stringify(technos, null, 2))
    }

    return new Response(`you requested url ${req.url} with pathname ${url.pathname}`)
  },
})
