router.push({
  url: "/table",
  render: function() {
    return ejs.render($("#tpl_Table_index")
      .html());
  },
  bind: function() {

  }
})
