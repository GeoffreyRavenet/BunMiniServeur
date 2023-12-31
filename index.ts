import { promises } from "dns"

type Techno = {
  id: number
  name: string
  type: "Front" | "Back" | "Full-Stack"
}

const technos: Techno[] = [
  { id: 1, name: "Node", type: "Back" },
  { id: 2, name: "Bun", type: "Back" },
  { id: 3, name: "React", type: "Front" },
]

Bun.serve({
  hostname: "localhost",
  port: 3000,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url)

    if (url.pathname === "/ping") {
      return new Response("pong")
    }

    if (url.pathname === "/technos" && req.method === "GET") {
      const filterBy = url.searchParams.get("type") || "all"
      return new Response(JSON.stringify(getTechnos(filterBy), null, 2))
    }

    if (url.pathname === "/technos" && req.method === "POST") {
      const { name, type } = await req.json()
      const id = technos.length + 1
      addTechno({
        id,
        name,
        type,
      })
      return new Response(`Techno created`)
    }

    return new Response(`you requested url ${req.url} with pathname ${url.pathname}`)
  },
})

function getTechnos(filter: string): Techno[] {
  if (filter === "front" || filter === "back") {
    return technos.filter((t) => t.type.toLocaleLowerCase() === filter.toLocaleLowerCase())
  }
  return technos
}

function addTechno(techno: Techno) {
  technos.push(techno)
}
