'use strict';

console.log();
process.on('exit', () => {
    console.log();
});

const path = require('path');
const fs = require('fs');
const outPath = path.resolve(__dirname, './');
const striptags = require('../../build/strip-tags.js');
const hljs = require('highlight.js');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function(str, lang) {
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
            var html = convert(striptags(tokens[idx + 1].content, 'script'));
            var descriptionHTML = description ?
                '<div class="description">' + md.render(description) + '</div>' :
                '';
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

const Files = [
    { filename: 'alert', convert: 0 },
    { filename: 'dialog', convert: 1 },
    { filename: 'msg', convert: 0 },
    { filename: 'msgbox', convert: 1 },
    { filename: 'notification', convert: 0 },
    { filename: 'input', convert: 0 },
    { filename: 'input-number', convert: 0 },
    { filename: 'tooltip', convert: 0 },
    { filename: 'popover', convert: 0 },
    { filename: 'loading', convert: 1 },
    { filename: 'slider', convert: 0 },
];

var counter = 0;
// 创建
Files.forEach(file => {

    if (file.convert) {
        let mdContent = fs.readFile(path.join(outPath, 'markdown/' + file.filename + '.md'), { encoding: 'utf8', flag: 'r' }, function(err, data) {
            if (err) {
                console.error(`${file.filename}.md不存在。`);
            }
            let htmlContent = md.render(data);
            fs.writeFile(path.join(outPath, file.filename + '.html'), htmlContent, function(err) {
                if (err) {
                    console.log(err)
                } else {
                    counter += 1;
                    console.log(`${counter}.${file.filename}.md转换完成。`);

                }
            });
        });
    }
});

console.log('文件转换完成!');