const hljs = require('highlight.js');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
}).use(require('markdown-it-emoji')).use(require('markdown-it-container'), 'demo', {
      validate: function(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },

      render: function(tokens, idx) {
        var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          var description = (m && m.length > 1) ? m[1] : '';
          var html = convert(tokens[idx + 1].content);
          var descriptionHTML = description
            ? '<div class="description">' + md.render(description) + '</div>'
            : '';
          return `<demo-block class="demo-box">
                    <div class="source">${html}</div>
                    <div class="meta">
                      ${descriptionHTML}
                      <pre><code  class="hljs">`;
        }
        return '</code></pre></div></demo-block>\n';
      }
    });

function convert(str) {
  str = str.replace(/<script[^>]*>(\s*.*)*<\/script>/gi,'');
	str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

const createID = () => {
	let t = ''
  for(let i = 0; i < 15; i++) { 
      t += Math.floor(Math.random() * 10) 
  }
  return t
}

const saveID = (state) => {
	let idArr = []
	for (let i = 0, len = state.articleList.length; i < len; i++) {
		idArr.push(state.articleList[i].id)
		localStorage.setItem('idArr', idArr.join(','))
	}
}

export default new Vuex.Store({
	state: {
		showMenu: true,
		articleList: [
			{
				id: createID(),
				content: 'Untitled\n---\n',
				current: true
			}
		]
	},
	mutations: {
		SHOW_MENU (state) {
			state.showMenu = state.showMenu === false ? true : false
		},
		TEXT_INPUT (state, txt) {
			for (let i = 0, len = state.articleList.length; i < len; i++) {
				if (state.articleList[i].current) {
					state.articleList[i].content = txt
				}
			}
		},
		SAVE_TO_CACHE (state) {
			for (let i = 0, len = state.articleList.length; i < len; i++) {
				if (state.articleList[i].current) {
					localStorage.setItem(state.articleList[i].id, state.articleList[i].content)
					saveID(state)
				}
			}
		},
		READ_FROM_CACHE (state) {
			for (let i = 0, len = state.articleList.length; i < len; i++) {
				if (state.articleList[i].current) {
					state.articleList[i].content = localStorage.getItem(state.articleList[i].id)
				}
			}
		},
		SELECT_THIS (state, index) {
			for (let i = 0, len = state.articleList.length; i < len; i++) {
				state.articleList[i].current = false
			}
			state.articleList[index].current = true
		},
		NEW_ARTICLE (state) {
			for (let i = 0, len = state.articleList.length; i < len; i++) {
				state.articleList[i].current = false
			}
			
			let newOne = {
				id: createID(),
				content: 'Untitled\n---',
				current: true
			}

			state.articleList.push(newOne)
		},
		DELETE_THIS (state, index) {
			if (state.articleList.length > 1) {
				let idArr = localStorage.getItem('idArr').split(',')
				let loc = idArr.indexOf(state.articleList[index].id)
				idArr.splice(loc, 1)
				localStorage.setItem('idArr', idArr)

				localStorage.removeItem(state.articleList[index].id)
				state.articleList.splice(index, 1)

				for (let i = 0, len = state.articleList.length; i < len; i++) {
					state.articleList[i].current = false
				}
				state.articleList[0].current = true
			}
		},
		READ_LIST_FROM_LOCAL (state) {
			if (localStorage.getItem('idArr')) {
				state.articleList = null
				let idArr = localStorage.getItem('idArr').split(',')
				let articleArr = []
				for (let i = 0, len = idArr.length; i < len; i++) {
					let articleObj = {
						id: '',
						content: '',
						current: false
					}
					articleObj.id = idArr[i]
					articleObj.content = localStorage.getItem(idArr[i])
					articleArr.push(articleObj)
				}
				state.articleList = articleArr
				state.articleList[0].current = true
			}
		}
	},
	actions: {
		showMenu ({ commit }) {
			commit('SHOW_MENU')
		},
		textInput ({ commit }, txt) {
			commit('TEXT_INPUT', txt)
		},
		selectThis ({ commit }, index) {
			commit('SELECT_THIS', index)
		},
		newArticle ({ commit }) {
			commit('NEW_ARTICLE')
			commit('SAVE_TO_CACHE')
		},
		deleteThis ({ commit }, index) {
			commit('DELETE_THIS', index)
		},
		saveToCache ({ commit }) {
			commit('SAVE_TO_CACHE')
		},
		readFromCache ({ commit }) {
			commit('READ_FROM_CACHE')
		},
		loadCache ({ commit }) {
			commit('READ_LIST_FROM_LOCAL')
		}
	},
	getters: {
		articleRaw: state => {
			let content = ''
			for (let i = 0, len = state.articleList.length; i < len; i++) {
				if (state.articleList[i].current) {
					content = state.articleList[i].content
				}
			}
			return content
		},
		articleMd: (state, getters) => {
			return md.render(getters.articleRaw)
		},
		articleList: state => {
			return state.articleList
		}
	}
})