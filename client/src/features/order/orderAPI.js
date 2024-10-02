export function addOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API + "/orders", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API + "/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(page) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_API + "/orders?" + page)
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count")
    resolve({ data: {orders: data, totalOrders: +totalOrders} });
  });
}
