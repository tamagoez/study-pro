import { useState } from "react";

export default function EncryptTest() {
  const [etext, setEtext] = useState<string>("");
  const [roltext, setRoltext] = useState<string>("");
  const [dectext, setDectext] = useState<string>("");
  const [rolstr, setRolstr] = useState<string>("");

  const [rolkey, setRolkey] = useState<string>("");

  function encrypt(text) {
    setEtext(text);
    setRoltext("");
    let ciphernum = -1;
    const ciphermax = rolkey.length;
    for (var i = 0; i < text.length; ++i) {
      const itext = text.charAt(i);
      let utext = itext.codePointAt(0).toString(16);
      utext = itext.codePointAt(0);
      if (ciphernum === ciphermax) {
        ciphernum = 0;
      } else {
        ciphernum += 1;
      }
      console.log(ciphernum);
      const ctext = Number(utext) + Number(rolkey.charAt(ciphernum));
      setRoltext(
        roltext + Buffer.from(ctext.toString(), "hex").toString("utf-8")
      );
      console.log(i + 1 + "文字目: " + text.charAt(i) + "/" + ctext);
    }
  }

  function decrypt(text) {
    setDectext("");
    let ciphernum = -1;
    const ciphermax = rolkey.length;
    for (var i = 0; i < text.length; ++i) {
      const itext = text.charAt(i);
      let utext = itext.codePointAt(0).toString(16);
      utext = itext.codePointAt(0);
      if (ciphernum === ciphermax) {
        ciphernum = 0;
      } else {
        ciphernum += 1;
      }
      console.log(ciphernum);
      const ctext = Number(utext) - Number(rolkey.charAt(ciphernum));
      setDectext(
        dectext + Buffer.from(ctext.toString(), "hex").toString("utf-8")
      );
      console.log(i + 1 + "文字目: " + text.charAt(i) + "/" + ctext);
    }
  }

  function setrolnum(text) {
    setRolstr(text);
    let key = "";
    for (var i = 0; i < text.length; ++i) {
      const itext = text.charAt(i);
      const utext = itext.codePointAt(0).toString(16);
      key += itext.codePointAt(0);
    }
    setRolkey(key);
  }

  return (
    <>
      <h2>暗号化のテスト</h2>
      暗号内容:{" "}
      <input
        value={etext}
        onChange={(e) => {
          encrypt(e.target.value);
        }}
      />
      <br />
      暗号キー:{" "}
      <input value={rolstr} onChange={(e) => setrolnum(e.target.value)} />
      <button onClick={() => encrypt(etext)}>暗号化</button>
      <button onClick={() => decrypt(roltext)}>複暗号化</button>
      <p>Roltext: {roltext}</p>
      <p>Rolkey: {rolkey}</p>
      <hr />
      <table>
        <tr>
          <th>変数</th>
          <th>値</th>
        </tr>
        <tr>
          <td>etext</td>
          <td>{etext}</td>
        </tr>
        <tr>
          <td>roltext</td>
          <td>{roltext}</td>
        </tr>
        <tr>
          <td>dectext</td>
          <td>{dectext}</td>
        </tr>
        <tr>
          <td>rolstr</td>
          <td>{rolstr}</td>
        </tr>
        <tr>
          <td>rolkey</td>
          <td>{rolkey}</td>
        </tr>
      </table>
    </>
  );
}
