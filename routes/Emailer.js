var MailGunEmailSender = require('../libs/MailGunEmailSender');
var MandrillEmailSender = require('../libs/MandrillEmailSender');

var Emailer = {

	sendEmail : function(req, res, next) {
		//TODO - Server side validation
		//{fromName:'fromName', fromEmail:'fromEmail@fromEmail.com', toName :'toName', toEmail:'toEmail@toEmail.com',subject:'subject',content:'body of email'}

		var provider1 = new MandrillEmailSender();
		provider1.set(req.body);
		provider1.send(function(status, msg){
			if (status) {
				res.send({});
			} else {
				var provider2 = new MailGunEmailSender();
				provider2.set(req.body);
				provider2.send(function(status, msg){
					if (status) {
						res.send({});
					} else {
						next(new Error('Unable to send email'));
					}
				});
			}
		});
	}

};

module.exports = Emailer;