import { subjectList } from "./subjects.js";

export function checkFields() {
  const sName = document.querySelector('.js-subj-name-input').value; 
  const sUnits = document.querySelector('.js-units-input').value;
  const sGrade = document.querySelector('.js-grade-input').value;

  return sName && sUnits && sGrade ? true : false;

  //return !!(sName && sUnits && sGrade);
}

export function checkSubjectList() {
  return subjectList.length > 0;
}

export function resetGrid() {
  if(subjectList.length === 0){
    document.querySelector('.js-subj-list')
    .innerHTML = '<div style="height: 50px; opacity: 0;">filler</div>';
  }
}

export function formatGrade(grade) {
  return grade.toFixed(2);
}

export function formatGwa(gwa) {
  return gwa.toFixed(3);
}

export function clearResult() {
  document.querySelector('.js-output-section')
    .innerHTML = '';
}