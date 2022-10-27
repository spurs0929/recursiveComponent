const express = require('express');
const bodyParser = require('body-parser');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const app = express();

// 使用中間鍵
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 跨域設定
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  next();
});

// 取得評論列表
app.get('/get_comment_list', (req, res) => {
  // 讀取.json檔案
  const commentListStr = readFileSync(resolve(__dirname, 'data/comment.json'), 'utf8');
  // json -> js物件
  const commentList = JSON.parse(commentListStr);

  res.json({
    code: 0,
    msg: 'ok',
    data: commentList
  });
});

// 設置評論列表
app.post('/set_comment_list', (req, res) => {
  const comment = req.body.comment;
  const commentListStr = readFileSync(resolve(__dirname, 'data/comment.json'), 'utf8');
  const commentList = JSON.parse(commentListStr);
  commentList.unshift(comment);
  writeFileSync(resolve(__dirname, 'data/comment.json'), JSON.stringify(commentList));

  res.json({
    code: 0,
    msg: 'ok',
    data: comment
  })
});

app.listen(3000, () => {
  console.log('ok');
})