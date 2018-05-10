// Muuttujia

// Objekti johon uutiset haetaan Firebasesta
var uutisetObjekti = 0;

// Tässä on nykyisen uutisen järjestysnumero (0 ... jsonNews:n koko - 1)
var nykyinenUutinen = 0;

// Tähän tallennetaan ajastimen tunniste, jotta voidaan pysäyttää se
var interval = 0;

// Oliko uutisen numero tallennettuna?
var tallennettu = window.localStorage.getItem("kuva");

if (tallennettu == null) {
  // Ei ollut tallessa eli aloitetaan nollasta
  nykyinenUutinen = 0;
} else {
  // Oli tallessa!
  nykyinenUutinen = Number(tallennettu);
  // console.log("Uutinen oli tallessa! Numero: " + nykyinenUutinen);
}

haeJson();

// Tämä funktio hakee uutiset ja starttaa karusellin
function haeJson() {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://laress111.firebaseio.com/.json";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      console.log(this.responseText);
      uutisetObjekti = JSON.parse(this.responseText);

      // Näytetään eka kuva
      vaihdaKuva();
      // Aloitetaan sitten karusellin pyörittäminen
      interval = setInterval(vaihdaSeuraavaan, 4000);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

// Tämä vaihtaa kuvan siihen kuvaan, johon nykyinenUutinen osoittaa
function vaihdaKuva() {
  document.getElementById('karuselli').innerHTML = "<img class='karusellikuva' src='" + uutisetObjekti.uutiset[nykyinenUutinen].sisalto + "'>";
  // Laitetaan kuvan numero muistiin
  window.localStorage.setItem("kuva", nykyinenUutinen);
}

function vaihdaSeuraavaan() {
  // Mikä on seuraavan järjestysnumero?
  if (nykyinenUutinen == (uutisetObjekti.uutiset.length - 1)) {
    // Laskuri pyörähtää ympäri alkuun
    nykyinenUutinen = 0;
  } else {
    // Kasvatetaan yhdellä
    nykyinenUutinen += 1;
  }

  vaihdaKuva();
}

function vaihdaEdelliseen() {
  // Mikä on seuraavan järjestysnumero?
  if (nykyinenUutinen == 0) {
    // Laskuri pyörähtää ympäri loppuun
    nykyinenUutinen = uutisetObjekti.uutiset.length - 1;
  } else {
    // Vähennetään yhdellä
    nykyinenUutinen -= 1;
  }

  vaihdaKuva();
}

function vaihdaNapinTeksti() {
  var nappi = document.getElementById("nappula");
  if (nappi.textContent == "Toista") {
    // Käynnistetään karuselli, neljän sekunnin vaihto
    interval = setInterval(vaihdaSeuraavaan, 4000);
    nappi.textContent = "Tauko";
  } else {
    // Pysäytetään karuselli
    clearInterval(interval);
    nappi.textContent = "Toista";
  }
}
