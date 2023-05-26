import Layout from "../../components/Layout";
import { useState } from "react";
import { encryptText, decryptText } from "../../scripts/encrypt";

export default function EncryptBeta() {
  const [eText, setEText] = useState("");
  const [eKey, setEKey] = useState("");
  const [encValue, setEncValue] = useState("");
  const [decValue, setDecValue] = useState("");
  function encrypt() {
    const parseData = encryptText(eText, eKey);
    setEncValue(parseData);
    setDecValue(decryptText(parseData, eKey));
  }
  function decrypt() {
    const parseData = decryptText(eText, eKey);
    setDecValue(parseData);
    setEncValue(encryptText(parseData, eKey));
  }
  return (
    <Layout titleprop="暗号化β">
      <input value={eText} onChange={(e) => setEText(e.target.value)} />
      <input value={eKey} onChange={(e) => setEKey(e.target.value)} />
      <button
        onClick={() => {
          encrypt();
        }}
      >
        暗号化する
      </button>
      <button
        onClick={() => {
          decrypt();
        }}
      >
        複合化する
      </button>
      <p>暗号結果: {encValue}</p>
      <p>複合結果: {decValue}</p>
    </Layout>
  );
}
