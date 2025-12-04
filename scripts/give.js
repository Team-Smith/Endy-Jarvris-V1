module.exports = {
  config: {
    name: "give",
    version: "1.3",
    author: "Danny",
    countDown: 5,
    role: 2,
    description: {
      vi: "Cho người khác tiền",
      en: "Give money to someone"
    },
    category: "game",
    guide: {
      vi: "{pn} @user 10000 hoặc trả lời tin nhắn người nhận và nhập số tiền",
      en: "{pn} @user 10000 or reply to the user's message and type amount"
    }
  },

  langs: {
    vi: {
      success: "Bạn đã cho %1 %2 coin thành công!",
      fail: "Vui lòng tag người dùng hoặc trả lời họ và nhập số tiền hợp lệ.",
      noPermission: "Bạn không có quyền sử dụng lệnh này!"
    },
    en: {
      success: "Successfully gave %1 %2 coins!",
      fail: "Please tag or reply to a user and enter a valid amount.",
      noPermission: "You do not have permission to use this command!"
    }
  },

  onStart: async function({ args, message, event, usersData, getLang }) {
if (event.senderID !== "61562072981070","61575126472224")
      return message.reply(getLang("noPermission"));

    const mentionID = Object.keys(event.mentions)[0] || event.messageReply?.senderID || event.senderID;

    const amountText = event.mentions && args[1] ? args[1] : args[0];
    const amount = parseInt(amountText);

    if (!mentionID || !amount || amount <= 0)
      return message.reply(getLang("fail"));

    const userData = await usersData.get(mentionID);
    await usersData.set(mentionID, {
      money: userData.money + amount,
      exp: userData.exp,
      data: userData.data
    });

    const name = event.mentions?.[mentionID] || "user";
    message.reply(getLang("success", name, amount));
  }
};
