<template>
  <transition name="dialog-fade">
    <div class="c-dialog-wrapper" v-show="value" @click.self="handleWrapperClick">
      <div
        class="c-dialog"
        :class="[sizeClass, customClass]"
        ref="dialog"
        :style="style">
        <div class="c-msgbox-title" :class="titleClass" v-if="title !== ''">
          {{ title }}
          <i class="c-msgbox-close iconfont icon-close" @click="close()" v-if="showClose"></i>
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

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      size: {
        type: String,
        default: 'small'
      },

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15%'
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
      sizeClass() {
        return `c-dialog-${ this.size }`;
      },
      style() {
        return this.size === 'full' ? {} : { 'margin-bottom': '50px', 'top': this.top };
      }
    },

    methods: {
      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.$emit('input', false);
        }
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
