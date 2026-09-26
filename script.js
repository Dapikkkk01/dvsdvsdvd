const ICONS = {
  dash:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  box:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
  user:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  out:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h9v5M4 4v16h9v-5"/><path d="M9 12h11m0 0l-4-4m4 4l-4 4"/></svg>',
  in:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 4h-9v5M20 4v16h-9v-5"/><path d="M15 12H4m0 0l4-4m-4 4l4 4"/></svg>',
  doc:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/></svg>',
  logout:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
  menu:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'
};

let barang = [
  {id:1,nama:'Laptop Acer Aspire',kategori:'Laptop',kondisi:'Baik',stok:8},
  {id:2,nama:'Laptop Lenovo Thinkpad',kategori:'Laptop',kondisi:'Perlu Servis',stok:2},
  {id:3,nama:'Proyektor Epson',kategori:'Proyektor',kondisi:'Baik',stok:3},
  {id:4,nama:'Proyektor BenQ',kategori:'Proyektor',kondisi:'Baik',stok:2},
  {id:5,nama:'Kabel Jaringan UTP',kategori:'Jaringan',kondisi:'Baik',stok:25},
  {id:6,nama:'Router TP-Link',kategori:'Jaringan',kondisi:'Baik',stok:5},
  {id:7,nama:'Switch 8 Port',kategori:'Jaringan',kondisi:'Baik',stok:4},
  {id:8,nama:'Kabel HDMI',kategori:'Aksesoris',kondisi:'Baik',stok:15},
];
let siswa = [
  {id:1,nama:'Ahmad Fauzi',kelas:'XII RPL 1',absen:'05',hp:'0812-3456-1101'},
  {id:2,nama:'Siti Nurhaliza',kelas:'XII RPL 1',absen:'18',hp:'0813-2244-5590'},
  {id:3,nama:'Budi Santoso',kelas:'XII RPL 2',absen:'09',hp:'0821-7788-3021'},
  {id:4,nama:'Dewi Lestari',kelas:'XII RPL 2',absen:'22',hp:'0856-1123-7742'},
  {id:5,nama:'Rian Hidayat',kelas:'XII TKJ 1',absen:'14',hp:'0877-9090-1234'},
];
let pinjam = [
  {id:'P001',siswa:'Ahmad Fauzi',barang:'Laptop Acer Aspire x1',tglPinjam:'2026-09-15',tglKembali:'2026-09-20',status:'Aktif'},
  {id:'P002',siswa:'Siti Nurhaliza',barang:'Proyektor Epson x1, Kabel HDMI x1',tglPinjam:'2026-09-10',tglKembali:'2026-09-15',status:'Terlambat'},
  {id:'P003',siswa:'Budi Santoso',barang:'Router TP-Link x1, Switch 8 Port x1',tglPinjam:'2026-09-05',tglKembali:'2026-09-08',status:'Selesai'},
  {id:'P004',siswa:'Dewi Lestari',barang:'Laptop Lenovo Thinkpad x1',tglPinjam:'2026-09-18',tglKembali:'2026-09-25',status:'Aktif'},
];

const ROLES = {
  admin:{label:'Admin',hex:'#B8791A',menu:['dash','barang','siswa','pinjam','kembali','laporan'],name:'Bu Retno (Admin)',user:'admin',pass:'admin123'},
  kepala:{label:'Kepala Lab',hex:'#6B4A8A',menu:['dash','barang','laporan'],name:'Pak Ibnu (Kepala Lab)',user:'kepala',pass:'kepala123'},
  siswa:{label:'Siswa',hex:'#1F7A5C',menu:['dash','barang','pinjam'],name:'Ahmad Fauzi (Siswa)',user:'siswa',pass:'siswa123'}
};
const MENU_LABEL = {dash:'Dashboard',barang:'Data Barang',siswa:'Data Siswa',pinjam:'Peminjaman',kembali:'Pengembalian',laporan:'Laporan'};
const MENU_ICON = {dash:'dash',barang:'box',siswa:'user',pinjam:'out',kembali:'in',laporan:'doc'};

