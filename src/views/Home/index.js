router.push({
  url: "/",
  render: function() {
    return ejs.render($("#tpl_Home_index")
      .html());
  },
  bind: function() {

  }
})
