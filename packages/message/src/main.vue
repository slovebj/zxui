<template>
  <transition name="c-message-fade">
    <div class="c-message" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer">
        <i class="iconfont" :class="iconClass"></i>
        <span >{{ message }}</span>
        <span class="c-message-closebtn" v-show="closeText!==''" @click="handleClose">{{closeText}}</span>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      },
      closeText: {
        type: String,
        default: '×'
      }
    },
    data() {
      return {
        visible: false,
        duration: 3000,
        onClose: null,
        closed: false,
        timer: null
      };
    },

    computed: {
      iconClass() {
        return this.type ? 'icon'+this.type : 'icon-message';
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