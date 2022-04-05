const categoriesSelector = {
  getAll: (state) => state.categories.entities,
  getOneById: (id) => (state) =>
    state.categories.entities.find((c) => c.id == id),
};
export default categoriesSelector;
