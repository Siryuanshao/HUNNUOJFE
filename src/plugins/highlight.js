import hljs from 'highlight.js/lib/highlight'
import cpp from 'highlight.js/lib/languages/cpp'
import java from 'highlight.js/lib/languages/java'
import 'highlight.js/styles/github-gist.css'

hljs.registerLanguage('C', cpp)
hljs.registerLanguage('C++', cpp)
hljs.registerLanguage('Java', java)

export default {
  install (Vue) {
    Vue.directive('highlight', {
      deep: true,
      bind: function (el, binding) {
        // on first bind, highlight all targets
        Array.from(el.querySelectorAll('code')).forEach((target) => {
          // if a value is directly assigned to the directive, use this
          // instead of the element content.
          if (binding.value) {
            target.textContent = binding.value
          }
          hljs.highlightBlock(target)
        })
      },
      componentUpdated: function (el, binding) {
        // after an update, re-fill the content and then highlight
        Array.from(el.querySelectorAll('code')).forEach((target) => {
          if (binding.value) {
            target.textContent = binding.value
          }
          hljs.highlightBlock(target)
        })
      }
    })
  }
}
