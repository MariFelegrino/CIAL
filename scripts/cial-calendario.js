/****************************************************
 * cial.js (COMPLETO)
 * - Admin Grupos (nuevo/editar/borrar) + sesiones
 * - Reserva (vista semana) con rango: hoy + OFFSET, por WINDOW días
 ****************************************************/

/* ====== CONFIG RESERVA ====== */
const RESERVA_OFFSET_DIAS = 2;   // ej: hoy 26 -> inicia 28
const RESERVA_WINDOW_DIAS = 21;  // 21 días (incluye min y max)

/* ====== DATA (demo) ====== */
const jsCialGroups = [
  {
    id: 1,
    nombreGrupo: "Grupo 1",
    enlace: "Jonas",
    guia: "Rouse",
    sesiones: [
      { id: 1, dia: 1, hora: "12:00" }, // lunes
      { id: 2, dia: 2, hora: "14:00" },  // martes
      { id: 3, dia: 3, hora: "12:00" },  // miércoles
      { id: 4, dia: 3, hora: "14:00" },  // miércoles
      { id: 5, dia: 4, hora: "12:00" },  // jueves
      { id: 6, dia: 4, hora: "14:00" }  // jueves
    ]
  },
  {
    id: 2,
    nombreGrupo: "Grupo 2",
    enlace: "Rouse",
    guia: "Maria",
    sesiones: [
      { id: 1, dia: 2, hora: "10:00" }, // martes
      { id: 2, dia: 2, hora: "12:00" },  // martes
      { id: 3, dia: 2, hora: "14:00" },  // martes
      { id: 4, dia: 3, hora: "10:00" },  // miércoles
      { id: 5, dia: 3, hora: "14:00" }  // miércoles
    ]
  },
  {
    id: 3,
    nombreGrupo: "Grupo 3",
    enlace: "Maria",
    guia: "Jonas",
    sesiones: []
  }
];

/* ====== Catálogos ====== */
const dias = [
  { id: 1, text: "Lunes" },
  { id: 2, text: "Martes" },
  { id: 3, text: "Miércoles" },
  { id: 4, text: "Jueves" },
  { id: 5, text: "Viernes" },
  { id: 6, text: "Sábado" },
  { id: 7, text: "Domingo" }
];

/* ====== Helpers básicos ====== */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function pad2(n) { return String(n).padStart(2, "0"); }

function findGroupById(id) {
  return jsCialGroups.find(x => Number(x.id) === Number(id)) || null;
}

/* ====== Panel toggle (grupos.html) ====== */
function showPanel(panel) {
  const list = document.getElementById("listPanel");
  const edit = document.getElementById("editPanel");
  if (!list || !edit) return;

  if (panel === "list") {
    list.classList.remove("d-none");
    edit.classList.add("d-none");
  } else {
    list.classList.add("d-none");
    edit.classList.remove("d-none");
  }
}

/* =========================================================
   =============== ADMIN GRUPOS (grupos.html) ===============
   ========================================================= */

function renderGruposTable() {
  const tbody = document.getElementById("tbodyGrupos");
  if (!tbody) return;

  if (!jsCialGroups.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">Sin grupos</td></tr>`;
    return;
  }

  tbody.innerHTML = jsCialGroups.map(g => `
    <tr data-id="${g.id}">
      <td>${escapeHtml(g.nombreGrupo)}</td>
      <td>${escapeHtml(g.guia)}</td>
      <td>${escapeHtml(g.enlace)}</td>
      <td class="text-center">
        <button type="button" class="btn btn-outline-secondary btn-sm" data-action="edit" data-id="${g.id}">Editar</button>
      </td>
      <td class="text-center">
        <button type="button" class="btn btn-outline-danger btn-sm" data-action="delete" data-id="${g.id}">Borrar</button>
      </td>
    </tr>
  `).join("");
}

