var templates = {};
var ItemModel = Backbone.Model.extend({
  idAttribute: "id"
});

var Items = {
  $body: $("tbody"),
  collection: [],
  create: function(item_data) {
    item_data.id = this.collection.length + 1;
    var item = new ItemModel(item_data);

    this.collection.push(item);
    return item;
  },
  render: function() {
    this.$body.html(templates.items({
      items: this.collection
    }));
  },
  seedCollection: function() {
    items_json.forEach(this.create.bind(this));
  },
  sortBy: function(prop) {
    this.collection = _(this.collection).sortBy(function(m) {
      return m.attributes[prop];
    });
    this.render();
  },
  empty: function() {
    this.collection = [];
    this.render();
  },
  remove: function(e) {
    e.preventDefault();
    var $e = $(e.currentTarget);
    var model = _(this.collection).findWhere({ id: $e.data("id") });

    this.collection = _(this.collection).without(model);
    this.render();
  },
  bindEvents: function() {
    this.$body.on("click", "a", this.remove.bind(this));
  },
  init: function() {
    this.seedCollection();
    this.sortBy("name");
    this.bindEvents();
  }
};

$("[type='text/x-handlebars']").each(function() {
  var $template = $(this);

  templates[$template.attr("id")] = Handlebars.compile($template.html());
});
Handlebars.registerPartial("item", templates.item);

$('form').on('submit', function(e) {
  e.preventDefault();
  var inputs = $(this).serializeArray();
  var attrs = {};
  var item;

  inputs.forEach(function(input) {
    attrs[input.name] = input.value;
  });

  item = Items.create(attrs);
  Items.$body.append(templates.item(item.toJSON()));
  this.reset();
});

$('th').on('click', function() {
  var prop = $(this).data('prop');

  Items.sortBy(prop);
});

$('p a').on('click', function(e) {
  e.preventDefault();
  Items.empty();
});

Items.init();