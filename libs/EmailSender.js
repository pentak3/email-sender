var util = require('util');

function EmailSender() {

	this.set = function(data) {

	};

	this.send = function(callback) {
		if (callback) {
			callback(false, 'No child override');
		}
	};

}

module.exports = EmailSender;