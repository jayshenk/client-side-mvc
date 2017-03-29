var PostModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",
  setUser: function() {
    var self = this;
    var user = new UserModel({ id: self.get("userId") });

    user.fetch({
      success: function(model) {
        self.set("user", model);
      }
    });
  },
  initialize: function() {
    if (this.has("userId")) { this.setUser(); }
    this.on("change:userId", this.setUser);
    this.on("change", function(model) {
      model.has("user") && renderPost(model);
    });
  }
});

var UserModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/users"
});

var post_1 = new PostModel({ id: 1 });

post_1.fetch();

var post_2 = new PostModel({
  id: 2,
  title: "My Great Post",
  body: "Let me tell you",
  userId: 2
});

var post_html = $("#post").html();

function renderPost(model) {
  var $post = $(post_html);

  $post.find("h1").text(model.get("title"));
  $post.find("header p").text("By " + model.get("user").get("name"));
  $post.find("header + p").text(model.get("body"));
  $(document.body).html($post);
}