const { createCanvas } = require('canvas')

exports.toHTML= function (text) {
    let _text = text.length > 130 ? text.substr(0, 130) + '...' : text
    const texts = splitToLine(_text);

    var res = [];
    const len = texts.length
    var inity = 30
    for (var i = 0; i < len; i++) {
        var tspan = `<tspan x="0" y="${inity}">${texts[i]}</tspan>`;
        res.push(tspan);
        inity += 50;
    }
    return res.join('');
}

function splitToLine(str) {
    // TODO: abstract to common use.
    const base = 21;
    var cur = 0;
    const res = [];
    // judge probable line numbers
    const lines = parseInt(str.length / base);
    const cvs = createCanvas(750, 400)
    const ctx = cvs.getContext('2d')

    ctx.font = "24px PingFangSC-Regular, PingFang SC";

    // new string 判断当前句是否需要换行
    var ns = str.substr(cur, base + 1);
    while (ns.length) {
        ns = ns.replace(/^\\n/, '')
        if (ctx.measureText(ns).width < 510) {
            var br = ns.indexOf('\n');
            // 如果存在换行
            if (br > -1) {
                let _nss = ns.split('\n');
                // ns 等于最后一项
                ns = _nss.splice(_nss.length - 1)[0] || ns;
                let __len = _nss.join('')
                if (__len.length) {
                    res.push(..._nss)
                    cur += __len.length + 1
                }
            }
            // 如果到达结尾
            if (cur + ns.length == str.length) {
                res.push(ns);
                break;
            } else {
                // 否则继续试图增加文字长度
                ns = str.substr(cur, ns.length + 1)
                continue;
            }
        }
        res.push(ns);
        cur += ns.length;
        ns = str.substr(cur, base + 1)
    }
    return res;
    }