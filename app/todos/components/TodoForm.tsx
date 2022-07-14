import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { useField } from "react-final-form"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function TodoForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const InputCheckbox = () => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField("completed", {
      initialValue: Boolean(props?.initialValues?.completed),
      type: "checkbox",
      ...props["completed"],
    })

    return (
      <>
        <label htmlFor="completed">Completed:</label>
        <input id="completed" {...input} />
      </>
    )
  }

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <InputCheckbox />
      <br />
    </Form>
  )
}
