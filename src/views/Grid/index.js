router.push({
  url: "/grid",
  render: function() {
    return ejs.render($("#tpl_Grid_index")
      .html());
  },
  bind: function() {

  }
})
