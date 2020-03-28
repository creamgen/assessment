'use strict';//宣言後の記述ミスをエラーとして表示する
const userNameInput=document.getElementById('user-name');
const assessmentButton=document.getElementById('assessment');
const resultDivided=document.getElementById('result-area');
const tweetDevided=document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて消去する関数
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){//子供がある限り消去する
        element.removeChild(element.firstChild);
    }
}
//テキストフィールド上でenterが押された時にも診断を開始する
userNameInput.onkeydown=(event)=>{
    if(event.key==='Enter'){
        assessmentButton.onclick();
    }
};

assessmentButton.onclick=()=>{//診断ボタンが押されたとき
    const userName=userNameInput.value;//テキストエリアに入力された文字列を受け取る
    if(userName.length===0){
        return;//この関数から抜ける
    }
    
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    
    const header=document.createElement('h3');
    header.innerText='診断結果';
    resultDivided.appendChild(header);//div要素のresultDevidedのなかにh3のheaderを入れる
    const paragraph=document.createElement('p');
    const result=assessment(userName);
    paragraph.innerText=result;
    resultDivided.appendChild(paragraph);//div要素のresultDevidedのなかにpのparagraphを入れる
    
    //TODOツイートエリアの作成
    removeAllChildren(tweetDevided);
    const anchor=document.createElement('a');
    const hrefValue='https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ')+
    '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue);
    anchor.innerText='Tweet #あなたのいいところ';//日本語バージョンでは「あなたのいいところをツイートする」に直してくれる
    anchor.setAttribute('data-text',result);
    anchor.className='twitter-hashtag-button';
    tweetDevided.appendChild(anchor);
    //ツイッターのリンクをツイッターのサーバ上から持ってきて張り付ける
    const script=document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');//src属性（画像）に、画像のおいてあるアドレスを追加する
    tweetDevided.appendChild(script);
};
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    //全文字のコード番号を取得しそれらの和を求める
    let sumOfCharcode=0;
    for(let i=0;i<userName.length;i++){
        sumOfCharcode=sumOfCharcode+userName.charCodeAt(i);
    }
    //足した結果を、診断結果のパターンの数で割った余りを取得する
    const index=sumOfCharcode%answers.length;
    //余りを診断結果の配列の添え字として、診断結果の文字列を取得する
    let result=answers[index];

    result=result.replace(/\{userName\}/g,userName);
    return result;
}

console.assert(
    assessment('太郎')===assessment('太郎'),
    '同一人物の診断結果が同じではありません');
