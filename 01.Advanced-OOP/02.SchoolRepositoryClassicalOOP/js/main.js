/* globals requirejs */

requirejs.config({
  paths: {
    lib: '../../js/lib'
  }
});

requirejs(
  ['school_repository', 'school', 'class', 'teacher', 'student', 'lib/oop', 'lib/array_of'],
  function (SchoolRepository, School, Class, Teacher, Student, OOP, arrayOf) {
    'use strict';

    var studentList = arrayOf(3, function (index) {
      var oneBasedIndex = index + 1,
        age = 7,
        grade = 1;

      return new Student(
        'firstName' + oneBasedIndex, 'lastName' + oneBasedIndex, age, grade);
    });

    var classList = arrayOf(2, function (index) {
      var oneBasedIndex = index + 1,
        grade = studentList[0].grade,
        name = grade + String.fromCharCode('A'.charCodeAt(0) + index),
        teacherAge = index + 25,
        speciality = 'JS' + oneBasedIndex,
        formTeacher = new Teacher(
          'firstName' + oneBasedIndex, 'lastName' + oneBasedIndex, teacherAge, speciality);

      return new Class(
        name, studentList.length * 2, studentList, formTeacher);
    });

    var schoolList = arrayOf(2, function (index) {
      var oneBasedIndex = index + 1;

      return new School(
        'Academy' + oneBasedIndex, 'Sofia', classList);
    });

    console.log('introduce a teacher:', classList[0].formTeacher.introduce());
    console.log('introduce a student:', studentList[0].introduce());

    var replacer = null,
      identation = '  ';

    console.log(JSON.stringify(schoolList, replacer, identation));
    SchoolRepository.set(schoolList);
    console.log('stored and retrieved successfully: ',
      JSON.stringify(schoolList, replacer, '  ') === JSON.stringify(SchoolRepository.get(), replacer, identation));

    var repositorySize = SchoolRepository.get().length;
    console.log('current repository size: ', repositorySize);
    console.log('remove nonexistent school');
    SchoolRepository.remove(new School(
        'Nonexistent', 'Sofia', classList));
    console.log('repository is untouched:',
      repositorySize === SchoolRepository.get().length);

    repositorySize = SchoolRepository.get().length;
    console.log('current repository size: ', repositorySize);
    console.log('remove existent school');
    SchoolRepository.remove(schoolList.slice(-1)[0]);
    console.log('repository size is decreased by one:',
      repositorySize === SchoolRepository.get().length + 1);

    repositorySize = SchoolRepository.get().length;
    console.log('current repository size: ', repositorySize);
    console.log('add school');
    SchoolRepository.add(schoolList.slice(-1)[0]);
    console.log('repository size is increased by one:',
      repositorySize === SchoolRepository.get().length - 1);

    repositorySize = SchoolRepository.get().length;
    console.log('current repository size: ', repositorySize);
  }
);
