export function SET_TOKEN (state, payload) {
  state.token = payload
}

export function SET_TASK (state, payload) {
  state.task = []
  state.task = payload
}

export function DEL_TASK (state, payload) {
  console.log(payload)
  state.task = []
}

export function SET_USER (state, payload) {
  state.user = payload
}
