<template>
  <q-page class="q-pa-md">
    <q-tabs
      v-model="tab"
      class="text-grey"
      dense
      indicator-color="primary"
      align="justify"
    >
      <q-tab name="allTask" icon="list" label="Open" />
      <q-tab name="done" icon="done" label="Done" />
      <q-tab name="trash" icon="delete" label="Trash" />
    </q-tabs>

    <q-separator color="primary"/>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="allTask">
        <TodoList :tasks="taskOpen"/>
      </q-tab-panel>

      <q-tab-panel name="done">
        <TodoList :tasks="taskDone"/>
      </q-tab-panel>

      <q-tab-panel name="trash">
        <TodoList :tasks="taskTrash"/>
      </q-tab-panel>
    </q-tab-panels>

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

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import moment from 'moment'
import TodoList from './../components/TodoList'

export default {
  name: 'Task',
  components: {
    TodoList
  },
  data () {
    return {
      newTask: {
        title: '',
        description: '',
        doneAt: '',
        status: 'open'
      },
      tab: 'allTask',
      dialogTask: false,
      urlTask: '/task'
    }
  },
  created () {
    this.callTasks()
  },
  computed: {
    ...mapState('task', ['tasks']),
    ...mapGetters({
      taskOpen: 'task/taskOpen',
      taskDone: 'task/taskDone',
      taskTrash: 'task/taskTrash'
    })
  },
  methods: {
    ...mapActions(['task/getAll', 'task/add']),
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
    onCloseDialog () {
      this.task = {}
      this.taskID = null
    }
  }
}
</script>
