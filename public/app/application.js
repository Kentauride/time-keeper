/**
 * This file defines the AngularJS module "TimeKeeper".
 *
 * @author  https://github.com/lukemcfarlane
 * @date    Dec 2014
 */
var app = angular.module('TimeKeeper', ['ngCookies', 'ui.bootstrap']);
app.config(function($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
});
app.constant('clientID', '3MVG9ZL0ppGP5UrAf73ZbMDyZy9pnYaPu9YUJI2Q16WHh.okcCJuNrcrb8_YBT3CQ3o4iHEzdvq5t.jwYDNWk');