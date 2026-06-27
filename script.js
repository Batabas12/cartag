// ==============================
// CARTAG V2
// Menü Sistemi
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCZA6Qzjo7NfJX_k71dljwq5VJcRaGFfOA",
  authDomain: "cartag-ab2e3.firebaseapp.com",
  projectId: "cartag-ab2e3",
  storageBucket: "cartag-ab2e3.firebasestorage.app",
  messagingSenderId: "964714702055",
  appId: "1:964714702055:web:1f7b7b5cd4e3c6b69bee42",
  measurementId: "G-DL0NQJKQRD"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

const loginBtn = document.getElementById("loginBtn");

const adminPanel = document.getElementById("adminPanel");

const profileBtn = document.getElementById("profileBtn");

const profilePanel = document.getElementById("profilePanel");

const closeProfile = document.getElementById("closeProfile");


// Menü Aç

menuBtn.onclick = function () {

    menu.style.right = "0";

    overlay.style.display = "block";

}


// Menü Kapat

closeMenu.onclick = function () {

    menu.style.right = "-320px";

    overlay.style.display = "none";

}


// Arka plana basınca kapa

overlay.onclick = function () {

    menu.style.right = "-320px";

    overlay.style.display = "none";

    profilePanel.style.display = "none";

}



// ==============================
// Giriş Sistemi
// ==============================

