import { reactive, onMounted } from 'vue';
import http from '../utils/http';

export default class Comment{
  constructor({
    getterUrl,
    setterUrl
  }){
    this.getterUrl = getterUrl;
    this.setterUrl = setterUrl;

    this.state = reactive({
      commentText: '',
      commentTree: null
    });

    this.getCommentTree();
  }

  getCommentTree(){
    onMounted(async () => {
      const commentList = await this.getCommentList();
      this.state.commentTree = Comment.formatTree(commentList);

    });
  }
  
  // 新增評論
  addComment = ({ id, username }) => {
    const commentInfo = {
      id: new Date().getTime(),
      uid: id,
      pid: 0,
      username,
      comment: this.state.commentText
    }

    this.setCommentList(commentInfo, (comment) => {
      this.setComment(comment);
    })
  }

  // 設置評論
  setComment(comment){
    this.state.commentTree.unshift(comment);
    this.state.commentText = '';
  }

  // 新增回覆
  addReply = (item, reply, { id, username }) => {
    const replayInfo = {
      id: new Date().getTime(),
      uid: id,
      pid: item.id,
      username,
      comment: reply
    }

    this.setCommentList(replayInfo, (reply) => {
      this.setReply(item, reply);
    });
  }

  // 設置回覆
  setReply(item, reply){
    (item.children || (item.children = [])).unshift(reply);
    item.replyText = '';
  }

  async getCommentList(){
    return await http.get(this.getterUrl);
  }

  async setCommentList(comment, callback){
    const data = await http.post(this.setterUrl, { comment });
    callback && callback(data);
  }

  static formatTree(data){
    const result = [];
    const map = {};

    data.forEach(item => {
      map[item.id] = item
    });

    data.forEach(item => {
      const parent = map[item.pid];

      if(parent){
        (parent.children || (parent.children = [])).push(item);
      }else{
        result.push(item);
      }
    });

    return result;
  }
}