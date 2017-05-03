<template>
  <transition name="c-notification-fade">
    <div class="c-notification" :class="type" v-show="visible" :style="{ top: top ? top + 'px' : 'auto' }" @mouseenter="clearTimer()" @mouseleave="startTimer()">
      <i class="iconfont f6" :class="iconClass" v-if="type"></i>
      <div class="c-notification-group" :style="{ 'margin-left': iconClass ? '60px' : '0' }">
        <span>{{ title }}</span>
        <p>{{ msg }}</p>
        <span class="c-notification-closeBtn" @click="handleClose()">×</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'c-notification',
    data() {
      return {
        visible: false,
        title: '',
        msg: '',
        duration: 4500,
        type: '',
        onClose: null,
        closed: false,
        top: null,
        timer: null
      };
    },

    computed: {
      iconClass() {
        return (this.type ? 'icon-' + this.type : '');
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.visible = false;
          this.$el.addEventListener('transitionend', () => {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
          });
        }
      }
    },

    methods: {
      handleClose() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose();
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.handleClose();
            }
          }, this.duration);
        }
      }
    },

    mounted() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.handleClose();
          }
        }, this.duration);
      }
    }
  };
</script>
