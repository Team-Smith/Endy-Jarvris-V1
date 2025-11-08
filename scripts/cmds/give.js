module.exports = {
  config: {
    name: "give",
    version: "1.3",
    author: "Danny",
    countDown: 5,
    role: 2,
    description: {
      vi: "Cho người khác tiền bằng cách trả lời tin nhắn",
      en: "Give money by replying to a message"
    },
    category: "game",
    guide: {
      vi: "{pn} 10000 (trả lời tin nhắn người nhận)",
      en: "{pn} 10000 (reply to recipient's message)"
    }
  },

  langs: {
    vi: {
      success: "Bạn đã cho %1 %2 coin thành công!",
      fail: "Vui lòng trả lời tin nhắn của người nhận và nhập số tiền hợp lệ.",
      noPermission: "Bạn không có quyền sử dụng lệnh này!"
    },
    en: {
      success: "Successfully gave %1 %2 coins!",
      fail: "Please reply to the user's message and enter a valid amount.",
      noPermission: "You do not have permission to use this command!"
    }
  },

  onStart: async function({ args, message, event, usersData, getLang }) {
    if (event.senderID !== "100089360940322") {
      return message.reply(getLang("noPermission"));
    }

    const replyID = event.messageReply?.senderID;
    const amount = parseInt(args[0]);
if (!replyID || !amount || amount <= 0) {
      return message.reply(getLang("fail"));
    }

    const userData = await usersData.get(replyID);
    await usersData.set(replyID, {
      money: userData.money + amount,
      exp: userData.exp,
      data: userData.data
    });

    const name = userData.name || "user";
    message.reply(getLang("success", name, amount));
  }
};
