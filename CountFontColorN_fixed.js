function CountFontColorN(countRange, colorRef) {
  var activeRg = SpreadsheetApp.getActiveRange();
  var activeSht = SpreadsheetApp.getActiveSheet();
  var activeformula = activeRg.getFormula();

  // 수식에서 첫 번째 인자(범위 주소) 추출
  var countRangeAddress = activeformula.match(/\((.*)\,/).pop().trim();
  // 수식에서 두 번째 인자(기준 색 셀 주소) 추출
  var colorRefAddress = activeformula.match(/\,(.*)\)/).pop().trim();

  // 문자열 주소로 Range 객체를 만든 뒤, 최신 API 사용
  var rangeObj = activeSht.getRange(countRangeAddress);
  var refCellObj = activeSht.getRange(colorRefAddress);

  // 범위의 글자색 → Color 객체 2차원 배열
  var fontColorObjects = rangeObj.getFontColorObjects();
  // 범위의 값(빈 셀 판별용) → 2차원 배열
  var values = rangeObj.getValues();

  // Color 객체를 hex 문자열로 변환한 2차원 배열
  var fontColors = fontColorObjects.map(function (row) {
    return row.map(function (colorObj) {
      if (!colorObj) return null;
      return colorObj.asRgbColor().asHexString();
    });
  });

  // 기준 셀 글자색 → Color 객체 → hex 문자열
  var fontColorRefObj = refCellObj.getFontColorObject();
  var fontColorRef = fontColorRefObj
    ? fontColorRefObj.asRgbColor().asHexString()
    : null;

  var countCells = 0;
  for (var i = 0; i < fontColors.length; i++) {
    for (var k = 0; k < fontColors[i].length; k++) {
      // 빈 셀 제외: 값이 없거나 공백만 있으면 카운트하지 않음
      var cellValue = values[i][k];
      var isEmpty = cellValue === null || cellValue === undefined ||
        (typeof cellValue === 'string' && cellValue.trim() === '');
      if (isEmpty) continue;

      if (fontColors[i][k] && fontColors[i][k] === fontColorRef) {
        countCells++;
      }
    }
  }

  return countCells;
}
