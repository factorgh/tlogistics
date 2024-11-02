export const crudService = (url) => ({
  create: (data) => ({
    url,
    method: "POST",
    body: data,
  }),
  update: ({ id, data }) => ({
    url: `${url}/single/${id}`,
    method: "PUT",
    body: data,
  }),
  delete: (id) => ({
    url: `${url}/single/${id}`,
    method: "DELETE",
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
