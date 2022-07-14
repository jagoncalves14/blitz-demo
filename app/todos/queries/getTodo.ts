import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTodo = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTodo), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const todo = await db.todo.findFirst({ where: { id } })

  if (!todo) throw new NotFoundError()

  return todo
})
