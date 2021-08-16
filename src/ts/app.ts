// js imports
import 'angular';
import 'bootstrap';
import 'angular-animate';
import 'angularjs-toaster';

// styles imports
import '../css/styles.scss';
import '../css/tournament.less';
import '../css/tournamentBracket.less';

// controllers imports
import TournamentCtrl from './controller/TournamentCtrl';

// angular module configuration
const angular = require('angular');
const app = angular.module('tournamentApp', ['toaster', 'ngAnimate']);

app.controller('tournamentCtrl', TournamentCtrl);