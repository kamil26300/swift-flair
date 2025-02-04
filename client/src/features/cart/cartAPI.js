export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + "/api/cart",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function removeFromCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + "/api/cart/" + id,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data: { id } });
  });
}

export function fetchItemByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + "/api/cart?user=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function clearCartOfUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await removeFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}

export function updateItem(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_API + `/api/cart/${update.id}`,
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
