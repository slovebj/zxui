'use strict';

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[Markdown]文件名必填.相对/build/bin');
  process.exit(1);
}
if (!process.argv[3]) {
  console.error('输出[Html]文件名必填.相对/build/bin');
  process.exit(1);
}

const path = require('path');
const fs = require('fs');
const mdname = process.argv[2];
const htmlname = process.argv[3];
const striptags = require('../../build/strip-tags.js');
const hljs = require('../../highlight');
const md = require('markdown-it/dist/markdown-it.min.js')({
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
}).use(require('markdown-it-emoji/dist/markdown-it-emoji-light.min.js')).use(require('markdown-it-container/dist/markdown-it-container.min.js'), 'demo', {
      validate: function(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },

      render: function(tokens, idx) {
        var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          var description = (m && m.length > 1) ? m[1] : '';
          var html = convert(striptags(tokens[idx + 1].content, 'script'));
          var descriptionHTML = description
            ? '<div class="description">' + md.render(description) + '</div>'
            : '';
          return `<demo-block class="demo-box">
                    <div class="source">${html}</div>
                    <div class="meta">
                      ${descriptionHTML}
                      <div class="highlight">`;
        }
        return '</div></div></demo-block>\n';
      }
    });

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

var mdContent = fs.readFile(path.join(__dirname,mdname),{encoding:'utf8',flag:'r'},function(err,data){
    if (err) {
  console.error(`${mdname} 不存在.`);
  process.exit(1);
}
var htmlContent =md.render(data);
fs.writeFile(path.join(__dirname, htmlname),htmlContent,function(err){
    if(err)
    console.log(err)
});
  });




console.log('Markdown转Html完成!');
