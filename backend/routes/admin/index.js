const express = require('express');
const router = express.Router();
const AuthRoute = require('./AuthRoute');
const CategoryRoute = require('./CategoryRoute');
const PostRoute = require('./PostRoute');
const ServiceRoute = require('./ServiceRoute');
const HeaderNavigationRoute = require('./HeaderNavigationRoute')
const ContactRoute = require('./ContactRoute');
const FooterNavigationRoute = require('./FooterNavigationRoute');
const SettingRoute = require('./SettingRoute');
const ProfileRoute = require('./ProfileRoute');
const FormRoute = require('./FormRoute')

router.use('/auth', AuthRoute);
router.use('/categories', CategoryRoute);
router.use('/posts', PostRoute);
router.use('/services', ServiceRoute);
router.use('/header-navigations', HeaderNavigationRoute)
router.use('/footer-navigations', FooterNavigationRoute)
router.use('/contacts', ContactRoute);
router.use('/setting', SettingRoute);
router.use('/profile', ProfileRoute);
router.use('/form', FormRoute);

module.exports = router;

