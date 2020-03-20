export const state = {
  book: {},
  books: []
}

export const mutations = {
  SetBookInfo (state, { book }) {
    state.book = { book }
  },
  SetBooks (state, payload) {
    state.books = payload
  }
}
