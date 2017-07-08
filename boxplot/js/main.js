const divValores = document.querySelector('div.valores');
const divMinimo = document.querySelector('div.minimo');
const divMaximo = document.querySelector('div.maximo');
const divMediana = document.querySelector('div.mediana');
const divQuartil1 = document.querySelector('div.quartil1');
const divQuartil2 = document.querySelector('div.quartil2');
const divQuartil3 = document.querySelector('div.quartil3');

const Boxplot = {
  valores: [],
  get minimo() {
    return this.valores[0];
  },
  get maximo() {
    return this.valores[this.valores.length-1];
  },
  get mediana() {
    if (this.valores.length % 2 === 1) {
      return this.valores[parseInt(this.valores.length / 2)];
    } else {
      let a = this.valores[parseInt(this.valores.length / 2)];
      let b = this.valores[parseInt(this.valores.length / 2) - 1];
      return (a + b) / 2;
    }
  },
  get quartil1() {
    if (this.valores.length > 3) {
      let quartil1 = [];
      if (this.valores.length%2 != 0) {
        for (var i=0; i < (this.valores.length/2)-1; i++) {
           quartil1[i] = this.valores[i];
        };
      }
      if (this.valores.length%2 === 0) {
        for (var i = 0; i < (this.valores.length/2); i++) {
           quartil1[i] = this.valores[i];
        }
      }
      return quartil1;
    };
  },
  get quartil2() {
    if (this.valores.length > 3) {
      return this.mediana;
    }
  },
  get quartil3(){
    if (this.valores.length > 3) {
      let quartil3 = [];
      if (this.valores.length%2 != 0) {
        for (var i= parseInt(this.valores.length/2)+1; i < this.valores.length; i++) {
          quartil3.push(this.valores[i]);
        };
      }
      if (this.valores.length%2 === 0) {
        for (var i = (this.valores.length/2); i < this.valores.length; i++) {
          quartil3.push(this.valores[i]);
        }
      }
      return quartil3;      
    }
  },
  atualizaView: function () {
   let html = "";
   for (let v of this.valores) {
      html += `<p>${v}</p>`;
   }
   divValores.innerHTML = html;
   divMinimo.textContent = this.minimo;
   divMaximo.textContent = this.maximo;
   divMediana.textContent = this.mediana;
   divQuartil1.textContent = this.quartil1;
   divQuartil2.textContent = this.quartil2;
   divQuartil3.textContent = this.quartil3;

  },
   adiciona: function (valor) {
     let n = parseInt(valor);
     if (!isNaN(n) && n >= 0) {
       this.valores.push(n);
       this.valores.sort(function (a, b) {
         return a - b
       });
       this.atualizaView();
     }
   }
};

const button1 = document.querySelector("button.button1");
button1.addEventListener('click', function (e) {
  var input = document.querySelector('input');
  var l = input.value;
  Boxplot.adiciona(l);
    e.preventDefault();
});
