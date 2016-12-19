'use strict';

$(function () {

  var router = new Router({
    container: '#router-view',
    enter: 'view-enter',
    leave: 'view-leave',
    enterTimeout: 250,
    leaveTimeout: 250
  });
  router.push({
    url: "/button",
    render: function render() {
      return ejs.render($("#tpl_Button_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/",
    render: function render() {
      return ejs.render($("#tpl_Home_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/form",
    render: function render() {
      return ejs.render($("#tpl_Form_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/collapse",
    render: function render() {
      return ejs.render($("#tpl_Collapse_index").html());
    },
    bind: function bind() {
      $('#accordion').collapse();
    }
  });

  router.push({
    url: "/grid",
    render: function render() {
      return ejs.render($("#tpl_Grid_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/table",
    render: function render() {
      return ejs.render($("#tpl_Table_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/card",
    render: function render() {
      return ejs.render($("#tpl_Card_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/breadcrumbs",
    render: function render() {
      return ejs.render($("#tpl_Breadcrumbs_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/message",
    render: function render() {
      return ejs.render($("#tpl_Message_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/modal",
    render: function render() {
      return ejs.render($("#tpl_Modal_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/notification",
    render: function render() {
      return ejs.render($("#tpl_Notification_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: '/switch',
    render: function render() {
      return ejs.render($("#tpl_Switch_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/tabs",
    render: function render() {
      return ejs.render($("#tpl_Tabs_index").html());
    },
    bind: function bind() {}
  });

  router.push({
    url: "/tooltip",
    render: function render() {
      return ejs.render($("#tpl_Tooltip_index").html());
    },
    bind: function bind() {}
  });

  router.setDefault("/").init();
});
//# sourceMappingURL=router.js.map
