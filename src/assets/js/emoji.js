const EmojiInit = () => {
  let newEmoji = [];
  RongIMLib.RongIMEmoji.init();
  // emoji列表
  let list = RongIMLib.RongIMEmoji.list;
  list.map(val => {
    newEmoji.push(RongIMLib.RongIMEmoji.emojiToHTML(val.emoji))
  });
  return {EmojiDom: newEmoji, EmojiList: list};
};
export default EmojiInit
