import shuffle from "just-shuffle";

export function randomTaskDone() {
  const wordlist = [
    "お疲れ様です!",
    "この調子で張り切っていきましょう!",
    "おめでとうございます!",
    "頑張りましたね!",
    "君の力は計り知れない...",
    "休憩も忘れずに",
    "お見事!",
    "いぇーい!",
    "ハイタッチ!",
    "すごいじゃん!",
    "ばっちり!",
  ];
  return wordshuffle(wordlist);
}

export function randomTaskUndone() {
  const wordlist = ["張り切っていきましょう!", "頑張ろう!"];
  return wordshuffle(wordlist);
}

function wordshuffle(wordlist: string[]) {
  const picked = shuffle(wordlist);
  const randomN = Math.random() * wordlist.length;
  return picked[randomN];
}