loginBtn.onclick = function () {

    let sifre = prompt("Şifre");

    let kayitli =

        localStorage.getItem("cartagPassword")

        || "1234";

    if (sifre == kayitli) {

        loginBtn.style.display = "none";

        adminPanel.style.display = "block";

        alert("Giriş Başarılı");

    } else {

        alert("Şifre Hatalı");
        }

    }



    // ==============================
    // Profil Paneli
    // ==============================

    profileBtn.onclick = function () {

        profilePanel.style.display = "block";

    }


    closeProfile.onclick = function () {

        profilePanel.style.display = "none";

    }



    // ==============================
    // INPUTLAR
    // ==============================

    const brand = document.getElementById("brand");

    const model = document.getElementById("model");

    const instagram = document.getElementById("instagram");

    const phone = document.getElementById("phone");

    const photo = document.getElementById("photo");



    const showBrand = document.getElementById("showBrand");

    const showModel = document.getElementById("showModel");

    const showInstagram = document.getElementById("showInstagram");

    const showPhone = document.getElementById("showPhone");

    const showPhoto = document.getElementById("showPhoto");

    const showMessage = document.getElementById("showMessage");

    const showLocation = document.getElementById("showLocation");

    const showPark = document.getElementById("showPark");



    const saveBtn = document.getElementById("saveBtn");
    // ==============================
    // KAYDET
    // ==============================

    saveBtn.onclick = function () {
        const carId = new URLSearchParams(window.location.search).get("id") || "CT-X9A4P8";

setDoc(doc(db, "arabalar", carId), {

    marka: brand.value,

    model: model.value,

    telefon: phone.value,

    instagram: instagram.value

}, { merge: true });

        //localStorage.setItem("brand", brand.value);
        //localStorage.setItem("model", model.value);
        //localStorage.setItem("instagram", instagram.value);
        //localStorage.setItem("phone", phone.value);

        localStorage.setItem("showBrand", showBrand.checked);
        localStorage.setItem("showModel", showModel.checked);
        localStorage.setItem("showInstagram", showInstagram.checked);
        localStorage.setItem("showPhone", showPhone.checked);
        localStorage.setItem("showPhoto", showPhoto.checked);
        localStorage.setItem("showMessage", showMessage.checked);
        localStorage.setItem("showLocation", showLocation.checked);
        localStorage.setItem("showPark", showPark.checked);

        guncelle();

        profilePanel.style.display = "none";

        alert("Profil Kaydedildi");

    }



    // ==============================
    // SAYFA AÇILINCA
    // ==============================

    window.onload = function () {
        console.log("window.onload çalıştı");
        const params = new URLSearchParams(window.location.search);

const carId = params.get("id") || "CT-X9A4P8";

const aracRef = doc(db, "arabalar", carId);

getDoc(aracRef).then((arac) => {

    if (arac.exists()) {

        const veri = arac.data();

        brand.value = veri.marka || "";

        model.value = veri.model || "";

        phone.value = veri.telefon || "";

    }

});

        //brand.value = localStorage.getItem("brand") || "";

        //model.value = localStorage.getItem("model") || "";

        //instagram.value = localStorage.getItem("instagram") || "";

        //phone.value = localStorage.getItem("phone") || "";

        showBrand.checked = true;
        showModel.checked = true;

        showInstagram.checked = true;

        showPhone.checked = true;

        showPhoto.checked = localStorage.getItem("showPhoto") == "true";

        showMessage.checked = localStorage.getItem("showMessage") == "true";

        showLocation.checked = localStorage.getItem("showLocation") == "true";

        showPark.checked = localStorage.getItem("showPark") == "true";

        guncelle();
        mesajRozetiGuncelle();
        const carImage = document.getElementById("carImage");

        if (showPhoto.checked) {

            carImage.style.display = "block";

        } else {

            carImage.style.display = "none";

        }
        let kayitliFoto = localStorage.getItem("carPhoto");

        if (kayitliFoto) {

            document.getElementById("carImage").src =
                kayitliFoto;

        }

    }



    // ==============================
    // EKRANI GÜNCELLE
    // ==============================

    function guncelle() {

        const carTitle = document.getElementById("carTitle");

        const instagramBtn = document.getElementById("instagramBtn");

        const phoneBtn = document.getElementById("phoneBtn");

        const messageBtn = document.getElementById("messageBtn");

        const locationBtn = document.getElementById("locationBtn");

        const parkBtn = document.getElementById("parkBtn");



        // Araç Adı

        let yazi = "";

        if (showBrand.checked) {

            yazi += brand.value + " ";

        }

        if (showModel.checked) {

            yazi += model.value;

        }

        if (yazi == "") {

            yazi = "Araç Eklenmedi";

        }

        carTitle.innerHTML = yazi;



        // Instagram

        instagramBtn.style.display =

            showInstagram.checked

                ?

                "block"

                :

                "none";



        // Telefon

        phoneBtn.style.display =

            showPhone.checked

                ?

                "block"

                :

                "none";



        // Mesaj

        messageBtn.style.display =

            showMessage.checked

                ?

                "block"

                :

                "none";



        // Konum

        locationBtn.style.display =

            showLocation.checked

                ?

                "block"

                :

                "none";



        // Park

        parkBtn.style.display =

            showPark.checked

                ?

                "block"

                :

                "none";

    }
    // ==============================
    // INSTAGRAM
    // ==============================

    const instagramBtn = document.getElementById("instagramBtn");

    instagramBtn.onclick = function () {

        let hesap = localStorage.getItem("instagram");

        if (hesap == null || hesap == "") {

            alert("Instagram hesabı girilmemiş.");

            return;

        }

        window.open(

            "https://instagram.com/" + hesap,

            "_blank"

        );

    }
    // ==============================
    // TELEFON
    // ==============================

    const phoneBtn = document.getElementById("phoneBtn");

    phoneBtn.onclick = function () {

        let tel = localStorage.getItem("phone");

        if (tel == null || tel == "") {

            alert("Telefon numarası girilmemiş.");

            return;

        }

        window.location.href = "tel:" + tel;

    }
    // ==============================
    // KONUM
    // ==============================

    const locationBtn = document.getElementById("locationBtn");

    locationBtn.onclick = function () {

    const lat = localStorage.getItem("parkLat");
    const lng = localStorage.getItem("parkLng");

    if (!lat || !lng) {

        alert("Henüz park konumu kaydedilmemiş.");

        return;

    }

    window.open(

        `https://www.google.com/maps?q=${lat},${lng}`,

        "_blank"

    );

}
    // ==============================
    // PARK KAYDET
    // ==============================

    const parkBtn = document.getElementById("parkBtn");

    parkBtn.onclick = function () {

        navigator.geolocation.getCurrentPosition(

            function (pos) {

                localStorage.setItem(

                    "parkLat",

                    pos.coords.latitude

                );

                localStorage.setItem(

                    "parkLng",

                    pos.coords.longitude

                );

                alert("Park Konumu Kaydedildi.");

            }

        );

    }
    //============================
    // MESAJ GÖNDER
    //============================

    const messageBtn = document.getElementById("messageBtn");

    const sendMessagePanel = document.getElementById("sendMessagePanel");

    const closeSendMessage = document.getElementById("closeSendMessage");

    const sendMessageBtn = document.getElementById("sendMessageBtn");

    const senderName = document.getElementById("senderName");

    const senderMessage = document.getElementById("senderMessage");

    messageBtn.onclick = function () {

        sendMessagePanel.style.display = "block";

        overlay.style.display = "block";

    }

    closeSendMessage.onclick = function () {

        sendMessagePanel.style.display = "none";

        overlay.style.display = "none";

    }

    sendMessageBtn.onclick = function () {

        if (senderMessage.value == "") {

            alert("Mesaj boş olamaz.");

            return;

        }

        let mesajlar =

            JSON.parse(

                localStorage.getItem("mesajlar")

                || "[]"

            );

        mesajlar.push({

            isim: senderName.value,

            mesaj: senderMessage.value,

            tarih: new Date().toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
})

        });

        localStorage.setItem(

            "mesajlar",

            JSON.stringify(mesajlar)

        );
        mesajRozetiGuncelle();

        senderName.value = "";

        senderMessage.value = "";

        alert("Mesaj Gönderildi.");

        sendMessagePanel.style.display = "none";

        overlay.style.display = "none";

    }
    //============================
    // MESAJLARI GÖSTER
    //============================

    const messagesBtn = document.getElementById("messagesBtn");
    const messagePanel = document.getElementById("messagePanel");
    const closeMessages = document.getElementById("closeMessages");
    const messageList = document.getElementById("messageList");

    messagesBtn.onclick = function () {

        messagePanel.style.display = "block";
        overlay.style.display = "block";

        mesajlariYukle();

    }

    closeMessages.onclick = function () {

        messagePanel.style.display = "none";
        overlay.style.display = "none";

    }

    function mesajlariYukle() {

        messageList.innerHTML = "";

        let mesajlar = JSON.parse(localStorage.getItem("mesajlar") || "[]");
        const messageTitle = document.getElementById("messageTitle");

messageTitle.innerHTML =
"📩 Gelen Mesajlar (" + mesajlar.length + ")";

        if (mesajlar.length == 0) {

            messageList.innerHTML = "<center>Henüz mesaj yok.</center>";

            return;

        }

        mesajlar.forEach(function (item, index) {

            let kart = document.createElement("div");

            kart.className = "messageCard";

            kart.innerHTML = `

<div class="msgName">
👤 ${item.isim == "" ? "İsimsiz" : item.isim}
</div>

<div class="msgText">
💬 ${item.mesaj}
</div>

<div class="msgDate">
🕒 ${item.tarih}
</div>

<button class="deleteBtn" onclick="mesajSil(${index})">
🗑 Sil
</button>

`;

            messageList.appendChild(kart);

        });
        let clear = document.createElement("button");

clear.className = "deleteAllBtn";

clear.innerHTML = "🗑 TÜM MESAJLARI SİL";

clear.onclick = function () {

    if (confirm("Bütün mesajlar silinsin mi?")) {

        localStorage.removeItem("mesajlar");

        mesajlariYukle();

    }

};

messageList.appendChild(clear);

    }



    //============================
    // MESAJ SİL
    //============================

    function mesajSil(index) {

        let mesajlar = JSON.parse(localStorage.getItem("mesajlar") || "[]");

        mesajlar.splice(index, 1);

        localStorage.setItem(

            "mesajlar",

            JSON.stringify(mesajlar)

        );

        mesajlariYukle();
        mesajRozetiGuncelle();

    }
    //============================
    // FOTOĞRAF YÜKLE
    //============================

    photo.addEventListener("change", function () {

        const dosya = this.files[0];

        if (!dosya) return;

        const okuyucu = new FileReader();

        okuyucu.onload = function (e) {

            localStorage.setItem(
                "carPhoto",
                e.target.result
            );

            document.getElementById("carImage").src =
                e.target.result;

        };

        okuyucu.readAsDataURL(dosya);

    });
    //============================
    // AYARLAR
    //============================

    const settingsBtn = document.getElementById("settingsBtn");

    const settingsPanel = document.getElementById("settingsPanel");

    const closeSettings = document.getElementById("closeSettings");

    settingsBtn.onclick = function () {

        settingsPanel.style.display = "block";

        overlay.style.display = "block";

    }

    closeSettings.onclick = function () {

        settingsPanel.style.display = "none";

        overlay.style.display = "none";

    }
    //============================
    // ŞİFRE
    //============================

    const changePasswordBtn = document.getElementById("changePasswordBtn");

    changePasswordBtn.onclick = function () {

        let yeni = prompt("Yeni Şifre");

        if (yeni == "" || yeni == null) {

            return;

        }

        localStorage.setItem(

            "cartagPassword",

            yeni

        );

        alert("Şifre Değiştirildi.");

    }
    //============================
    // TÜM VERİLERİ SİL
    //============================

    const resetBtn = document.getElementById("resetBtn");

    resetBtn.onclick = function () {

        if (confirm("Bütün bilgiler silinsin mi?")) {

            localStorage.clear();

            location.reload();

        }

    }
    
