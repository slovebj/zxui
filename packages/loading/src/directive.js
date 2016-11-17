import Vue from 'vue';
let Spinner = Vue.extend(require('./spinner.vue'));

exports.install = Vue => {
  let toggleLoading = (el, binding) => {

    if (binding.value) {
      Vue.nextTick(() => {
        if (binding.value !== true) {
          el.parent = document.getElementById(binding.value);
          el.originalOverflow = el.parent.style.overflow;
          insertDom(el.parent, el, binding);
        } else {
          el.originalOverflow = el.style.overflow;
          insertDom(el, el, binding);
        }
      });
    } else {
      if (el.domVisible) {
        el.mask.style.display = 'none';
        el.spinner.style.display = 'none';
        el.domVisible = false;
        if (el.parent) {
          el.parent.style.overflow = el.originalOverflow;
        } else {
          el.style.overflow = el.originalOverflow;
        }
      }
    }
  };
  let insertDom = (parent, directive, binding) => {
    if (!directive.domVisible) {
      if (binding.modifiers.lock) {
        parent.style.overflow = 'hidden';
      }

      directive.mask.style.display = 'block';
      directive.spinner.style.display = 'inline-block';
      directive.domVisible = true;

      parent.appendChild(directive.mask);
      directive.mask.appendChild(directive.spinner);
      directive.domInserted = true;
    }
  };

  Vue.directive('loading', {
    bind: function(el, binding) {
      el.mask = document.createElement('div');
      el.mask.className = 'c-loading-mask';

      let spinner = new Spinner({
        data: {
          text: el.getAttribute('data-loading-text')
        }
      });
      spinner.$mount(el.mask);
      el.spinner = spinner.$el;
      toggleLoading(el, binding);
    },

    update: function(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding);
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        if (binding.value && binding.value !== true) {
          document.getElementById(binding.value).removeChild(el.mask);
          el.mask.removeChild(el.spinner);
        } else {
          el.mask &&
          el.mask.parentNode &&
          el.mask.parentNode.removeChild(el.mask);
          el.spinner &&
          el.spinner.parentNode &&
          el.spinner.parentNode.removeChild(el.spinner);
        }
      }
    }
  });
};
