import _ from 'lodash'

export function GET_USER (state) {
  return state.user
}

export function GET_ALL_TASK (state) {
  return state.task
}

export function GET_TASK_DONE (state) {
  return _.filter(state.task, { 'status': 'done' })
}
