export const state = {
  book: {},
  books: [],
  isScan: false,
  isSearched: false,
  code: null
}

export const mutations = {
  SetBookInfo (state, payload) {
    state.book = payload
  },
  SetBooks (state, payload) {
    state.books = payload
  },
  SetIsScan (state, payload) {
    state.isScan = payload
  },
  SetIsSearched (state, payload) {
    state.isSearched = payload
  },
  SetCode (state, payload) {
    state.code = payload
  }
}
