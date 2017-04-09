var App = {
  init: function() {
    this.Items = new ItemsCollection(items_json);
    this.View = new ItemsView({ collection: this.Items });
    this.Items.sortByName();
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
  sortByProp: function(prop) {
    this.comparator = prop;
    this.sort();
    this.trigger("rerender");
  },
  sortByName: function() {
    this.sortByProp("name");
  },
  initialize: function() {
    this.on("add", this.sortByName);
  }
});

var ItemsView = Backbone.View.extend({
  el: "tbody",
  template: Handlebars.compile($("#items").html()),
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON()
    }));
  },
  events: {
    "click a": "removeItem"
  },
  removeItem: function(e) {
    e.preventDefault();
    var model = this.collection.get(+$(e.target).data("id"));
    this.collection.remove(model);
  },
  initialize: function() {
    this.listenTo(this.collection, "remove reset rerender", this.render);
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
  App.Items.sortByProp(prop);
});

$('p a').on('click', function(e) {
  e.preventDefault();
  App.Items.reset();
});

Handlebars.registerPartial("item", $("#item").html());
App.init();