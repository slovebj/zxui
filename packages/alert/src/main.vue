<template>
  <transition name="c-alert-fade">
    <div class="c-alert" :class="[ typeClass ]" v-show="visible">
      <i class="iconfont" :class="[ iconClass, iconSize ]" v-if="showIcon"></i>
      <div class="c-alert-content">
        <span class="c-alert-title" :class="[ titleBold ]" v-if="title">{{ title }}</span>
        <p class="c-alert-description" v-if="description">{{ description }}</p>
        <span class="c-alert-closebtn" v-show="closeText!==''" @click="close()">{{closeText}}</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'icon-success',
    'info': 'icon-info',
    'warning': 'icon-warning',
    'error': 'icon-error'
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
        default: ''
      },
      closeText: {
        type: String,
        default: '×'
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
        return TYPE_CLASSES_MAP[this.type] || 'icon-message';
      },

      iconSize() {
        return this.description ? 'f5' : '';
      },

      titleBold() {
        return this.description ? 'bold' : '';
      }
    }
  };
</script>
