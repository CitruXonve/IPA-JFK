const { htmlEncode } = require('htmlencode');
const parse = require('./src/parse');
const syllable = require('./src/syllable');
const vowel = require('./src/vowel');
const consonant = require('./src/consonant');

function ir(w) {
  const wu = w.toUpperCase();
  const ref = (v) => {
    const wx = parse[v.toUpperCase()];
    if (!wx) return undefined;
    return wx[0];
  };
  let phs = parse[wu][0];
  phs = syllable(phs);
  phs = vowel(phs, wu, ref);
  phs = consonant(phs, wu);
  return phs;
}

const vowelUnicode = {
  ae: { tense: ['e', '\u0259\u032f'], lax: ['\u00e6'] },
  aI: { tense: ['\u0251\u02d6', '\u026a\u032f'] },
  aU: { tense: ['a', '\u028a\u032f'] },
  A: { tense: ['\u0251', '\u02d0'], rhotic: ['\u0252', '\u0259\u032f', '\u02de'] },
  2: { lax: ['\u028c'] },
  eI: { tense: ['e\u026a\u02d5\u032f'] },
  e: { rhotic: ['e\u0259\u02d5\u032f', '\u02de'], lax: ['\u025b'] },
  '3r': { rhotic: ['\u025c', '\u02de', '\u02d0'] },
  '@': { rhoticWeak: ['\u0259', '\u02de', '\u02d0'], laxWeak: ['\u0259'] },
  i: { tense: ['i', '\u02d0'], tenseWeak: ['i', '\u02d0'], rhotic: ['i', '\u0259\u032f', '\u02de'] },
  I: { lax: ['\u026a\u0308'], laxWeak: ['\u0258'] },
  oU: { tense: ['o\u02d5', '\u028a\u032f'] },
  OI: { tense: ['o\u02d5', '\u026a\u032f'] },
  O: { tense: ['\u0254', '\u0259\u032f'], rhotic: ['o\u02d5\u0259\u032f', '\u02de'], lax: ['\u0254', '\u0259\u032f'] },
  u: { tense: ['\u028a', 'u\u032f'], tenseWeak: ['\u028a', 'u\u032f'] },
  U: { rhotic: ['\u028a', '\u0259\u032f', '\u02de'], lax: ['\u028a\u0308'], laxWeak: ['\u0275'] },
};
const consonantUnicode = {
  N: '\u014b',
  g: '\u0261',
  T: '\u03b8',
  D: '\u00f0',
  S: '\u0283',
  Z: '\u0292',
  l: 'l\u02fd',
  r: '\u0279',
  c: 'c\u0327',
};

function utf8Encode(phs) {
  let state = 'coda';
  function enc(ph, split) {
    let rxp = '';
    let rx = split ? [] : '';
    let rxs = '';
    for (let p of ph) {
      if (Array.isArray(p)) {
        const [pre, s, sup] = enc(p, true);
        rx += `${pre}${s.join('\u0361').trim()}${sup}`;
      } else {
        let ss;
        if (p.isVowel) {
          ss = vowelUnicode[p.pho][p.property + (p.weak ? 'Weak' : '')];
        } else {
          ss = [consonantUnicode[p.pho] || p.pho];
        }
        if (p.velarized > 0.5)
          ss = ss.map((s) => `${s}\u0334`);
        if (p.devoiced)
          ss = ss.map((s) => `${s}\u02f3`);
        if (p.nasalized)
          ss = ss.map((s) => `${s}\u0303`);
        if (p.retracted)
          ss = ss.map((s) => `${s}\u02cd`);
        if (p.raised)
          ss = ss.map((s) => `${s}\u02d4`);
        if (p.phono === 'nucleus' && !p.isVowel)
          ss = ss.map((s) => `${s}\u02cc`);
        let s = ss.join('');
        if (p.release === 'silent')
          s += '\u02fa';
        if (p.glottalized)
          s = '\u0294' + s;
        let sup = '';
        if (p.release === 'nasal')
          sup += '\u207f';
        else if (p.release === 'labial')
          sup += '\u02e1';
        if (p.aspirate > 0.7)
          sup += '\u02b0';
        if (p.labialized)
          sup += '\u02b7';
        let sp = '';
        switch (state) {
          case 'onset':
            state = p.phono;
            break;
          case 'coda':
          case 'nucleus':
            if (p.phono !== 'coda') {
              sp = ' ';
              if (p.stress === 1)
                sp += '\u02c8';
              else if (p.stress === 2)
                sp += '\u02cc';
            }
            state = p.phono;
            break;
        }
        if (!split) {
          rx += sp;
          rx += s;
        } else {
          rxp += sp;
          rx.push(s);
        }
        if (sup) {
          if (split)
            rxs += sup;
          else
            rx += sup;
        }
      }
    }
    if (split)
      return [rxp, rx, rxs.replace('\u02b7\u02b7', '\u02b7')];
    return rx.trim();
  }
  return `[${enc(phs)}]`;
}

