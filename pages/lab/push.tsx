import Layout from "../../components/Layout";
import {
  registerSWMain,
  registerSWPush,
} from "../../scripts/serviceworker/register";

export default function LabPush() {
  return (
    <>
      <Layout titleprop="[lab]通知">
        <button onClick={() => registerSWMain()}>SWを購読する</button>
        <button onClick={() => registerSWPush()}>SWPushを購読する</button>
      </Layout>
    </>
  );
}
