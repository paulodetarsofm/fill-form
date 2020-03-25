var resumo = '';
var first = '';

var loremIpsum = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vulputate aliquet turpis, non tincidunt neque bibendum ' +
  'ac. Donec tempor lorem sit amet odio sagittis imperdiet. Phasellus eget lectus non purus imperdiet hendrerit sed et sem. ' +
  'Morbi urna dolor, tristique a accumsan a, imperdiet malesuada ante. Aliquam neque leo, lacinia nec sodales sit amet, ' +
  'bibendum non tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',

  'Phasellus eget sapien est, et molestie nibh. Pellentesque semper dui non ipsum volutpat interdum. Nulla et elit est. ' +
  'Praesent tincidunt magna sed sem feugiat malesuada. Suspendisse fringilla lobortis erat ac ultricies. Nunc pellentesque ' +
  'elementum ultricies. Ut egestas pulvinar arcu eu fringilla. Pellentesque euismod congue facilisis.',

  'Phasellus id fringilla metus. In quis eros tellus. Pellentesque auctor vestibulum magna eget pellentesque. Proin at erat ' +
  'ante, iaculis porttitor massa. Morbi iaculis scelerisque dapibus. Vestibulum lacinia ornare quam vel viverra. Donec cursus ' +
  'sodales dapibus. In eget velit non purus blandit dapibus ut ac.',

  'Cras pulvinar, arcu vitae convallis ultrices, justo eros imperdiet erat, eget fringilla arcu augue vel neque. Duis risus ' +
  'arcu, sodales sit amet suscipit non, accumsan at ligula. Aliquam iaculis consectetur pellentesque. Phasellus rhoncus magna ' +
  'sit amet quam commodo mattis. Phasellus ac erat quis mauris blandit lacinia eu vel velit.',

  'Praesent eu nulla ac magna commodo interdum a sit amet nisi. Sed justo orci, faucibus nec volutpat id, adipiscing risus. ' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et est id magna posuere feugiat. Maecenas quis ips arcu. ' +
  'Integer vitae massa elit, eu scelerisque odio.'
];

$('input,select,textarea').each(function () {
  fn = this.name;
  ft = this.type;
  tag = this.tagName.toLowerCase();

  if (
    ft == 'hidden' || ft == 'button' || ft == 'submit' || ft == 'image' || this.disabled || this.readOnly ||
    this.offsetWidth === 0 || this.offsetHeight === 0 || this.style.display == 'none'
  ) {
    return;
  }

  if (isNaN($(this).attr('maxlength')) && (ft == 'text' || ft == 'password')) {
    resumo += 'Campo "' + fn + '" não está com maxlength definido\n';
  }

  if (first === '' && ft != 'checkbox' && ft != 'radio') {
    first = tag + '[name="' + fn + '"]';
  }

  vl = _rnd();

  if (/^rg/igm.test(fn)) {
    vl = _rg(true);
  }
  else if (/^cpf/igm.test(fn)) {
    vl = _cpf(true);
  }
  else if (/^cel/igm.test(fn) || ft == 'tel') {
    vl = _cel(true);
  }
  else if (/^(tel|fax)/igm.test(fn) || ft == 'tel') {
    vl = _tel(true);
  }
  else if (/^ddd/igm.test(fn)) {
    vl = _ddd(true);
  }
  else if (/^cep/igm.test(fn)) {
    vl = _cep(true);
  }
  else if (/^cnpj/igm.test(fn)) {
    vl = _cnpj(true);
  }
  else if (/^data/igm.test(fn)) {
    vl = _data(true);
  }
  else if (/^email/igm.test(fn) || ft == 'email') {
    vl = _email();
  }
  else if (/^numero/igm.test(fn)) {
    vl = Math.floor((Math.random() * 999) + 1);
  }
  else if (/^(url|site|website)/igm.test(fn) || ft == 'url') {
    vl = 'http://www.dominio.com.br/';
  }

  if (tag == 'textarea') {
    vl = _txt();
  }

  if (ft == 'password') {
    _i = ($(this).attr('maxlength') != 'undefined') ? $(this).attr('maxlength') : Math.round(Math.random() * 20);
    vl = _pwd(_i);
    $(this).data('password', vl);
  }

  if (ft == 'select-one') {
    tryagain = true;
    while (tryagain) {
      _o = parseInt($(this).find('option').length, 10);
      _i = Math.floor((Math.random() * _o));
      _s = $(this).find('option').get(_i);
      if (_s.value !== '') {
        vl = _s.value;
        tryagain = false;
      }
    }
  }
  if (ft == 'checkbox' || ft == 'radio') {
    $('input[name="' + fn + '"]').each(function () {
      this.checked = false;
    });

    _f = parseInt($('input[name="' + fn + '"]').length, 10);
    _y = Math.floor((Math.random() * _f));
    _fc = $('input[name="' + fn + '"]').get(_y);
    _tr = $('input[name="' + fn + '"]:eq(' + _y + ')');

    _tr.trigger('click');
    _fc.checked = true;
    return;
  }

  if (vl !== '') {
    if (!isNaN($(this).attr('maxlength')) && typeof vl == 'string') {
      vl = vl.substr(0, $(this).attr('maxlength'));
    }
    $(this).val(vl);
  }

  $(this).trigger('focusout');
  if (ft == 'select-one') {
    $(this).trigger('change');
  }
});

