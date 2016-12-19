router.push({
  url: "/button",
  render: function() {
    return ejs.render($("#tpl_Button_index")
      .html());
  },
  bind: function() {

  }
})
