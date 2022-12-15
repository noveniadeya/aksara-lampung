/*jslint browser: true*/
'use strict';

function createNode(element) {
    return document.createElement(element); // Membuat tipe elemen yang dilewatkan melalui parameter
};


function append(parent, el) {
    return parent.appendChild(el); 
};

var kataAsal = document.getElementById('kataAsal');
var aksaraAsal = document.getElementById('aksaraAsal');
var petunjukAksara = document.getElementById('petunjukAksara');

kataAsal.onkeyup = function () {
   
    let kataAsals = kataAsal.value.toLowerCase();

    // Jika spasi saja, tidak diproses
    if (!kataAsals.replace(/\s/g, '').length) {
        hasilTerjemah.innerHTML = '';
      
    } else {
        
        let kataAl = kataAsals.split(/\s+/);
        
        if (kataAl[kataAl.length - 1] == ('')) {
            kataAl.pop();
        }

        
        hasilTerjemah.innerHTML = '';
     
        let strong = createNode("strong");
        strong.innerHTML = kataAsal.value + ' : <br/>';
        let spanAksara = createNode('span');
        spanAksara.classList.add("aksaraLampung");
        append(strong, spanAksara);
        append(hasilTerjemah, strong);

        for (let i = 0; i < kataAl.length; i++) {
           
            spanAksara.innerHTML += aksarakan(kataAl[i]) + ' ';
        }

       
    }
};

aksaraAsal.onkeyup = function () {
    prosesAksaraAsal(aksaraAsal.value);
  


};

function prosesAksaraAsal(aksaraAsals) {
    // Jika spasi saja, tidak diproses
    if (!aksaraAsals.replace(/\s/g, '').length) {
        aksaraAsal.classList.remove("aksaraLampung");
        hasilTerjemah.innerHTML = '';
    } else {
        aksaraAsal.classList.add("aksaraLampung");
        // Mengubah kata/kalimat yang diketik menjadi array String
        let aksaraAl = aksaraAsals.split(/\s+/);
        // jika elemen akhir kosong, elemen akhir dibuang
        if (aksaraAl[aksaraAl.length - 1] == ('')) {
            aksaraAl.pop();
        }

        
        hasilTerjemah.innerHTML = '';
       
        let strong = createNode("strong");
        strong.innerHTML = alfabetkan(aksaraAsal.value) + ' : <br/>';
        let spanAksara = createNode('span');
        spanAksara.classList.add("aksaraLampung");
        append(strong, spanAksara);
        append(hasilTerjemah, strong);

        for (let i = 0; i < aksaraAl.length; i++) {
            //menambahkan ke bagian strong untuk diaksarakan
            spanAksara.innerHTML += aksaraAl[i] + ' ';
        }

  
    }
}

window.addEventListener('keydown', function (e) {
  
    const keybutton = document.querySelector(`button[data-key="${e.keyCode}"]`);

    if (!keybutton) return;
    ketikAksara(keybutton);
});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; 
    this.classList.remove('tekan');
}

function ketikAksara(e) {
    const keyCode = e.getAttribute("data-key");
    const keychar = e.querySelector(".kbd");

    

    if (keyCode === "32") {
        aksaraAsal.value += " ";
    } else
    if (keyCode === "8") {
        aksaraAsal.value = aksaraAsal.value.slice(0, -1);
    } else {
        aksaraAsal.value += keychar.textContent;
    }
    prosesAksaraAsal(aksaraAsal.value);
    e.classList.add("tekan");
}

const keybuttons = document.querySelectorAll(`button`);
keybuttons.forEach(keyb => keyb.addEventListener('transitionend', removeTransition));
keybuttons.forEach(keyb => keyb.addEventListener('click', function () {
    ketikAksara(keyb);
}));

var inputs = document.querySelectorAll("input");
inputs.forEach(input =>
    input.addEventListener('keydown', function (e) {
        e.stopPropagation();
        const keybutton = document.querySelector(`button[data-key="${e.keyCode}"]`);
        keybutton.classList.add("tekan");
    }, false)
);
