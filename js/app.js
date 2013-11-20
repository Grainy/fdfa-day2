App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path:':post_id'});
	});
});

App.PostsRoute = Ember.Route.extend({
	model:function() {
		return posts;
	}
});

App.PostRoute = Ember.Route.extend({
	model:function(params) {
		return posts.findBy('id', params.post_id);
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,
	actions: {
		edit: function() {
			this.set('isEditing', true);
		},

		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});

Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

Ember.Handlebars.helper('format-markdown', function(input) {
	var showdown = new Showdown.converter();
	return new Handlebars.SafeString(showdown.makeHtml(input));
});

var posts = [{
	id:'1',
	title:'First Post ',
	author: {name:"Steven Grain"},
	date: new Date('11-19-2013'),
	excerpt:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, ex, illo cumque quis totam saepe quisquam dicta hic eos aliquid est odit itaque earum id vol",
	body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, ex, illo cumque quis totam saepe quisquam dicta hic eos aliquid est odit itaque earum id voluptatibus aliquam vel perspiciatis repellat facilis natus quam aut ab libero et blanditiis tenetur commodi labore atque omnis voluptate placeat facere sit illum! Dolorem, autem, eaque, architecto nam excepturi nobis id quod odio ipsum error voluptas aliquid optio quasi tempore facilis praesentium in blanditiis consequuntur doloremque nisi temporibus sed cum expedita omnis repellendus fuga veritatis. Sit, excepturi, eligendi, perferendis nam odio totam quaerat repellendus ducimus tempore necessitatibus consectetur laboriosam quas sint doloribus beatae sequi a!"
}, {
	id:'2',
	title:'Second Post ',
	author: {name:"Steven Grain"},
	date: new Date('11-09-2013'),
	excerpt:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, ex, illo cumque quis totam saepe quisquam dicta hic eos aliquid est odit itaque earum id vol",
	body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, ex, illo cumque quis totam saepe quisquam dicta hic eos aliquid est odit itaque earum id voluptatibus aliquam vel perspiciatis repellat facilis natus quam aut ab libero et blanditiis tenetur commodi labore atque omnis voluptate placeat facere sit illum! Dolorem, autem, eaque, architecto nam excepturi nobis id quod odio ipsum error voluptas aliquid optio quasi tempore facilis praesentium in blanditiis consequuntur doloremque nisi temporibus sed cum expedita omnis repellendus fuga veritatis. Sit, excepturi, eligendi, perferendis nam odio totam quaerat repellendus ducimus tempore necessitatibus consectetur laboriosam quas sint doloribus beatae sequi a!"
}];