/* ====== Sesiones en editor ====== */
function renderSesionesTable(sesiones) {
  const tbody = document.getElementById("tbodySesiones");
  if (!tbody) return;

  if (!sesiones || !sesiones.length) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-3">Sin sesiones</td></tr>`;
    return;
  }

  tbody.innerHTML = sesiones.map(s => `
    <tr data-sid="${s.id}">
      <td>${escapeHtml(dias.find(d => d.id === Number(s.dia))?.text || "—")}</td>
      <td>${escapeHtml(s.hora)}</td>
      <td class="text-right">
        <button type="button" class="btn btn-sm btn-outline-danger" data-saction="remove" data-sid="${s.id}">Quitar</button>
      </td>
    </tr>
  `).join("");
}

function getCurrentSesionesFromMemory() {
  return window.__editSesiones || [];
}
function setCurrentSesionesToMemory(sesiones) {
  window.__editSesiones = Array.isArray(sesiones) ? sesiones : [];
  renderSesionesTable(window.__editSesiones);
}
function nextSesionId(sesiones) {
  const maxId = (sesiones || []).reduce((m, x) => Math.max(m, Number(x.id) || 0), 0);
  return maxId + 1;
}

async function promptNuevaSesion() {
  const diasOptions = dias.map(d => `<option value="${d.id}">${d.text}</option>`).join("");

  const { value, isConfirmed } = await Swal.fire({
    title: "Agregar sesión",
    html: `
      <div class="text-left">
        <div class="form-group">
          <label class="mb-1">Día</label>
          <select id="swDia" class="form-control mb-2">${diasOptions}</select>
          <i class="d-block"></i>
        </div>
        <div class="form-group">
          <label class="mb-1">Hora</label>
          <input id="swHora" class="form-control" type="time" value="12:00">
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
    customClass: {
                    popup: 'popUpAlert',
                    title: 'ttlAlert',
                    htmlContainer: 'subttlAlert',
                    confirmButton: 'boton-sweetAlert',
                    cancelButton: 'botonSecundary-sweetAlert'
                },
    preConfirm: () => {
      const dia = Number(document.getElementById("swDia")?.value);
      const hora = document.getElementById("swHora")?.value;

      if (!dia || !hora) {
        Swal.showValidationMessage("Selecciona día y hora.");
        return null;
      }
      return { dia, hora };
    }
  });

  if (!isConfirmed || !value) return null;
  return value; // { dia, hora }
}

/* ====== Editor (3 campos) ====== */
function getFormData() {
  return {
    id: Number(document.getElementById("grpId")?.value || 0),
    nombreGrupo: (document.getElementById("txtNombreGrupo")?.value || "").trim(),
    guia: (document.getElementById("txtGuia")?.value || "").trim(),
    enlace: (document.getElementById("txtEnlace")?.value || "").trim(),
  };
}

function setFormData(group) {
  const elId = document.getElementById("grpId");
  const elNombre = document.getElementById("txtNombreGrupo");
  const elGuia = document.getElementById("txtGuia");
  const elEnlace = document.getElementById("txtEnlace");
  if (!elId || !elNombre || !elGuia || !elEnlace) return;

  elId.value = group?.id || 0;
  elNombre.value = group?.nombreGrupo || "";
  elGuia.value = group?.guia || "";
  elEnlace.value = group?.enlace || "";
}

function openNuevoGrupo() {
  const title = document.getElementById("editTitle");
  if (title) title.textContent = "Nuevo grupo";

  setFormData({ id: 0, nombreGrupo: "", guia: "", enlace: "" });
  setCurrentSesionesToMemory([]);
  showPanel("edit");
}

function openEditarGrupo(id) {
  const g = findGroupById(id);
  if (!g) {
    Swal.fire("No encontrado", "No existe el grupo seleccionado.", "warning");
    return;
  }

  const title = document.getElementById("editTitle");
  if (title) title.textContent = `Editar grupo: ${g.nombreGrupo}`;

  setFormData(g);

  const sesionesClone = (g.sesiones || []).map(x => ({ ...x }));
  setCurrentSesionesToMemory(sesionesClone);

  showPanel("edit");
}

/* =========================================================
   ===================== RESERVA (reserva.html) =============
   - Vista semana (7 días)
   - Rango permitido:
       min = hoy + RESERVA_OFFSET_DIAS
       max = min + (RESERVA_WINDOW_DIAS - 1)
   - Slots aleatorios "apartados" (cache por grupo+rango)
   - Click:
       - apartado -> "Día reservado"
       - libre -> modal "Reservar / Cerrar" -> confirm -> "Se envió su solicitud..."
   ========================================================= */

function addMinutesToHHMM(hhmm, minutesToAdd) {
  const parts = String(hhmm || "").split(":");
  const h = Number(parts[0] || 0);
  const m = Number(parts[1] || 0);
  const total = (h * 60 + m + minutesToAdd) % (24 * 60);
  const nh = Math.floor(total / 60);
  const nm = total % 60;
  return `${pad2(nh)}:${pad2(nm)}`;
}

function fmtDateKey(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function monthNameES(monthIndex) {
  const m = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  return m[monthIndex] || "";
}

function shortDateES(d) {
  const dd = pad2(d.getDate());
  const mm = monthNameES(d.getMonth()).slice(0, 3);
  return `${dd} ${mm}`;
}

function dateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d, days) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + Number(days || 0));
  return x;
}

function startOfWeekMonday(d) {
  // Retorna el lunes de la semana de la fecha d (ISO-like)
  // JS: 0=Dom ... 6=Sáb
  const x = dateOnly(d);
  const jsDay = x.getDay();
  const offsetToMonday = jsDay === 0 ? -6 : (1 - jsDay);
  return addDays(x, offsetToMonday);
}

function clampDate(d, minD, maxD) {
  const t = d.getTime();
  if (t < minD.getTime()) return new Date(minD.getTime());
  if (t > maxD.getTime()) return new Date(maxD.getTime());
  return new Date(d.getTime());
}

function isBetweenInclusive(d, minD, maxD) {
  const t = d.getTime();
  return t >= minD.getTime() && t <= maxD.getTime();
}

function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function jsDayToCialDia(jsDay) {
  // JS: 0=Dom ... 6=Sáb
  // CIAL: 1=Lun ... 7=Dom
  return jsDay === 0 ? 7 : jsDay;
}

// Genera/recupera mapa de "apartados" por grupo para TODO el rango.
// key: `${dateKey}|${hora}`
function getOrBuildReservedMapForGroup(groupId, minDate, maxDate, sesiones) {
  window.__reservaReservedByGroup = window.__reservaReservedByGroup || {};

  const cache = window.__reservaReservedByGroup[groupId];
  const cacheKey = `${fmtDateKey(minDate)}_${fmtDateKey(maxDate)}`;

  if (cache && cache.__rangeKey === cacheKey) return cache.map;

  const map = {};
  const ses = Array.isArray(sesiones) ? sesiones : [];

  // Probabilidad de apartado (demo)
  const PROB = 0.28;

  for (let i = 0; i < RESERVA_WINDOW_DIAS; i++) {
    const d = addDays(minDate, i);
    if (!isBetweenInclusive(d, minDate, maxDate)) continue;

    const diaCial = jsDayToCialDia(d.getDay());
    const matches = ses.filter(s => Number(s.dia) === Number(diaCial));
    if (!matches.length) continue;

    const dateKey = fmtDateKey(d);
    for (const m of matches) {
      const slotKey = `${dateKey}|${m.hora}`;
      if (Math.random() < PROB) map[slotKey] = true;
    }
  }

  window.__reservaReservedByGroup[groupId] = { __rangeKey: cacheKey, map };
  return map;
}

function renderCalendarWeek(rootEl, viewStart, minDate, maxDate, sesiones, groupName, reservedMap) {
  if (!rootEl) return;

  const title = document.getElementById("calTitle");
  const subtitle = document.getElementById("calSubtitle");

  const start = dateOnly(viewStart);
  const end = addDays(start, 6);

  if (title) {
    const sameYear = start.getFullYear() === end.getFullYear();
    const yearLabel = sameYear ? start.getFullYear() : `${start.getFullYear()}-${end.getFullYear()}`;
    title.textContent = `Semana: ${shortDateES(start)} - ${shortDateES(end)} (${yearLabel})`;
  }
  if (subtitle) subtitle.textContent = groupName ? `Grupo: ${groupName}` : `Selecciona un grupo`;

  // Etiquetas por fecha real (JS: 0=Dom ... 6=Sáb)
  const weekDaysByJs = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  let html = `
    <table class="table table-bordered table-sm mb-0">
      <thead class="thead-light">
        <tr>
  `;

  for (let i = 0; i < 7; i++) {
    const d = addDays(start, i);
    const muted = !isBetweenInclusive(d, minDate, maxDate);

    html += `
      <th class="text-center ${muted ? "text-muted" : ""}" style="width:14.285%">
        <div class="small">${weekDaysByJs[d.getDay()]}</div>
        <div class="font-weight-bold">${pad2(d.getDate())}</div>
        <div class="small">${monthNameES(d.getMonth()).slice(0, 3)}</div>
      </th>
    `;
  }

  html += `
        </tr>
      </thead>
      <tbody>
        <tr>
  `;

  for (let i = 0; i < 7; i++) {
    const d = addDays(start, i);
    const inRange = isBetweenInclusive(d, minDate, maxDate);

    if (!inRange) {
      html += `<td class="bg-light" style="height:340px; vertical-align:top;"><div class="small text-muted">No disponible</div></td>`;
      continue;
    }

    const dateKey = fmtDateKey(d);
    const diaCial = jsDayToCialDia(d.getDay());
    const matches = (sesiones || []).filter(s => Number(s.dia) === Number(diaCial));

    if (!matches.length) {
      html += `<td style="height:340px; vertical-align:top;"><div class="small text-muted">Sin sesiones</div></td>`;
      continue;
    }

    html += `<td style="height:340px; vertical-align:top;">`;

    const ordered = matches.slice().sort((a, b) => String(a.hora).localeCompare(String(b.hora)));

    for (const s of ordered) {
      const slotKey = `${dateKey}|${s.hora}`;
      const isReserved = !!(reservedMap && reservedMap[slotKey]);
      const endHH = addMinutesToHHMM(s.hora, 120);

      html += `
        <button type="button"
          class="btn btn-sm btn-block text-left py-1 ${isReserved ? "btn-outline-secondary" : "btn-outline-success"}"
          data-cal-action="pick"
          data-date="${dateKey}"
          data-time="${escapeHtml(s.hora)}"
          data-end="${escapeHtml(endHH)}"
          data-reserved="${isReserved ? "1" : "0"}"
          style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          ${escapeHtml(s.hora)}–${escapeHtml(endHH)}
          ${isReserved ? `<span class="badge badge-secondary float-right">Apartado</span>` : `<span class="badge badge-success float-right">Libre</span>`}
        </button>
      `;
    }

    html += `</td>`;
  }

  html += `
        </tr>
      </tbody>
    </table>
  `;

  rootEl.innerHTML = html;

  // Click slots
  rootEl.querySelectorAll("button[data-cal-action='pick']").forEach(btn => {
    btn.addEventListener("click", async () => {
      const date = btn.getAttribute("data-date");
      const time = btn.getAttribute("data-time");
      const end = btn.getAttribute("data-end");
      const isReserved = btn.getAttribute("data-reserved") === "1";

      if (isReserved) {
        await Swal.fire({
          title: "Día reservado",
          text: "Este horario ya se encuentra apartado.",
          icon: "info",
          confirmButtonText: "Cerrar",
          customClass: {
                    popup: 'popUpAlert',
                    title: 'ttlAlert',
                    htmlContainer: 'subttlAlert',
                    confirmButton: 'boton-sweetAlert',
                }
        });
        return;
      }

      const r = await Swal.fire({
        title: "Confirmar reserva",
        html: `<div class="text-left">
          <div><strong>Fecha:</strong> ${escapeHtml(date)}</div>
          <div><strong>Horario:</strong> ${escapeHtml(time)}–${escapeHtml(end)}</div>
        </div>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Reservar",
        cancelButtonText: "Cerrar",
        customClass: {
                    popup: 'popUpAlert',
                    title: 'ttlAlert',
                    htmlContainer: 'subttlAlert',
                    confirmButton: 'boton-sweetAlert',
                    cancelButton: 'botonSecundary-sweetAlert'
                }
      });

      if (!r.isConfirmed) return;

      await Swal.fire({
        title: "Se envió su solicitud",
        text: "Por favor realice el pago para completar.",
        icon: "success",
        confirmButtonText: "Cerrar",
        customClass: {
                    popup: 'popUpAlert',
                    title: 'ttlAlert',
                    htmlContainer: 'subttlAlert',
                    confirmButton: 'boton-sweetAlert',
                }
      });
    });
  });
}

