export function addOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
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
    const response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(pagination) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?" + pagination)
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count")
    resolve({ data: {orders: data, totalOrders: +totalOrders} });
  });
}
