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

      return OOP.Object.create(Student).initialize(
        'firstName' + oneBasedIndex, 'lastName' + oneBasedIndex, age, grade);
    });

    var classList = arrayOf(2, function (index) {
      var oneBasedIndex = index + 1,
        grade = studentList[0].grade,
        name = grade + String.fromCharCode('A'.charCodeAt(0) + index),
        teacherAge = index + 25,
        speciality = 'JS' + oneBasedIndex,
        formTeacher = OOP.Object.create(Teacher).initialize(
          'firstName' + oneBasedIndex, 'lastName' + oneBasedIndex, teacherAge, speciality);

      return OOP.Object.create(Class).initialize(
        name, studentList.length * 2, studentList, formTeacher);
    });

    var schoolList = arrayOf(2, function (index) {
      var oneBasedIndex = index + 1;

      return OOP.Object.create(School).initialize(
        'Academy' + oneBasedIndex, 'Sofia', classList);
    });

    console.log('introduce a teacher:', classList[0].formTeacher.introduce());
    console.log('introduce a student:', studentList[0].introduce());

    var replacer = null,
      indentation = '  ';

    console.log(JSON.stringify(schoolList, replacer, indentation));
    SchoolRepository.set(schoolList);
    console.log('stored and retrieved successfully: ',
      JSON.stringify(schoolList, replacer, '  ') === JSON.stringify(SchoolRepository.get(), replacer, indentation));

    var repositorySize = SchoolRepository.get().length;
    console.log('current repository size: ', repositorySize);
    console.log('remove nonexistent school');
    SchoolRepository.remove(OOP.Object.create(School).initialize(
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
