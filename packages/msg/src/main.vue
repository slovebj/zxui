<template>
  <transition name="c-msg-fade">
    <div class="c-msg" :class="atTop" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer">
      <div class="c-msg-content" :class="type">
        <i class="iconfont f5" :class="iconClass"></i>
        <span >{{ msg }}</span>
        <span class="c-msg-closebtn" v-show="closeText!==''" @click="handleClose">{{closeText}}</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'c-msg',
    data() {
      return {
        visible: false,
        msg: '',
        type: '',
        top: '',
        duration: 3000,
        closed: false,
        closeText: '',
        timer: null,
        onClose: null
      };
    },

    computed: {
      iconClass() {
        return (this.type ? 'icon-' + this.type : 'icon-msg');
      },
      atTop() {
        return (this.top ? 'top' : 'bottom');
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