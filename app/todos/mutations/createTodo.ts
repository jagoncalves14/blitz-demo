import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTodo = z.object({
  name: z.string(),
  completed: z.boolean(),
})

export default resolver.pipe(resolver.zod(CreateTodo), resolver.authorize(), async (input, ctx) => {
  const todo = await db.todo.create({ data: { ...input, authorId: ctx.session.userId } })

  return todo
})