//============================
// YEDEK AL
//============================

const backupBtn = document.getElementById("backupBtn");

backupBtn.onclick = function () {

    let veri = {};

    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);

        veri[key] = localStorage.getItem(key);

    }

    const blob = new Blob(

        [JSON.stringify(veri, null, 4)],

        { type: "application/json" }

    );

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "cartag_backup.json";

    a.click();

    URL.revokeObjectURL(a.href);

    alert("Yedek oluşturuldu.");

}
//============================
// YEDEĞİ GERİ YÜKLE
//============================

const restoreBtn = document.getElementById("restoreBtn");

const restoreFile = document.getElementById("restoreFile");

restoreBtn.onclick = function () {

    restoreFile.click();

}

restoreFile.onchange = function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const veri = JSON.parse(e.target.result);

        localStorage.clear();

        for (let key in veri) {

            localStorage.setItem(

                key,

                veri[key]

            );

        }

        alert("Yedek başarıyla geri yüklendi.");

        location.reload();

    }

    reader.readAsText(file);

}
function mesajRozetiGuncelle() {

    const badge = document.getElementById("messageBadge");

    const mesajlar = JSON.parse(localStorage.getItem("mesajlar") || "[]");

    badge.innerHTML = mesajlar.length > 0 ? `(${mesajlar.length})` : "";

}
const params = new URLSearchParams(window.location.search);

const carId = params.get("id") || "CT-X9A4P8";

const aracRef = doc(db, "arabalar", carId);

const arac = await getDoc(aracRef);

console.log("ID =", carId);

if (arac.exists()) {
    console.log("Firebase Bağlandı!");
    console.log(arac.data());
} else {
    console.log("Araç bulunamadı.");
}