const vowelLaTeX = {
  ae: { tense: ['e', '\\textsubarch{@}'], lax: ['\\ae{}'] },
  aI: { tense: ['\\|+A', '\\textsubarch{I}'] },
  aU: { tense: ['a', '\\textsubarch{U}'] },
  A: { tense: ['A', ':'], rhotic: ['6', '\\textsubarch{@}', '\\textrhoticity'] },
  2: { lax: ['2'] },
  eI: { tense: ['\\|`e\\textsubarch{I}'] },
  e: { rhotic: ['\\|`e\\textsubarch{@}', '\\textrhoticity'], lax: ['E'] },
  '3r': { rhotic: ['3', '\\textrhoticity', ':'] },
  '@': { rhoticWeak: ['@', '\\textrhoticity', ':'], laxWeak: ['@'] },
  i: { tense: ['i', ':'], tenseWeak: ['i', ':'], rhotic: ['i', '\\textsubarch{@}', '\\textrhoticity'] },
  I: { lax: ['\\"I'], laxWeak: ['9'] },
  oU: { tense: ['\\|`o', '\\textsubarch{U}'] },
  OI: { tense: ['\\|`o', '\\textsubarch{I}'] },
  O: { tense: ['O', '\\textsubarch{@}'], rhotic: ['\\|`o\\textsubarch{@}', '\\textrhoticity'], lax: ['O', '\\textsubarch{@}'] },
  u: { tense: ['U', '\\textsubarch{u}'], tenseWeak: ['U', '\\textsubarch{u}'] },
  U: { rhotic: ['U', '\\textsubarch{@}', '\\textrhoticity'], lax: ['\\"U'], laxWeak: ['8'] },
};
const consonantLaTeX = {
  l: '\\|]l',
  r: '\\*r',
  c: '\\c{c}',
};

function latexEncode(phs) {
  let state = 'coda';
  function enc(ph, split) {
    let rxp = '';
    let rx = '';
    let rxs = '';
    for (let p of ph) {
      if (Array.isArray(p)) {
        const [pre, s, sup] = enc(p, true);
        rx += `${pre}\\t{${s}}`;
        if (sup) rx += `\\super{${sup}}`;
      } else {
        let ss;
        if (p.isVowel) {
          ss = vowelLaTeX[p.pho][p.property + (p.weak ? 'Weak' : '')];
        } else {
          ss = [consonantLaTeX[p.pho] || p.pho];
        }
        if (p.velarized > 0.5)
          ss = ss.map((s) => `\\|~{${s}}`);
        if (p.devoiced)
          ss = ss.map((s) => `\\r{${s}}`);
        if (p.nasalized)
          ss = ss.map((s) => `\\~{${s}}`);
        if (p.retracted)
          ss = ss.map((s) => `\\textsubbar{${s}}`);
        if (p.raised)
          ss = ss.map((s) => `\\textraising{${s}}`);
        if (p.phono === 'nucleus' && !p.isVowel)
          ss = ss.map((s) => `\\s{${s}}`);
        let s = ss.join('');
        if (p.release === 'silent')
          s += '\\textcorner{}';
        if (p.glottalized)
          s = 'P' + s;
        let sup = '';
        if (p.release === 'nasal')
          sup += 'n';
        else if (p.release === 'labial')
          sup += 'l';
        if (p.aspirate > 0.7)
          sup += 'h';
        if (p.labialized)
          sup += 'w';
        let sp = '';
        switch (state) {
          case 'onset':
            state = p.phono;
            break;
          case 'coda':
          case 'nucleus':
            if (p.phono !== 'coda') {
              sp = ' ';
              if (p.stress === 1)
                sp += '"';
              else if (p.stress === 2)
                sp += '""';
            }
            state = p.phono;
            break;
        }
        if (!split)
          rx += sp;
        else
          rxp += sp;
        rx += s;
        if (sup) {
          if (split)
            rxs += sup;
          else
            rx += `\\super{${sup}}`;
        }
      }
    }
    if (split)
      return [rxp, rx.trim(), rxs.replace('ww', 'w')];
    return rx.trim();
  }
  return `\\textipa{[${enc(phs)}]}`;
}

module.exports = {
  unicode: (w) => utf8Encode(ir(w)),
  html: (w) => htmlEncode(utf8Encode(ir(w))),
  latex: (w) => latexEncode(ir(w)),
};
module.exports.default = module.exports;
