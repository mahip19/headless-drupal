import { redirect } from "react-router-dom";
import { deleteDestination } from "../destinations";

export async function action({ params }) {
  await deleteDestination(params.destinationID);
  return redirect("/");
}
