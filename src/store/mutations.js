import * as types from './mutation-types'

export default {
  [types.UPDATE_FOO] (state, payload) {
    state.foo = payload
  },

  /**
   * Function that manages ignored URLs in application store
   * @param state - application store state.
   * @param payload - object that contains relevant url and boolean flag that points on whether
   * url should be added or removed
   */
  updateIgnoredList(state, payload) {
    if (payload.append && !state.ignored_urls.includes(payload.url)) {
      state.ignored_urls.push(payload.url);
    } else if (!payload.append) {
      const i = state.ignored_urls.findIndex(url => url === payload.url);
      if (i >= 0) {
        state.ignored_urls.splice(i,1);
      }
    }
    localStorage.setItem("ignored", JSON.stringify(state.ignored_urls));
  }
}
