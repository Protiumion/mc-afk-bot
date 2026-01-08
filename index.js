const mineflayer = require("mineflayer");

const BOT_NAME = "AFK-BOT"; // bot username
const PASSWORD = "chatgpt.chadgpt"; // auto login password
const SERVER_IP = "Mega_Martins.aternos.me"; // put your server IP
const SERVER_PORT = 25565; // default port

function startBot() {
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: BOT_NAME,
    version: false
  });

  // ===== AUTO REGISTER / LOGIN =====
  bot.once("spawn", () => {
    console.log("✅ Bot spawned");
    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`);
    }, 3000);
  });

  bot.on("messagestr", (msg) => {
    const m = msg.toLowerCase();

    if (m.includes("/register")) {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      console.log("🔐 Registered first time");
    }

    if (m.includes("/login")) {
      bot.chat(`/login ${PASSWORD}`);
      console.log("🔓 Logged in");
    }
  });

  // ===== ANTI-AFK =====
  setInterval(() => {
    if (!bot.entity) return;
    bot.look(Math.random() * Math.PI * 2, 0, true); // look around
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 400);
  }, 60000); // every 60 sec

  // ===== AUTO RECONNECT =====
  bot.on("end", () => {
    console.log("❌ Bot disconnected. Reconnecting...");
    setTimeout(startBot, 5000);
  });

  bot.on("error", console.log);
}

startBot();
