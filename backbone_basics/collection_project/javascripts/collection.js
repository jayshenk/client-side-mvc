var App = {
  $body: $("tbody"),
  template: Handlebars.compile($("#items").html()),
  render: function() {
    this.$body.html(this.template({
      items: this.Items.models
    }));
  },
  removeItem: function(e) {
    e.preventDefault();
    var model = this.Items.get(+$(e.target).data("id"));
    this.Items.remove(model);
  },
  bindEvents: function() {
    this.$body.on("click", "a", this.removeItem.bind(this));
  },
  init: function() {
    this.Items = new ItemsCollection(items_json);
    this.Items.sortByName();
    this.render();
    this.bindEvents();
  }
};

var ItemModel = Backbone.Model.extend({
  idAttribute: "id",
  initialize: function() {
    this.collection.incrementID();
    this.set("id", this.collection.lastID);
  }
});

var ItemsCollection = Backbone.Collection.extend({
  model: ItemModel,
  lastID: 0,
  incrementID: function() {
    this.lastID++;
  },
  sortBy: function(prop) {
    this.models = _(this.models).sortBy(function(m) {
      return m.attributes[prop];
    });
    App.render();
  },
  sortByName: function() {
    this.sortBy("name");
  },
  initialize: function() {
    this.on("remove reset", App.render.bind(App));
    this.on("add", this.sortByName);
  }
});

$('form').on('submit', function(e) {
  e.preventDefault();
  var inputs = $(this).serializeArray();
  var attrs = {};
  var item;

  inputs.forEach(function(input) {
    attrs[input.name] = input.value;
  });

  item = App.Items.add(attrs);
  this.reset();
});

$('th').on('click', function() {
  var prop = $(this).data('prop');
  App.Items.sortBy(prop);
});

$('p a').on('click', function(e) {
  e.preventDefault();
  App.Items.reset();
});

Handlebars.registerPartial("item", $("#item").html());
App.init();