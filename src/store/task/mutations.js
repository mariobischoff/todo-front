export function salvarUser (state, payload) {
  state.user = payload
}

export function saveTask (state, payload) {
  state.tasks.push(payload)
}
