router.push({
  url: "/tabs",
  render: function() {
    return ejs.render($("#tpl_Tabs_index")
      .html());
  },
  bind: function() {}
})
