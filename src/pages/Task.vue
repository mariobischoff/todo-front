<template>
  <q-page class="q-pa-md">
    <q-btn flat @click="getTasks">Pegar Tarefas</q-btn>
    <q-list>
      <div v-for="(task, index) in tasks" :key="index">
        <q-slide-item right-color="red" @left="opt => moveDone(opt, index)" @right="opt => moveTrash(opt, index)">
          <template v-slot:left>
            <q-icon name="done" />
          </template>
          <template v-slot:right>
            <q-icon name="delete" />
          </template>
          <q-item clickable v-ripple :class="{ done: task.done, notDone: !task.done }">
            <q-item-section>
              <q-item-label>{{ task.title }}</q-item-label>
              <q-item-label caption lines="2">{{ task.description }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row">
                <div class="col-auto q-mr-sm">
                  <q-icon name="today" size="20px"/>
                </div>
                <div class="col self-center">
                  <q-item-label caption>{{ task.date }}</q-item-label>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-slide-item>
        <q-separator spaced inset />
      </div>
    </q-list>

    <q-dialog v-model="dialogTask" persistent q-pb-xl>
      <q-card style="min-width: 320px">
        <q-card-section>
          <div class="text-h6">set up a Task</div>
        </q-card-section>

        <q-card-section class="q-gutter-lg">
          <q-input
            filled
            ref="input"
            autofocus
            v-model="task.title"
            label="type here!"
            @keyup.enter="saveTask()"
          />

          <q-input
            filled
            v-model="task.description"
            label="description"
          />

          <q-input filled v-model="task.date" label="date of your task">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="task.date" @input="() => $refs.qDateProxy.hide()" mask="DD/MM/YYYY"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="onCloseDialog" v-close-popup />
          <q-btn flat label="Commit" @click="addTask" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="primary" @click="dialogTask = true"/>
  </q-page-sticky>
  </q-page>
</template>

<style lang="stylus" scoped>
  .done
    background $green-1
  .notDone
    background $red-1
</style>

<script>
// import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'Task',
  data () {
    return {
      task: {
        title: '',
        description: '',
        date: '',
        done: false
      },
      tasks: null,
      dialogTask: false
    }
  },
  computed: {
    testeVuex () {
      return this.$store.getters['tasks/getTask']
    }
  },
  methods: {
    getTasks () {
      axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/todos'
      }).then((response) => {
        this.tasks = response.data
      })
    },
    addTask () {
      this.$store.commit('tasks/saveTask', JSON.parse(JSON.stringify(this.task)))
      this.task = {}
    },
    moveTrash ({ reset }, index) {
      this.tasks[index].done = false
      this.$q.notify('Task Open')
      this.$q.localStorage.set('tasks', this.tasks)
      this.finalize(reset)
    },
    moveDone ({ reset }, index) {
      this.$q.notify('Task Done')
      this.tasks[index].done = true
      this.$q.localStorage.set('tasks', this.tasks)
      this.finalize(reset)
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 500)
    },
    loadTasks () {
      if (!this.$q.localStorage.getItem('tasks')) {
        return
      }
      this.tasks = this.$q.localStorage.getItem('tasks')
    },
    onCloseDialog () {
      this.task = {}
      this.taskID = null
    }
  }
}
</script>
