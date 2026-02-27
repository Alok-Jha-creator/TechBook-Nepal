Sahi kura! Maf gara — aba TechBook Nepal ko concept bata nai bujhau.

---

## TechBook Nepal Bata Nai Bujhau

---

## 📁 `pages/` — Website Ka Alag Alag Screens

TechBook Nepal ma 3 type ka users cha — Customer, Technician, Admin. Tiniharu ko lagi alag alag screens chaincha.

---

### 👤 `customer/` — Customer Le Dekhne Screens

**`Home.jsx`**
Customer jaba pehili palta TechBook Nepal kholcha, yo screen dekhcha. Yaha sabai available services dekhcha — AC Repair, Plumber, Electrician, Bike Repair etc. Customer le yahi bata आफूलाई chahieko service select garcha.

**`TechnicianList.jsx`**
Customer le "AC Repair" select garyo vane yo screen aaucha. Yaha sabai verified AC Repair technicians ko list dekhcha — tiniharu ko naam, rating, experience, price. Customer le yahi bata आफूलाई man pareko technician choose garcha.

**`BookingPage.jsx`**
Customer le technician choose garyo, aba yo screen ma aaucha. Yaha customer le — kun din chahiyo, kati baje, आफ्नो address — sabai fill garcha ani booking confirm garcha.

**`MyBookings.jsx`**
Customer le आफ्ना sabai bookings yaha dekha sakcha — "Aaja ko booking pending cha, hijo ko completed bhayo, technician ko naam ko thiyo" — sabai history yaha huncha.

---

### 🔧 `technician/` — Technician Le Dekhne Screens

**`Register.jsx`**
Naya technician TechBook Nepal ma join garna chahcha vane yo screen ma aaucha. Yaha usle — naam, phone, skill (AC Repair/Plumber etc.), citizenship front photo, citizenship back photo, selfie — sabai upload garcha. Tespachi admin ko approval ko wait garcha.

**`Login.jsx`**
Admin le approve gareko technician daily kaam suru garda yo screen bata login garcha. Email ra password haldai छिर्cha आफ्नो dashboard ma.

**`Dashboard.jsx`**
Technician login garyo pachi yo screen dekhcha. Yaha dekcha — "Aaja kati booking request cha, kasle book gareko cha, customer ko address kun ho, accept garne ki reject garne, total kati kamaiko" — sabai information yaha huncha.

---

### 👑 `admin/` — Admin Le Dekhne Screens

**`Login.jsx`**
Admin matra yo screen bata login garna sakcha. Yo screen customer ra technician ko lagi hoina — sirf admin ko lagi special login page ho.

**`VerificationQueue.jsx`**
Naya technician haru register gareka huncha tara approved bhako chaina — tiniharu ko list yaha dekhcha. Admin le yaha bata ek ek technician ko documents herna sakcha.

**`TechnicianDetail.jsx`**
Admin le ek specific technician ko sabai details yaha dekcha — citizenship front photo, citizenship back photo, selfie, naam, skill sabai. Yaha bata admin le **Approve** ya **Reject** garna sakcha. Approve garyo vane tyo technician customer haru lai visible huncha. Reject garyo vane reason sanga notify huncha.

**`ServicesManage.jsx`**
Admin le yaha bata services add ra remove garna sakcha. Jastai admin le "CCTV Installation" naya service add garyo vane tyo Home.jsx ma customer haru lai dekhcha. Admin le hatayo vane disappear huncha.

---

## 🧩 `components/` — Purai Website Ma Reuse Hune Pieces

**`Navbar.jsx`**
Website ko top ma dekhne navigation bar ho. Customer ko lagi — "Home, My Bookings, Login". Technician login gareko cha vane — "Dashboard, Logout". Admin ko lagi — "Verification, Services, Logout". Ek choti banayo, sabai pages ma automatically dekhcha.

**`Footer.jsx`**
Website ko bottom ma dekhne section — TechBook Nepal ko contact, social media links, copyright. Sabai pages ma same dekhcha.

**`ServiceCard.jsx`**
Home page ma AC Repair, Plumber, Electrician — har ek service ko lagi ek card huncha. Yo card ko design ek choti banayo, tespachi jati pani services cha sabai ma same design apply huncha, sirf naam ra icon alag huncha.

**`TechnicianCard.jsx`**
TechnicianList page ma har ek technician ko lagi ek card huncha — photo, naam, rating, skill, price. Yo card design ek choti banayo, 50 wota technician cha vane 50 choti same design use huncha.

**`BookingCard.jsx`**
MyBookings page ma har ek booking ko lagi ek card — technician naam, date, status (Pending/Completed/Cancelled). Ek choti banayo, sabai bookings ma same card use huncha.

**`LoadingSpinner.jsx`**
Backend bata data aauन time lagcha — tyo bela user lai blank screen dekhauनु bhanda spinning animation dekhaucha "data load hurdaicha" vanera.

---

## 🔐 `context/AuthContext.jsx` — Login Information Sabai Tira Pugauने

Customer Alok le login garyo. Aba website ko har ek page lai thaha hunu parcha — "Alok login gareko cha, tyo customer ho, token yo ho."

Navbar lai thaha chaincha — kasle login gareko cha vane naam dekhauन.
BookingPage lai thaha chaincha — kasle book garirako ho.
MyBookings lai thaha chaincha — kun customer ko bookings dekhauने.

`AuthContext.jsx` le yo login information ek jagah store garcha, ani sabai pages le tyahi bata linchan. Login garyo ek choti — sabai pages lai automatically thaha huncha.

---

## 🌐 `services/` — Backend Sanga Kura Garne

**`api.js`**
Backend ko address (URL) ek jagah set garcha. Sabai API calls yahi bata huncha. Backend ko address change garnu paryo vane ek jagah matra change garyo pugcha.

**`auth.service.js`**
Customer le login garcha, register garcha — yo file le backend ma request pathaucha ra response lyaucha. Pages le directly backend sanga kura gardaina, yo file le garcha.

**`booking.service.js`**
Booking create garda, cancel garda, list lyauda — yo file le backend sanga kura garcha.

**`technician.service.js`**
Technician list lyauda, ek technician ko detail lyauda, admin le approve/reject garda — yo file le backend sanga kura garcha.

---

## 🔄 Real Flow — Alok Le AC Repair Book Garyo

```
Alok techbooknepal.com kholcha
          ↓
App.jsx — "/" URL dekhyo, Home.jsx dekhau
          ↓
Home.jsx — AC Repair, Plumber, Electrician cards dekhcha
(ServiceCard.jsx use hunchha har ek service ko lagi)
(Navbar.jsx top ma dekhcha)
          ↓
Alok "AC Repair" click garcha
          ↓
TechnicianList.jsx — technician.service.js le
backend bata AC Repair technicians lyaucha
(TechnicianCard.jsx use hunchha har ek technician ko lagi)
          ↓
Alok le "Ram Technician" choose garcha
          ↓
BookingPage.jsx — Alok le date, time, address fill garcha
AuthContext.jsx bata Alok ko info linchan
booking.service.js le backend ma booking pathaucha
          ↓
MyBookings.jsx — Alok ko booking dekhcha
(BookingCard.jsx use hunchha)
          ↓
Ram (Technician) ko Dashboard.jsx ma
naya booking request dekhcha — Accept garcha
          ↓
Admin VerificationQueue.jsx ma
sabai activities monitor garna sakcha
```

---
