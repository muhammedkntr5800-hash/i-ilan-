let ilanlar = [
  { baslik: "Frontend Developer", sirket: "TechSoft", konum: "İstanbul", resim: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", aciklama: "HTML, CSS, JS bilen geliştirici aranıyor." },
  { baslik: "Grafik Tasarımcı", sirket: "Creative Studio", konum: "Ankara", resim: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg", aciklama: "Adobe Photoshop ve Illustrator deneyimli." },
  { baslik: "Veri Analisti", sirket: "DataWorks", konum: "İzmir", resim: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg", aciklama: "SQL ve Python bilen analist aranıyor." },
  { baslik: "Mobil Uygulama Geliştirici", sirket: "AppLab", konum: "Bursa", resim: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg", aciklama: "React Native veya Flutter deneyimli." },
  { baslik: "Satış Uzmanı", sirket: "MarketPro", konum: "Antalya", resim: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg", aciklama: "Müşteri ilişkileri güçlü satış uzmanı." },
  { baslik: "Siber Güvenlik Uzmanı", sirket: "SecureNet", konum: "İstanbul", resim: "https://images.pexels.com/photos/5380643/pexels-photo-5380643.jpeg", aciklama: "Ağ güvenliği ve penetration test bilgisi." },
  { baslik: "Proje Yöneticisi", sirket: "BuildTech", konum: "Kayseri", resim: "https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg", aciklama: "Agile metodolojilerde deneyimli." },
  { baslik: "Makine Mühendisi", sirket: "AutoParts", konum: "Konya", resim: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg", aciklama: "CAD programları bilen mühendis aranıyor." },
  { baslik: "Dijital Pazarlama Uzmanı", sirket: "AdVision", konum: "Gaziantep", resim: "https://images.pexels.com/photos/3183171/pexels-photo-3183171.jpeg", aciklama: "SEO ve sosyal medya yönetimi deneyimli." },
  { baslik: "Yapay Zeka Araştırmacısı", sirket: "AI Labs", konum: "Eskişehir", resim: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg", aciklama: "Makine öğrenmesi ve derin öğrenme bilgisi." }
];

const ilanlarDiv = document.getElementById("ilanlar");
const form = document.getElementById("form");
const basvuruListesi = document.getElementById("basvuru-listesi");
const basvuruSayisi = document.getElementById("basvuru-sayisi");

// LocalStorage'dan başvuruları yükle
let basvurular = JSON.parse(localStorage.getItem("basvurular")) || [];

function ilanlariGoster() {
  ilanlarDiv.innerHTML = "";
  ilanlar.forEach((ilan, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${ilan.resim}" alt="${ilan.baslik}">
      <h3>${ilan.baslik}</h3>
      <p><strong>Şirket:</strong> ${ilan.sirket}</p>
      <p><strong>Konum:</strong> ${ilan.konum}</p>
      <p>${ilan.aciklama}</p>
      <button onclick="basvur(${index})">Başvur</button>
    `;
    ilanlarDiv.appendChild(card);
  });
}

// Başvur butonu işlevi
function basvur(index) {
  const ilan = ilanlar[index];
  alert(`${ilan.baslik} ilanına başvurdunuz!`);
  basvurular.push(ilan);
  localStorage.setItem("basvurular", JSON.stringify(basvurular)); // Kaydet
  basvurulariGoster();
}

// Başvuruları listeleme
function basvurulariGoster() {
  basvuruListesi.innerHTML = "";
  basvurular.forEach((ilan, i) => {
    const li = document.createElement("li");
    li.textContent = `${ilan.baslik} - ${ilan.sirket} (${ilan.konum})`;
    const silBtn = document.createElement("button");
    silBtn.textContent = "Sil";
    silBtn.onclick = () => basvuruSil(i);
    li.appendChild(silBtn);
    basvuruListesi.appendChild(li);
  });

  // Başvuru sayısını güncelle
  basvuruSayisi.textContent = `Toplam ${basvurular.length} başvuru yaptınız.`;
}

// Başvuru silme
function basvuruSil(index) {
  basvurular.splice(index, 1);
  localStorage.setItem("basvurular", JSON.stringify(basvurular)); // Güncelle
  basvurulariGoster();
}

// Formdan ilan ekleme
form.addEventListener("submit", e => {
  e.preventDefault();
  const yeniIlan = {
    baslik: document.getElementById("baslik").value,
    sirket: document.getElementById("sirket").value,
    konum: document.getElementById("konum").value,
    resim: document.getElementById("resim").value || "https://via.placeholder.com/250x150",
    aciklama: document.getElementById("aciklama").value
  };
  ilanlar.push(yeniIlan);
  ilanlariGoster();
  form.reset();
});

// İlk yüklemede ilanları ve başvuruları göster
ilanlariGoster();
basvurulariGoster();
