<template>
  <transition name="c-alert-fade">
    <div class="c-alert" :class="[ typeClass ]" v-show="visible">
      <i class="c-alert-icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="c-alert-content">
        <span class="c-alert-title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
        <p class="c-alert-description" v-if="description">{{ description }}</p>
        <i class="c-alert-closebtn" :class="{ 'is-customed': closeText !== '', 'c-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'icon-circle-check',
    'warning': 'icon-warning',
    'error': 'icon-circle-cross'
  };
  export default {
    name: 'c-alert',

    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return this.type;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'info';
      },

      isBigIcon() {
        return this.description ? 'f2' : '';
      },

      isBoldTitle() {
        return this.description ? 'bold' : '';
      }
    }
  };
</script>