let state = {loggedIn:false, roleKey:'admin', selectedRole:'admin', page:'dash'};
let selectedIds = new Set();

const CAT_STYLE = {
  'Laptop':{bg:'#17181C',icon:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FBF7F0" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M2 20h20"/></svg>'},
  'Proyektor':{bg:'#B8791A',icon:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FBF7F0" stroke-width="2"><rect x="2" y="7" width="14" height="10" rx="2"/><circle cx="9" cy="12" r="3"/><path d="M16 10l5-2v8l-5-2z"/></svg>'},
  'Jaringan':{bg:'#1F7A5C',icon:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FBF7F0" stroke-width="2"><rect x="3" y="10" width="18" height="6" rx="1.5"/><path d="M7 10V7a2 2 0 012-2h6a2 2 0 012 2v3"/><circle cx="7" cy="13" r=".9" fill="#FBF7F0"/><circle cx="12" cy="13" r=".9" fill="#FBF7F0"/><circle cx="17" cy="13" r=".9" fill="#FBF7F0"/></svg>'},
  'Aksesoris':{bg:'#6B4A8A',icon:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FBF7F0" stroke-width="2"><path d="M4 8v4a4 4 0 004 4h8a4 4 0 004-4V8"/><path d="M8 8V5m8 3V5"/></svg>'},
  'default':{bg:'#6B6D63',icon:'<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FBF7F0" stroke-width="2"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/></svg>'}
};
function catImage(category){
  const c = CAT_STYLE[category] || CAT_STYLE.default;
  return `<div class="item-img" style="background:${c.bg}">${c.icon}</div>`;
}
function toggleSelect(id){ selectedIds.has(id) ? selectedIds.delete(id) : selectedIds.add(id); }
function itemCard(b){
  const isSiswa = state.roleKey==='siswa';
  const canEdit = state.roleKey==='admin';
  const sel = selectedIds.has(b.id);
  let action;
  if(canEdit) action = `<button class="btn btn-ghost" onclick="removeBarang(${b.id})">Hapus</button>`;
  else if(isSiswa) action = `<button class="btn" style="background:${sel?'var(--success)':'var(--accent)'};color:#fff" onclick="toggleSelect(${b.id});renderPage()">${sel?'✓ Dipilih':'+ Pilih'}</button>`;
  else action = `<div>${statusBadge(b.kondisi)}</div>`;
  return `<div class="item-card">${catImage(b.kategori)}
    <div class="item-name">${b.nama}</div>
    <div class="item-meta"><span>${b.kategori}</span><span>Stok: ${b.stok<=0?badge('Habis','habis'):b.stok}</span></div>
    ${action}</div>`;
}
function barangGallery(){
  const isSiswa = state.roleKey==='siswa';
  const items = isSiswa ? barang.filter(b=>b.stok>0) : barang.slice(0,6);
  return `<div class="panel"><div class="panel-head"><h3>${isSiswa?'Pilih Barang untuk Dipinjam':'Galeri Barang Lab'}</h3>
  ${isSiswa&&selectedIds.size?`<button class="btn btn-primary" style="width:auto" onclick="formPinjam()">Ajukan Peminjaman (${selectedIds.size})</button>`:''}</div>
  <div class="panel-body"><div class="item-grid">${items.map(itemCard).join('')}</div></div></div>`;
}

function badge(text,cls){return `<span class="badge b-${cls}">${text}</span>`}
function statusBadge(s){
  const map={Aktif:'aktif',Terlambat:'terlambat',Selesai:'selesai',Baik:'baik','Perlu Servis':'servis'};
  return badge(s, map[s]||'aktif');
}
function openModal(html){document.getElementById('modalBody').innerHTML=html;document.getElementById('overlay').classList.add('show')}
function closeModal(){document.getElementById('overlay').classList.remove('show')}

function render(){
  document.getElementById('app').innerHTML = state.loggedIn ? shellView() : loginView();
  if(state.loggedIn) renderPage();
}

function loginView(){
  return `
  <div class="login-wrap">
    <div class="login-side">
      <div>
        <div class="login-tag">SMK PGRI 2 Ponorogo</div>
        <h1>Peminjaman barang lab, tanpa buku catatan.</h1>
        <p>Satu sistem untuk admin, kepala lab, dan siswa — mencatat barang, transaksi, dan laporan secara real-time.</p>
      </div>
      <div class="foot">SIMPINJAM Lab &copy; 2026</div>
    </div>
    <div class="login-form-side"><div class="login-card">
      <h2>Masuk</h2>
      <p class="sub">Gunakan akun admin, kepala lab, atau siswa kamu.</p>
      <div class="field"><label>Username</label><input id="lgUser" placeholder="mis. admin" autocomplete="username"></div>
      <div class="field"><label>Password</label><input id="lgPass" type="password" placeholder="••••••••" autocomplete="current-password" onkeydown="if(event.key==='Enter')doLogin()"></div>
      <div class="err-msg" id="lgErr">Username atau password salah.</div>
      <button class="btn btn-primary" onclick="doLogin()">Masuk</button>
      <div class="demo-hint">akun demo — admin/admin123 · kepala/kepala123 · siswa/siswa123</div>
    </div></div>
  </div>`;
}
function doLogin(){
  const u=(document.getElementById('lgUser').value||'').trim();
  const p=document.getElementById('lgPass').value||'';
  const key = Object.keys(ROLES).find(k=>ROLES[k].user===u && ROLES[k].pass===p);
  if(!key){document.getElementById('lgErr').classList.add('show');return}
  state.loggedIn=true;state.roleKey=key;state.page='dash';render();
}
function doLogout(){state.loggedIn=false;render()}

function shellView(){
  const ro=ROLES[state.roleKey];
  return `
  <div class="shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand"><span class="dot"></span> SIMPINJAM</div>
      ${ro.menu.map(m=>`<div class="nav-item ${state.page===m?'active':''}" onclick="state.page='${m}';closeSidebar();render()">${ICONS[MENU_ICON[m]]}<span>${MENU_LABEL[m]}</span></div>`).join('')}
      <div class="nav-item" onclick="doLogout()" style="margin-top:16px;color:var(--danger)">${ICONS.logout}<span>Keluar</span></div>
    </aside>
    <div class="main">
      <div class="topbar">
        <div style="display:flex;align-items:center;gap:10px">
          <button class="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">${ICONS.menu}</button>
          <h1>${MENU_LABEL[state.page]}</h1>
        </div>
        <div class="who"><div class="avatar">${ro.name[0]}</div><div><div style="font-weight:600;font-size:13.5px">${ro.name}</div><div style="font-size:12px;color:var(--ink-soft)"><span class="role-dot" style="background:${ro.hex}"></span>${ro.label}</div></div></div>
      </div>
      <div class="content" id="content"></div>
    </div>
  </div>`;
}
function closeSidebar(){const s=document.getElementById('sidebar');if(s)s.classList.remove('open')}

function renderPage(){
  const c=document.getElementById('content');
  const fn={dash:pageDash,barang:pageBarang,siswa:pageSiswa,pinjam:pagePinjam,kembali:pageKembali,laporan:pageLaporan}[state.page];
  c.innerHTML = fn ? fn() : '';
}

function pageDash(){
  const total=barang.reduce((a,b)=>a+b.stok,0);
  const aktif=pinjam.filter(p=>p.status==='Aktif').length;
  const telat=pinjam.filter(p=>p.status==='Terlambat').length;
  const cards = state.roleKey==='siswa'
    ? [['1','Pinjaman Aktif Saya'],['2','Riwayat Selesai'],[barang.filter(b=>b.stok>0).length,'Barang Tersedia']]
    : [[total,'Total Stok Barang'],[aktif,'Sedang Dipinjam'],[telat,'Terlambat'],[siswa.length,'Total Siswa']];
  const activity = state.roleKey==='siswa' ? '' : `
  <div class="panel"><div class="panel-head"><h3>Aktivitas Peminjaman Terbaru</h3></div>
    <div class="tbl-wrap"><table><thead><tr><th>ID</th><th>Siswa</th><th>Barang</th><th>Tgl Kembali</th><th>Status</th></tr></thead>
    <tbody>${pinjam.map(p=>`<tr><td>${p.id}</td><td>${p.siswa}</td><td>${p.barang}</td><td>${p.tglKembali}</td><td>${statusBadge(p.status)}</td></tr>`).join('')}</tbody>
    </table></div></div>`;
  return `
  <div class="cards">${cards.map(c=>`<div class="card"><div class="n">${c[0]}</div><div class="l">${c[1]}</div></div>`).join('')}</div>
  ${activity}
  ${barangGallery()}`;
}

function pageBarang(){
  const canEdit = state.roleKey==='admin';
  return `
  <div class="panel"><div class="panel-head"><h3>Daftar Barang Lab</h3>
    ${canEdit?`<button class="btn btn-primary" style="width:auto" onclick="formBarang()">+ Tambah Barang</button>`:''}
  </div>
  <div class="panel-body"><div class="item-grid">${barang.map(itemCard).join('')}</div></div></div>`;
}
function formBarang(){
  openModal(`<h3>Tambah Barang</h3>
  <div class="field"><label>Nama Barang</label><input id="fbNama" placeholder="cth. Laptop Asus"></div>
  <div class="form-row">
    <div class="field"><label>Kategori</label><input id="fbKategori" placeholder="Laptop / Jaringan / dll"></div>
    <div class="field"><label>Stok</label><input id="fbStok" type="number" value="1"></div>
  </div>
  <div class="field"><label>Kondisi</label><select id="fbKondisi"><option>Baik</option><option>Perlu Servis</option></select></div>
  <div style="display:flex;gap:10px;margin-top:6px"><button class="btn btn-ghost" onclick="closeModal()">Batal</button><button class="btn btn-primary" onclick="saveBarang()">Simpan</button></div>`);
}
function saveBarang(){
  const nama=document.getElementById('fbNama').value||'Barang Baru';
  barang.push({id:Date.now(),nama,kategori:document.getElementById('fbKategori').value||'Umum',kondisi:document.getElementById('fbKondisi').value,stok:+document.getElementById('fbStok').value||1});
  closeModal();renderPage();
}
function removeBarang(id){barang=barang.filter(b=>b.id!==id);renderPage()}

function pageSiswa(){
  return `<div class="panel"><div class="panel-head"><h3>Data Siswa</h3><button class="btn btn-primary" onclick="alert('Form tambah siswa — sama pola dengan Tambah Barang')">+ Tambah Siswa</button></div>
  <div class="tbl-wrap"><table><thead><tr><th>Nama</th><th>Kelas</th><th>No. Absen</th><th>No. HP</th><th>Aksi</th></tr></thead>
  <tbody>${siswa.map(s=>`<tr><td>${s.nama}</td><td>${s.kelas}</td><td>${s.absen}</td><td>${s.hp}</td><td><button class="btn btn-ghost" style="padding:6px 12px" onclick="siswa=siswa.filter(x=>x.id!==${s.id});renderPage()">Hapus</button></td></tr>`).join('')}
  </tbody></table></div></div>`;
}

function pagePinjam(){
  const isSiswa = state.roleKey==='siswa';
  const rows = isSiswa ? pinjam.filter(p=>p.siswa==='Ahmad Fauzi') : pinjam;
  return `<div class="panel"><div class="panel-head"><h3>${isSiswa?'Peminjaman Saya':'Transaksi Peminjaman'}</h3>
  <button class="btn btn-primary" onclick="formPinjam()">+ ${isSiswa?'Ajukan Pinjam':'Peminjaman Baru'}</button></div>
  <div class="tbl-wrap"><table><thead><tr><th>ID</th>${isSiswa?'':'<th>Siswa</th>'}<th>Barang</th><th>Tgl Pinjam</th><th>Tgl Kembali</th><th>Status</th></tr></thead>
  <tbody>${rows.map(p=>`<tr><td>${p.id}</td>${isSiswa?'':`<td>${p.siswa}</td>`}<td>${p.barang}</td><td>${p.tglPinjam}</td><td>${p.tglKembali}</td><td>${statusBadge(p.status)}</td></tr>`).join('')||'<tr><td colspan="6" class="empty">Belum ada transaksi</td></tr>'}
  </tbody></table></div></div>`;
}
function formPinjam(){
  const isSiswa = state.roleKey==='siswa';
  openModal(`<h3>${isSiswa?'Ajukan Peminjaman':'Peminjaman Baru'}</h3>
  ${isSiswa?'':`<div class="field"><label>Siswa</label><select id="pjSiswa">${siswa.map(s=>`<option>${s.nama}</option>`).join('')}</select></div>`}
  <div class="field"><label>Pilih Barang</label><div class="chk-list">${barang.filter(b=>b.stok>0).map(b=>`<label><input type="checkbox" value="${b.nama}" ${selectedIds.has(b.id)?'checked':''}> ${b.nama} <span style="color:var(--ink-soft)">(stok ${b.stok})</span></label>`).join('')}</div></div>
  <div class="form-row"><div class="field"><label>Tanggal Pinjam</label><input type="date" id="pjTglP" value="2026-09-22"></div>
  <div class="field"><label>Rencana Kembali</label><input type="date" id="pjTglK" value="2026-09-27"></div></div>
  <div style="display:flex;gap:10px;margin-top:6px"><button class="btn btn-ghost" onclick="closeModal()">Batal</button><button class="btn btn-primary" onclick="savePinjam(${isSiswa})">Simpan</button></div>`);
}
function savePinjam(isSiswa){
  const chosen=[...document.querySelectorAll('.chk-list input:checked')].map(c=>c.value+' x1').join(', ')||'Belum dipilih';
  const namaSiswa = isSiswa ? 'Ahmad Fauzi' : (document.getElementById('pjSiswa')?.value||'Siswa');
  pinjam.unshift({id:'P0'+(pinjam.length+10),siswa:namaSiswa,barang:chosen,tglPinjam:document.getElementById('pjTglP').value,tglKembali:document.getElementById('pjTglK').value,status:'Aktif'});
  selectedIds.clear();
  closeModal();renderPage();
}

function pageKembali(){
  const aktifList = pinjam.filter(p=>p.status==='Aktif'||p.status==='Terlambat');
  return `<div class="panel"><div class="panel-head"><h3>Proses Pengembalian</h3></div>
  <div class="tbl-wrap"><table><thead><tr><th>ID</th><th>Siswa</th><th>Barang</th><th>Jatuh Tempo</th><th>Status</th><th>Aksi</th></tr></thead>
  <tbody>${aktifList.map(p=>`<tr><td>${p.id}</td><td>${p.siswa}</td><td>${p.barang}</td><td>${p.tglKembali}</td><td>${statusBadge(p.status)}</td>
  <td><button class="btn btn-primary" style="padding:7px 14px" onclick="doKembali('${p.id}')">Tandai Kembali</button></td></tr>`).join('')||'<tr><td colspan="6" class="empty">Tidak ada peminjaman aktif</td></tr>'}
  </tbody></table></div></div>`;
}
function doKembali(id){pinjam=pinjam.map(p=>p.id===id?{...p,status:'Selesai'}:p);renderPage()}

function pageLaporan(){
  return `<div class="panel"><div class="panel-head"><h3>Laporan Transaksi</h3>
  <div style="display:flex;gap:8px"><select class="btn btn-ghost"><option>Semua Status</option><option>Aktif</option><option>Terlambat</option><option>Selesai</option></select>
  <button class="btn btn-primary" onclick="window.print()">Cetak / Export</button></div></div>
  <div class="tbl-wrap"><table><thead><tr><th>ID</th><th>Siswa</th><th>Barang</th><th>Tgl Pinjam</th><th>Tgl Kembali</th><th>Status</th></tr></thead>
  <tbody>${pinjam.map(p=>`<tr><td>${p.id}</td><td>${p.siswa}</td><td>${p.barang}</td><td>${p.tglPinjam}</td><td>${p.tglKembali}</td><td>${statusBadge(p.status)}</td></tr>`).join('')}</tbody>
  </table></div></div>`;
}

render();
