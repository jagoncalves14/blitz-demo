import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTodo from "app/todos/mutations/createTodo"
import { TodoForm, FORM_ERROR } from "app/todos/components/TodoForm"

const NewTodoPage: BlitzPage = () => {
  const router = useRouter()
  const [createTodoMutation] = useMutation(createTodo)

  return (
    <div className="container">
      <h1>Create New Todo</h1>

      <TodoForm
        submitText="Create Todo"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTodo}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const todo = await createTodoMutation(values)
            router.push(Routes.ShowTodoPage({ todoId: todo.id }))
          } catch (error: any) {
            const fielsWithError = JSON.parse(error.message)[0].path
            return {
              [FORM_ERROR]: `Invalid field: ${fielsWithError.join(", ")}`,
            }
          }
        }}
      />

      <p style={{ marginTop: "100px" }}>
        <Link href={Routes.Home()}>
          <a>Back to Home</a>
        </Link>
      </p>
    </div>
  )
}

NewTodoPage.authenticate = true
NewTodoPage.getLayout = (page) => <Layout title={"Create New Todo"}>{page}</Layout>

export default NewTodoPage
