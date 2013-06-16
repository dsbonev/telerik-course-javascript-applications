/* globals requirejs */

requirejs.config({
  paths: {
    lib: '../../js/lib',
    jquery: [
      //'http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min',
      '../../js/lib/jquery.min'
    ]
  }
});

requirejs(
  ['jquery'],
  function ($) {
    'use strict';

    var students = [
      {
        firstName: 'Гошо',
        lastName: 'Учения',
        grade: 6
      },
      {
        firstName: 'Пешо',
        lastName: 'Тъпото',
        grade: 3
      }
    ];

    var table = $('<table></table>');

    table.append('<tr><th>First Name</th><th>Last Name</th><th>Grade</th></tr>');

    students.forEach(function (item) {
      table.append('<tr><td>' + item.firstName + '</td><td>' + item.lastName + '</td><td>' + item.grade + '</td></tr>');
    });

    $('#component_wrapper').html(table);
  }
);
