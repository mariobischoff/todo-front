<template>
  <q-list>
    <div v-for="(task, index) in tasks" :key="index">
      <q-slide-item right-color="red" @left="opt => moveDone(opt, task._id)" @right="opt => moveOpen(opt, task._id)">
        <template v-slot:left>
          <q-icon name="done" />
        </template>
        <template v-slot:right>
          <q-icon name="close" />
        </template>
        <q-item clickable v-ripple @click="clickTask(task._id)">
          <q-item-section>
            <q-item-label>{{ task.title }}</q-item-label>
            <q-item-label caption lines="2">{{ task.description }}</q-item-label>
          </q-item-section>

          <q-item-section v-if="showTrash" side>
            <div class="row">
              <div class="col-auto q-mr-sm">
                <q-icon name="delete" size="25px" color="red" @click.stop="moveFrom(task._id, 'trash')"/>
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    tasks: {
      type: Array
    },
    showTrash: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      urlTask: '/task'
    }
  },
  methods: {
    ...mapActions(['task/remove', 'task/edit']),
    clickTask (id) {
      this.$emit('clickTask', id)
    },
    moveFrom (id, from) {
      let ACTION = 'save'
      let ID = id
      let URL = this.urlTask
      let status = null
      switch (from) {
        case 'trash':
          status = 'trash'
          break
        case 'open':
          status = 'open'
          break
        case 'done':
          status = 'done'
          break
      }
      let DATA = { status: status }
      this['task/edit']({ DATA, URL, ID, ACTION })
        .then(() => {
          this.$q.notify('move to ' + status)
        })
        .catch(() => console.log('erro ao mover para o lixo'))
    },
    moveOpen ({ reset }, id) {
      this.moveFrom(id, 'open')
      this.finalize(reset)
    },
    moveDone ({ reset }, id) {
      this.moveFrom(id, 'done')
      this.finalize(reset)
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 500)
    }
  }
}
</script>
