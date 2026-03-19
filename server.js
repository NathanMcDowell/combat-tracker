console.log(require("discord.js").version);


const express = require("express");
const cors = require("cors");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.use(cors());

const PORT = 3000;

// Store messages (temporary)
let messages = [];

const client = new Client({
intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]
});

client.on("messageCreate", (message) => {
if (message.author.bot) return;


messages.push({
    user: message.author.username,
    content: message.content,
    time: new Date()
});
});

client.login("YOUR_TOKEN_HERE");

// API endpoint for your website
app.get("/messages", (req, res) => {
res.json(messages);
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});