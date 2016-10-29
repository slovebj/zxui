<template>
  <div
    class="c-tooltip"
    @mouseenter="handleShowPopper"
    @mouseleave="handleClosePopper">
    <div class="c-tooltip-rel" ref="reference">
      <slot></slot>
    </div>

    <transition :name="transition" @after-leave="doDestroy">
      <div
        class="c-tooltip-popper"
        :class="color"
        ref="popper"
        v-show="!disabled && showPopper">
        <slot name="content"><div v-text="content"></div></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from '../../../src/utils/vue-popper';
export default {
  name: 'c-tooltip',
  mixins: [Popper],
  props: {
    openDelay: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    manual: Boolean,
    content: String,
    color: String,
    visibleArrow: {
      default: true
    },
    transition: {
      type: String,
      default: 'fade-in-linear'
    },
    options: {
      default() {
        return {
          boundariesPadding: 10,
          gpuAcceleration: false
        };
      }
    }
  },

  methods: {
    handleShowPopper() {
      if (this.manual) return;
      this.timeout = setTimeout(() => {
        this.showPopper = true;
      }, this.openDelay);
    },

    handleClosePopper() {
      if (this.manual) return;
      clearTimeout(this.timeout);
      this.showPopper = false;
    }
  }
};
</script>
