import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { TodosList } from "./todos"

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <Suspense fallback="Loading...">
          <Link href={Routes.NewTodoPage()}>
            <a className="button small">
              <strong>Add a new Todo</strong>
            </a>
          </Link>
          <hr style={{ width: "100%", opacity: 0.5, margin: "30px 0 20px" }} />
          <TodosList />
        </Suspense>
      </main>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
