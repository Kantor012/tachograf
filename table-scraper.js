const Discord = require("discord.js");
const config = require('dotenv').config();
const client = new Discord.Client();
const scraper = require('table-scraper');
const hook = new Discord.WebhookClient('807720034424061982','3-j7mcwdtrPu1rUtQfHW-qhym_K68hcULRVUV6pJgyVM93odLTDnqROqR-aktB7-JqKm');
// 
// 807715743026249761
client.on("message", message => {
	if(message.webhookID === '807720034424061982' && message.channel.id === '807715743026249761'){
		const autor = message.author.username;
		const args = message.content.split('\n');
		const linkdotrasy = args[1].slice(1, -1);
		let poczatek, koniec, towar, waga, zaakceptowany, uszkodzenia, ciagnik, spalanie, przebyty, predkosc;
		const test = scraper.get(linkdotrasy).then(async function(tableData) {
			poczatek =await tableData[0][0][1];
			koniec =await tableData[0][1][1];
			towar =await tableData[0][2][1];
			waga =await tableData[0][3][1];
			zaakceptowany =await tableData[0][8][1];
			uszkodzenia = await tableData[0][12][1];
			ciagnik = await tableData[0][15][1];
			przebyty = await tableData[0][7][1];
		// ----------------------------------------------------	
			const args1 = tableData[0][16][1].split(' ');
			const args2 = tableData[0][17][1].split(' ');
			const args3 = tableData[0][18][1].split(' ');
			if(args1[1] === 'kph')
				{predkosc = await tableData[0][16][1]}
			if(args1[1] === 'l/100km'){
				if(args2[1].includes('kph')){
					predkosc = await tableData[0][17][1]
				}
				else if(args3[1].includes('kph')){
					predkosc = await tableData[0][18][1]
				}
				else{
					predkosc = await tableData[0][19][1]
				}
				//predkosc = await tableData[0][17][1];
				spalanie = await tableData[0][16][1]};
			if(!spalanie){
			spalanie = 'Dostawa z rynku szybkich dostaw'};
			
			return {poczatek, koniec, towar, waga, zaakceptowany, uszkodzenia, ciagnik, spalanie, przebyty, predkosc};
		});

		// ----------------------------------------------------
		test.then(result => 
		{
			console.log(scraper.tableData);
			let MessageAuthorID = message.author.id
			if(message.content.includes('[Rzeczywiste]')){
				let nazwaEmbed = new Discord.MessageEmbed()
				.setTitle(`:articulated_lorry:**ZALICZONA DOSTAWA**`)
				.setDescription(`
					**Kierowca: <@`+MessageAuthorID+`>
					Skąd: `+poczatek+`
					Dokąd: `+koniec+`
					Towar: `+towar+`
					---------------------------
					Przebyty dystans: `+przebyty+`
					Zaakceptowany dystans: `+zaakceptowany+`
					Maksymalna prędkość: `+predkosc+`
					---------------------------
					Ciągnik: `+ciagnik+`
					Spalanie: `+spalanie+`
					Uszkodzenia ładunku: `+uszkodzenia+`
					---------------------------
					Link do trasy: `+linkdotrasy+`
					**`)
				.setFooter(`Gold Logistics`)
				.setTimestamp() // Pokazuje godzinę wysłania
				.setColor("#ffffff")
				message.channel.send(nazwaEmbed)
			}
			else if(message.content.includes('[Wyścig]')){
				let nazwaEmbed = new Discord.MessageEmbed()
				.setTitle(`:rocket:**NIEZALICZONA DOSTAWA**`)
				.setDescription(`
					**Kierowca: <@`+MessageAuthorID+`>
					Skąd: `+poczatek+`
					Dokąd: `+koniec+`
					Towar: `+towar+`
					---------------------------
					Przebyty dystans: `+przebyty+`
					Zaakceptowany dystans: `+zaakceptowany+`
					Maksymalna prędkość: `+predkosc+`
					---------------------------
					Ciągnik: `+ciagnik+`
					Spalanie: `+spalanie+`
					Uszkodzenia ładunku: `+uszkodzenia+`
					---------------------------
					Link do trasy: `+linkdotrasy+`
					**`)
				.setFooter(`Gold Logistics`)
				.setTimestamp() // Pokazuje godzinę wysłania
				.setColor("#ffffff")
				message.channel.send(nazwaEmbed)
			}
			}
		)
	}
}
);

client.login(process.env.BOT_TOKEN);