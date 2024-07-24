import { checkFields, checkSubjectList, formatGrade, formatGwa, clearResult, resetGrid } from "./utils.js";

class Subject {
  subjectName;
  creditUnits;
  grade;
  qualityPoints;

  constructor(subjectDetails){
    this.subjectName = subjectDetails.subjectName;
    this.creditUnits = subjectDetails.creditUnits;
    this.grade = subjectDetails.grade;
    this.qualityPoints = subjectDetails.qualityPoints;
  }
}
/*
export let subjectList = [{
  subjectName: 'Math',
  creditUnits: 3,
  grade: 1.00,
  qualityPoints: 3,
}, {
  subjectName: 'Science',
  creditUnits: 3,
  grade: 1.25,
  qualityPoints: 3.75,
}, {
  subjectName: 'Programming',
  creditUnits: 3,
  grade: 1.00,
  qualityPoints: 3,
}].map((subject) => {
  return new Subject(subject);
});
*/

export let subjectList = [];

export function renderSubjectList() {
  let subjectListHTML = '';

  subjectList.forEach((subject) => {
    const {subjectName, creditUnits, grade} = subject;

    subjectListHTML += `
      <div class="subject-container">
        <div class="subject-name">${subjectName}</div>
        <div class="subject-units">${creditUnits}</div>
        <div class="subject-grade">${formatGrade(grade)}</div>
        <div class="remove-subj js-remove-subj">Remove Subject</div>
      </div>
    `;
  });

  document.querySelector('.js-subj-list').innerHTML = subjectListHTML;

  document.querySelectorAll('.js-remove-subj')
    .forEach((removeBtn, index) => {
      removeBtn.addEventListener('click', () => {
        subjectList.splice(index, 1);
        renderSubjectList();
        clearResult();
        resetGrid();
      });
    });
}

function addSubject() {
  const subjectName = document.querySelector('.js-subj-name-input').value;
  const creditUnits = Number(document.querySelector('.js-units-input').value);
  const grade = Number(document.querySelector('.js-grade-input').value);

  const subject = {
    subjectName: subjectName,
    creditUnits: creditUnits,
    grade: grade,
    qualityPoints: creditUnits * grade
  };

  subjectList.push(subject);
  renderSubjectList();

  document.querySelector('.js-subj-name-input').value = '';
  document.querySelector('.js-units-input').value = '';
  document.querySelector('.js-grade-input').value = '';
}

export function computeAll() {
  let totalGrade = 0;
  let totalUnits = 0;

  subjectList.forEach((subject) => {
    totalGrade += subject.qualityPoints;
    totalUnits += subject.creditUnits;
  });

  const computedGwa = (Math.round((totalGrade / totalUnits) * 1000)) / 1000;

  document.querySelector('.js-output-section')
    .innerHTML = `
      <span class="gwa-label">GWA:</span> 
      <span class="computed-gwa">${formatGwa(computedGwa)}</span>
      <span class="total-units-label">Total Units:</span>
      <span class="computed-units">${totalUnits}</span>
    `;
}

document.querySelector('.js-add-subj')
  .addEventListener('click', () => {
    if(checkFields()) {
      addSubject();
      renderSubjectList();
      clearResult();
    } else {
      alert('Please fill all fields...');
    }
  })

document.querySelector('.js-compute-button')
  .addEventListener('click', ()=> {
    if(checkSubjectList()) {
      computeAll();
    } else {
      alert('No subjects to be computed...');
    }
  });