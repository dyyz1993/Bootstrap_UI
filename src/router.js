$(function() {

  const router = new Router({
    container: '#router-view',
    enter: 'view-enter',
    leave: 'view-leave',
    enterTimeout: 250,
    leaveTimeout: 250
  })
  require("./views/Button/index.js");
  require("./views/Home/index.js");
  require("./views/Form/index.js");
  require("./views/Collapse/index.js");
  require("./views/Grid/index.js");
  require("./views/Table/index.js");
  require("./views/Card/index.js");
  require("./views/Breadcrumbs/index.js");
  require("./views/Message/index.js");
  require("./views/Modal/index.js");
  require("./views/Notification/index.js");
  require("./views/Switch/index.js");
  require("./views/Tabs/index.js");
  require("./views/Tooltip/index.js");

  router.setDefault("/")
    .init()
});
