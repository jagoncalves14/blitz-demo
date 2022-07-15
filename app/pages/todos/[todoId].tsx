import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTodo from "app/todos/queries/getTodo"
import deleteTodo from "app/todos/mutations/deleteTodo"

export const Todo = () => {
  const router = useRouter()
  const todoId = useParam("todoId", "number")
  const [deleteTodoMutation] = useMutation(deleteTodo)
  const [todo] = useQuery(getTodo, { id: todoId })

  return (
    <>
      <Head>
        <title>Todo {todo.id}</title>
      </Head>

      <div className="container">
        <h1>Title: {todo.name}</h1>
        <p>Id: {todo.id}</p>
        <p>Completed: {todo.completed ? "✅" : "❌"}</p>

        <br />
        <pre>{JSON.stringify(todo, null, 2)}</pre>

        <div className="buttons">
          <Link href={Routes.EditTodoPage({ todoId: todo.id })}>
            <a className="button small">Edit</a>
          </Link>

          <button
            className="button small"
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteTodoMutation({ id: todo.id })
                router.push(Routes.Home())
              }
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

const ShowTodoPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.Home()}>
          <a>Back to Home</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Todo />
      </Suspense>
    </div>
  )
}

ShowTodoPage.authenticate = true
ShowTodoPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTodoPage
