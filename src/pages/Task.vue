<template>
  <q-page class="q-pa-md">
    <q-list>
      <div v-for="(task, index) in tasks" :key="index">
        <q-slide-item right-color="red" @left="opt => moveDone(opt, task)" @right="opt => moveOpen(opt, task)">
          <template v-slot:left>
            <q-icon name="done" />
          </template>
          <template v-slot:right>
            <q-icon name="close" />
          </template>
          <q-item clickable v-ripple :class="{ done: task.status == 'done', notDone: task.status == 'open' }">
            <q-item-section>
              <q-item-label>{{ task.title }}</q-item-label>
              <q-item-label caption lines="2">{{ task.description }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row">
                <div class="col-auto q-mr-sm">
                  <q-icon name="delete" size="25px" color="red" @click="removeTask(task._id)"/>
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
            v-model="newTask.title"
            label="type here!"
            @keyup.enter="saveTask()"
          />

          <q-input
            filled
            v-model="newTask.description"
            label="description"
          />

          <q-input filled v-model="newTask.doneAt" label="date of your task">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="newTask.doneAt" @input="() => $refs.qDateProxy.hide()" mask="DD/MM/YYYY"/>
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
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Task',
  data () {
    return {
      newTask: {
        title: '',
        description: '',
        doneAt: '',
        status: 'open'
      },
      dialogTask: false,
      urlTask: '/task'
    }
  },
  created () {
    this.callTasks()
  },
  computed: {
    ...mapState('task', ['tasks'])
  },
  methods: {
    ...mapActions(['task/getAll', 'task/add', 'task/remove']),
    callTasks () {
      const URL = this.urlTask
      const ID = null
      const ACTION = 'get'
      this['task/getAll']({ URL, ID, ACTION })
        .then(() => console.log('pegou as tarefas'))
        .catch(() => this.$q.notify({
          message: 'Deu alguma outra pane'
        }))
    },
    addTask () {
      let date = this.newTask.doneAt.split('/').join('-')
      this.newTask.doneAt = moment(date, 'DD-MM-YYYY').toString()
      let DATA = this.newTask
      let URL = this.urlTask
      let ID = null
      let ACTION = 'save'
      this['task/add']({ DATA, URL, ID, ACTION })
        .then(() => {
          this.newTask = {
            title: '',
            description: '',
            doneAt: '',
            status: 'open'
          }
          this.$q.notify({
            message: 'Task saved'
          })
        })
        .catch(() => console.log('save error'))
    },
    removeTask (id) {
      let DATA = null
      let URL = this.urlTask
      let ID = id
      let ACTION = 'delete'
      console.log(ID)
      this['task/remove']({ DATA, URL, ID, ACTION })
        .then(() => {
          this.$q.notify({
            message: 'Task removed'
          })
        })
        .catch((error) => console.log('error remove ', error))
    },
    moveFrom (task, from) {
      let ACTION = 'save'
      let ID = task._id
      let URL = this.urlTask
      switch (from) {
        case 'trash':
          task.status = 'trash'
          break
        case 'open':
          task.status = 'open'
          break
        case 'done':
          task.status = 'done'
          break
      }
      let DATA = task
      this['todo/saveTask']({ DATA, URL, ID, ACTION })
        .then(() => {
          this.$q.notify('move to ' + task.status)
        })
        .catch(() => console.log('erro ao mover para o lixo'))
    },
    moveOpen ({ reset }, task) {
      this.moveFrom(task, 'open')
      this.finalize(reset)
    },
    moveDone ({ reset }, task) {
      this.moveFrom(task, 'done')
      this.finalize(reset)
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 500)
    },
    onCloseDialog () {
      this.task = {}
      this.taskID = null
    }
  }
}
</script>
