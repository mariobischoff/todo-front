<template>
  <section class="container">
    <div class="input">
      <q-input
        ref="input"
        autofocus
        v-model="task"
        label="type you task here!"
        @keyup.enter="saveTask()"
      />
    </div>
    <div class="list">
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          <q-checkbox v-model="task.done" />
          <span @click="setFocus(index)">{{ task.title }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Task',
  data () {
    return {
      tasks: [],
      task: '',
      taskID: null,
      edit: false,
      done: false
    }
  },
  methods: {
    saveTask () {
      if (this.task === '') {
        return
      }
      let done = false
      if (this.taskID) {
        done = this.tasks[this.taskID].done
        this.tasks[this.taskID].title = this.task
        this.taskID = null
      } else {
        const value = { title: this.task, done }
        this.tasks.push(value)
      }
      this.$q.localStorage.set('tasks', this.tasks)
      this.task = ''
    },
    loadTasks () {
      if (!this.$q.localStorage.getItem('tasks')) {
        return
      }
      this.tasks = this.$q.localStorage.getItem('tasks')
    },
    setFocus (index) {
      this.taskID = index
      this.task = this.tasks[index].title
      this.$refs.input.focus()
    },
    checkClicked () {
      console.log('kkkkkkkk')
    }
  },
  created () {
    this.loadTasks()
  },
  watch: {
    done: () => {
      console.log('aa')
      this.$q.localStorage.set('tasks', this.tasks)
    }
  }
}
</script>

<style>
  .container {
    padding: 10px
  }
  ul {
    list-style: none
  }
</style>
