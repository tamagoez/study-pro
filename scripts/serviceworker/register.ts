// 参考にしたサイト
// https://neos21.net/blog/2022/08/05-01.html

export async function registerSWMain() {
  /** @type {ServiceWorkerRegistration} 登録した Service Worker */
  const serviceWorkerRegistration =
    await window.navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

  if (serviceWorkerRegistration.installing) {
    console.log("Service Workerの初回登録: ", serviceWorkerRegistration);
    /** @type {ServiceWorker} インストール中の Service Worker */
    const installingServiceWorker = serviceWorkerRegistration.installing;
    installingServiceWorker.addEventListener("statechange", (event) => {
      console.log(
        "Service Worker の初回登録イベント: ",
        installingServiceWorker.state,
        event
      ); // (installing) → installed → activating → activated
    });
  } else {
    // 2回目以降は `serviceWorkerRegistration.installing` は `null` になっており `active` プロパティの方に ServiceWorker が格納されている模様
    console.log(
      "Service Workerはインストール済のようです: ",
      serviceWorkerRegistration
    );
  }

  await navigator.serviceWorker.ready; // Service Worker の準備を待機する : 戻り値は `serviceWorkerRegistration` と同一なのでココでは再取得しなくて良い
}

export async function registerSWPush() {
  // Service Worker を取得する
  const serviceWorkerRegistration = await navigator.serviceWorker.ready;

  // 公開鍵の文字列 : 別途用意しておく
  // [PS]: process.envで一応シークレット化にも対応しておく
  const applicationServerPublicKey =
    "BCXhVNGYilUH9PLT_h5wocF1KqZlZt2pb2sNtlF65156zs1_zsoIbtOMKLVUJPR7PzfDLDWUSCyjs8J4LwOIxP4";

  /** @type {PushSubscription} Push サービスを開始する : ココで Push 通知の許可ウィンドウが表示される */
  const pushSubscription =
    await serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(applicationServerPublicKey),
    });

  // サーバに PushSubscription 情報を送信する
  // const response = await window.fetch("/api/sw/subpush", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(pushSubscription.toJSON()),
  // });
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i)
    outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}