function initReserva() {
  const sel = document.getElementById("selGrupoReserva");
  const calRoot = document.getElementById("calRoot");
  const info = document.getElementById("reservaInfo");
  if (!sel || !calRoot) return; // no estamos en reserva.html

  // Poblar select
  sel.innerHTML = `<option value="0">-- Selecciona --</option>` + jsCialGroups
    .map(g => `<option value="${g.id}">${escapeHtml(g.nombreGrupo)}</option>`)
    .join("");

  // Rango permitido
  const today = dateOnly(new Date());
  const minDate = addDays(today, RESERVA_OFFSET_DIAS);
  const maxDate = addDays(minDate, RESERVA_WINDOW_DIAS - 1);

  // Vista (semana) siempre arranca en Lunes
  const minWeekStart = startOfWeekMonday(minDate);
  const maxWeekStart = startOfWeekMonday(maxDate);

  // Vista inicia en la semana del minDate
  let viewStart = new Date(minWeekStart.getTime());

  function canGoPrev() {
    return viewStart.getTime() > minWeekStart.getTime();
  }

  function canGoNext() {
    return viewStart.getTime() < maxWeekStart.getTime();
  }

  function updateNavButtons() {
    const bPrev = document.getElementById("btnCalPrev");
    const bNext = document.getElementById("btnCalNext");
    const bToday = document.getElementById("btnCalToday");
    if (bPrev) bPrev.disabled = !canGoPrev();
    if (bNext) bNext.disabled = !canGoNext();
    if (bToday) bToday.disabled = isSameDate(viewStart, minWeekStart);
  }

  function render() {
    const gid = Number(sel.value || 0);
    const g = gid ? findGroupById(gid) : null;

    if (info) {
      if (!g) {
        info.innerHTML = `Selecciona un grupo para ver disponibilidad.<br><span class="text-muted">Rango: ${escapeHtml(fmtDateKey(minDate))} a ${escapeHtml(fmtDateKey(maxDate))}</span>`;
      } else {
        const sesCount = (g.sesiones || []).length;
        info.innerHTML = `
          <div><strong>${escapeHtml(g.nombreGrupo)}</strong></div>
          <div class="mt-1"><span class="text-muted">Guía:</span> ${escapeHtml(g.guia || "—")}</div>
          <div><span class="text-muted">Enlace:</span> ${escapeHtml(g.enlace || "—")}</div>
          <div class="mt-2"><span class="text-muted">Sesiones:</span> ${sesCount}</div>
          <div class="mt-2"><span class="text-muted">Rango:</span> ${escapeHtml(fmtDateKey(minDate))} a ${escapeHtml(fmtDateKey(maxDate))}</div>
        `;
      }
    }

    const reservedMap = g
      ? getOrBuildReservedMapForGroup(g.id, minDate, maxDate, g.sesiones || [])
      : {};

    viewStart = clampDate(viewStart, minWeekStart, maxWeekStart);
    renderCalendarWeek(calRoot, viewStart, minDate, maxDate, g?.sesiones || [], g?.nombreGrupo || "", reservedMap);
    updateNavButtons();
  }

  document.getElementById("btnCalPrev")?.addEventListener("click", () => {
    if (!canGoPrev()) return;
    viewStart = addDays(viewStart, -7);
    if (viewStart.getTime() < minWeekStart.getTime()) viewStart = new Date(minWeekStart.getTime());
    render();
  });

  document.getElementById("btnCalNext")?.addEventListener("click", () => {
    if (!canGoNext()) return;
    viewStart = addDays(viewStart, 7);
    if (viewStart.getTime() > maxWeekStart.getTime()) viewStart = new Date(maxWeekStart.getTime());
    render();
  });

  document.getElementById("btnCalToday")?.addEventListener("click", () => {
    viewStart = new Date(minWeekStart.getTime());
    render();
  });

  sel.addEventListener("change", () => {
    viewStart = new Date(minWeekStart.getTime());
    render();
  });

  render();
}

