import { Form, redirect } from "react-router-dom";
import { createDestination } from "../destinations";

export async function action({ request }) {
  const data = await request.formData();
  //   console.log(data);
  const formData = Object.fromEntries(data);
  const make = await createDestination(formData);
  console.log(make);
  return redirect("/");
}

export default function AddDestinationForm() {
  return (
    <>
      <h1>Add a new destination</h1>
      <div>
        <Form method="post" id="contact-form">
          <p>
            <span>Destination Title</span>
            <input type="text" placeholder="Title" name="destination_title" />
          </p>
          <label htmlFor="">
            <span>Notes</span>
            <textarea name="destination_body" id="" cols="30" rows="6" />
          </label>
          <p>
            <button type="submit">Create</button>{" "}
            <button type="button">Cancel</button>
          </p>
        </Form>
      </div>
    </>
  );
}
