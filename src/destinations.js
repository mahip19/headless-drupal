import { redirect } from "react-router-dom";

//  GET request for fetching node--destination data
export async function getDestinations(query) {
  try {
    const rawDestinations = await fetch(
      "http://localhost/travel_destinations/web/jsonapi/node/destination/",
      {
        mode: "cors",
        method: "GET",
      }
    );
    const destinations = await rawDestinations.json();
    return { ...destinations };
  } catch (err) {
    console.log("fetchDestinaionList error", err);
  }
}

// POST request for posting new node--destination
export async function createDestination(data) {
  const title = data.destination_title;
  const body = data.destination_body;

  const content_data = {
    data: {
      type: "node--destination",
      attributes: {
        title: title,
        body: {
          value: body,
          format: "plain_text",
        },
      },
    },
  };
  const res = await fetch(
    "http://localhost/travel_destinations/web/jsonapi/node/destination",
    {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: "Basic cmFwdG9yOmFkbWlu",
      },
      body: JSON.stringify(content_data),
    }
  );
  if (res.status == 204) alert("new destination is made!");
}

// to get destination with given ID
export async function getDestination(id) {
  let destinations = await getDestinations();
  //   console.log("from getDestination(): ", destinations);
  let destination = destinations.data.find(
    (destination) => destination.id == id
  );
  if (destination) return destination;
  else return null;
}

// DELETE request for given node--destination ID
export async function deleteDestination(id) {
  const deleteNode = await fetch(
    `http://localhost/travel_destinations/web/jsonapi/node/destination/${id}`,
    {
      mode: "cors",
      method: "DELETE",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: "Basic cmFwdG9yOmFkbWlu",
      },
    }
  );

  if (deleteNode) return redirect("/");
  else return redirect(`/destinations/${id}`);
}

// POST request for given node--destination ID
export async function updateDestination(id, updates) {
  const title = updates.destination_title;
  const body = updates.destination_body;
  const newData = {
    data: {
      type: "node--destination",
      id: `${id}`,
      attributes: {
        title: title,
        body: {
          value: body,
          format: "plain_text",
        },
      },
    },
  };
  console.log("under edit action: ", title, "; ", body);
  const updateNode = await fetch(
    `http://localhost/travel_destinations/web/jsonapi/node/destination/${id}`,
    {
      mode: "cors",
      method: "PATCH",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: "Basic cmFwdG9yOmFkbWlu",
      },
      body: JSON.stringify(newData),
    }
  );
}
