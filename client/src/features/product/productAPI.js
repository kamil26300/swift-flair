export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function createNewProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products/${product.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

const generateQuery = (query) => {
  let queryStr = "";
  for (let key in query) {
    for (let option in query[key]) {
      if (query[key][option]) {
        queryStr += `${key}=${option}&`;
      }
    }
  }
  queryStr = queryStr.slice(0, -1);
  return queryStr;
};

const getFilter = (brands, categories) => {
  let filters = [];
  filters.push({ id: "brand", name: "Brand", options: brands });
  filters.push({ id: "category", name: "Category", options: categories });
  return filters;
};

export function fetchAllFilter() {
  return new Promise(async (resolve) => {
    const brandJson = await fetch(`http://localhost:8080/brands`);
    const categoryJson = await fetch(`http://localhost:8080/categories`);
    const brands = await brandJson.json();
    const categories = await categoryJson.json();
    const filters = getFilter(brands, categories);
    resolve({ data: filters });
  });
}

export function fetchProductByQuery(query) {
  const queryStr = generateQuery(query);
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products?${queryStr}`);
    const data = await response.json();

    const totalItems = response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems } });
  });
}
