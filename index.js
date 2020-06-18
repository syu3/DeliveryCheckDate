var http = require('http'); //httpモジュール呼び出し
var server = http.createServer(function(request, response) {
  var admin = require("firebase-admin");

  var serviceAccount = require("./firestore.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://delivery-c394a.firebaseio.com"
  });

  var db = admin.firestore();
  var today = new Date();
  var a = today.getFullYear();
  var b = today.getMonth() + 1
  var c = today.getDate()
  console.log(a + "" + b + "" + c);
  var todayDate = a + "" + b + "" + c

  var todouhuken = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ]

  for (var i = 0; i < todouhuken.length; i++) {

    // console.log(todouhuken[i]);

    db.collection(todouhuken[i]).where('Date', '<=', todayDate).get()
      .then((snapshot) => {

        snapshot.forEach((doc) => {
          var collectionID = snapshot._query._queryOptions.collectionId
          db.collection(collectionID).doc(doc.id).delete();
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

  }
  // リクエストを受けると以下のレスポンスを送信する
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  }); //レスポンスヘッダーに書き込み
  response.write('Hello World\n'); // レスポンスボディに「Hello World」を書き込み
  response.end(); // レスポンス送信を完了する
});
server.listen(process.env.PORT || 8080); //8080番ポートで待ち受け
// var http = require('http'); //httpモジュール呼び出し
// var server = http.createServer(function (request, response) {
//     // リクエストを受けると以下のレスポンスを送信する
//     response.writeHead(200, {'Content-Type': 'text/plain'}); //レスポンスヘッダーに書き込み
//     response.write('Hello World\n'); // レスポンスボディに「Hello World」を書き込み
//     response.end(); // レスポンス送信を完了する
// });
// server.listen(process.env.PORT || 8080);  //8080番ポートで待ち受け
