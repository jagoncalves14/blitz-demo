import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTodo = z.object({
  id: z.number(),
  name: z.string(),
  completed: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(UpdateTodo),
  resolver.authorize(),
  async ({ id, ...input }) => {
    const todo = await db.todo.update({ where: { id }, data: input })

    return todo
  }
)
