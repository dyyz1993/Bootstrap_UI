router.push({
  url: '/switch',
  render: function() {
    return ejs.render($("#tpl_Switch_index")
      .html());
  },
  bind: function() {}
})
