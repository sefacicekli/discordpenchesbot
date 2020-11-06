require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const User = require('./src/User');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//Mesajları dinleyip ona göre işlemler yapıyoruz
client.on('message', msg => {
    let tmsg = msg.content.toLowerCase(); //mesajı rahat işlemek için hepsini küçült

    if (tmsg.startsWith('igpp')) { //igpp ile başlayan işlemleri deneme
        let username = tmsg.slice(5);
        (async () => {
            const userinfo = await User(username);
            if (userinfo != null) {
                const pphd = userinfo.graphql.user.profile_pic_url_hd;
                msg.channel.send(pphd);
            } else {
                msg.reply('Böyle birisi yok!');
            }
        })();
    } else if (tmsg.search('<@!720351225278627971>') > -1) { //bot etiketlendiyse
        msg.reply('Ne var lan!');
    } else if (tmsg.search('<@!337562346119495682>') > -1 && msg.author.username !== 'hiizeus') { //Botu yazanı etiketledilerse
        msg.reply('Fatih abimi niye etiketledin hayırdır bir mevzu mu var mk');
    }
});

//Yeni bir üye geldiğinde
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`Aramıza hoş geldin lale, ${member}`);
});

client.login(process.env.APP_TOKEN);
