router.push({
  url: "/message",
  render: function() {
    return ejs.render($("#tpl_Message_index")
      .html());
  },
  bind: function() {

  }
})
