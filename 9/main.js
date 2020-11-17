var matrixExample = [
  [ 1, 2, 3, 4 ],
  [ 4, 5, 6, 5 ],
  [ 7, 8, 9, 7 ],
  [ 7, 8, 9, 7 ]
];

function sumUpDiagonals(matrix) {
  const leng = matrix.length - 1;
  let main = 0;
  let scnd = 0;

  matrix.forEach( (el, ind) => {
    console.log(el, ind);
    main += el[ind];
    scnd += el[leng - ind];
  });

  return 'Сумма основной диагонали = ' + main + ';\r\nСумма вторичной диагонали = ' + scnd;
}

console.log(sumUpDiagonals(matrixExample));