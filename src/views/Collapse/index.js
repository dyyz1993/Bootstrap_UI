router.push({
  url: "/collapse",
  render: function() {
    return ejs.render($("#tpl_Collapse_index")
      .html());
  },
  bind: function() {
    $('#accordion')
      .collapse()
  }
})
