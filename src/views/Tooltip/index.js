router.push({
  url: "/tooltip",
  render: function() {
    return ejs.render($("#tpl_Tooltip_index")
      .html());
  },
  bind: function() {}
})
