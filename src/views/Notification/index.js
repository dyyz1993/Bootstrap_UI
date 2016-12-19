router.push({
  url: "/notification",
  render: function() {
    return ejs.render($("#tpl_Notification_index")
      .html());
  },
  bind: function() {}
})
