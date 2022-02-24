// Global Variable
let jsonUrl =
  'https://opensheet.elk.sh/1mUV29bCyMUZiwdl7B6OswR-C_jJZWNV3hc63A35GBM8/toJSONAPI';
let dataArr = [];

const init = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.id = 'table-wrapper';
  const tbl = document.createElement('table');
  tbl.id = 'tbl';
  tableWrapper.appendChild(tbl);
  d3.json(jsonUrl).then(function (data) {
    dataArr = data;
    console.log(dataArr[0].Adam);
    const headerTr = tbl.insertRow();
    headerTr.className = 'header-row';
    for (const [key, value] of Object.entries(dataArr[0])) {
      const headerTd = headerTr.insertCell();
      headerTd.className = 'cell';

      headerTd.appendChild(document.createTextNode(key));
    }
    for (let i = 0; i < dataArr.length; i++) {
      const tr = tbl.insertRow();
      tr.className = 'row';
      for (const [key, value] of Object.entries(dataArr[i])) {
        if (value) {
          const td = tr.insertCell();
          td.className = 'cell';
          td.appendChild(document.createTextNode(value));
        } else {
          const td = tr.insertCell();
          td.className = 'cell';
          td.appendChild(document.createTextNode('-'));
        }
      }
    }
    tbl.rows[0].className = 'header-row';
    for (let i = 1; i < tbl.rows.length; i++) {
      tbl.rows[i].cells[0].className = 'header-row';
    }
  });
  document.body.appendChild(tableWrapper);

  // makeCharts.init();
};

const makeCharts = {
  //fetch JSON
  init: function () {},
};

window.onload = init();
