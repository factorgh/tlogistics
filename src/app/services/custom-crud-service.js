export const crudService = (url) => ({
  create: (data) => ({
    url,
    method: "POST",
    body: data,
  }),
  update: (data) => ({
    url,
    method: "PUT",
    body: data,
  }),
  delete: (data) => ({
    url,
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
