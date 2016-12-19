router.push({
  url: "/modal",
  render: function() {
    return ejs.render($("#tpl_Modal_index")
      .html());
  },
  bind: function() {}
})
