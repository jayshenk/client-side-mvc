$(function() {
  $("nav").on("click", "a", function(e) {
    e.preventDefault();
    var $e = $(e.target);
    var idx = $e.attr("href");

    switchPage(idx);

    history.pushState({ idx: idx }, $e.text(), location.pathname + idx);
  });

  $(window).on("popstate", function(e) {
    var state = e.originalEvent.state;

    switchPage(state === null ? "#page_1" : state.idx);
  });

  if (location.hash) {
    switchPage(location.hash);
  }

  function switchPage(idx) {
    $(".active").removeClass("active");
    $("nav a[href='" + idx + "']").addClass("active");
    $("article").hide().filter(idx).show();
  }
});
