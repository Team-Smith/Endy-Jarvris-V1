module.exports = {
    config: {
        name: "coffee",
        aliases: ["coffees", "drink"],
        author: "Danny",
        version: "1.1",
        cooldowns: 5,
        role: 0, // everyone can use
        shortDescription: {
            en: "Get a random coffee type to vibe with."
        },
        longDescription: {
            en: "Use this command to get a random coffee suggestion, fun and cool!"
        },
        category: "fun",
        guide: {
            en: "{p}{n} - get a random coffee type"
        }
    },
    onStart: async function ({ api, event }) {
        try {
            const coffeeList = [
                "Espresso ☕ - Strong and bold!",
                "Cappuccino 🥛☕ - Smooth with froth!",
                "Latte 🥛☕ - Creamy and chill!",
                "Americano 🌊☕ - Classic vibes!",
                "Mocha 🍫☕ - Chocolatey goodness!",
                "Macchiato 🍮☕ - Sweet kick!",
                "Flat White 🥛☕ - Minimalist and smooth!"
            ];

            // Pick a random coffee
const randomCoffee = coffeeList[Math.floor(Math.random() * coffeeList.length)];

            const message = `🌟 Your coffee vibe today:\n\n${randomCoffee}\n\n☕ Sip it, enjoy it, vibe it!`;

            await api.sendMessage(message, event.threadID, event.messageID);
        } catch (error) {
            console.error("Error sending coffee suggestion", error);
        }
    },
};
