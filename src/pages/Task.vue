<template>
  <q-page class="q-pa-md">
    <q-tabs
      v-model="tab"
      class="text-grey"
      dense
      indicator-color="primary"
      align="justify"
    >
      <q-tab name="open" icon="list" label="Open" />
      <q-tab name="done" icon="done" label="Done" />
      <q-tab name="trash" icon="delete" label="Trash" />
    </q-tabs>

    <q-separator color="primary"/>

    <div class="text-center">
    <q-spinner
      color="primary"
      size="5em"
      v-if="loading"/>
    </div>

    <q-tab-panels
      v-if="!loading"
      v-model="tab"
      animated
    >
      <q-tab-panel name="open">
        <TodoList :tasks="getTask(tab)" @clickTask="clickTask"/>
      </q-tab-panel>
      <q-tab-panel name="done">
        <TodoList :tasks="getTask(tab)" @clickTask="clickTask"/>
      </q-tab-panel>
      <q-tab-panel name="trash">
        <TodoList :tasks="getTask(tab)" :showTrash="false" @clickTask="clickTask"/>
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
          <q-btn flat label="Commit" @click="addOrEdit(idTask)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab icon="add" color="primary" @click="dialogTask = true"/>
  </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
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
      idTask: null,
      loading: false,
      tab: 'open',
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
    ...mapActions(['task/getAll', 'task/add', 'task/edit']),
    _clearForm () {
      this.newTask = {
        title: '',
        description: '',
        doneAt: '',
        status: 'open'
      }
    },
    callTasks () {
      const URL = this.urlTask
      const ID = null
      const ACTION = 'get'
      this.loading = true
      let vm = this
      this['task/getAll']({ URL, ID, ACTION })
        .then(() => {
          vm.loading = false
        })
        .catch(() => {
          vm.loading = false
        })
    },
    getTask (filter) {
      return _.filter(this.tasks, { 'status': filter })
    },
    clickTask (id) {
      this.idTask = id
      let taskToEdit = JSON.parse(JSON.stringify(_.find(this.tasks, { '_id': id })))
      this.newTask.title = taskToEdit.title
      this.newTask.description = taskToEdit.description
      this.newTask.doneAt = taskToEdit.doneAt
      this.dialogTask = true
    },
    addOrEdit (id = null) {
      let URL = this.urlTask
      let ACTION = 'save'
      let ID = id
      let DATA = this.newTask
      let date = this.newTask.doneAt.split('/').join('-')
      this.newTask.doneAt = moment(date, 'DD-MM-YYYY').toString()
      if (id) {
        this['task/edit']({ DATA, URL, ID, ACTION })
          .then(() => {
            console.log('editou')
            this.idTask = null
            this._clearForm()
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this['task/add']({ DATA, URL, ID, ACTION })
          .then(() => {
            this._clearForm()
            console.log('adicionou')
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
      this._clearForm()
      this.idTask = null
    }
  }
}
</script>
