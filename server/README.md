## TechBook Nepal — Backend Structure Explained

---

## `server.js` — Main Entry Point

Yo poori backend ko **suru hune jagah** ho. Jastai computer on garyo vane pehile BIOS load huncha, exactly yestai backend start garda `server.js` nai pehile run huncha.

Yo file le:
- Express server start garcha
- MongoDB sanga connect garcha
- Sabai routes register garcha
- Port 5000 ma listen garcha

---

## 📁 `models/` — Database Ko Structure

MongoDB ma data kasari store hune — tyo define garcha. Jastai form fill garda kun fields hunu parcha tyo define garcha.

**`User.js`**
Customer ra Technician duitai ko basic info yaha store huncha — naam, email, phone, password, role. Ek User document ek wota account ho.

**`Technician.js`**
Technician ko extra info — skills, experience, citizenship photos, verification status, rating. User.js sanga connected huncha — ek technician ko ek user account huncha.

**`Booking.js`**
Customer le technician book garyo — tyo booking ko details yaha — kun customer, kun technician, kun din, address, status (pending/accepted/completed).

**`Review.js`**
Booking complete bhayepachi customer le dine rating ra comment yaha store huncha.

**`Service.js`**
Admin le define gareko services — AC Repair, Plumber etc. — naam ra icon yaha store huncha.

---

## 📁 `routes/` — URL Paths Define Garne

Browser ma URL type garyo vane kun code run garne — tyo yaha define huncha. Routes le request receive garcha ra correct controller ma pathaucha.

**`auth.routes.js`**
- `POST /api/auth/customer/register` — Customer signup
- `POST /api/auth/customer/login` — Customer login
- `POST /api/auth/technician/register` — Technician signup + document upload
- `POST /api/auth/technician/login` — Technician login
- `POST /api/auth/admin/login` — Admin login

**`booking.routes.js`**
- `POST /api/bookings` — Naya booking create garne
- `GET /api/bookings/my` — Customer ko bookings list
- `GET /api/bookings/technician` — Technician ko bookings list
- `PATCH /api/bookings/:id/status` — Booking accept/reject/complete garne

**`technician.routes.js`**
- `GET /api/technicians` — Service by technicians list
- `GET /api/technicians/:id` — Ek technician ko detail

**`admin.routes.js`**
- `GET /api/admin/technicians/pending` — Pending verification list
- `GET /api/admin/technicians/:id` — Ek technician ko detail
- `PATCH /api/admin/technicians/:id/approve` — Approve garne
- `PATCH /api/admin/technicians/:id/reject` — Reject garne
- `POST /api/admin/services` — Naya service add garne
- `DELETE /api/admin/services/:id` — Service delete garne

---

## 📁 `controllers/` — Actual Kaam Garne Code

Routes le request receive garcha, controllers le actual kaam garcha — database bata data lyaucha, process garcha, response pathaucha.

**`auth.controller.js`**
- Customer register garda — password hash garcha, MongoDB ma save garcha
- Login garda — password check garcha, JWT token banaucha, pathaucha
- Technician register garda — citizenship photos Cloudinary ma upload garcha, MongoDB ma save garcha

**`booking.controller.js`**
- Naya booking create garda — MongoDB ma save garcha, technician lai notify garcha
- List lyauda — customer/technician ko bookings fetch garcha
- Status update garda — accept/reject/complete update garcha

**`technician.controller.js`**
- Technicians list lyauda — service by filter garcha, sirf approved technicians dekhaucha
- Detail lyauda — ek technician ko sabai info fetch garcha

**`admin.controller.js`**
- Pending technicians list lyauda — verification status "pending" bhako sabai fetch garcha
- Approve garda — isVisible true garcha, status approved garcha
- Reject garda — reason sanga status rejected garcha
- Services add/delete garcha

---

## 📁 `middleware/` — Request Beech Ma Check Garne

Routes ma request aaucha — controller samma pugnu agadi middleware le check garcha. Jastai security guard jasto — "token cha? role thik cha?" check garcha.

**`auth.middleware.js`**
Request ma JWT token cha ki chaina check garcha. Token chaina vane "Unauthorized" error pathaucha. Token cha vane user ko info request ma add garcha ra next step ma pathaucha.

**`role.middleware.js`**
Token valid cha — tara kun role cha check garcha. Admin route ma customer aayo vane block garcha. Technician route ma admin aayo vane block garcha. Sahi role cha vane matra allow garcha.

**`upload.middleware.js`**
File upload handle garcha — citizenship photo, selfie. Multer le file receive garcha, Cloudinary ma upload garcha, URL return garcha.

---

## 📁 `utils/cloudinary.js` — Cloudinary Setup

Cloudinary account sanga connect garne configuration yaha huncha. API key, secret — sabai yaha setup garcha. Upload middleware le yo use garcha.

---

## `.env` — Secret Values

Database password, JWT secret, Cloudinary keys — yo sabai sensitive information `.env` ma huncha. GitHub ma push hudaina — secure rakhcha.

---

## 🔄 Complete Flow — Alok Le AC Repair Book Garyo

```
1. Alok le BookingPage ma "Confirm Booking" click garcha
            ↓
2. Frontend — api.post('/bookings', data) call garcha
            ↓
3. server.js — request receive garcha
            ↓
4. booking.routes.js — "/api/bookings" POST route match garcha
            ↓
5. auth.middleware.js — JWT token valid cha? check garcha
            ↓
6. booking.controller.js — actual kaam garcha:
   - Booking object banaucha
   - MongoDB ma save garcha
   - Response pathaucha
            ↓
7. Frontend — "Booking successful!" dekhaucha
```

---

Clear bhayo? Note tyar bhayo vane code lekhna suru garxau! 🚀