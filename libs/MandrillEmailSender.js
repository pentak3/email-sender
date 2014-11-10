var util = require('util');
var mandrillApi = require('mandrill-api/mandrill');

var EmailSender = require('./EmailSender');
var Config = require('../Config');

var mandrill = new mandrillApi.Mandrill(Config.services.mandrill.key);

function MandrillEmailSender() {
	MandrillEmailSender.super_.call(this);

	this.set = function(data) {
	    this.formattedData = {
			html: data.content,
			subject: data.subject,
			from_email: data.fromEmail,
			from_name: data.fromName,
			to: [{
				email: data.toEmail,
				name: data.toName,
				type: "to"
			}]
		};
	}

	this.send = function(callback) {
		mandrill.messages.send({"message": this.formattedData, "async": false, "ip_pool": "Main Pool", "send_at": null}, function(result) {
		    if (callback) {
				callback(true, null);
			}
		}, function(e) {
		    if (callback) {
				callback(false, e);
			}
		});
	};
}
util.inherits(MandrillEmailSender, EmailSender);

module.exports = MandrillEmailSender;