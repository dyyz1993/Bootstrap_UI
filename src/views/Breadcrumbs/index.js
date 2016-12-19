router.push({
  url: "/breadcrumbs",
  render: function() {
    return ejs.render($("#tpl_Breadcrumbs_index")
      .html());
  },
  bind: function() {}
})
