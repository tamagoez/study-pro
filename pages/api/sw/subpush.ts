export default function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    /** @type {PushSubscription} `webPush.PushSubscription` インターフェースとも同型 */
    const pushSubscription = req.body;
    console.log(pushSubscription);
    res.json({ result: "Push event subscribed successfully" });
  } else {
    // Handle any other HTTP method
    res.status(400).json({ result: "Request method not allowed" });
  }
}
