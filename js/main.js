// 厳密なエラーチェックをするため
'use strict'



{  
    // 単語が打ち終わったら次の単語にいくためまとめるための配列
    const words = [
        'apple',
        'sky',
        'blue',
        'middle',
        'const',
        'let',
        'red',
        'yellow',
        'black',
        'pink',
    ];
    // タイプした文字をconsoleに表示する動作
    // htmlのワードをappleに変換してそれを一文字づつタイプにしていく
    // 上記の単語をまとめたwordsをwordに代入する
    // lengthとは文字列の長さや配列の要素数を取得することができる
    // Math.floorは小数点以下を切る
    // Math.randomは小数点以下関係なく乱数を生成する
    let word;
    // 後で変更できるように変数(let)にしておく
    // locに0を代入する
    let loc;
    // scoreかmissの数を管理するための変数を定義する
    // 後で再代入するから変数(let)にする
    let score;
    let miss;
    // タイマー処理をするために定数を作成
    // そこにタイム数を代入する
    const timeLimit = 30 * 1000;
    // タイマー処理をしこむ
    // ゲーム開始時間を保持するため
    let startTime;
    // ゲームがクリックしたらバグが起きるのでそれの改善
    // ゲームが始まっている時はupdateTimer()が走らないようにするために変数を定義しておく
    let isPlaying = false;

    // htmlのIDタグの部分がtargetになってるのでそのtarget要素を取得する
    // documentはブラウザに読み込まれたウェブページを表しエントリーポイントとして働く
    // インターフェースは特定の役割を持つオブジェクトが、その役割を果たすために必要なメソッドを持つことを示しています
    // document.getElementByIdはidプロパティが指定された文字列に一致する要素を表すElementオブジェクト
    const target = document.getElementById('target');
    // 上記のscoreとmissをscoreLabelとmissLabelに代入する
    // 表示するために必要
    const scoreLabel = document.getElementById('score');
    const missLabel = document.getElementById('miss');
    // htmlにタイマーの領域を作成したのでこちらに残り時間を表示する
    // 要素取得
    const timerLabel = document.getElementById('timer');







// windowに対してイベントを割り当てる
// キーを押し込んだ時は'keydown'と言うイベントを使う
// addEventListenerはイベントの種類と処理を実行するための関数の指定
// 対象要素.addEventListener( 種類, 関数, false)
// アロー関数はより短くできる、通常のfunction式の大替構文
// console.logは引数として設定した値をデバッガーのコンソールに表示する関数
// 引数が一つだった場合は（）は省略できる
    
    

    // 関数を定義する時にまず必要になってくるのが、functionです
    // function 関数名() { 処理}
    function updateTarget() {
        // _を格納するためのplaceholderと言う変数を定義する
        let placeholder = '';
        // locと同じ数の_をplaceholderに連結していけばいいのでfor文を使う
        // ０からloc番目までと言うループを作ればlocと同じ回数処理が繰り返される
        for (let i = 0; i < loc; i++) {
            // この中でplaceholderに対して_を連結すればいい
            placeholder += '_';
        }
        // targetを更新する前にtarget.textContentに今作ったplaceholderをセットする
        // wordのインデックスがloc番目以降の文字を表示したいので、部分文字列を取得するるためのsubstring()と言うメソッドを使う。
        // substring文字列を分割したり任意の箇所を抽出したりする際によく利用する
        target.textContent = placeholder + word.substring(loc);
    }

    // 残り時間の計算
    // 残り時間 + 制限時間 - 現在時刻 = 算出
    function updateTimer() {
        const timeLeft = startTime + timeLimit - Date.now();
        // 秒単位にしたいので1000で割って小数点以下を2まで表示するのにtoFixed()を使う
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);
        
        // 上記の処理を一定時間ごとに繰り返していけばいいのでsetTimeout()を使う
        // 10みり秒ごとにupdatetimer()をよんで とすればupdatetimer()の中でsetTimeout()が呼ばれるので繰り返し処理になる
        const timeoutId = setTimeout(() => {
            updateTimer();
        }, 10);

        // 残りタイマーがマイナスになってしまうのでタイマー終了と同時に終わるようにする
        if (timeLeft < 0) {
            // isplayingがfalseになるタイミングはゲームオーバーになった際にする
            isPlaying = false;

            clearTimeout(timeoutId);
            // タイマーがずれて0秒にならないためアラートを出す前にtimerLabel.textContentを0秒にしてあげればいい
            timerLabel.textContent = '0.00';
            // 下記だけでは０秒にならずその原因はブラウザの使用上画面壁画処理がブロックされるから、これを防ぐ方法を書いていく
            // 100m秒後に次の処理をしてと作る
            setTimeout(() => {
                showResult();
            }, 100);

            target.textContent = 'click to replay';
        }
    }

    function showResult() {
        // 正確に打てたか確認するためにaccuracyと言う定数を用意する
        // 計算式はscoreとmissを足した物を割る
        // 割る数が0だと計算できないので、条件分岐を使う
        const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
    }

    // windowをクリック(click)した時に次の処理をしなさい。とかく
        // addEventListenerは第一引数にイベントの種類を指定することで、このイベントがどのようなケースに対応するのかを特定します。
    window.addEventListener('click', () => {
        // 下記がゲーム始まった際に走らせたくないのでそのために条件分岐をする
        if (isPlaying === true) {
            return;
        }
        // ゲームが始まったらisPlayingをtrueにする
        isPlaying = true;

        // 最初からゲームがはじめれるようにするためにlocも0にしつつ、scoreも初期化してあげる
        loc = 0;
        score = 0;
        miss = 0;
        scoreLabel.textContent = score;
        missLabel.textContent = miss;
        word = words[Math.floor(Math.random() * words.length)];
        // textContentはhtmlの並んだ単語をそのまま反映させる
        // textContentはノード及びその子孫のテキスト情報を取得、設定できる
        target.textContent = word;
        // windowがクリックされた時にゲームが始まるのでそのタイミングで現在時刻をstartTimeに代入する
        // Date.now()は基準日からの経過ミリ秒を計算してくれる
        startTime = Date.now();
        updateTimer();
    });


    // keydownイベントはキーが押された時に発生する
    // addEventListenerは第一引数にイベントの種類を指定することで、このイベントがどのようなケースに対応するのかを特定します。
    // window.addEventListener('keydown', (e) => {
    window.addEventListener('keydown', e => {
        // kkeydownのイベントでisPlayingがtrueでなかったら、ゲームが始まっていなかったら以降の処理をしたくないのでreturnとかく
        if (isPlaying !== true) {
            return;
        }
        // wordのloc番目の文字アクセスするには、wordに対して[]をつけて
        // if文のようにすればいい
        // それがe.keyと同じかどうかのみかた
        if ( e.key === word[loc]) {
            loc++;
            // locを更新して次の単語にいくタイミングとしてif文の中にかく
            if (loc === word.length) {
                word = words[Math.floor(Math.random() * words.length)];
                loc = 0;
            }
            // _に変える関数=updateTarget
            updateTarget();
            // scoreの値の更新
            score++;
            scoreLabel.textContent = score;
            // ミスだった場合同じように書いていく書いていく
        } else {
            // missの値の更新
            miss++;
            missLabel.textContent = miss;
        }
    });
}
