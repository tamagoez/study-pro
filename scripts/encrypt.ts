function loopproc(
  text: string,
  keynum: string[],
  option: "encrypt" | "decrypt"
) {
  let resultstring = "";
  let keyreadid = 0;
  for (var i = 0; i < text.length; ++i) {
    // 効率化のためのconst
    const itext = text.charAt(i);
    // まず最初にtext引数の文字列をutf数列に変換する
    const utext = itext.codePointAt(0);
    // key配列からkeyを読み込み
    const thisKey = Number(keynum[keyreadid]);

    // optionで足すか引くかを分岐
    let arrangeNum;
    if (option === "encrypt") {
      arrangeNum = utext + thisKey;
    } else if (option === "decrypt") {
      arrangeNum = utext - thisKey;
    } else {
      throw Error;
    }
    const arrangeText = String.fromCodePoint(arrangeNum);
    resultstring = resultstring + arrangeText;
    // 次の数字を設定する
    if (keyreadid == keynum.length - 1) {
      keyreadid = 0;
    } else {
      keyreadid += 1;
    }

    // 変数の確認
    console.table([
      { name: "itext", value: itext },
      { name: "utext(codepoint)", value: utext },
      { name: "thiskey", value: thisKey },
      { name: "arrangeNum", value: arrangeNum },
      { name: "arrangeText", value: arrangeText },
      { name: "keyreadid", value: keyreadid },
    ]);
  }
  return resultstring;
}

export function encryptText(text: string, key: string) {
  const keynum = parseKey(key);
  const part1 = loopproc(text, keynum, "encrypt");
  return loopproc(part1, keynum.reverse(), "encrypt");
}

export function decryptText(text: string, key: string) {
  const keynum = parseKey(key);
  const part1 = loopproc(text, keynum, "decrypt");
  return loopproc(part1, keynum.reverse(), "decrypt");
}

function parseKey(key: string) {
  let resultarray = [];
  for (var i = 0; i < key.length; ++i) {
    // 効率化のためのconst
    const itext = key.charAt(i);
    // まず最初にtext引数の文字列をutf数列に変換する
    const utext = itext.codePointAt(0);
    resultarray.push(utext);
  }
  return resultarray;
}
