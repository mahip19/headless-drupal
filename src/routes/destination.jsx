import { Form, useLoaderData } from "react-router-dom";
import { getDestination } from "../destinations";

export async function loader({ params }) {
  const destination = await getDestination(params.destinationID);
  return { destination };
}

export default function DestinationInfo() {
  const { destination } = useLoaderData();
  console.log(destination);
  return (
    <>
      <div
        id="contact"
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container" style={{ marginLeft: "10%" }}>
          <h1>{destination.attributes.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: destination.attributes.body.value,
            }}
          />
        </div>
        <div className="container" style={{ display: "flex" }}>
          <div className="container">
            <Form action="edit">
              <button className="btn btn-outline-primary" type="submit">
                Edit
              </button>
            </Form>{" "}
          </div>
          <br />
          <Form method="post" action="khaatma">
            <button className="btn btn-outline-danger" type="submit">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