/* =========================================================
   ====================== DOM READY =========================
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // GRUPOS: si existen elementos, estamos en grupos.html
  renderGruposTable();
  showPanel("list");

  document.getElementById("btnNuevoGrupo")?.addEventListener("click", () => openNuevoGrupo());
  document.getElementById("btnCancelarEdicion")?.addEventListener("click", () => showPanel("list"));

  document.getElementById("tblGrupos")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.getAttribute("data-action");
    const id = Number(btn.getAttribute("data-id"));

    if (action === "edit") openEditarGrupo(id);

    if (action === "delete") {
      Swal.fire({
        title: "¿Borrar grupo?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
        customClass: {
                    popup: 'popUpAlert',
                    title: 'ttlAlert',
                    htmlContainer: 'subttlAlert',
                    confirmButton: 'boton-sweetAlert',
                    cancelButton: 'botonSecundary-sweetAlert'
                }
      }).then(r => {
        if (!r.isConfirmed) return;
        const idx = jsCialGroups.findIndex(x => Number(x.id) === id);
        if (idx >= 0) jsCialGroups.splice(idx, 1);
        renderGruposTable();
      });
    }
  });

  document.getElementById("btnAddSesion")?.addEventListener("click", async () => {
    const data = await promptNuevaSesion();
    if (!data) return;

    const sesiones = getCurrentSesionesFromMemory();
    sesiones.push({
      id: nextSesionId(sesiones),
      dia: data.dia,
      hora: data.hora
    });
    setCurrentSesionesToMemory(sesiones);
  });

  document.getElementById("tblSesiones")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-saction]");
    if (!btn) return;

    const saction = btn.getAttribute("data-saction");
    const sid = Number(btn.getAttribute("data-sid"));

    if (saction === "remove") {
      const sesiones = getCurrentSesionesFromMemory().filter(x => Number(x.id) !== sid);
      setCurrentSesionesToMemory(sesiones);
    }
  });

  document.getElementById("btnGuardarGrupo")?.addEventListener("click", () => {
    const frm = getFormData();
    const sesiones = getCurrentSesionesFromMemory();

    if (!frm.nombreGrupo) {
      /*Swal.fire("Falta info", "Captura el nombre del grupo.", "info");*/
      Swal.fire({
        title: "Falta información",
        text: "Captura el nombre del grupo.",
        icon: "info",
        customClass: {
            popup: 'popUpAlert',
            title: 'ttlAlert',
            htmlContainer: 'subttlAlert',
            confirmButton: 'boton-sweetAlert',
        }
      });
      return;
    }

    if (frm.id === 0) {
      const newId = jsCialGroups.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0) + 1;
      jsCialGroups.push({
        id: newId,
        nombreGrupo: frm.nombreGrupo,
        guia: frm.guia,
        enlace: frm.enlace,
        sesiones: sesiones
      });
    } else {
      const g = findGroupById(frm.id);
      if (!g) return;

      g.nombreGrupo = frm.nombreGrupo;
      g.guia = frm.guia;
      g.enlace = frm.enlace;
      g.sesiones = sesiones;
    }

    renderGruposTable();
    /*Swal.fire("Listo", "Grupo guardado.", "success");*/

    Swal.fire({
    title: "Listo",
    text: "Grupo guardado.",
    icon: "success",
    customClass: {
        popup: 'popUpAlert',
        title: 'ttlAlert',
        htmlContainer: 'subttlAlert',
        confirmButton: 'boton-sweetAlert',
    }
  });

    showPanel("list");
  });

  // RESERVA: si existen elementos, estamos en reserva.html
  initReserva();
});