if (resumo !== '') {
  alert(resumo);
}

if (first !== '') {
  window.setTimeout(function () {
    $(first).trigger('focus').trigger('blur');
  }, 500);
}

function _tel(z) {
  var on = (typeof z == 'undefined') ? false : true;
  var n = 9;
  var n1 = _r(n);
  var n2 = _r(n);
  var n3 = _r(n);
  var n4 = _r(n);
  var n5 = _r(n);
  var d = _ddd();
  var tel = '' + n2 + n5 + n4 + n2 + '-' + n3 + n3 + n4 + n1;

  // Só adiciona o DDD se o campo DDD não existir
  var ret = ($('input[name^="ddd"]').length === 0) ? '(' + d + ') ' + tel : tel;

  if (on) {
    ret = ret.replace(/[^0-9]/gim, '');
  }
  return ret;
}

function _cel(z) {
  var on = (typeof z == 'undefined') ? false : true;
  var n = 9;
  var n1 = _r(n);
  var n2 = _r(n);
  var n3 = _r(n);
  var n4 = _r(n);
  var n5 = _r(n);
  var d = _ddd();
  var tel = '' + n2 + n5 + n4 + n2 + '-' + n3 + n3 + n4 + n1;

  // Só adiciona o DDD se o campo DDD não existir
  var ret = ($('input[name^="ddd"]').length === 0) ? (d == 11) ? '(' + d + ') 9' + tel : '(' + d + ') ' + tel : tel;

  if (on) {
    ret = ret.replace(/[^0-9]/gim, '');
  }
  return ret;
}

function _data(z) {
  var on = (typeof z == 'undefined') ? false : true;
  var d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  var m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  var a = [];

  for (i = 1930; i <= 2030; i++) a.push(i);
  var id = Math.floor((Math.random() * d.length) - 1);
  var im = Math.floor((Math.random() * m.length) - 1);
  var ia = Math.floor((Math.random() * a.length) - 1);
  var _d = d[id];
  var _m = m[im];
  var _a = a[ia];
  if (_d >= 1 && _d <= 9) _d = '0' + _d;
  if (_m >= 1 && _m <= 9) _m = '0' + _m;
  var dt = _d + '/' + _m + '/' + _a;
  return (on) ? dt.replace(/[^0-9]/, '') : dt;
}

function _cpf(z) {
  var on = (typeof z == 'undefined') ? false : true;
  var n = 9;
  var n1 = _r(n);
  var n2 = _r(n);
  var n3 = _r(n);
  var n4 = _r(n);
  var n5 = _r(n);
  var n6 = _r(n);
  var n7 = _r(n);
  var n8 = _r(n);
  var n9 = _r(n);
  var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - (_m(d1, 11));
  if (d1 >= 10) d1 = 0;
  var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - (_m(d2, 11));
  if (d2 >= 10) d2 = 0;
  var cpf = '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
  if (on) {
    cpf = cpf.replace(/[^0-9]/gim, '');
  }
  return cpf;
}

