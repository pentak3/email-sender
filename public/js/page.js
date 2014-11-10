//https://github.com/hongymagic/jQuery.serializeObject
$.fn.serializeObject = function () {
    "use strict";
    var a = {}, b = function (b, c) {
        var d = a[c.name];
        "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
    };
    return $.each(this.serializeArray(), b), a
};

var Email = Backbone.Model.extend({
	urlRoot : '/emails',

	defaults : {
		fromName : '',
		fromEmail : '',
		toName : '',
		toEmail : '',
		subject : '',
		content : ''
	},

	validation : {
		fromName : {
			required : true
		},
		fromEmail : {
			required: true,
			pattern: 'email'	
		},
		toName : {
			required : true
		},
		toEmail : {
			required: true,
			pattern: 'email'	
		},
		subject : {
			required : true
		},
		content : {
			required : true
		}
	}

});

var EmailForm = Backbone.View.extend({
	el : '.page',
	model : new Email(),
	initialize: function(){
		Backbone.Validation.bind(this, {
			valid: function (view, attr) {
				var $el = view.$('[name=' + attr + ']'), 
				$group = $el.closest('.form-group');
				$group.removeClass('has-error');
				$group.find('.help-block').html('').addClass('hidden');
		    },
		    invalid: function (view, attr, error) {
				var $el = view.$('[name=' + attr + ']'), 
				$group = $el.closest('.form-group');
				$group.addClass('has-error');
				$group.find('.help-block').html(error).removeClass('hidden');
		    }
		});
	},

	render : function() {
		var template = _.template($("#email-form-template").html(), {});
		this.$el.html(template);
	},

	events : {
		'submit .email-form' : 'sendEmail'
	},

	sendEmail : function(e) {
		var bodyElem = $('[name=content]');
		bodyElem.val(bodyElem.val().replace(/(?:\r\n|\r|\n)/g, '<br />')); //replace \n by <br/>
		
		var data = $(e.currentTarget).serializeObject();
		this.model.set(data);
		if (this.model.isValid(true)) {
			this.model.save(null, {
				success : function(email) {
					alert("Email Successfully sent! \nIn case you dont see the email in your inbox, check your spam folder.");
					e.currentTarget.reset();
				},
				error : function(model, error) {
					alert("Oops, something went wrong.");
				}
			});
		}
		return false;
	}
});

var emailForm = new EmailForm();
emailForm.render();