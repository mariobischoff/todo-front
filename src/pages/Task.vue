<template>
  <q-page class="q-pa-md">
    <q-list>
      <div v-for="(task, index) in tasks" :key="index">
        <q-slide-item right-color="red" @left="opt => moveDone(opt, index)" @right="opt => moveTrash(opt, index)">
          <template v-slot:left>
            <q-icon name="done" />
          </template>
          <template v-slot:right>
            <q-icon name="delete" />
          </template>
          <q-item :class="{ done: task.done }">
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
          <div class="text-h6">{{ headerDialog }}</div>
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
          <q-btn flat label="Commit" @click="saveTask" v-close-popup />
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
</style>

<script>
import _ from 'lodash'

export default {
  name: 'Task',
  data () {
    return {
      tasks: [],
      task: {
        title: '',
        description: '',
        date: '',
        done: false
      },
      taskID: null,
      dialogTask: false
    }
  },
  computed: {
    tasksDone () {
      return _.takeWhile(this.tasks, { done: true })
      // return this.tasks.filter((task) => {
      //   return task.done === true
      // })
    }
  },
  methods: {
    saveTask () {
      if (this.task.title === '') {
        return
      }
      if (this.taskID) {
        this.tasks[this.taskID] = this.task
        this.taskID = null
      } else {
        this.tasks.push(JSON.parse(JSON.stringify(this.task)))
      }
      // this.dialogTask = false
      this.$q.localStorage.set('tasks', this.tasks)
      this.task = {}
    },
    moveTrash ({ reset }, index) {
      // this.tasks.splice(index, 1)
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
    editTask (index) {
      this.dialogTask = true
      this.headerDialog = 'Edit your task'
      this.taskID = index
      this.task = this.$q.localStorage.getItem('tasks')[index]
    },
    onCloseDialog () {
      this.task = {}
      this.taskID = null
      this.headerDialog = 'Create your task'
    }
  },
  created () {
    this.loadTasks()
  }
}
</script>
