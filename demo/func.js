const db = require('../db');

export default function updateByOption(format) {
    document.getElementById('_results').innerHTML = '';
    try {
        const word = document.getElementById('_word').value || '';
        const ref = document.getElementById('_ph').value;
        const aeHint = document.getElementById('_ae').value;
        const syllableHint = document.getElementById('_syllable').value;
        const phss = ref ? [ref] : db.query(word);
        for (let phs of phss) {
            const phonemic = !document.getElementById('_phonetic').checked;
            const ir = db.process(phs, word, phonemic, {
                aeHint,
                syllableHint
            });
            const li = document.createElement('li');
            if (format === 'unicode') {
                li.innerText = db.display.utf8Encode(ir)
            } else if (format === 'latex') {
                const pre = document.createElement('pre');
                pre.innerText = db.display.latexEncode(ir);
                li.appendChild(pre);
            } else {
                const pre = document.createElement('pre');
                pre.innerText = JSON.stringify(ir, null, 2);
                li.appendChild(pre);
            }
            document.getElementById('_results').appendChild(li);
        }
    } catch (e) {
        console.error(e);
    }
}