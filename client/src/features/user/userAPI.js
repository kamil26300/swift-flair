export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + "/api/orders?user=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + "/api/users/" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + "/api/users/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
