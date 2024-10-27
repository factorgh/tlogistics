export const crudService = (url) => ({
  create: (data) => ({
    url,
    method: "POST",
    body: data,
  }),
  update: ({ id, data }) => ({
    url: `${url}/single/${id}`,
    method: "DELETE",
    body: data,
  }),
  delete: ({ id, data }) => ({
    url: `${url}/single/${id}`,
    method: "DELETE",
    body: data,
  }),
  getAll: () => ({
    url,
    method: "GET",
  }),
  getSingle: (id) => ({
    url: `${url}/single/${id}`,
    method: "GET",
  }),
});
