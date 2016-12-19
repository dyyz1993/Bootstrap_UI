router.push({
  url: "/form",
  render: function() {
    return ejs.render($("#tpl_Form_index")
      .html());
  },
  bind: function() {

  }
})
