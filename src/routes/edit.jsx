import { Form, redirect, useLoaderData } from "react-router-dom";
import { updateDestination } from "../destinations";

export async function action({ request, params }) {
  const formData = await request.formData();
  console.log("form data: ", request);
  const updates = Object.fromEntries(formData);
  console.log("updates , ", updates);
  await updateDestination(params.destinationID, updates);

  return redirect(`/destinations/${params.destinationID}`);
}

export default function EditDestination() {
  const { destination } = useLoaderData();
  console.log("Editing... ", destination);
  return (
    <>
      <h1>Edit {destination.attributes.title}</h1>
      <Form method="post" id="contact-form">
        <p>
          <span>Destination Title</span>
          <input
            type="text"
            placeholder="Title"
            name="destination_title"
            defaultValue={destination.attributes.title}
          />
        </p>
        <label htmlFor="">
          <span>Notes</span>
          <textarea
            name="destination_body"
            id=""
            cols="30"
            rows="6"
            defaultValue={destination.attributes.body.value}
          />
        </label>
        <p>
          <button type="submit">Edit</button>{" "}
          <button type="button">Cancel</button>
        </p>
      </Form>
    </>
  );
}
