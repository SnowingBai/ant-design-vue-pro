import {check} from '../utils/auth'

function install(Vue, options = {}) {
  Vue.directive(options.name || 'auth', {
    inserted(el, binding) {
      if(!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el)
        // 缺点：不够灵活，不适用于频繁切换状态，因为dom已被移除，无法再加回
      }
    }
  })
}

export default { install }