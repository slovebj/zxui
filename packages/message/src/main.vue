<template>
  <transition name="c-message-fade">
    <div class="c-message" :class="type" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer">
        <i class="iconfont f4" :class="iconClass"></i>
        <span >{{ message }}</span>
        <span class="c-message-closebtn" v-show="closeText!==''" @click="handleClose">{{closeText}}</span>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'c-message',
    data() {
      return {
        visible: false,
        message: '',
        type: '',
        duration: 3000,
        closed: false,
        closeText: '',
        timer: null,
        onClose: null
      };
    },

    computed: {
      iconClass() {
        return (this.type ? 'icon-' + this.type : 'icon-message');
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
      this.startTimer();
    }
  };
</script>