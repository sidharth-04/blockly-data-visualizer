let gameObj;

const files = {
  'visualizer': {
    'assets': [
      'settings.png',
      'dataVisualizerStarter.png',
      'errorPage.png'
    ]
  }
};

function initGame(gameType, options) {
  gameObj = new Game.default(gameType);
  gameObj.setup(options);

  gameObj.setFailure((code) => {
    console.log(code);
    console.log('failed attempt');
  });
  gameObj.setSuccess(() => {
    console.log('successful attempt');
  });

  gameObj.loadBlocklyImgs({});

  let assets = fetchAssets(gameType);
  gameObj.loadAssets(assets);

  document.querySelector('#runcode').addEventListener('click',() => {
    gameObj.runCode();
    console.log(gameObj.blocklyToJavascript());
  });
  document.querySelector('#restartcode').addEventListener('click',() => {
    gameObj.restart();
  });
}

function runGame(json, starterCode) {
    gameObj.loadLevel(json);
    gameObj.loadCode(starterCode);
}

function fetchAssets(gameType) {
  let fileName;
  let assets = {};
  for (let i = 0; i < files[gameType]['assets'].length; i ++) {
    fileName = files[gameType]['assets'][i];
    assets[removeExtension(fileName)] = `assets/${fileName}`;
  }
  return assets;
}

function removeExtension(fileName) {
  return fileName.split('.')[0];
}

// Initialize Game
const options = {
  "structure": "codingEnvironment",
  "blockly": {
    'toolboxRef': 'toolbox',
    'blocklyAreaRef': 'blocklyArea',
    'blocklyRef': 'blockly',
    'renderer': 'thrasos',
    'categoriesInToolbox': true
  },
  "game": {
    'canvas': 'canvas',
    'project': false
  }
};
initGame("visualizer", options);

// Load the JSON
const json = {
  "toolbox": [
    ["tables", ["load_table", "create_freq_table", "display", "colour_scheme"]],
    ["charts", ["create_barchart", "create_piechart", "display", "colour_scheme"]],
    ["variables", []]
  ],
  "anchorBlocks": ["run_code"],
  "environmentSetting": {
    "loadedTables": ["icecream.csv", "airtravel.csv", "biostats.csv"],
    "tableContext": "csv/"
  },
  "goal": {
    "goal": "drawBarChart"
  }
};
const starterCode = "<xml xmlns='https://developers.google.com/blockly/xml'><variables><variable id='pu(D\`K8wcBZ6-xn$$a)z'>dataset</variable><variable id='AFwyol6]9#JAqy^]b8*U'>freqTable</variable></variables><block type='run_code' id='Y..H8?aGHZ%oBFY)gEuc' deletable='false' x='25' y='25'><next><block type='colour_scheme' id='z2YW|8ME7H0\`Zpu]o/!q'><field name='COLOUR'>#f6bd60</field><next><block type='variables_set' id='/irwrxg;82+oW~Dy0I)7'><field name='VAR' id='pu(D\`K8wcBZ6-xn$$a)z'>dataset</field><value name='VALUE'><block type='load_table' id='(F1?0ci=O?=KHzT/lU(:'><field name='DATASET_URL'>icecream.csv</field></block></value><next><block type='display' id='-%r6Qb1xY#UG8,R;,p5d'><value name='DISPLAY_ELEMENT'><block type='variables_get' id='3JrTnAOAnYA;u6o=K#%*'><field name='VAR' id='pu(D`K8wcBZ6-xn$$a)z'>dataset</field></block></value><next><block type='variables_set' id='2I4zZKFkMupwHu_kxao1'><field name='VAR' id='AFwyol6]9#JAqy^]b8*U'>freqTable</field><value name='VALUE'><block type='create_freq_table' id='#w1!=-1j#ebr!573CTN]'><field name='TITLE'>FreqTable</field><field name='COLUMN'>flavour</field><value name='TABLE'><block type='variables_get' id='g]=lH3w4niglj9|ID-e5'><field name='VAR' id='pu(D`K8wcBZ6-xn$$a)z'>dataset</field></block></value></block></value><next><block type='display' id='s/m[t*9;SMtCJdSL/#Pm'><value name='DISPLAY_ELEMENT'><block type='variables_get' id='ja*Vg!0!0MBfoxu\`-y0*'><field name='VAR' id='AFwyol6]9#JAqy^]b8*U'>freqTable</field></block></value><next><block type='colour_scheme' id='7Av?o/~,L]+NR|e3p~g('><field name='COLOUR'>#f28482</field><next><block type='display' id='+{;)yit#uiMWtGvwd?Y;'><value name='DISPLAY_ELEMENT'><block type='create_barchart' id='_t:ku?Ccy#4=6FD#h.ys'><field name='TITLE'>BarChart</field><field name='X'>flavour</field><field name='Y'>frequency</field><value name='TABLE'><block type='variables_get' id='-%CFy[*@zquTpZXObGd#'><field name='VAR' id='AFwyol6]9#JAqy^]b8*U'>freqTable</field></block></value></block></value><next><block type='display' id='K#L=xN7qi$~EMkT8R{Gn'><value name='DISPLAY_ELEMENT'><block type='create_piechart' id='[zlH0-RakD.bb{^\`ni;W'><field name='TITLE'>PieChart</field><field name='LABELS'>flavour</field><field name='VALUES'>frequency</field><value name='TABLE'><block type='variables_get' id='BaFWE+[S)g@MRsLeh7Sl'><field name='VAR' id='AFwyol6]9#JAqy^]b8*U'>freqTable</field></block></value></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>";
runGame(json, starterCode);
