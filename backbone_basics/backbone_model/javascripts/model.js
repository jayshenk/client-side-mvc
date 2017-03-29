var productTemplate = Handlebars.compile($("#product").html());
var formTemplate = Handlebars.compile($("#form").html());

var ProductModel = Backbone.Model.extend({
  render: function() {
    $("article").html(productTemplate(this.toJSON()));
  },
  update: function() {
    var date = new Date(this.get("date"));

    this.set({
      datetime: date.toISOString(),
      date_formatted: date.toString()
    });
    this.render();
  },
  initialize: function() {
    this.update();
    this.on("change", this.update);
  }
});

var product = new ProductModel(product_json);

$("article").html(productTemplate(product.toJSON()));
$("fieldset").html(formTemplate(product.toJSON()));

$("form").on("submit", function(e) {
  e.preventDefault();
  var $this = $(this);

  product.set({
    name: $this.find("[name=name]").val(),
    description: $this.find("[name=description]").val(),
    date: (new Date()).valueOf(),
  });
});