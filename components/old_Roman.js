const romanTable2char = {
  きゃ: 'kya',
  きゅ: 'kyu',
  きょ: 'kyo',
  しゃ: 'sya',
  しゅ: 'syu',
  しょ: 'syo',
  ちゃ: 'tya',
  ちゅ: 'tyu',
  ちょ: 'tyo',
  にゃ: 'nya',
  にゅ: 'nyu',
  にょ: 'nyo',
  ひゃ: 'hya',
  ひゅ: 'hyu',
  ひょ: 'hyo',
  みゃ: 'mya',
  みゅ: 'myu',
  みょ: 'myo',
  りゃ: 'rya',
  りゅ: 'ryu',
  りょ: 'ryo',
  ふぁ: 'fa',
  ふぃ: 'fi',
  ふぇ: 'fe',
  ふぉ: 'fo',
  ぎゃ: 'gya',
  ぎゅ: 'gyu',
  ぎょ: 'gyo',
  じゃ: 'ja',
  じゅ: 'ju',
  じょ: 'jo',
  ぢゃ: 'dya',
  ぢゅ: 'dyu',
  ぢょ: 'dyo',
  びゃ: 'bya',
  びゅ: 'byu',
  びょ: 'byo',
  ぴゃ: 'pyo',
  ぴゅ: 'pyu',
  ぴょ: 'pyo'
}

const romanTable1char = {
  あ: 'a',
  い: 'i',
  う: 'u',
  え: 'e',
  お: 'o',
  か: 'ka',
  き: 'ki',
  く: 'ku',
  け: 'ke',
  こ: 'ko',
  さ: 'sa',
  し: 'si',
  す: 'su',
  せ: 'se',
  そ: 'so',
  た: 'ta',
  ち: 'ti',
  つ: 'tu',
  て: 'te',
  と: 'to',
  な: 'na',
  に: 'ni',
  ぬ: 'nu',
  ね: 'ne',
  の: 'no',
  は: 'ha',
  ひ: 'hi',
  ふ: 'hu',
  へ: 'he',
  ほ: 'ho',
  ま: 'ma',
  み: 'mi',
  む: 'mu',
  め: 'me',
  も: 'mo',
  や: 'ya',
  ゆ: 'yu',
  よ: 'yo',
  ら: 'ra',
  り: 'ri',
  る: 'ru',
  れ: 're',
  ろ: 'ro',
  わ: 'wa',
  を: 'wo',
  ん: 'n',
  が: 'ga',
  ぎ: 'gi',
  ぐ: 'gu',
  げ: 'ge',
  ご: 'go',
  ざ: 'za',
  じ: 'ji',
  ず: 'zu',
  ぜ: 'ze',
  ぞ: 'zo',
  だ: 'da',
  ぢ: 'di',
  づ: 'du',
  で: 'de',
  ど: 'do',
  ば: 'ba',
  び: 'bi',
  ぶ: 'bu',
  べ: 'be',
  ぼ: 'bo',
  ぱ: 'pa',
  ぴ: 'pi',
  ぷ: 'pu',
  ぺ: 'pe',
  ぽ: 'po',
  ぁ: 'la',
  ぃ: 'li',
  ぅ: 'lu',
  ぇ: 'le',
  ぉ: 'lo',
  ー: '-',
  '、': ',',
  '。': '.',
  '！': '!',
  '？': '?'
}

export default {
  toRoman(input) {
    let ret = ''
    let index = 0
    const end = input.length
    while (index <= end) {
      let r
      if ((r = romanTable2char[input.substring(index, index + 2)])) {
        ret += r
        index += 2
      } else if ((r = romanTable1char[input.substring(index, index + 1)])) {
        ret += r
        index += 1
      } else {
        ret += input.substring(index, index + 1)
        index += 1
      }
    }

    const reTU = /っ([kstnhmyrwpdfgjlzxcvb])/gm
    const reLTU = /っ/gm

    ret = ret.replace(reTU, '$1$1')
    ret = ret.replace(reLTU, 'ltu')

    return ret
  }
}
