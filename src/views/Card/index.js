router.push({
  url: "/card",
  render: function() {
    return ejs.render($("#tpl_Card_index")
      .html());
  },
  bind: function() {}
})
