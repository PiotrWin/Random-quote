// jshint -W117

'use strict';

require('./materialize/sass/materialize.scss');
require('./materialize/js/bin/materialize.min.js');
require('./animate.css');
const $ = require('./jquery-3.3.1.min.js');

let colors = [
    ['red darken-1', '#b71c1c'],
    ['pink darken-1', '#880e4f'],
    ['purple darken-1', '#4a148c'],
    ['deep-purple darken-1', '#311b92'],
    ['indigo darken-1', '#1a237e'],
    ['light-blue darken-1', '#01579b'],
    ['cyan darken-1', '#006064'],
    ['teal darken-1', '#004d40'],
    ['green darken-1', '#1b5e20'],
    ['light-green darken-1', '#33691e'],
    ['yellow darken-3', '#f57f17'],
    ['orange darken-1', '#e65100'],
    ['deep-orange darken-1', '#bf360c'],
    ['brown darken-1', '#3e2723']
];

$('document').ready(() => {
    newQuote();
});

$('#new').click(() => {
    $('main').removeClass('animated fadeInLeft');
    $('main').addClass('animated fadeOutRight');
    setTimeout(() => {
        newQuote();
    }, 250);

});

$('#tweet').click(() => {
    let text = $('#quote').text();
    let author = $('#author').text();
    let msg = encodeURIComponent(`${text} ${author}`);
    window.open(`https://twitter.com/intent/tweet?text=${msg}`);
});

// jshint ignore: start
async function newQuote() {
    let {title: author, content: quote} = await getQuote();
    let colorID = Math.floor(Math.random() * (colors.length));
    $('#quote').html(quote);
    $('#author').html(`- ${author}`);
    $('button').attr('class', `waves-effect waves-light btn ${colors[colorID][0]}`);
    $('main').removeClass('animated fadeOutRight');
    $('main').addClass('animated fadeInLeft');
    $('body').css('background-color', colors[colorID][1]);
    $('main').css('color', colors[colorID][1]);
    $('main').css('visibility', 'visible');
}

function getQuote() {
    return $.getJSON({
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=&_jsonp=?',
        cache: false
    }).then(response => {
        return response.shift();
    }).catch(e => {
        throw new Error(e);
    });
}
// jshint ignore: end


