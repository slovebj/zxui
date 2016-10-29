<template>
  <div class="c-msg-box__wrapper">
    <transition name="msgbox-bounce">
      <div class="c-msg-box" v-show="value">
        <div class="c-msg-box__header" v-if="title !== ''">
          <div class="c-msg-box__title">{{ title }}</div>
          <i class="c-msg-box__close el-icon-close" @click="handleAction('cancel')" v-if="showClose"></i>
        </div>
        <div class="c-msg-box__content" v-if="message !== ''">
          <div class="c-msg-box__status" :class="[ typeClass ]"></div>
          <div class="c-msg-box__message" :style="{ 'margin-left': typeClass ? '50px' : '0' }"><p>{{ message }}</p></div>
          <div class="c-msg-box__input" v-show="showInput">
            <el-input v-model="inputValue" :placeholder="inputPlaceholder" ref="input"></el-input>
            <div class="c-msg-box__errormsg" :style="{ visibility: !!editorErrorMsg ? 'visible' : 'hidden' }">{{ editorErrorMsg }}</div>
          </div>
        </div>
        <div class="c-msg-box__btns">
          <el-button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click.native="handleAction('cancel')">{{ cancelButtonText }}</el-button>
          <el-button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click.native="handleAction('confirm')" type="primary">{{ confirmButtonText }}</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';
  let typeMap = {
    success: 'circle-check',
    info: 'information',
    warning: 'warning',
    error: 'circle-cross'
  };

  import Popup from 'vue-popup';
  import CInput from 'packages/input/index.js';

  export default {
    mixins: [ Popup ],

    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      }
    },

    components: {
      CInput
    },

    computed: {
      typeClass() {
        return this.type && typeMap[this.type] ? `el-icon-${ typeMap[this.type] }` : '';
      },

      confirmButtonClasses() {
        return `el-button el-button-primary ${ this.confirmButtonClass }`;
      },
      cancelButtonClasses() {
        return `el-button el-button-default ${ this.cancelButtonClass }`;
      }
    },

    methods: {
      doClose() {
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.value = false;
        callback(action);
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMsg = this.inputErrorMsg || '输入的数据不合法!';
            this.$refs.input.$el.querySelector('input').classList.add('invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMsg = this.inputErrorMsg || '输入的数据不合法!';
              this.$refs.input.$el.querySelector('input').classList.add('invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMsg = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMsg = '';
        this.$refs.input.$el.querySelector('input').classList.remove('invalid');
        return true;
      }
    },

    watch: {
      inputValue() {
        if (this.$type === 'prompt') {
          this.validate();
        }
      },

      value(val) {
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$refs.input && this.$refs.input.$el) {
              this.$refs.input.$el.querySelector('input').focus();
            }
          }, 500);
        }
      }
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMsg: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',

        editorErrorMsg: null,
        callback: null
      };
    }
  };
</script>
