/* from https://www.pandanoir.info/entry/2017/09/28/190000 */

const isSmallChar = next => [...'ぁぃぅぇぉゃゅょ'].includes(next)
const add = n => item => n + item

class Roman {
  constructor(config = { enableLKey: true }) {
    this.config = config

    this.romanTable = {
      を: 'wo',
      しゃ: 'sya,sha,sixya,shixya',
      しゅ: 'syu,shu,sixyu,shixyu',
      しぇ: 'sye,she,sixye,shixye',
      しょ: 'syo,sho,sixyo,shixyo',
      ちゃ: 'tya,cha,tixya,chixya',
      ちゅ: 'tyu,chu,tixyu,chixyu',
      ちぇ: 'tye,che,tixye,chixye',
      ちょ: 'tyo,cho,tixyo,chixyo',
      じゃ: 'ja,zya,jixya,zixya',
      じゅ: 'ju,zyu,jixyu,zixyu',
      じぇ: 'je,zye,jixe,zixe',
      じょ: 'jo,zyo,jixyo,zixyo',
      てぃ: 'thi,texi',
      てぇ: 'the,texe',
      ねぇ: 'nexe',
      ふぁ: 'fa,fuxa,huxa',
      ふぃ: 'fi,fuxi,huxi',
      ふぇ: 'fe,fuxe,huxe',
      ふぉ: 'fo,fuxo,huxo',
      ゔぁ: 'va,vuxa',
      ゔぃ: 'vi,vuxi',
      ゔ: 'vu',
      ゔぇ: 've,vuxe',
      ゔぉ: 'vo,vuxo',
      うぁ: 'uxa,wha',
      うぃ: 'wi,uxi,whi',
      うぇ: 'we,uxe,whe',
      うぉ: 'uxo,who',
      くぁ: 'kwa,kuxa',
      ぐぁ: 'gwa,guxa',
      ぐぃ: 'gwi,guxi',
      ぐぅ: 'gwu,guxu',
      ぐぇ: 'gwe,guxe',
      ぐぉ: 'gwo,guxo',
      つぁ: 'tsa,tuxa,tsuxa',
      つぃ: 'tsi,tuxi,tsuxi',
      つぇ: 'tse,tuxe,tsuxe',
      つぉ: 'tso,tuxo,tsuxo',
      とぁ: 'twa,toxa',
      とぃ: 'twi,toxi',
      とぅ: 'twu,toxu',
      とぇ: 'twe,toxe',
      とぉ: 'two,toxo',
      でぃ: 'dhi,dexi',
      でゅ: 'dhu,dexyu',
      どぅ: 'dwu,doxu',
      ゐ: 'wyi',
      ゑ: 'wye',
      ー: '-',
      '。': '.'
    }

    for (const key of Object.keys(this.romanTable))
      this.romanTable[key] = this.romanTable[key].split(',')
    for (const val of 'abcdefghijklmnopqrstuvwxyz0123456789- ,:(){}.・!&%') {
      this.romanTable[val] = [val]
      this.romanTable[val.toUpperCase()] = [val.toUpperCase()]
    }
    this.romanTable['ヴぁ'] = this.romanTable['ゔぁ']
    this.romanTable['ヴぃ'] = this.romanTable['ゔぃ']
    this.romanTable['ヴ'] = this.romanTable['ゔ']
    this.romanTable['ヴぇ'] = this.romanTable['ゔぇ']
    this.romanTable['ヴぉ'] = this.romanTable['ゔぉ']

    this.consonant = {
      し: 's,sh',
      ち: 't,ch',
      つ: 't,ts',
      ふ: 'h,f',
      じ: 'z,j'
    }
    // 基本的なローマ字表を構築する
    for (const [hiraganas, cons] of [
      ['あいうえお', ''],
      ['かきくけこ', 'k'],
      ['さしすせそ', 's'],
      ['たちつてと', 't'],
      ['なにぬねの', 'n'],
      ['はひふへほ', 'h'],
      ['まみむめも', 'm'],
      ['やゆよ', 'y'],
      ['らりるれろ', 'r'],
      ['わ', 'w'],
      ['がぎぐげご', 'g'],
      ['ざじずぜぞ', 'z'],
      ['だぢづでど', 'd'],
      ['ばびぶべぼ', 'b'],
      ['ぱぴぷぺぽ', 'p']
    ]) {
      for (let i = 0, _i = hiraganas.length; i < _i; i++) {
        const hiragana = hiraganas[i]
        if (!this.consonant[hiragana]) this.consonant[hiragana] = cons
        this.romanTable[hiragana] = this.consonant[hiragana]
          .split(',')
          .map(c => c + 'aiueo'[i])
      }
    }
    this.romanTable['ゆ'] = ['yu']
    this.romanTable['よ'] = ['yo']
  }
  getRoman(furigana, targetPos) {
    // ローマ字の取得
    // furiganaのtargetPosの位置を取得
    // 結果は配列の形式で返す
    // [[ローマ字], 変換対象となる文字数]
    furigana = [...furigana]
    let result = []
    const nowChar = furigana[targetPos]
    const nextChar = furigana[targetPos + 1] || ''
    if (isSmallChar(nextChar) && this.romanTable[nowChar + nextChar])
      result = [this.romanTable[nowChar + nextChar].concat(), 2]
    // 「じゃ」 などthis.romanTableに登録されている場合
    else if (isSmallChar(nowChar)) {
      // 拗音単独の場合
      result = [
        [
          'x' +
            // eslint-disable-next-line standard/computed-property-even-spacing
            [...'aiueo', 'ya', 'yu', 'yo'][
              [...'ぁぃぅぇぉゃゅょ'].indexOf(nowChar)
            ]
        ],
        1
      ]
    } else if (['ヵ', 'ゕ'].includes(nowChar)) result = [['xka'], 1]
    else if (['ヶ', 'ゖ'].includes(nowChar)) result = [['xke'], 1]
    else if (['ゎ', 'ヮ'].includes(nowChar)) result = [['xwa'], 1]
    else if ([...'ぃぇゃゅょ'].includes(nextChar)) {
      // 次が拗音の場合
      const smallChar = {
        ぃ: ['yi', 'ixi'],
        ぇ: ['ye', 'ixe'],
        ゃ: ['ya', 'ixya'],
        ゅ: ['yu', 'ixyu'],
        ょ: ['yo', 'ixyo']
      }[nextChar]
      for (const cons of this.consonant[nowChar].split(','))
        result.push(cons + smallChar[0], cons + smallChar[1])
      this.romanTable[nowChar + nextChar] = result.concat()
      result = [result, 2]
    } else if (nowChar === 'ん') {
      // 今の文字が「ん」の場合
      // 必要最低限のnで返す
      result = ['nn']
      if (
        nextChar !== '' &&
        (this.consonant[nextChar] === undefined ||
          !['n', '', 'y'].includes(this.consonant[nextChar]))
      )
        result = ['n'] // 「んな」「んや」「んあ」でない、または後ろが記号のケース
      result = [result, 1]
    } else if (nowChar === 'っ') {
      // いまの文字が「っ」の場合
      result = [['xtu', 'xtsu'], 1] // 「女神さまっ」や「女神さまっ2」のように、後ろが存在しないか記号のケース
      if (nextChar !== '' && this.consonant[nextChar] !== undefined) {
        const [_res, count] = new Roman({ enableLKey: false }).getRoman(
          furigana,
          targetPos + 1
        )
        const _add = str => _res.map(add(str))
        result = [
          [
            ..._res.map(item => item[0] + item),
            ..._add('xtu'),
            ..._add('xtsu')
          ],
          count + 1
        ]
      }
    } else result = [this.romanTable[nowChar].concat(), 1] // 普通のとき

    if (this.config.enableLKey) {
      const target = result[0].filter(s => s.indexOf('x') !== -1)
      result[0] = result[0].concat(
        target.reduce((res, item) => {
          const items = item.split('x')
          for (let i = 1, _i = (1 << (items.length - 1)) - 1; i <= _i; i++) {
            let _res = items[0]
            for (let j = 1; j < items.length; j++) {
              _res += ((i >> (j - 1)) % 2 === 0 ? 'x' : 'l') + items[j]
            }
            res.push(_res)
          }
          return res
        }, [])
      )
    }
    if (
      furigana[targetPos - 1] === 'ん' &&
      !['n', '', 'y'].includes(this.consonant[nowChar])
    ) {
      // ここはnを足す処理
      // たとえば「しんくろにしてぃーん」で「shin」と入力したとき、次はnでもよいし、sでもよい。
      // ただ、「ん」のほうにnを付け加えるより、うしろの「く」を便宜上「'ku'でも'nku'でもよい」としたほうが便利。
      // このnを足す処理を行う
      result[0] = result[0].concat(result[0].map(add('n')))
    }
    return [result[0], result[1]]
  }
}

const roman = new Roman()

export default {
  transcate(word) {
    let i = 0
    const res = []
    while (i < word.length) {
      const r = roman.getRoman(word, i)
      res.push(r)
      i += r[1]
    }
    return res
  }
}
