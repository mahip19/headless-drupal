import {
  Form,
  useLoaderData,
  Link,
  NavLink,
  Outlet,
  useNavigation,
  useNavigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import { getDestinations, createDestination } from "../destinations";
import { AddDestinationForm } from "./AddDestinationForm";

export async function action() {
  // const contact = await createContact();
  // return { contacts };
  return redirect(`/add_destination`);
}

export async function loader() {
  //   return fetchFakeAlbums();
  const destinations = await getDestinations();
  return { ...destinations };
}

export default function Root() {
  const navigate = useNavigate();
  const rawdestinations = useLoaderData();
  const destinations = rawdestinations.data;
  console.log("destination data: ", destinations);
  return (
    <>
      <div id="sidebar">
        <h1>
          <NavLink
            to={`/`}
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : ""
            }
          >
            Destinations
          </NavLink>
        </h1>
        <div>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {destinations.length <= 0 ? (
            <p>No destinations to show</p>
          ) : (
            <ul>
              {destinations.map((destination) => (
                <li key={destination.id}>
                  <NavLink
                    to={`destinations/${destination.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {destination.attributes.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigate.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
