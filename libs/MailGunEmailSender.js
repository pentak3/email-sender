var util = require('util');
var Mailgun = require('mailgun-js');

var EmailSender = require('./EmailSender');
var Config = require('../Config');

var mailgun = new Mailgun({apiKey: Config.services.mailgun.key, domain: Config.services.mailgun.domain});

function MailGunEmailSender() {
	MailGunEmailSender.super_.call(this);

	this.set = function(data) {
		this.formattedData = {
			from: data.fromName +' <'+ data.fromEmail +'>',
			to: data.toName +' <'+ data.toEmail +'>',
			subject: data.subject,
			html: data.content
	    };
	}

	this.send = function(callback) {
		mailgun.messages().send(this.formattedData, function (err, body) {
			if (!callback) {
				return;
			}
			if (err) {
				callback(false, err);
			} else {
				callback(true, null);
			}
		});
	};
}
util.inherits(MailGunEmailSender, EmailSender);

module.exports = MailGunEmailSender;