function _cnpj(z) {
  var on = (typeof z == 'undefined') ? false : true;
  var n = 9;
  var n1 = _r(n);
  var n2 = _r(n);
  var n3 = _r(n);
  var n4 = _r(n);
  var n5 = _r(n);
  var n6 = _r(n);
  var n7 = _r(n);
  var n8 = _r(n);
  var n9 = 0;
  var n10 = 0;
  var n11 = 0;
  var n12 = 1;
  var d1 = (n12 * 2) + (n11 * 3) + (n10 * 4) + (n9 * 5) + (n8 * 6) + (n7 * 7) + (n6 * 8) + (n5 * 9) + (n4 * 2) + (n3 * 3) + (n2 * 4) + (n1 * 5);
  d1 = 11 - (_m(d1, 11));
  if (d1 >= 10) d1 = 0;
  var d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
  d2 = 11 - (_m(d2, 11));
  if (d2 >= 10) d2 = 0;
  var cnpj = '' + n1 + n2 + '.' + n3 + n4 + n5 + '.' + n6 + n7 + n8 + '/' + n9 + n10 + n11 + n12 + '-' + d1 + d2;
  if (on) {
    cnpj = cnpj.replace(/[^0-9]/gim, '');
  }
  return cnpj;
}

function _cep(z) {
  var cp = (typeof z == 'undefined') ? true : false;
  c = [
    '13092-150', '13500-000', '13500-110', '13500-313', '13506-555', '13537-000', '20260-160', '20511-170', '20511-330', '20521-110',
    '20530-350', '78931-000', '78956-000', '78967-800', '78968-000', '78973-000', '78990-000', '78993-000', '78994-000'
  ];
  cep = c[_r(c.length)];
  return (cp) ? cep.replace(/[^0-9]/, cep) : cep;
}

function _rg(z) {
  var cp = (typeof z == 'undefined') ? true : false;
  _n = 4;
  rg1 = new Array(_n);
  rg2 = new Array(_n);
  rg1[0] = '911225341';
  rg2[0] = '91.122.534-1';
  rg1[1] = '403289440';
  rg2[1] = '4.032.894-40';
  rg1[2] = '418757896';
  rg2[2] = '41.875.789-6';
  rg1[3] = '2977269';
  rg2[3] = '2.977.269';
  rg1[4] = '429434121';
  rg2[4] = '42.943.412-1';
  return (cp) ? rg2[_r(_n)] : rg1[_r(_n)];
}

function _pwd(ln) {
  l = (typeof ln == 'undefined') ? 10 : ln;
  var pwd = '';
  var _c = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '@', '#', '$', '%', '&', '*', '-', '_', '=', '+', '?'
  ];

  for (var idx = 0; idx < l; idx++) {
    index = Math.floor(Math.random() * _c.length);
    pwd += _c[index];
  }
  return pwd;
}

function _m(dd, dv) {
  return Math.round(dd - (Math.floor(dd / dv) * dv));
}

function _r(n) {
  return Math.round(Math.random() * n);
}

function _ddd() {
  var _d = [
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28,
    31, 32, 33, 34, 35, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48, 49,
    51, 53, 54, 55,
    61, 62, 63, 64, 65, 66, 67, 68, 69,
    71, 73, 74, 75, 77, 79,
    81, 82, 83, 84, 85, 86, 87, 88, 89,
    91, 92, 93, 94, 95, 96, 97, 98, 99
  ];
  var i = Math.round(Math.random() * _d.length);
  return _d[i];
}

function _email() {
  var vl = 'abcdef23456789';
  var rt = '';
  var tmp;

  for (i = 0; i < 10; i++) {
    tmp = vl.charAt(Math.round(vl.length * Math.random()));
    rt = rt + tmp;
  }

  tmp = '';
  rt = rt + '@';

  for (j = 0; j < 8; j++) {
    tmp = vl.charAt(Math.round(vl.length * Math.random()));
    rt = rt + tmp;
  }
  rt = rt + '.com.br';
  return rt;
}

function _txt() {
  return loremIpsum.split('\n\n');
}

function _rnd() {
  var i = Math.floor(Math.random() * loremIpsum.length);
  return loremIpsum[i];
}
