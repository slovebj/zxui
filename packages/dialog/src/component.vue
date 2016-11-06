<template>
  <transition name="dialog-fade">
    <div class="c-dialog-wrapper" :style="widthStyle" v-show="value" @click.self="handleWrapperClick">
      <div
        class="c-dialog"
        :style="heightStyle"
        ref="dialog">
        <div class="c-msgbox-title" :class="titleClass" v-if="title !== ''">
          {{ title }}
          <i class="iconfont icon-close" @click="close()" v-if="showClose"></i>
          <i class="iconfont" :class="fullClass" @click="fullScreen()" v-if="resize"></i>
        </div>
        <div class="c-dialog-body" v-if="rendered"><slot></slot></div>
        <div class="c-dialog-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from 'vue-popup';

  export default {
    name: 'c-dialog',

    mixins: [Popup],

    props: {
      title: {
        type: String,
        default: ''
      },

      titleClass: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      modalClose: {
        type: Boolean,
        default: true
      },

      escClose: {
        type: Boolean,
        default: true
      },

      width: {
        type: String,
        default: '20%'
      },

      height: {
        type: String,
        default: ''
      },

      full: {
        type: Boolean,
        default: false
      },

      resize: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      }
    },

    watch: {
      value(val) {
        if (val) {
          this.$emit('open');
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
        } else {
          this.$emit('close');
        }
      }
    },

    computed: {
      widthStyle() {
        return this.full ? { 'width': '100%'} : (this.width ? { 'width': this.width } : '');
      },
      heightStyle() {
        return this.full ? { 'height': '100%'} : (this.height ? { 'height': this.height } : '');
      },
      fullClass() {
        return this.full ? 'icon-exitfull' : 'icon-full';
      }
    },

    methods: {
      handleWrapperClick() {
        if (this.modalClose) {
          this.$emit('input', false);
        }
      },

      fullScreen() {
        this.full = !this.full;
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.open();
      }
    }
  };
</script>
