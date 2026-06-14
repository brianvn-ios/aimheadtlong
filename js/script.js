var _hhToastTimer = null;
        var _hhIcons = {
          'Game Booster Pro':    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" fill-opacity=".5"/><line x1="9" y1="2" x2="9" y2="6"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="15" y1="2" x2="15" y2="6"/><line x1="9" y1="18" x2="9" y2="22"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="15" y1="18" x2="15" y2="22"/><line x1="2" y1="9" x2="6" y2="9"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="2" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="22" y2="9"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="18" y1="15" x2="22" y2="15"/></svg>',
          'Super Aimlock Elite': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1" fill="currentColor"/><line x1="12" y1="1" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="1" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="23" y2="12"/></svg>',
          'Network + FPS Pro':   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="13,2 5,14 11,14 11,22 19,10 13,10" fill="currentColor" fill-opacity=".5"/></svg>',
          'Auto Headshot X':     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 3C8.13 3 5 6.13 5 10c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h1v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-1.26A7 7 0 0 0 19 10c0-3.87-3.13-7-7-7z" fill="currentColor" fill-opacity=".25"/><circle cx="9.5" cy="9.5" r="1.5" fill="currentColor"/><circle cx="14.5" cy="9.5" r="1.5" fill="currentColor"/></svg>',
          'ESP Wallhack Pro':    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="currentColor" fill-opacity=".15"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
        };
        function hhPower(btn, name, color) {
          if (!window.isActivated) { window.showWelcome && window.showWelcome(); return; }
          var box = btn.closest('.hh-feat-box');
          var isOn = btn.classList.contains('hh-on');
          btn.classList.remove('hh-bursting');
          void btn.offsetWidth;
          btn.classList.add('hh-bursting');
          btn.addEventListener('animationend', function onEnd() {
            btn.classList.remove('hh-bursting');
            btn.removeEventListener('animationend', onEnd);
          });
          btn.classList.toggle('hh-on');
          box.classList.toggle('hh-active');
          hhShowToast(name, color, !isOn);
        }
        function hhShowToast(name, color, isOn) {
          var toast   = document.getElementById('hhToast');
          var titleEl = document.getElementById('hhToastTitle');
          var subEl   = document.getElementById('hhToastSub');
          var iconWrap= document.getElementById('hhToastIcon');
          var pillEl  = document.getElementById('hhToastPill');
          if (!toast) return;
          var rgb = hhHexToRgb(color);
          iconWrap.innerHTML = (_hhIcons[name] || '🔧').replace(/stroke="currentColor"/g, 'stroke="' + color + '"').replace(/fill="currentColor"/g, 'fill="' + color + '"');
          iconWrap.style.background  = 'rgba(' + rgb + ',' + (isOn ? '.2' : '.06') + ')';
          iconWrap.style.boxShadow   = isOn ? '0 0 12px rgba(' + rgb + ',.45)' : 'none';
          iconWrap.style.borderRadius= '50%';
          var allOrbs = document.querySelectorAll('#hhToast .hh-toast-orb');
          allOrbs.forEach(function(d) {
            d.style.background  = color;
            d.style.boxShadow   = '0 0 ' + (isOn ? '7px' : '4px') + ' ' + color;
          });
          titleEl.textContent = name;
          titleEl.style.color = isOn ? '#fff' : 'rgba(255,255,255,.6)';
          subEl.textContent   = isOn ? 'Tính năng đã được kích hoạt' : 'Tính năng đã tắt';
          pillEl.textContent  = isOn ? 'BẬT' : 'TẮT';
          pillEl.className    = 'hh-toast-pill ' + (isOn ? 'on' : 'off');
          toast.style.borderColor = isOn
            ? 'rgba(' + rgb + ',.4)'
            : 'rgba(255,255,255,.1)';
          toast.style.boxShadow = isOn
            ? '0 12px 40px rgba(0,0,0,.6), 0 0 24px rgba(' + rgb + ',.18)'
            : '0 12px 40px rgba(0,0,0,.6)';
          if (_hhToastTimer) { clearTimeout(_hhToastTimer); }
          toast.classList.remove('hh-toast-hide');
          toast.classList.add('hh-toast-show');
          _hhToastTimer = setTimeout(function() {
            toast.classList.remove('hh-toast-show');
            toast.classList.add('hh-toast-hide');
            setTimeout(function() { toast.classList.remove('hh-toast-hide'); }, 280);
          }, 2800);
        }
        function hhHexToRgb(hex) {
          hex = hex.replace('#','');
          if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
          var r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);
          return r+','+g+','+b;
        }
        function hhToggle(btn) {
          var box = btn.closest('.hh-feat-box').querySelector('.hh-feat-desc-wrap');
          if (!box) return;
          var isOpen = box.classList.contains('hh-open');
          document.querySelectorAll('.hh-feat-desc-wrap.hh-open').forEach(function(b){ b.classList.remove('hh-open'); });
          document.querySelectorAll('.hh-info-btn.hh-open-info').forEach(function(b){ b.classList.remove('hh-open-info'); });
          if (!isOpen) {
            box.classList.add('hh-open');
            btn.classList.add('hh-open-info');
          }
        }
        (function() {
          var texts = [
            'HuấnHà App — công cụ tối ưu game hàng đầu Việt Nam.',
            'Hơn 1.200+ game thủ tin tưởng và sử dụng mỗi ngày.',
            'Tăng FPS · Giảm lag · Aimlock chính xác · Headshot tự động.',
            'Bảo mật cao · Không virus · Không bị ban tài khoản game.',
            'Đăng ký key VIP — Trải nghiệm chiến thắng ngay hôm nay! 🏆'
          ];
          var el = document.getElementById('hhTypeEl');
          var cur = document.getElementById('hhTypeCursor');
          if (!el || !cur) return;
          var ti = 0, ci = 0, deleting = false;
          function tick() {
            var fullText = texts[ti];
            if (!deleting) {
              ci++;
              el.textContent = fullText.slice(0, ci);
              if (ci >= fullText.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
              }
              setTimeout(tick, 48 + Math.random() * 30);
            } else {
              ci--;
              el.textContent = fullText.slice(0, ci);
              if (ci <= 0) {
                deleting = false;
                ti = (ti + 1) % texts.length;
                setTimeout(tick, 400);
                return;
              }
              setTimeout(tick, 22 + Math.random() * 15);
            }
          }
          setTimeout(tick, 800);
        })();
    const firebaseConfig = {
  apiKey: "AIzaSyC43d-PAxRNp7aVIJx4hAXVVo7sHH9aL2g",
  authDomain: "severkeytlong.firebaseapp.com",
  databaseURL: "https://severkeytlong-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "severkeytlong",
  storageBucket: "severkeytlong.firebasestorage.app",
  messagingSenderId: "58531137099",
  appId: "1:58531137099:web:cbeb33b1aefcd4b997afce",
  measurementId: "G-M4LC4NPJY0"
    };
    let db = null,
      firebaseReady = false,
      firebaseUID = null,
      _fbAuthReady = false,
      _domReady = false;
    try {
      firebase.initializeApp(firebaseConfig);
      db = firebase.database();
      console.log('[HuấnHà] Firebase DB ✅ (waiting for auth...)');
      firebase.auth().onAuthStateChanged(function(user) {
        if (user && !_fbAuthReady) {
          _fbAuthReady = true;
          firebaseUID = user.uid;
          firebaseReady = true;
          console.log('[HuấnHà] Auth ✅ uid=' + firebaseUID);
          if (_domReady) _onFirebaseAuthReady();
        }
      });
      firebase.auth().signInAnonymously().catch(function(e) {
        console.warn('[HuấnHà] Anonymous auth failed, fallback without auth', e);
        if (!_fbAuthReady) {
          _fbAuthReady = true;
          firebaseReady = true;
          if (_domReady) _onFirebaseAuthReady();
        }
      });
      setTimeout(function() {
        if (!_fbAuthReady) {
          console.warn('[HuấnHà] Firebase auth timeout — switching to Demo mode');
          _fbAuthReady = true;
          firebaseReady = false;
          if (_domReady) _onFirebaseAuthReady();
        }
      }, 6000);
    } catch (e) {
      console.warn('[HuấnHà] Firebase offline, Demo mode.', e);
    }
    function getDeviceId() {
      let id = localStorage.getItem('hh_device_id');
      if (!id) {
        id = 'DEV-' + Math.random().toString(36).substr(2, 8).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
        localStorage.setItem('hh_device_id', id);
      }
      return id;
    }
    const DEVICE_ID = getDeviceId();
    let userProfile = { nick: 'Người dùng', avatar: '🎮', bio: '', keyType: 'free', joinDate: Date.now() };
    function loadProfileLocal() {
      try {
        const s = JSON.parse(localStorage.getItem('hh_profile') || '{}');
        if (s.nick) userProfile.nick = s.nick;
        if (s.avatar) userProfile.avatar = s.avatar;
        if (s.bio !== undefined) userProfile.bio = s.bio;
        if (s.keyType) userProfile.keyType = s.keyType;
        userProfile.joinDate = s.joinDate || Date.now();
      } catch (e) {}
    }
    function saveProfileLocal() {
      try { localStorage.setItem('hh_profile', JSON.stringify(userProfile)); } catch (e) {}
    }
    function syncProfileToFirebase() {
      if (!firebaseReady) return;
      db.ref('users/' + (firebaseUID || DEVICE_ID)).update({
        nick: userProfile.nick,
        avatar: userProfile.avatar,
        bio: userProfile.bio || '',
        keyType: userProfile.keyType || 'free',
        joinDate: userProfile.joinDate,
        lastSeen: Date.now(),
        device: DEVICE_ID
      });
    }
    var isActivated = false;
    let currentKeyData = null;
    let myRating = 0,
      replyToMsg = null,
      prevTab = 'home';
    let allMessages = []; // All messages from Firebase
    let demoChatMessages = []; // Demo mode messages
    let msgDisplayLimit = 100; // How many to display at once
    let msgOffset = 0; // Offset for "load more"
    let newMsgCount = 0; // Unread new messages (while scrolled up)
    let isUserScrolledUp = false; // Track if user has scrolled up
    let lastMsgCount = 0; // Track previous count for new message detection
    let localNotifs = [],
      settings = {};
    let featureStates = { 1: false, 2: false, 3: false, 4: false };
    let onlineHistory = [980, 1140, 1280, 1190, 1350, 1470, 1520, 1440, 1610, 1780, 1690, 1850, 1920, 2050, 1970, 2130, 2240, 2170, 2310, 2050, 2420, 2360, 2480, 2310],
      peakToday = 2480,
      avgOnlineArr = [1247];
    let _statsStarted = false; 
    function esc(s) {
      if (s == null) return '';
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function _onFirebaseAuthReady() {
      loadFreeKeyConfig();
      watchNotifications();
      if (!_statsStarted) watchFirebaseStats(); 
      initChat();
      var savedKey = localStorage.getItem('hh_key');
      if (savedKey) validateSavedKey(savedKey);
      else setTimeout(showWelcome, 700);
    }
    document.addEventListener('DOMContentLoaded', () => {
      loadProfileLocal();
      loadSettings();
      loadNotifList();
      loadProfileUI();
      initAvatarPicker();
      startRAMSimulation();
      watchFirebaseStats();
      checkUnseenNotifs();
      _domReady = true;
      if (_fbAuthReady) _onFirebaseAuthReady();
      try {
        const autoFillKey = localStorage.getItem('hh_key_autofill');
        if (autoFillKey) {
          const inp = document.getElementById('keyInput');
          if (inp) inp.value = autoFillKey;
        }
      } catch(e) {}
      const dsInput = document.getElementById('deviceSearchInput');
      if (dsInput) {
        dsInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            const q = this.value.trim();
            if (q) activateDeviceSensitivity();
          }
        });
      }
      document.addEventListener('click', e => {
        const pop = document.getElementById('userPop');
        if (pop && pop.style.display !== 'none' && !pop.contains(e.target)) closeUserPop();
      });
      document.querySelectorAll('.overlay').forEach(ol => {
        ol.addEventListener('click', e => { if (e.target === ol) ol.classList.remove('show'); });
      });
    });
    function switchTab(name) {
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      const tab = document.getElementById('tab-' + name);
      if (tab) tab.classList.add('active');
      const btn = document.getElementById('nav-' + name);
      if (btn) btn.classList.add('active');
      document.querySelector('.main').scrollTop = 0;
    }
    function showWelcome() {
      document.getElementById('welcomeOverlay').classList.add('show');
      const saved = localStorage.getItem('hh_key') || localStorage.getItem('hh_key_autofill');
      const inp = document.getElementById('keyInput');
      if (inp && saved) { inp.value = saved; }
      const btn = document.getElementById('wmPasteBtn');
      if (btn) btn.style.display = saved ? 'flex' : 'flex';
    }
    function closeWelcome() { document.getElementById('welcomeOverlay').classList.remove('show'); }
    function openKeyInfoModal() { updateKeyInfoModal();
      document.getElementById('keyInfoOverlay').classList.add('show'); }
    function closeKeyInfo() { document.getElementById('keyInfoOverlay').classList.remove('show'); }
    function openNotifModal() {
      const dot = document.getElementById('notifDot');
      dot.style.display = 'none';
      dot.classList.remove('has-count');
      const cnt = document.getElementById('notifCount');
      if (cnt) cnt.textContent = '';
      try { localStorage.setItem('hh_notif_seen_ts', Date.now()); } catch(e) {}
      document.getElementById('notifOverlay').classList.add('show');
    }
    function closeNotifModal() { document.getElementById('notifOverlay').classList.remove('show'); }
    function openUpdateModal() { document.getElementById('updateOverlay').classList.add('show'); }
    function closeUpdateModal() { document.getElementById('updateOverlay').classList.remove('show'); }
    function openAvatarPicker() { document.getElementById('avatarPickerOverlay').classList.add('show'); }
    function closeAvatarPicker() { document.getElementById('avatarPickerOverlay').classList.remove('show'); }
    let _toastTimer = null;
    function hideTopbarModal() {
      const m = document.getElementById('topbarModal');
      if (m) m.classList.remove('show');
      clearTimeout(_toastTimer);
    }
    function showToast(html, cls) {
      const plain = html.replace(/<[^>]+>/g, '').trim();
      const m = document.getElementById('topbarModal');
      const iconEl = document.getElementById('topbarModalIcon');
      const textEl = document.getElementById('topbarModalText');
      if (!m || !iconEl || !textEl) return;
      const okSvg  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e87a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      const errSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3355" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      const defSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      if (cls === 'ok') {
        iconEl.className = 'topbar-modal-icon ok';
        iconEl.innerHTML = okSvg;
      } else if (cls === 'err') {
        iconEl.className = 'topbar-modal-icon err';
        iconEl.innerHTML = errSvg;
      } else {
        iconEl.className = 'topbar-modal-icon';
        iconEl.innerHTML = defSvg;
      }
      textEl.textContent = plain;
      m.classList.add('show');
      clearTimeout(_toastTimer);
      _toastTimer = setTimeout(() => m.classList.remove('show'), 2800);
    }
    function loadProfileUI() {
      const p = userProfile;
      const prev = document.getElementById('settingsAvatarPreview');
      if (p.avatar && (p.avatar.startsWith('http') || p.avatar.startsWith('data:'))) {
        prev.innerHTML = `<img src="${esc(p.avatar)}" style="width:64px;height:64px;object-fit:cover;border-radius:50%;">`;
      } else {
        prev.innerHTML = `<span style="font-size:28px;">${p.avatar || '🎮'}</span>`;
      }
      document.getElementById('settingsNickDisplay').textContent = p.nick || 'Người dùng';
      document.getElementById('settingsBioDisplay').textContent = p.bio || 'Chưa có tiểu sử';
      document.getElementById('nickInput').value = p.nick || '';
      document.getElementById('bioInput').value = p.bio || '';
      const jd = p.joinDate ? new Date(p.joinDate).toLocaleDateString('vi-VN') : '--';
      document.getElementById('settingsJoinInfo').innerHTML = `<i class="fa-solid fa-calendar" style="font-size:9px;"></i> Tham gia: ${jd}`;
      updateKeyTypeBadge(p.keyType || 'free');
    }
    function saveProfile() {
      const nick = document.getElementById('nickInput').value.trim() || 'Người dùng';
      const bio = document.getElementById('bioInput').value.trim();
      userProfile.nick = nick;
      userProfile.bio = bio;
      saveProfileLocal();
      loadProfileUI();
      syncProfileToFirebase();
      if (firebaseReady) db.ref('presence/' + DEVICE_ID).update({ nick, avatar: userProfile.avatar, keyType: userProfile.keyType });
      showToast('<i class="fa-solid fa-check"></i> Đã lưu hồ sơ!', 'ok');
    }
    function updateKeyTypeBadge(kt) {
      const el = document.getElementById('settingsKeyTypeBadge');
      if (!el) return;
      const map = { free: ['Free', 'pbt-free'], demo: ['Demo', 'pbt-demo'], standard: ['Standard', 'pbt-standard'], vip: ['VIP', 'pbt-vip'], premium: ['Premium', 'pbt-premium'] };
      const [label, cls] = map[(kt || 'free').toLowerCase()] || ['Free', 'pbt-free'];
      el.textContent = label;
      el.className = 'profile-key-badge-type ' + cls;
    }
    const AVATARS = ['🎮', '👑', '🔥', '⚡', '💀', '🎯', '🛡️', '🚀', '🌙', '🐉', '🦊', '🐺', '🦁', '🐯', '🦅', '🎭', '😈', '😎', '🤖', '💎', '🌟', '🌈', '🎪', '🏆', '💥', '🔮', '🎸', '🏴‍☠️', '🌀', '💫'];
    function initAvatarPicker() {
      const g = document.getElementById('avatarPickerGrid');
      if (!g) return;
      g.innerHTML = '';
      AVATARS.forEach(av => {
        const d = document.createElement('div');
        d.className = 'avatar-option' + (userProfile.avatar === av ? ' selected' : '');
        d.textContent = av;
        d.onclick = () => { g.querySelectorAll('.avatar-option').forEach(x => x.classList.remove('selected'));
          d.classList.add('selected');
          document.getElementById('avatarUrlInput').value = ''; };
        g.appendChild(d);
      });
    }
    function applyAvatar() {
      const url = document.getElementById('avatarUrlInput').value.trim();
      let av = url;
      if (!av) {
        const sel = document.querySelector('#avatarPickerGrid .avatar-option.selected');
        if (!sel) { showToast('<i class="fa-solid fa-exclamation"></i> Chọn avatar!', 'err'); return; }
        av = sel.textContent;
      }
      userProfile.avatar = av;
      saveProfileLocal();
      loadProfileUI();
      syncProfileToFirebase();
      if (firebaseReady) db.ref('presence/' + DEVICE_ID).update({ avatar: av });
      closeAvatarPicker();
      showToast('<i class="fa-solid fa-check"></i> Đã cập nhật avatar!', 'ok');
    }
    function jkBoostToggle(el, wrapId, name, icon) {
      if (!isActivated) {
        showToast('<i class="fa-solid fa-lock"></i> Cần kích hoạt key!', 'err');
        el.checked = false;
        return;
      }
      const wrap = document.getElementById(wrapId);
      if (wrap) {
        if (el.checked) { wrap.classList.add('rd-active'); }
        else { wrap.classList.remove('rd-active'); }
      }
      showToast('<i class="fa-solid ' + icon + '"></i> ' + name + ' ' + (el.checked ? '<strong style="color:var(--green)">BẬT</strong>' : '<strong style="color:var(--text2)">TẮT</strong>'), 'ok');
    }
    function jkPwrToggle(btn, wrapId, name) {
      if (!isActivated) {
        showToast(`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff3355" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Cần kích hoạt key trước!`, 'err');
        return;
      }
      const isOn = btn.classList.toggle('on');
      const wrap = document.getElementById(wrapId);
      if (wrap) wrap.classList.toggle('on', isOn);
      const card = btn.closest('.jk-boost-card');
      if (card) card.classList.toggle('jk-boost-on', isOn);
      const ripple = document.createElement('div');
      ripple.className = 'jk-pwr-ripple';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
      if (isOn) {
        for (let i = 0; i < 5; i++) {
          const sp = document.createElement('div');
          const angle = (i / 5) * 360;
          const dist = 28 + Math.random() * 12;
          sp.style.cssText = `position:absolute;top:50%;left:50%;width:4px;height:4px;border-radius:50%;background:#FFD700;pointer-events:none;z-index:10;transform:translate(-50%,-50%) rotate(${angle}deg) translateX(${dist}px);animation:pwrRipple 0.55s ease-out forwards;box-shadow:0 0 8px #FFD700;`;
          btn.appendChild(sp);
          setTimeout(() => sp.remove(), 700);
        }
      }
      const stateHTML = isOn
        ? `<strong style="color:#FFD700;text-shadow:0 0 8px rgba(255,215,0,0.7);">✦ BẬT</strong>`
        : `<strong style="color:rgba(255,255,255,0.4);">TẮT</strong>`;
      const iconSVG = isOn
        ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>`;
      showToast(iconSVG + ' ' + name + ' ' + stateHTML, isOn ? 'ok' : '');
    }
    function pasteKeyFromStorage() {
      const saved = localStorage.getItem('hh_key') || localStorage.getItem('hh_key_autofill');
      const inp = document.getElementById('keyInput');
      if (!inp) return;
      if (saved) {
        inp.value = saved;
        inp.style.color = 'var(--cyan)';
        setTimeout(() => { inp.style.color = ''; }, 800);
        showToast('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e87a" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Đã dán key đã lưu!', 'ok');
      } else {
        navigator.clipboard.readText().then(text => {
          if (text) { inp.value = text; showToast('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Đã dán từ clipboard!', ''); }
          else { showToast('Clipboard trống', 'err'); }
        }).catch(() => {
          showToast('Không thể đọc clipboard', 'err');
        });
      }
    }
    const KEY_TYPE_NOTES = {
      free:     'Key miễn phí',
      demo:     'Key dùng thử',
      standard: 'Key 150k — Jerkill Standard 7 ngày',
      vip:      'Key 150k — Jerkill VIP 30 ngày',
      premium:  'Key 350k — Jerkill Premium 90 ngày'
    };
    function updateKeyInfoModal() {
      const d = currentKeyData;
      const av = userProfile.avatar;
      const kiAv = document.getElementById('kiAvatarEl');
      if (av && (av.startsWith('http') || av.startsWith('data:'))) kiAv.innerHTML = `<img src="${esc(av)}">`;
      else kiAv.textContent = av || '🎮';
      document.getElementById('kiHeroNick').textContent = userProfile.nick || 'HuấnHà App Key';
      if (d) {
        document.getElementById('ki-status-pill').className = 'ki-status-pill active';
        document.getElementById('ki-status-pill-text').textContent = 'Đã kích hoạt';
        document.getElementById('ki-key').textContent = localStorage.getItem('hh_key') || '—';
        document.getElementById('ki-status').textContent = 'Active';
        document.getElementById('ki-status').className = 'ki-val ok';
        document.getElementById('ki-type').textContent = (d.type || 'unknown').toUpperCase();
        const typeNote = KEY_TYPE_NOTES[(d.type||'free').toLowerCase()] || (d.type||'').toUpperCase();
        const kiTypeNoteEl = document.getElementById('ki-type-note');
        if (kiTypeNoteEl) kiTypeNoteEl.textContent = d.note || typeNote;
        document.getElementById('ki-expire').textContent = d.expire ? new Date(d.expire).toLocaleDateString('vi-VN') : 'Vĩnh viễn';
        document.getElementById('ki-maxdev').textContent = d.maxDevices ? d.maxDevices + ' thiết bị' : '—';
        document.getElementById('ki-name').textContent = d.name || userProfile.nick || '—';
        document.getElementById('ki-note').textContent = d.note || '—';
        document.getElementById('ki-device').textContent = DEVICE_ID;
      } else {
        document.getElementById('ki-status-pill').className = 'ki-status-pill inactive';
        document.getElementById('ki-status-pill-text').textContent = 'Chưa kích hoạt';
        document.getElementById('ki-key').textContent = 'Chưa kích hoạt';
        document.getElementById('ki-status').textContent = '—';
        document.getElementById('ki-status').className = 'ki-val';
        ['ki-type', 'ki-expire', 'ki-maxdev', 'ki-name', 'ki-note'].forEach(id => document.getElementById(id).textContent = '—');
        document.getElementById('ki-device').textContent = DEVICE_ID;
      }
    }
    function activateKey() {
      const raw = document.getElementById('keyInput').value.trim();
      if (!raw) { showActivateMsg('<i class="fa-solid fa-exclamation-circle"></i> Vui lòng nhập key!', 'err'); return; }
      const btn = document.getElementById('activateBtn');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Đang kiểm tra...</span>';
      showActivateMsg('<i class="fa-solid fa-spinner fa-spin"></i> Đang xác thực Firebase...', '');
      if (!firebaseReady) { setTimeout(() => simulateKeyValidation(raw), 1200); return; }
      const safeKey = raw.replace(/-/g, '_');
      db.ref('keys/' + safeKey).once('value').then(snap => {
        const d = snap.val();
        if (!d) { showActivateMsg('<i class="fa-solid fa-times-circle"></i> Key không tồn tại!', 'err');
          resetActivateBtn(); return; }
        if (d.active === false || d.status === 'locked' || d.status === 'banned') { handleKeyLocked('Key đã bị khóa!'); return; }
        if (d.expire && Date.now() > d.expire) { showActivateMsg('<i class="fa-solid fa-clock"></i> Key đã hết hạn!', 'err');
          resetActivateBtn(); return; }
        const usedDevs = d.usedDevices || d.devices || {};
        if (d.maxDevices && !usedDevs[DEVICE_ID] && Object.keys(usedDevs).length >= d.maxDevices) {
          showActivateMsg('<i class="fa-solid fa-desktop"></i> Key đã đạt giới hạn thiết bị!', 'err');
          resetActivateBtn();
          return;
        }
        db.ref('keys/' + safeKey + '/usedDevices/' + DEVICE_ID).set(Date.now());
        localStorage.setItem('hh_key', raw);
        handleKeySuccess(d, raw);
      }).catch(() => { showActivateMsg('<i class="fa-solid fa-wifi"></i> Lỗi kết nối!', 'err');
        resetActivateBtn(); });
    }
    function simulateKeyValidation(key) {
      const demo = { 'HH-DEMO-FREE-2026': { type: 'free', status: 'active' }, 'HH-VIP-2026': { type: 'vip', status: 'active' }, 'HH-PREMIUM-2026': { type: 'premium', status: 'active' } };
      const d = demo[key.toUpperCase()];
      if (d) { localStorage.setItem('hh_key', key);
        handleKeySuccess(d, key); }
      else { showActivateMsg('<i class="fa-solid fa-times-circle"></i> Key không hợp lệ!', 'err');
        resetActivateBtn(); }
    }
    function validateSavedKey(key) {
      if (!firebaseReady) {
        const demo = { 'HH-DEMO-FREE-2026': { type: 'free' }, 'HH-VIP-2026': { type: 'vip' }, 'HH-PREMIUM-2026': { type: 'premium' } };
        const d = demo[key.toUpperCase()];
        if (d) handleKeySuccess(d, key, true);
        else setTimeout(showWelcome, 700);
        return;
      }
      const safeKey = key.replace(/-/g, '_');
      db.ref('keys/' + safeKey).once('value').then(snap => {
        const d = snap.val();
        if (!d || d.active === false || d.status === 'locked' || d.status === 'banned') { handleKeyLocked(d ? 'Key bị khóa!' : 'Key không còn hợp lệ!'); return; }
        if (d.expire && Date.now() > d.expire) { showToast('<i class="fa-solid fa-clock"></i> Key hết hạn!', 'err');
          setTimeout(showWelcome, 900); return; }
        handleKeySuccess(d, key, true);
      }).catch(() => { handleKeySuccess({ type: userProfile.keyType || 'free' }, key, true); });
    }
    function handleKeySuccess(d, key, silent) {
      isActivated = true;
      currentKeyData = d;
      userProfile.keyType = d.type || 'free';
      saveProfileLocal();
      updateKeyTypeBadge(userProfile.keyType);
      loadProfileUI();
      updateHeaderStatus(true);
      updateKeyBadge();
      unlockFeatures();
      if (!silent) closeWelcome();
      showToast('<i class="fa-solid fa-circle-check"></i> Kích hoạt thành công!', 'ok');
      if (!silent) resetActivateBtn();
      syncProfileToFirebase();
      if (key) {
        try {
          localStorage.setItem('hh_key_autofill', key);
        } catch(e) {}
      }
    }
    function handleKeyLocked(msg) {
      isActivated = false;
      updateHeaderStatus(false);
      const b = document.getElementById('keyBadge');
      b.innerHTML = '<i class="fa-solid fa-lock" style="font-size:9px;"></i> <span>LOCKED</span>';
      b.className = 'key-badge locked';
      currentKeyData = null;
      showToast('<i class="fa-solid fa-lock"></i> ' + msg, 'err');
      setTimeout(showWelcome, 900);
    }
    function unlockFeatures() {
      for (let i = 1; i <= 7; i++) { const el = document.getElementById('fc' + i); if (el) el.classList.remove('locked'); }
      ['bgLockOverlay','hhLock1','hhLock2','hhLock3','hhLock4','hhLock5','cpuLockOverlay'].forEach(function(id) {
        var el = document.getElementById(id); if (el) el.classList.add('unlocked');
      });
    }
    function lockFeatures() {
      for (let i = 1; i <= 7; i++) {
        const c = document.getElementById('fc' + i);
        if (!c) continue;
        c.classList.add('locked');
        c.classList.remove('enabled');
        const btn = document.getElementById('fcb' + i);
        if (btn) btn.classList.remove('on');
        const t = document.getElementById('ftag' + i);
        if (t) { t.className = 'fc-status-tag'; t.innerHTML = '<i class="fa-solid fa-circle" style="font-size:6px;"></i> Chưa bật'; }
        featureStates[i] = false;
      }
      ['bgLockOverlay','hhLock1','hhLock2','hhLock3','hhLock4','hhLock5','cpuLockOverlay'].forEach(function(id) {
        var el = document.getElementById(id); if (el) el.classList.remove('unlocked');
      });
    }
    function updateHeaderStatus(on) {
      document.getElementById('statusDot').className = 'status-dot' + (on ? ' on' : '');
      document.getElementById('statusText').textContent = on ? 'Đã kích hoạt' : 'Chưa kích hoạt';
    }
    function updateKeyBadge() {
      const b = document.getElementById('keyBadge');
      const d = currentKeyData;
      if (!d) { b.innerHTML = '<i class="fa-solid fa-key" style="font-size:9px;"></i> <span>DEMO</span>';
        b.className = 'key-badge'; return; }
      b.innerHTML = '<i class="fa-solid fa-key" style="font-size:9px;"></i> <span>' + (d.type || 'KEY').toUpperCase() + '</span>';
      b.className = 'key-badge active';
    }
    function resetActivateBtn() {
      const b = document.getElementById('activateBtn');
      if (!b) return;
      b.disabled = false;
      b.innerHTML = '<i class="fa-solid fa-bolt"></i><span>KÍCH HOẠT NGAY</span>';
    }
    function showActivateMsg(html, cls) {
      const e = document.getElementById('activateMsg');
      e.innerHTML = html;
      e.className = 'wm-msg ' + cls;
    }
    function logoutKey() {
      localStorage.removeItem('hh_key');
      isActivated = false;
      currentKeyData = null;
      userProfile.keyType = 'free';
      saveProfileLocal();
      updateKeyTypeBadge('free');
      loadProfileUI();
      lockFeatures();
      updateHeaderStatus(false);
      updateKeyBadge();
      showToast('<i class="fa-solid fa-right-from-bracket"></i> Đã đăng xuất key', '');
      setTimeout(showWelcome, 400);
    }
    function featureClick(id, name) {
      if (!isActivated) { showToast('<i class="fa-solid fa-lock"></i> Cần kích hoạt key!', 'err');
        showWelcome(); }
    }
    function featureToggle(id, name) {
      if (!isActivated) { showToast('<i class="fa-solid fa-lock"></i> Cần kích hoạt key!', 'err'); return; }
      featureStates[id] = !featureStates[id];
      const on = featureStates[id];
      const card = document.getElementById('fc' + id);
      const btn = document.getElementById('fcb' + id);
      const tag = document.getElementById('ftag' + id);
      if (on) {
        card.classList.add('enabled');
        btn.classList.add('on');
        const wEl = document.getElementById('fcwings' + id);
        if (wEl) { wEl.classList.remove('fc-wings-jump'); void wEl.offsetWidth; wEl.classList.add('fc-wings-jump'); setTimeout(()=>wEl.classList.remove('fc-wings-jump'),900); }
        triggerWingSplash(name, true);
        if (navigator.vibrate) navigator.vibrate([80, 45, 80]);
        tag.className = 'fc-status-tag on';
        tag.innerHTML = '<i class="fa-solid fa-circle" style="font-size:6px;"></i> Đang chạy';
      } else {
        card.classList.remove('enabled');
        btn.classList.remove('on');
        triggerWingSplash(name, false);
        if (navigator.vibrate) navigator.vibrate([50]);
        tag.className = 'fc-status-tag';
        tag.innerHTML = '<i class="fa-solid fa-circle" style="font-size:6px;"></i> Chưa bật';
      }
      showFeatNotif(name, on);
    }
    let _wingSplashTimer = null;
    function triggerWingSplash(name, isOn) {
      const splash = document.getElementById('wingSplash');
      const label = document.getElementById('wingSplashLabel');
      if (!splash) return;
      clearTimeout(_wingSplashTimer);
      splash.className = 'wing-splash';
      void splash.offsetWidth;
      if (label) label.textContent = isOn ? ('✦ ' + name + ' ✦') : ('✦ ' + name + ' ✦');
      if (label) label.style.color = isOn ? '#ff3355' : 'rgba(255,51,85,0.6)';
      splash.classList.add(isOn ? 'show' : 'off-show');
      _wingSplashTimer = setTimeout(() => {
        splash.classList.remove('show', 'off-show');
        void splash.offsetWidth;
        splash.classList.add(isOn ? 'hide' : 'off-hide');
        _wingSplashTimer = setTimeout(() => {
          splash.className = 'wing-splash';
        }, 380);
      }, 950);
    }
    let _featTimer = null;
    function showFeatNotif(name, on) {
      const n = document.getElementById('featNotif'),
        iw = document.getElementById('featNotifIconWrap');
      const ic = document.getElementById('featNotifIcon'),
        ti = document.getElementById('featNotifTitle'),
        sub = document.getElementById('featNotifSub');
      clearTimeout(_featTimer);
      iw.className = 'feat-notif-icon-wrap loading';
      ic.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spinR 1s linear infinite"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>';
      ic.className = '';
      ti.textContent = (on ? 'Đang bật ' : 'Đang tắt ') + name;
      sub.textContent = 'Vui lòng chờ...';
      n.classList.add('show');
      _featTimer = setTimeout(() => {
        if (on) { iw.className = 'feat-notif-icon-wrap done';
          ic.className = 'fa-solid fa-circle-check';
          ti.textContent = 'Đã bật ' + name;
          sub.textContent = 'Tính năng đang hoạt động'; }
        else { iw.className = 'feat-notif-icon-wrap off';
          ic.className = 'fa-solid fa-circle-xmark';
          ti.textContent = 'Đã tắt ' + name;
          sub.textContent = 'Tính năng đã dừng'; }
        _featTimer = setTimeout(() => n.classList.remove('show'), 2000);
      }, 1200);
    }
    const ramH = [30, 50, 38, 65, 44, 55, 36, 58];
    let ramUsed = 1200,
      ramTotal = 4096;
    const charPartPositions = {
      head: { top: '8%', left: 'calc(50% - 20px)' },
      neck: { top: '26%', left: 'calc(50% - 20px)' },
      body: { top: '45%', left: 'calc(50% - 20px)' }
    };
    let currentCharPart = 'head';
    function selectCharPart(part, btn) {
      currentCharPart = part;
      document.querySelectorAll('.char-part-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const crosshair = document.getElementById('charCrosshair');
      if (!crosshair) return;
      const pos = charPartPositions[part] || charPartPositions.head;
      crosshair.style.top = pos.top;
      crosshair.style.left = pos.left;
    }
    function startRAMSimulation() {
      updateRAMDisplay();
      setInterval(() => {
        for (let i = 0; i < 8; i++) ramH[i] = Math.min(93, Math.max(8, ramH[i] + (Math.random() - 0.47) * 14));
        ramUsed = Math.round(ramTotal * (0.25 + Math.random() * 0.45));
        updateRAMDisplay();
      }, 1500);
    }
    function updateRAMDisplay() {
      const bars = document.querySelectorAll('#ramBars .ram-spider-bar, #ramBars .ram-bar');
      ramH.forEach((h, i) => { if (bars[i]) bars[i].style.height = Math.round(h) + '%'; });
      const pct = Math.round((ramUsed / ramTotal) * 100),
        free = ramTotal - ramUsed;
      document.getElementById('ramVal').textContent = ramUsed.toLocaleString();
      document.getElementById('ramPct').textContent = pct + '%';
      document.getElementById('ramTotal').textContent = ramTotal.toLocaleString() + ' MB';
      document.getElementById('ramFree').textContent = free.toLocaleString() + ' MB';
      document.getElementById('ramFill').style.width = pct + '%';
    }
    const CHAT_STORAGE_KEY = 'hh_chat_cache';
    const CHAT_RESET_KEY = 'hh_chat_reset_ts';
    const CHAT_TTL = 24 * 60 * 60 * 1000;
    function saveChatToLocal(msgs) {
      try {
        const now = Date.now();
        let resetTs = parseInt(localStorage.getItem(CHAT_RESET_KEY) || '0');
        if (!resetTs) { resetTs = now; localStorage.setItem(CHAT_RESET_KEY, resetTs); }
        if (now - resetTs > CHAT_TTL) {
          localStorage.removeItem(CHAT_STORAGE_KEY);
          localStorage.setItem(CHAT_RESET_KEY, now);
          return;
        }
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(msgs.slice(-60)));
      } catch(e) {}
    }
    function loadChatFromLocal() {
      try {
        const resetTs = parseInt(localStorage.getItem(CHAT_RESET_KEY) || '0');
        if (resetTs && Date.now() - resetTs > CHAT_TTL) {
          localStorage.removeItem(CHAT_STORAGE_KEY);
          localStorage.setItem(CHAT_RESET_KEY, Date.now());
          return [];
        }
        return JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
      } catch(e) { return []; }
    }
    function loadFreeKeyConfig() {
      if (!firebaseReady) { document.getElementById('freeKeyText').textContent = 'HH-DEMO-FREE-2026'; return; }
      db.ref('config/freeKey').on('value', snap => {
        const d = snap.val();
        if (d) {
          document.getElementById('freeKeyText').textContent = d.key || 'HH-FREE-2026';
          if (d.link) document.getElementById('freeKeyLinkBtn').href = d.link;
        }
      }, err => {
        console.warn('[HuấnHà] loadFreeKeyConfig error:', err.code || err.message || err);
      });
    }
    function copyFreeKey() {
      const k = document.getElementById('freeKeyText').textContent;
      navigator.clipboard.writeText(k).then(() => {
        showToast('<i class="fa-solid fa-copy"></i> Đã sao chép key!', 'ok');
      }).catch(() => {
        document.getElementById('keyInput').value = k;
        showToast('<i class="fa-solid fa-copy"></i> Key đã điền vào ô nhập!', 'ok');
      });
    }
    const AVATAR_COLORS = ['#3b82f6', '#8b5cf6', '#00d4ff', '#f97316', '#ec4899', '#00e87a', '#fbbf24', '#f43f5e'];
    function getColor(nick) {
      let h = 0;
      for (const c of (nick || '')) h = (h << 5) - h + c.charCodeAt(0);
      return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
    }
    function getInitial(nick) { return ((nick || 'U')[0]).toUpperCase(); }
    function getAvClass(kt) {
      const t = (kt || 'free').toLowerCase();
      return { premium: 'av-premium', vip: 'av-vip', standard: 'av-standard', demo: 'av-demo', free: 'av-free' } [t] || 'av-free';
    }
    function getKbClass(kt) {
      const t = (kt || 'free').toLowerCase();
      return { premium: 'ckb-premium', vip: 'ckb-vip', standard: 'ckb-standard', demo: 'ckb-demo', free: 'ckb-free' } [t] || 'ckb-free';
    }
    function getKtIcon(kt) {
      return { premium: '👑', vip: '⭐', standard: '🔴', demo: '🧪', free: '💜' } [(kt || 'free').toLowerCase()] || '💜';
    }
    function setRating(val) {
      myRating = val;
      document.querySelectorAll('#rateStarsEl .rate-star-btn').forEach((s, i) => {
        const lit = i < val;
        s.classList.toggle('active', lit);
        s.style.color = lit ? 'var(--star-color)' : 'var(--star-empty)';
        s.style.filter = lit ? 'drop-shadow(0 0 8px rgba(245,158,11,0.8))' : 'none';
        s.style.transform = lit ? 'scale(1.1)' : 'scale(1)';
      });
      const rv = document.getElementById('rateValEl');
      rv.textContent = val + '★';
      rv.classList.add('has-rating');
      const star = document.querySelectorAll('#rateStarsEl .rate-star-btn')[val - 1];
      if (star) spawnStarParticle(star);
    }
    function previewRating(val) {
      document.querySelectorAll('#rateStarsEl .rate-star-btn').forEach((s, i) => {
        const lit = i < val;
        s.style.color = lit ? 'var(--star-color)' : 'var(--star-empty)';
        s.style.filter = lit ? 'drop-shadow(0 0 8px rgba(245,158,11,0.8))' : 'none';
        s.style.transform = lit ? 'scale(1.3) rotate(-5deg)' : 'scale(1)';
      });
    }
    function resetRatingPreview() {
      document.querySelectorAll('#rateStarsEl .rate-star-btn').forEach((s, i) => {
        const lit = i < myRating;
        s.style.color = lit ? 'var(--star-color)' : 'var(--star-empty)';
        s.style.filter = lit ? 'drop-shadow(0 0 8px rgba(245,158,11,0.8))' : 'none';
        s.style.transform = lit ? 'scale(1.1)' : 'scale(1)';
      });
    }
    function spawnStarParticle(el) {
      const r = el.getBoundingClientRect();
      const p = document.createElement('div');
      p.className = 'star-particle';
      p.innerHTML = '⭐';
      p.style.left = (r.left + r.width / 2 - 10) + 'px';
      p.style.top = (r.top - 8) + 'px';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
    function calcAndRenderOverall(msgs) {
      const rated = msgs.filter(m => m.rating && m.rating > 0);
      const stEl = document.getElementById('overallStarsEl');
      const nEl = document.getElementById('overallNumEl');
      const cEl = document.getElementById('overallCountEl');
      if (!rated.length) {
        nEl.textContent = '—';
        cEl.textContent = '(0 đánh giá)';
        stEl.innerHTML = [1,2,3,4,5].map(() => '<svg class="empty-star" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--star-color)" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>').join('');
        return;
      }
      const avg = rated.reduce((s, m) => s + m.rating, 0) / rated.length;
      const r = Math.round(avg);
      nEl.textContent = avg.toFixed(1);
      cEl.textContent = '(' + rated.length + ' đánh giá)';
      const litSvg  = '<svg class="lit-star" width="12" height="12" viewBox="0 0 24 24" fill="var(--star-color)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      const emptySvg = '<svg class="empty-star" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--star-color)" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      stEl.innerHTML = [1,2,3,4,5].map(i => i <= r ? litSvg : emptySvg).join('');
      computeRatingBreakdown(msgs);
    }
    function initChat() {
      if (!firebaseReady) { loadDemoChat(); return; }
      let _ic1Loaded = false;
      const _ic1Timer = setTimeout(() => {
        if (!_ic1Loaded && !allMessages.length) loadDemoChat();
      }, 8000);
      db.ref('chat/messages').limitToLast(60).on('value', snap => {
        clearTimeout(_ic1Timer);
        _ic1Loaded = true;
        const msgs = [];
        snap.forEach(c => msgs.push({ id: c.key, ...c.val() }));
        allMessages = msgs;
        const prevCount = lastMsgCount;
        lastMsgCount = msgs.length;
        const isNewMsg = msgs.length > prevCount && prevCount > 0;
        renderMessages(msgs);
        calcAndRenderOverall(msgs);
        if (isNewMsg && isUserScrolledUp) {
          newMsgCount++;
          showScrollFab(newMsgCount);
        }
        if (!isUserScrolledUp || prevCount === 0) {
          scheduleScrollToBottom();
        }
      }, err => {
        clearTimeout(_ic1Timer);
        console.warn('[HuấnHà] initChat listener error:', err.code || err.message || err);
        if (!allMessages.length) loadDemoChat();
      });
      const presRef = db.ref('presence/' + DEVICE_ID);
      presRef.set({ nick: userProfile.nick, ts: Date.now(), avatar: userProfile.avatar, keyType: userProfile.keyType || 'free' }).catch(() => {});
      presRef.onDisconnect().remove();
      db.ref('presence').on('value', snap => {
        const cnt = snap.numChildren();
        const el = document.getElementById('onlineCount');
        if (el) el.innerHTML = `<i class="fa-solid fa-circle" style="color:var(--green);font-size:7px;animation:pulseDot 2s infinite;"></i> ${cnt} online`;
        updateJerkillOnline(cnt);
        updateOnlineUserStat(cnt);
      }, () => {});
    }
    function loadDemoChat() {
      demoChatMessages = [
        { id: 'd1', nick: 'HuấnHà', avatar: '👑', keyType: 'premium', text: 'Chào mừng anh em! App v2.5 đã ra mắt 🎉 Fix hoàn toàn lỗi chat không hiển thị!', ts: Date.now() - 300000, rating: 5, device: 'ADMIN-001' },
        { id: 'd2', nick: 'DragonX99', avatar: '🐉', keyType: 'vip', text: 'ESP mượt lắm anh ơi! Ngon hơn tool cũ nhiều 💯 VIP quá đáng tiền!', ts: Date.now() - 240000, rating: 5, device: 'DEV-ABC1' },
        { id: 'd3', nick: 'SkyPlayer', avatar: '🦅', keyType: 'standard', text: 'Game Booster ngon thật, ping giảm từ 80ms còn 20ms rồi!', ts: Date.now() - 180000, rating: 4, device: 'DEV-DEF2' },
        { id: 'd4', nick: 'PhantomVN', avatar: '😈', keyType: 'free', text: 'Key free lấy ở đâu vậy mọi người? Mình mới vô', ts: Date.now() - 120000, rating: 3, device: 'DEV-GHI3' },
        { id: 'd5', nick: 'HuấnHà', avatar: '👑', keyType: 'premium', text: '@PhantomVN lấy key free ở tab Home nhé! Nhớ follow kênh để nhận key VIP free 🎁', ts: Date.now() - 90000, rating: 5, device: 'ADMIN-001', replyTo: { nick: 'PhantomVN', text: 'Key free lấy ở đâu vậy mọi người?' } },
        { id: 'd6', nick: 'ZeroGravity', avatar: '🌀', keyType: 'vip', text: 'App ổn định, không bị ban sau 2 tuần dùng liên tục 😍 VIP đáng lắm anh em ơi!', ts: Date.now() - 60000, rating: 5, device: 'DEV-JKL4' },
        { id: 'd7', nick: 'NightWolf', avatar: '🐺', keyType: 'standard', text: 'Aim assist pro lắm, tỉ lệ kill tăng từ 1.2 lên 3.8 KD chỉ sau 1 tuần', ts: Date.now() - 30000, rating: 4, device: 'DEV-MNO5' },
        { id: 'd8', nick: 'CyberKing', avatar: '🤖', keyType: 'vip', text: 'Network Optimizer giảm lag đỉnh! Trận cuối mình 0 lag dù mạng 3G 🔥', ts: Date.now() - 10000, rating: 5, device: 'DEV-PQR6' },
      ];
      renderMessages(demoChatMessages);
      calcAndRenderOverall(demoChatMessages);
      lastMsgCount = demoChatMessages.length;
      scheduleScrollToBottom();
      const el = document.getElementById('onlineCount');
      if (el) el.innerHTML = '<i class="fa-solid fa-circle" style="color:var(--green);font-size:7px;animation:pulseDot 2s infinite;"></i> 1 online';
      updateJerkillOnline(1);
      updateOnlineUserStat(Math.floor(Math.random()*80)+20);
      loadDemoStats();
    }
    function renderMessages(msgs) {
      const container = document.getElementById('chatMessages');
      if (!container) return;
      if (!msgs || !msgs.length) {
        container.innerHTML = `
      <div class="chat-empty">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <p>Chưa có bình luận nào.<br>Hãy là người đầu tiên!</p>
      </div>`;
        hideChatLoadMore();
        return;
      }
      const totalMsgs = msgs.length;
      const displayMsgs = msgs.slice(Math.max(0, totalMsgs - msgDisplayLimit));
      const hasMore = totalMsgs > msgDisplayLimit;
      if (hasMore) {
        const lmBtn = document.getElementById('chatLoadMoreBtn');
        if (lmBtn) {
          lmBtn.classList.remove('hidden');
          const remaining = totalMsgs - msgDisplayLimit;
          document.getElementById('chatLoadMoreText').textContent = `Xem thêm ${remaining} bình luận cũ hơn`;
        }
      } else {
        hideChatLoadMore();
      }
      container.innerHTML = '';
      displayMsgs.forEach((m) => {
        const msgEl = buildMessageElement(m);
        container.appendChild(msgEl);
      });
    }
    function buildMessageElement(m) {
      const color = getColor(m.nick || '');
      const time = new Date(m.ts || Date.now()).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      const avClass = getAvClass(m.keyType);
      const kbClass = getKbClass(m.keyType);
      const ktIcon = getKtIcon(m.keyType);
      const isOwn = m.device === DEVICE_ID;
      let avInner = '';
      const av = m.avatar || '';
      if (av && (av.startsWith('http') || av.startsWith('data:'))) {
        avInner = `<img src="${esc(av)}" onerror="this.parentElement.textContent='${getInitial(m.nick)}'" alt="${esc(getInitial(m.nick))}">`;
      } else if (av && av.length <= 4) {
        avInner = av;
      } else {
        avInner = getInitial(m.nick);
      }
      let starsHtml = '';
      if (m.rating && m.rating > 0) {
        starsHtml = '<div class="chat-msg-stars">';
        for (let i = 0; i < 5; i++) {
          starsHtml += i < m.rating ?
            '<svg class="lit-star" width="10" height="10" viewBox="0 0 24 24" fill="var(--star-color)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' :
            '<svg class="empty-star" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--star-color)" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
        }
        starsHtml += `<span class="chat-msg-star-count">${m.rating}.0★</span></div>`;
      }
      let replyHtml = '';
      if (m.replyTo && m.replyTo.nick) {
        const rText = (m.replyTo.text || '').substring(0, 55) + ((m.replyTo.text || '').length > 55 ? '...' : '');
        replyHtml = `<div class="chat-reply-quote"><strong>↩ ${esc(m.replyTo.nick)}</strong>: ${esc(rText)}</div>`;
      }
      const safeData = { nick: m.nick || 'Ẩn danh', text: m.text || '', id: m.id || '', avatar: m.avatar || '', keyType: m.keyType || 'free', device: m.device || '', ts: m.ts || 0 };
      const div = document.createElement('div');
      div.className = 'chat-msg' + (isOwn ? ' own-msg' : '');
      div.setAttribute('data-id', m.id || '');
      const hasImg = m.imgData && m.imgData.startsWith('data:image');
      const hasText = (m.text || '').trim() !== '';
      const imgHtml = hasImg
        ? `<img class="chat-photo" src="${m.imgData}" alt="ảnh" loading="lazy">`
        : '';
      const bubbleClass = hasImg && !hasText ? 'chat-text img-only' : 'chat-text';
      div.innerHTML = `
    <div class="chat-avatar-wrap">
      <div class="chat-avatar ${avClass}"
           style="background:${color}18;color:${color};"
           title="${esc(m.nick||'Ẩn danh')}">${avInner}</div>
    </div>
    <div class="chat-bubble">
      <div class="chat-bubble-head">
        <span class="chat-nick" style="color:${color};">${esc(m.nick||'Ẩn danh')}</span>
        <span class="chat-key-badge ${kbClass}">${ktIcon}</span>
        <span class="chat-time">${time}</span>
      </div>
      ${replyHtml}
      <div class="${bubbleClass}">${hasText ? esc(m.text) : ''}${imgHtml}</div>
      ${starsHtml}
      <div class="chat-reply-btn"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg> Trả lời</div>
    </div>`;
      const avatar = div.querySelector('.chat-avatar');
      const nick = div.querySelector('.chat-nick');
      const replyBtn = div.querySelector('.chat-reply-btn');
      avatar.addEventListener('click', (e) => { e.stopPropagation();
        showUserPopData(e, safeData); });
      nick.addEventListener('click', (e) => { e.stopPropagation();
        showUserPopData(e, safeData); });
      replyBtn.addEventListener('click', () => setReplyToData(safeData));
      if (hasImg) {
        const photoEl = div.querySelector('.chat-photo');
        if (photoEl) {
          photoEl.addEventListener('click', (e) => {
            e.stopPropagation();
            openChatImgViewer(m.imgData);
          });
        }
      }
      return div;
    }
    function scheduleScrollToBottom() {
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollChatToBottom(false);
        }, 30);
      });
    }
    function scrollChatToBottom(manual) {
      const c = document.getElementById('chatMessages');
      if (!c) return;
      c.scrollTop = c.scrollHeight;
      if (manual) {
        isUserScrolledUp = false;
        newMsgCount = 0;
        hideScrollFab();
      }
    }
    function onChatScroll() {
      const c = document.getElementById('chatMessages');
      if (!c) return;
      const atBottom = c.scrollHeight - c.scrollTop - c.clientHeight < 80;
      isUserScrolledUp = !atBottom;
      if (atBottom) {
        newMsgCount = 0;
        hideScrollFab();
      }
    }
    function showScrollFab(count) {
      const fab = document.getElementById('chatScrollFab');
      const cnt = document.getElementById('chatNewCount');
      if (!fab) return;
      fab.classList.add('show');
      if (count > 0 && cnt) {
        cnt.textContent = count > 9 ? '9+' : count;
        cnt.classList.add('show');
      }
    }
    function hideScrollFab() {
      const fab = document.getElementById('chatScrollFab');
      if (!fab) return;
      fab.classList.remove('show');
      const cnt = document.getElementById('chatNewCount');
      if (cnt) { cnt.textContent = '';
        cnt.classList.remove('show'); }
    }
    function hideChatLoadMore() {
      const btn = document.getElementById('chatLoadMoreBtn');
      if (btn) btn.classList.add('hidden');
    }
    function loadMoreMessages() {
      msgDisplayLimit += 20;
      const msgs = firebaseReady ? allMessages : demoChatMessages;
      renderMessages(msgs);
      const c = document.getElementById('chatMessages');
      if (c) setTimeout(() => { c.scrollTop = 0; }, 50);
    }
    var pendingImgData = null;
    function onChatImgSelected(inputEl) {
      const file = inputEl.files && inputEl.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('<i class="fa-solid fa-triangle-exclamation"></i> Chỉ hỗ trợ file ảnh!', 'err');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        showToast('<i class="fa-solid fa-triangle-exclamation"></i> Ảnh quá lớn (tối đa 8MB)!', 'err');
        inputEl.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        const img = new Image();
        img.onload = function() {
          const MAX = 800;
          let w = img.width, h = img.height;
          if (w > MAX || h > MAX) {
            const ratio = Math.min(MAX / w, MAX / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          pendingImgData = canvas.toDataURL('image/jpeg', 0.72);
          const wrap = document.getElementById('chatImgPreviewWrap');
          const thumb = document.getElementById('chatImgPreviewThumb');
          const info  = document.getElementById('chatImgPreviewInfo');
          if (wrap && thumb && info) {
            thumb.src = pendingImgData;
            const kb = Math.round(pendingImgData.length * 0.75 / 1024);
            info.textContent = file.name.length > 22 ? file.name.slice(0, 19) + '...' : file.name;
            info.textContent += '  (' + kb + ' KB  •  ' + w + '×' + h + ')';
            wrap.classList.add('show');
          }
          document.getElementById('chatInput').focus();
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
      inputEl.value = '';
    }
    function clearChatImg() {
      pendingImgData = null;
      const wrap = document.getElementById('chatImgPreviewWrap');
      if (wrap) wrap.classList.remove('show');
      const thumb = document.getElementById('chatImgPreviewThumb');
      if (thumb) thumb.src = '';
    }
    function openChatImgViewer(src) {
      const viewer = document.getElementById('chatImgViewer');
      const img = document.getElementById('chatImgViewerImg');
      if (!viewer || !img) return;
      img.src = src;
      viewer.classList.add('show');
    }
    function sendChat() {
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if (!text && !pendingImgData) { input.focus(); return; }
      const btn = document.getElementById('chatSendBtn');
      btn.disabled = true;
      setTimeout(() => { btn.disabled = false; }, 1200);
      input.value = '';
      updateCharCount(input);
      const imgData = pendingImgData || null;
      clearChatImg();
      const rating = myRating || 0;
      const msg = {
        nick: userProfile.nick,
        avatar: userProfile.avatar,
        keyType: userProfile.keyType || 'free',
        text: text || '',
        imgData: imgData || null,
        ts: Date.now(),
        device: DEVICE_ID,
        rating,
        replyTo: replyToMsg ? { nick: replyToMsg.nick, text: replyToMsg.text, id: replyToMsg.id } : null
      };
      myRating = 0;
      document.querySelectorAll('#rateStarsEl .rate-star-btn').forEach(s => {
        s.classList.remove('active');
        s.style.color = 'var(--star-empty)';
        s.style.filter = 'none';
        s.style.transform = 'scale(1)';
      });
      const rv = document.getElementById('rateValEl');
      rv.textContent = '0★';
      rv.classList.remove('has-rating');
      cancelReply();
      if (!firebaseReady) {
        const newMsg = { ...msg, id: 'd' + Date.now() };
        demoChatMessages.push(newMsg);
        if (demoChatMessages.length > 100) demoChatMessages = demoChatMessages.slice(-60);
        lastMsgCount = demoChatMessages.length;
        saveChatToLocal(demoChatMessages);
        isUserScrolledUp = false; 
        renderMessages(demoChatMessages);
        calcAndRenderOverall(demoChatMessages);
        scheduleScrollToBottom();
        return;
      }
      isUserScrolledUp = false; 
      db.ref('chat/messages').push(msg).catch(err => {
        console.error('[Chat] Send failed:', err);
        showToast('<i class="fa-solid fa-triangle-exclamation"></i> Gửi thất bại, thử lại!', 'err');
        input.value = text;
      });
    }
    function updateCharCount(input) {
      const len = input.value.length;
      const el = document.getElementById('chatCharCount');
      if (!el) return;
      el.textContent = len + '/200';
      el.classList.toggle('warn', len > 160);
    }
    function setReplyToData(data) {
      replyToMsg = data;
      const bar = document.getElementById('chatReplyBar');
      const barText = document.getElementById('chatReplyBarText');
      bar.classList.add('show');
      const prev = (data.text || '').substring(0, 40) + ((data.text || '').length > 40 ? '...' : '');
      barText.innerHTML = `Đang trả lời <strong>${esc(data.nick)}</strong>: ${esc(prev)}`;
      document.getElementById('chatInput').focus();
    }
    function cancelReply() {
      replyToMsg = null;
      const bar = document.getElementById('chatReplyBar');
      if (bar) bar.classList.remove('show');
    }
    let currentPopData = null;
    function showUserPopData(e, data) {
      e.stopPropagation();
      currentPopData = data;
      const pop = document.getElementById('userPop');
      const avEl = document.getElementById('userPopAv');
      const av = data.avatar || '';
      if (av && (av.startsWith('http') || av.startsWith('data:'))) {
        avEl.innerHTML = `<img src="${esc(av)}" style="width:40px;height:40px;object-fit:cover;border-radius:50%;">`;
      } else {
        avEl.textContent = av || getInitial(data.nick);
        avEl.style.fontSize = '22px';
      }
      document.getElementById('userPopName').textContent = data.nick || 'Ẩn danh';
      const typeEl = document.getElementById('userPopType');
      const kt = (data.keyType || 'free').toLowerCase();
      const tMap = { free: ['Free', 'pbt-free'], demo: ['Demo', 'pbt-demo'], standard: ['Standard', 'pbt-standard'], vip: ['VIP', 'pbt-vip'], premium: ['Premium', 'pbt-premium'] };
      const [tLabel, tCls] = tMap[kt] || ['Free', 'pbt-free'];
      typeEl.textContent = tLabel;
      typeEl.className = 'user-pop-type ' + tCls;
      pop.style.display = 'block';
      const r = e.target.getBoundingClientRect();
      let left = r.left,
        top = r.bottom + 8;
      if (left + 240 > window.innerWidth - 8) left = window.innerWidth - 248;
      if (left < 8) left = 8;
      if (top + 140 > window.innerHeight - 16) top = r.top - 148;
      pop.style.left = left + 'px';
      pop.style.top = top + 'px';
    }
    function closeUserPop() { document.getElementById('userPop').style.display = 'none'; }
    function viewUserProfile() {
      closeUserPop();
      if (!currentPopData) return;
      prevTab = document.querySelector('.tab-content.active')?.id?.replace('tab-', '') || 'home';
      const d = currentPopData;
      const profAv = document.getElementById('profAvEl');
      const av = d.avatar || '';
      if (av && (av.startsWith('http') || av.startsWith('data:'))) {
        profAv.innerHTML = `<img src="${esc(av)}" style="width:80px;height:80px;object-fit:cover;border-radius:50%;">`;
        profAv.style.fontSize = '';
      } else {
        profAv.textContent = av || getInitial(d.nick);
        profAv.style.fontSize = '36px';
      }
      profAv.className = 'prof-av ' + getAvClass(d.keyType);
      document.getElementById('profNameEl').textContent = d.nick || 'Ẩn danh';
      const kt = (d.keyType || 'free').toLowerCase();
      const bMap = {
        premium: `<span class="prof-badge" style="background:rgba(255,215,0,0.12);border:1px solid rgba(255,215,0,0.3);color:#FFD700;"><i class="fa-solid fa-crown"></i> Premium</span>`,
        vip: `<span class="prof-badge" style="background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.2);color:var(--orange);"><i class="fa-solid fa-star"></i> VIP</span>`,
        standard: `<span class="prof-badge" style="background:rgba(255,51,85,0.08);border:1px solid rgba(255,51,85,0.2);color:var(--red);"><i class="fa-solid fa-user"></i> Standard</span>`,
        demo: `<span class="prof-badge" style="background:rgba(255,51,85,0.08);border:1px solid rgba(255,51,85,0.2);color:var(--red);"><i class="fa-solid fa-flask"></i> Demo</span>`,
        free: `<span class="prof-badge" style="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.22);color:var(--purple);"><i class="fa-solid fa-gift"></i> Free</span>`
      };
      document.getElementById('profBadgesEl').innerHTML = bMap[kt] || bMap.free;
      if (firebaseReady && d.device) {
        db.ref('users/' + d.device).once('value').then(snap => {
          const fb = snap.val() || {};
          const jd = fb.joinDate ? new Date(fb.joinDate).toLocaleDateString('vi-VN') : '--';
          document.getElementById('profBioEl').textContent = fb.bio || 'Người dùng này chưa có tiểu sử.';
          document.getElementById('profJoinEl').textContent = jd;
          document.getElementById('profStatusEl').innerHTML = '<span style="color:var(--green);">✅ Online</span>';
          document.getElementById('profTypeEl').textContent = (fb.keyType || d.keyType || 'free').toUpperCase();
          const kv = fb.key || '';
          document.getElementById('profKeyMaskedEl').textContent = kv ? kv.substring(0, 4) + '••••' + kv.slice(-4) : '••••••••••••';
          const ds = d.device || '--';
          document.getElementById('profDeviceEl').textContent = ds.length > 22 ? ds.substring(0, 22) + '...' : ds;
        }).catch(() => setFallbackProfile(d));
      } else {
        setFallbackProfile(d);
      }
      switchTab('profile');
    }
    function setFallbackProfile(d) {
      document.getElementById('profBioEl').textContent = d.bio || 'Chưa có tiểu sử.';
      document.getElementById('profJoinEl').textContent = '--';
      document.getElementById('profStatusEl').innerHTML = '<span style="color:var(--green);">✅ Online</span>';
      document.getElementById('profTypeEl').textContent = (d.keyType || 'free').toUpperCase();
      document.getElementById('profKeyMaskedEl').textContent = '••••••••••••';
      const ds = d.device || '--';
      document.getElementById('profDeviceEl').textContent = ds.length > 22 ? ds.substring(0, 22) + '...' : ds;
    }
    function goBackFromProfile() { switchTab(prevTab || 'home'); }
    function watchFirebaseStats() {
      if (_statsStarted) return; 
      _statsStarted = true;
      const BASE = { total: 48392, keys: 12847, today: 1247 };
      const dist = { premium: 2840, vip: 7250, standard: 12480, free: 22380, demo: 3442 };
      let baseOnline = 1200 + Math.floor(Math.random() * 350);
      const fakeRatings = [
        { rating: 5 }, { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 },
        { rating: 4 }, { rating: 4 }, { rating: 5 }, { rating: 3 }, { rating: 5 },
        { rating: 5 }, { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 },
        { rating: 5 }, { rating: 3 }, { rating: 4 }, { rating: 5 }, { rating: 5 },
        { rating: 4 }, { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 5 },
      ];
      animateCounter(document.getElementById('jkTotalUsers'), BASE.total);
      animateCounter(document.getElementById('jkActiveKeys'), BASE.keys);
      animateCounter(document.getElementById('jkTodayCount'), BASE.today);
      const g = document.getElementById('jkGrowth'); if (g) g.textContent = '+18%';
      updateDistribution(dist, 0);
      computeRatingBreakdown(fakeRatings);
      updateLineChartSmooth(onlineHistory);
      function _tickOnline() {
        baseOnline = Math.max(800, Math.min(2800, baseOnline + Math.round((Math.random() - 0.45) * 90)));
        updateJerkillOnline(baseOnline);
        const el = document.getElementById('onlineCount');
        if (el) el.innerHTML = `<i class="fa-solid fa-circle" style="color:var(--green);font-size:7px;animation:pulseDot 2s infinite;"></i> ${baseOnline} online`;
        if (baseOnline > peakToday) peakToday = baseOnline;
        avgOnlineArr.push(baseOnline);
        if (avgOnlineArr.length > 60) avgOnlineArr.shift();
        const avg = Math.round(avgOnlineArr.reduce((a, b) => a + b, 0) / avgOnlineArr.length);
        const peakEl = document.getElementById('jkPeakToday'); if (peakEl) peakEl.textContent = fmtNum(peakToday);
        const avgEl = document.getElementById('jkAvgOnline'); if (avgEl) avgEl.textContent = fmtNum(avg);
        updateOnlineUserStat(baseOnline);
      }
      _tickOnline();
      setInterval(_tickOnline, 2000);
      updateActivityFeedDemo();
      setInterval(() => {
        updateActivityFeedDemo();
      }, 4000);
      setInterval(() => {
        dist.free     = 22380 + Math.floor(Math.random() * 120 - 50);
        dist.vip      = 7250  + Math.floor(Math.random() * 80  - 35);
        dist.standard = 12480 + Math.floor(Math.random() * 100 - 45);
        dist.premium  = 2840  + Math.floor(Math.random() * 40  - 18);
        updateDistribution(dist, 0);
        const todayEl = document.getElementById('jkTodayCount');
        if (todayEl) animateCounter(todayEl, BASE.today + Math.floor(Math.random() * 30));
      }, 14000);
      setInterval(() => {
        BASE.total += Math.floor(Math.random() * 12) + 1;
        animateCounter(document.getElementById('jkTotalUsers'), BASE.total);
      }, 20000);
    }
    function loadDemoStats() {
      watchFirebaseStats();
    }
    function animateCounter(el, target) {
      if (!el) return;
      const start = parseInt(el.textContent.replace(/[^0-9]/g, '')) || 0;
      const dur = 900;
      const t0 = performance.now();
      function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (target - start) * e).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    function updateDistribution(counts, total) {
      const max = Math.max(...Object.values(counts), 1);
      ['premium', 'vip', 'standard', 'free', 'demo'].forEach(t => {
        const capT = t.charAt(0).toUpperCase() + t.slice(1);
        const barEl = document.getElementById('dist' + capT);
        const valEl = document.getElementById('dist' + capT + 'Val');
        const cnt = counts[t] || 0;
        if (barEl) barEl.style.width = Math.round((cnt / max) * 100) + '%';
        if (valEl) valEl.textContent = cnt;
      });
    }
    function computeRatingBreakdown(msgs) {
      const bd = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let total = 0,
        sum = 0;
      msgs.forEach(m => {
        if (m.rating && m.rating >= 1 && m.rating <= 5) { bd[m.rating]++;
          total++;
          sum += m.rating; }
      });
      const avg = total > 0 ? sum / total : 0;
      const maxBd = Math.max(...Object.values(bd), 1);
      [1, 2, 3, 4, 5].forEach(i => {
        const be = document.getElementById('rbar' + i);
        if (be) be.style.width = Math.round((bd[i] / maxBd) * 100) + '%';
        const ve = document.getElementById('rval' + i);
        if (ve) ve.textContent = bd[i];
      });
      const big = document.getElementById('jkRatingBig');
      if (big) big.textContent = avg > 0 ? avg.toFixed(1) : '--';
      const cnt = document.getElementById('jkRatingCountEl');
      if (cnt) cnt.textContent = total + ' đánh giá';
      const rv = document.getElementById('jkRatingVal');
      if (rv) rv.textContent = avg > 0 ? avg.toFixed(1) + '★' : '--';
      const st = document.getElementById('jkRatingStarsEl');
      if (st && avg > 0) {
        const r = Math.round(avg);
        st.innerHTML = [1, 2, 3, 4, 5].map(i => i <= r ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>').join('');
      }
      const msgs2 = firebaseReady ? allMessages : demoChatMessages;
      if (msgs2.length) calcAndRenderOverall(msgs2);
    }
    function fmtNum(n) {
      if (n >= 1000) return n.toLocaleString('vi-VN').replace(/\./g, ',');
      return String(n);
    }
    function updateJerkillOnline(cnt) {
      const le = document.getElementById('jkLiveCount');
      if (le) le.textContent = fmtNum(cnt);
      const an = document.getElementById('jkActiveNow');
      if (an) an.textContent = fmtNum(cnt);
      onlineHistory.push(cnt);
      if (onlineHistory.length > 24) onlineHistory.shift();
      updateLineChartSmooth(onlineHistory);
      const totalEl = document.getElementById('jkTotalUsers');
      const totalVal = parseInt((totalEl?.textContent || '').replace(/[^0-9]/g, '')) || 48392;
      const pct = Math.min(parseFloat(((cnt / totalVal) * 100).toFixed(1)), 100);
      const ring = document.getElementById('jkRingProgress');
      if (ring) ring.setAttribute('stroke-dashoffset', (175.9 - (pct / 100) * 175.9).toFixed(1));
      const rp = document.getElementById('jkRingPct');
      if (rp) rp.textContent = pct.toFixed(1) + '%';
      const ge = document.getElementById('jkGrowth');
      if (ge && (ge.textContent === '--' || ge.textContent === '')) ge.textContent = '+18%';
    }
    function updateLineChartSmooth(data) {
      if (!data.length) return;
      const W = 320,
        H = 120,
        padX = 10,
        padY = 12;
      const w = W - 2 * padX,
        h = H - 2 * padY;
      const max = Math.max(...data, 1),
        min = Math.min(...data, 0);
      const range = Math.max(max - min, 1);
      const pts = data.map((v, i) => ({
        x: padX + (data.length <= 1 ? w / 2 : (i / (data.length - 1)) * w),
        y: padY + h - ((v - min) / range) * h
      }));
      function smoothPath(points) {
        if (!points.length) return '';
        let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[Math.max(0, i - 1)];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[Math.min(points.length - 1, i + 2)];
          const cp1x = p1.x + (p2.x - p0.x) * 0.2;
          const cp1y = p1.y + (p2.y - p0.y) * 0.2;
          const cp2x = p2.x - (p3.x - p1.x) * 0.2;
          const cp2y = p2.y - (p3.y - p1.y) * 0.2;
          d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
        }
        return d;
      }
      const linePath = smoothPath(pts);
      const areaPath = linePath + ` L${pts[pts.length-1].x},${H} L${pts[0].x},${H} Z`;
      const pts2 = pts.map(p => ({ x: p.x, y: Math.min(H - padY, p.y + 8) }));
      const linePath2 = smoothPath(pts2);
      const areaPath2 = linePath2 + ` L${pts2[pts2.length-1].x},${H} L${pts2[0].x},${H} Z`;
      const lp = document.getElementById('jkLinePath');
      if (lp) lp.setAttribute('d', linePath);
      const ap = document.getElementById('jkAreaPath');
      if (ap) ap.setAttribute('d', areaPath);
      const lp2 = document.getElementById('jkLinePath2');
      if (lp2) lp2.setAttribute('d', linePath2);
      const ap2 = document.getElementById('jkAreaPath2');
      if (ap2) ap2.setAttribute('d', areaPath2);
      const dotsEl = document.getElementById('jkLineDots');
      if (dotsEl) {
        dotsEl.innerHTML = pts.map((p, i) => {
          if (i === pts.length - 1) {
            return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#00e87a" stroke="rgba(0,232,122,0.4)" stroke-width="5">
          <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="stroke-width" values="5;10;5" dur="1.5s" repeatCount="indefinite"/>
        </circle>`;
          }
          if (i % 2 === 0) {
            const color = i < pts.length / 2 ? '#3b82f6' : '#00d4ff';
            return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.5" fill="${color}" opacity="0.8"/>`;
          }
          return '';
        }).join('');
      }
      updateHourBars(data);
    }
    function updateHourBars(data) {
      const barsEl = document.getElementById('jkHourBars');
      if (!barsEl) return;
      const bars = barsEl.querySelectorAll('.jk-bar');
      const max = Math.max(...data, 1);
      bars.forEach((bar, i) => {
        const val = data[i % data.length] || 0;
        bar.style.height = Math.max(8, Math.round((val / max) * 90)) + '%';
      });
    }
    function updateActivityFeedFromPresence(snap) {
      const items = [];
      snap.forEach(c => {
        const d = c.val();
        items.push({ nick: d.nick || 'Ẩn danh', keyType: d.keyType || 'free', ts: d.ts || Date.now(), type: 'online' });
      });
      items.sort((a, b) => b.ts - a.ts);
      renderActivityFeed(items.slice(0, 10));
    }
    var _feedPool = [
      { nick: 'HuấnHà',       keyType: 'premium', avatar: '👑', type: 'online'   },
      { nick: 'DragonX99',    keyType: 'premium', avatar: '🐉', type: 'online'   },
      { nick: 'NightWolf',    keyType: 'vip',     avatar: '🐺', type: 'online'   },
      { nick: 'CyberKing',    keyType: 'vip',     avatar: '🤖', type: 'comment'  },
      { nick: 'SkyPlayer',    keyType: 'standard', avatar: '🦅', type: 'online'  },
      { nick: 'PhantomVN',    keyType: 'free',    avatar: '😈', type: 'join'     },
      { nick: 'ZeroGravity',  keyType: 'vip',     avatar: '🌀', type: 'purchase' },
      { nick: 'XGameVN',      keyType: 'premium', avatar: '👾', type: 'online'   },
      { nick: 'GameMasterVN', keyType: 'standard', avatar: '🎮', type: 'comment' },
      { nick: 'SnipeKing',    keyType: 'vip',     avatar: '🎯', type: 'online'   },
      { nick: 'DarkHunter',   keyType: 'premium', avatar: '💀', type: 'online'   },
      { nick: 'SpeedBoozt',   keyType: 'vip',     avatar: '⚡', type: 'upgrade'  },
      { nick: 'GhostPlayer',  keyType: 'free',    avatar: '👻', type: 'join'     },
      { nick: 'BladeRunner',  keyType: 'standard', avatar: '⚔️', type: 'online'  },
      { nick: 'StarKiller',   keyType: 'vip',     avatar: '💫', type: 'comment'  },
      { nick: 'IronFist99',   keyType: 'premium', avatar: '🦾', type: 'purchase' },
      { nick: 'ShadowVN',     keyType: 'free',    avatar: '🌑', type: 'join'     },
      { nick: 'ProPlayer01',  keyType: 'standard', avatar: '🏆', type: 'online'  },
      { nick: 'TurboBoost',   keyType: 'vip',     avatar: '🚀', type: 'upgrade'  },
      { nick: 'AceShooter',   keyType: 'vip',     avatar: '🎖️', type: 'online'   },
      { nick: 'FireStrike',   keyType: 'premium', avatar: '🔥', type: 'online'   },
      { nick: 'VortexGamer',  keyType: 'vip',     avatar: '🌪️', type: 'comment'  },
      { nick: 'ThunderBolt',  keyType: 'standard', avatar: '⚡', type: 'purchase' },
      { nick: 'MegaPlayer',   keyType: 'free',    avatar: '🎪', type: 'join'     },
      { nick: 'NinjaVN',      keyType: 'premium', avatar: '🥷', type: 'online'   },
      { nick: 'CobraStrike',  keyType: 'vip',     avatar: '🐍', type: 'online'   },
      { nick: 'RocketMan',    keyType: 'standard', avatar: '🚀', type: 'comment' },
      { nick: 'StormRider',   keyType: 'premium', avatar: '⛈️', type: 'upgrade'  },
      { nick: 'AquaForce',    keyType: 'vip',     avatar: '💧', type: 'online'   },
      { nick: 'SteelWing',    keyType: 'free',    avatar: '🦅', type: 'join'     },
      { nick: 'LunarBeast',   keyType: 'vip',     avatar: '🌙', type: 'online'   },
      { nick: 'CrimsonFox',   keyType: 'premium', avatar: '🦊', type: 'purchase' },
    ];
    var _feedOffset = 0;
    function updateActivityFeedDemo() {
      var now = Date.now();
      var pool = _feedPool.slice();
      _feedOffset = (_feedOffset + 4) % pool.length;
      var slice = pool.slice(_feedOffset).concat(pool.slice(0, _feedOffset));
      var offsets = [800, 5000, 13000, 28000, 47000, 72000, 105000, 150000, 210000, 280000];
      var items = slice.slice(0, 10).map(function(u, i) {
        var t = u.type;
        if (i > 1 && Math.random() < 0.25) {
          var types = ['online','comment','join','purchase','upgrade'];
          t = types[Math.floor(Math.random() * types.length)];
        }
        return {
          nick: u.nick,
          keyType: u.keyType,
          ts: now - offsets[i] - Math.floor(Math.random() * 3000),
          type: t
        };
      });
      renderActivityFeed(items);
    }
    function renderActivityFeed(items) {
      const el = document.getElementById('jkActivityList');
      if (!el) return;
      if (!items.length) {
        el.innerHTML = '<div class="jk-feed-user-row" style="justify-content:center;color:var(--text3);font-size:11px;padding:14px;">Chưa có hoạt động</div>';
        return;
      }
      const tClass  = { online: 'online', comment: 'comment', join: 'join', purchase: 'online', upgrade: 'join' };
      const tLabels = { online: 'Đang online', comment: 'Đã bình luận', join: 'Vừa tham gia', purchase: 'Vừa mua key', upgrade: 'Nâng cấp VIP' };
      const tIcons  = {
        online:   '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>',
        comment:  '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
        join:     '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
        purchase: '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
        upgrade:  '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round"><polyline points="17 11 12 6 7 11"/><polyline points="17 18 12 13 7 18"/></svg>'
      };
      const ktColors = { premium: '#FFD700', vip: '#f97316', standard: '#ff3355', free: '#8b5cf6', demo: '#4a4a60' };
      el.innerHTML = items.map(item => {
        const tc = tClass[item.type] || 'online';
        const ktIcon = getKtIcon(item.keyType);
        const avBg = (ktColors[(item.keyType||'free').toLowerCase()] || '#8b5cf6');
        const actIcon = tIcons[item.type] || tIcons.online;
        return `<div class="jk-feed-user-row ${tc}">
          <div class="jk-feed-status-dot ${tc}"></div>
          <div class="jk-feed-user-avatar" style="background:${avBg}1a;border-color:${avBg}55;">${ktIcon}</div>
          <div class="jk-feed-user-info">
            <div class="jk-feed-user-name">${esc(item.nick)}</div>
            <div class="jk-feed-user-action">${actIcon} ${tLabels[item.type]||'Hoạt động'}</div>
          </div>
          <div class="jk-feed-user-time">${getTimeAgo(item.ts)}</div>
        </div>`;
      }).join('');
    }
    function getTimeAgo(ts) {
      const d = Date.now() - ts;
      if (d < 60000) return 'Vừa xong';
      if (d < 3600000) return Math.round(d / 60000) + 'p trước';
      if (d < 86400000) return Math.round(d / 3600000) + 'h trước';
      return new Date(ts).toLocaleDateString('vi-VN');
    }
    function loadNotifList() {
      try { const s = JSON.parse(localStorage.getItem('hh_notifs') || '[]'); if (s.length) localNotifs = s; } catch (e) {}
      renderNotifList(localNotifs);
    }
    function watchNotifications() {
      if (!firebaseReady) return;
      db.ref('notifications').limitToLast(20).on('value', snap => {
        const notifs = [];
        snap.forEach(c => notifs.push({ id: c.key, ...c.val() }));
        if (notifs.length) {
          localNotifs = notifs;
          localStorage.setItem('hh_notifs', JSON.stringify(localNotifs));
          showNotifBadge(notifs.length);
          renderNotifList(localNotifs);
        }
      }, err => {
        console.warn('[HuấnHà] watchNotifications error:', err.code || err.message || err);
      });
    }
    function showNotifBadge(count) {
      const dot = document.getElementById('notifDot');
      const cnt = document.getElementById('notifCount');
      if (!dot) return;
      dot.classList.remove('has-count');
      void dot.offsetWidth; 
      if (count > 0) {
        dot.style.display = 'flex';
        dot.classList.add('has-count');
        if (cnt) cnt.textContent = count > 99 ? '99+' : count;
      } else {
        dot.style.display = 'none';
        if (cnt) cnt.textContent = '';
      }
    }
    function playTigTig() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        function beep(startTime, freq) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(0.4, startTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
          osc.start(startTime);
          osc.stop(startTime + 0.2);
        }
        beep(ctx.currentTime, 1046);       
        beep(ctx.currentTime + 0.22, 1318); 
      } catch(e) {}
    }
    function checkUnseenNotifs() {
      try {
        const saved = JSON.parse(localStorage.getItem('hh_notifs') || '[]');
        if (!saved.length) return;
        const seenTs = parseInt(localStorage.getItem('hh_notif_seen_ts') || '0');
        const unseen = saved.filter(n => (n.ts || 0) > seenTs);
        if (unseen.length > 0) {
          showNotifBadge(unseen.length);
          setTimeout(playTigTig, 1200);
        }
      } catch(e) {}
    }
    function renderNotifList(notifs) {
      const el = document.getElementById('notifListEl');
      if (!el) return;
      if (!notifs.length) { el.innerHTML = '<div class="notif-empty"><i class="fa-solid fa-bell-slash"></i>Chưa có thông báo nào</div>'; return; }
      const iMap = { info: 'fa-circle-info', warning: 'fa-triangle-exclamation', success: 'fa-circle-check', update: 'fa-rotate' };
      const cMap = { info: 'var(--blue)', warning: 'var(--orange)', success: 'var(--green)', update: 'var(--cyan)' };
      el.innerHTML = notifs.slice().reverse().map(n => {
        const t = n.type || 'info',
          ic = iMap[t] || 'fa-bell',
          col = cMap[t] || 'var(--blue)';
        const time = new Date(n.ts || Date.now()).toLocaleString('vi-VN');
        return `<div class="notif-item">
      <div class="notif-item-icon" style="background:${col}15;color:${col};"><i class="fa-solid ${ic}"></i></div>
      <div class="notif-item-body">
        <div class="notif-item-title">${esc(n.title||'Thông báo')}</div>
        <div class="notif-item-text">${esc(n.message||'')}</div>
        <div class="notif-item-time"><i class="fa-regular fa-clock"></i> ${time}</div>
      </div></div>`;
      }).join('');
    }
    function loadSettings() {
      try { settings = JSON.parse(localStorage.getItem('hh_settings') || '{}'); } catch (e) { settings = {}; }
      const s = settings;
      if (s.smooth !== undefined) document.getElementById('sw1').checked = s.smooth;
      if (s.aim !== undefined) document.getElementById('sw2').checked = s.aim;
      if (s.magic !== undefined) document.getElementById('sw3').checked = s.magic;
      if (s.speed !== undefined) document.getElementById('sw4').checked = s.speed;
      if (s.esp !== undefined) document.getElementById('sw5').checked = s.esp;
      if (s.radar !== undefined) document.getElementById('sw6').checked = s.radar;
      if (s.glow !== undefined) document.getElementById('sw7').checked = s.glow;
      if (s.notif !== undefined) document.getElementById('sw9').checked = s.notif;
    }
    function saveSetting(key, val) {
      settings[key] = val;
      try { localStorage.setItem('hh_settings', JSON.stringify(settings)); } catch (e) {}
    }
    function doUpdate() {
      showToast('<i class="fa-solid fa-circle-check"></i> Bạn đang dùng phiên bản mới nhất!', 'ok');
    }
    let activeDetailPage = null;
    function openJerkillDetail(num) {
      [1, 2, 3].forEach(n => {
        const p = document.getElementById('jkDetailPage' + n);
        if (p) { p.classList.remove('active');
          p.style.display = 'none'; }
      });
      const page = document.getElementById('jkDetailPage' + num);
      if (page) { page.style.display = 'block';
        setTimeout(() => page.classList.add('active'), 10); }
      activeDetailPage = num;
      checkExistingOrder(num);
      const jkTab = document.getElementById('tab-jerkill');
      if (jkTab) { jkTab.scrollTop = 0;
        document.querySelector('.main').scrollTop = 0; }
    }
    function closeJerkillDetail(num) {
      const page = document.getElementById('jkDetailPage' + num);
      if (page) { page.classList.remove('active');
        setTimeout(() => { page.style.display = 'none'; }, 300); }
      activeDetailPage = null;
    }
    function checkExistingOrder(num) {
      if (!firebaseReady) return;
      db.ref('rentals').orderByChild('device').equalTo(DEVICE_ID).once('value').then(snap => {
        snap.forEach(c => {
          const d = c.val();
          if (d.planNum == num) {
            const orderId = c.key;
            if (d.deliveredKey) {
              showDeliveredKey(num, d.deliveredKey);
            } else {
              showPendingState(num);
            }
            db.ref('rentals/' + orderId + '/deliveredKey').on('value', keySnap => {
              const key = keySnap.val();
              if (key) { showDeliveredKey(num, key); }
            });
          }
        });
      });
    }
    function showDeliveredKey(num, key) {
      const delEl = document.getElementById('jkDelivered' + num);
      const keyEl = document.getElementById('jkDeliveredKey' + num);
      const penEl = document.getElementById('jkPending' + num);
      const btnEl = document.getElementById('jkConfirmBtn' + num);
      if (delEl) { delEl.style.display = 'block'; }
      if (keyEl) { keyEl.textContent = key; }
      if (penEl) { penEl.style.display = 'none'; }
      if (btnEl) { btnEl.style.display = 'none'; }
    }
    function showPendingState(num) {
      const penEl = document.getElementById('jkPending' + num);
      const btnEl = document.getElementById('jkConfirmBtn' + num);
      if (penEl) { penEl.style.display = 'block'; }
      if (btnEl) { btnEl.style.display = 'none'; }
    }
    function confirmDeposit(planNum, planName, amount, content) {
      const orderId = 'ORDER-' + DEVICE_ID.slice(-6) + '-' + Date.now().toString(36).toUpperCase();
      const orderData = {
        device: DEVICE_ID,
        nick: userProfile.nick || 'Người dùng',
        avatar: userProfile.avatar || '🎮',
        planNum: planNum,
        planName: planName,
        amount: amount,
        content: content,
        status: 'pending',
        createdAt: Date.now(),
        deliveredKey: null
      };
      if (firebaseReady) {
        db.ref('rentals/' + orderId).set(orderData).then(() => {
          showToast('<i class="fa-solid fa-check-double"></i> Đã gửi xác nhận! Admin sẽ giao key sớm.', 'ok');
          showPendingState(planNum);
          db.ref('rentals/' + orderId + '/deliveredKey').on('value', snap => {
            const key = snap.val();
            if (key) { showDeliveredKey(planNum, key);
              showToast('<i class="fa-solid fa-crown"></i> Key đã được giao! Kiểm tra ngay!', 'ok'); }
          });
        }).catch(() => {
          showToast('<i class="fa-solid fa-triangle-exclamation"></i> Lỗi gửi, thử lại!', 'err');
        });
      } else {
        showToast('<i class="fa-solid fa-check-double"></i> Demo: Xác nhận gửi thành công!', 'ok');
        showPendingState(planNum);
      }
    }
    function copyDeliveredKey(num) {
      const keyEl = document.getElementById('jkDeliveredKey' + num);
      if (!keyEl) return;
      const key = keyEl.textContent;
      navigator.clipboard.writeText(key).then(() => {
        showToast('<i class="fa-solid fa-copy"></i> Đã copy key!', 'ok');
      }).catch(() => {
        showToast('<i class="fa-solid fa-copy"></i> Key: ' + key, 'ok');
      });
    }
    function initJerkillStatusChecker() {
      if (!firebaseReady) {
        document.getElementById('jkRentStatusContent').innerHTML =
          '<div class="jk-status-empty"><i class="fa-solid fa-circle-xmark" style="color:var(--red);"></i> Chưa có key thuê nào (demo mode)</div>';
        return;
      }
      db.ref('rentals').orderByChild('device').equalTo(DEVICE_ID).on('value', snap => {
        const el = document.getElementById('jkRentStatusContent');
        if (!el) return;
        let found = false;
        let html = '';
        snap.forEach(c => {
          const d = c.val();
          found = true;
          if (d.deliveredKey) {
            html += `<div class="jk-status-row">
          <span class="jk-status-dot-active"></span>
          <div style="flex:1;">
            <div style="font-size:11px;font-weight:700;color:var(--text);margin-bottom:2px;">${esc(d.planName||'Key thuê')}</div>
            <div class="jk-status-key-text">${esc(d.deliveredKey)}</div>
          </div>
          <button class="jk-copy-key-btn" onclick="navigator.clipboard.writeText('${esc(d.deliveredKey)}').then(()=>showToast('<i class=\\'fa-solid fa-copy\\'></i> Đã copy!','ok'))">
            <i class="fa-solid fa-copy" style="font-size:10px;"></i>
          </button>
        </div>`;
          } else {
            html += `<div class="jk-status-row">
          <span class="jk-status-dot-none" style="background:var(--orange);box-shadow:0 0 6px var(--orange);animation:pulseDot 2s infinite;"></span>
          <div style="flex:1;">
            <div style="font-size:11px;font-weight:700;color:var(--text);margin-bottom:2px;">${esc(d.planName||'Đơn hàng')}</div>
            <div style="font-size:10px;color:var(--orange);">⏳ Đang chờ admin giao key...</div>
          </div>
        </div>`;
          }
        });
        if (!found) {
          el.innerHTML = '<div class="jk-status-empty"><i class="fa-solid fa-ban" style="color:var(--text3);"></i> Bạn chưa thuê key nào</div>';
        } else {
          el.innerHTML = html;
        }
      });
    }
    function initChat() {
      const cached = loadChatFromLocal();
      if (cached.length) {
        allMessages = cached;
        renderMessages(cached);
        calcAndRenderOverall(cached);
        lastMsgCount = cached.length;
      } else {
        loadDemoChat();
      }
      scheduleScrollToBottom();
      (function() {
        const el = document.getElementById('onlineCount');
        if (el) el.innerHTML = '<i class="fa-solid fa-circle" style="color:var(--green);font-size:7px;animation:pulseDot 2s infinite;"></i> 1 online';
        updateJerkillOnline(1);
        updateOnlineUserStat(1);
      })();
      if (!firebaseReady) return;
      const loadState = { initialDone: false };
      const _fbTimer = setTimeout(() => {
        if (!loadState.initialDone) {
          loadState.initialDone = true;
          console.warn('[HuấnHà] Firebase chat: không phản hồi sau 5s — giữ nguyên demo/cache');
        }
      }, 5000);
      const chatRef = db.ref('chat/messages').limitToLast(60);
      chatRef.once('value').then(snap => {
        clearTimeout(_fbTimer);
        loadState.initialDone = true;
        const fbMsgs = [];
        snap.forEach(c => fbMsgs.push({ id: c.key, ...c.val() }));
        if (fbMsgs.length) {
          allMessages = fbMsgs;
          renderMessages(allMessages);
          calcAndRenderOverall(allMessages);
          lastMsgCount = allMessages.length;
          saveChatToLocal(allMessages);
          scheduleScrollToBottom();
        }
      }).catch(err => {
        clearTimeout(_fbTimer);
        loadState.initialDone = true;
        console.warn('[HuấnHà] Chat read blocked/failed:', err.code || err.message || err);
      });
      db.ref('chat/messages').limitToLast(1).on('child_added', snap => {
        if (!loadState.initialDone) return; 
        const msg = { id: snap.key, ...snap.val() };
        if (allMessages.some(m => m.id === msg.id)) return; 
        allMessages.push(msg);
        if (allMessages.length > 100) allMessages = allMessages.slice(-60);
        lastMsgCount = allMessages.length;
        saveChatToLocal(allMessages);
        const container = document.getElementById('chatMessages');
        if (container) {
          const empty = container.querySelector('.chat-empty');
          if (empty) empty.remove();
          const msgEl = buildMessageElement(msg);
          container.appendChild(msgEl);
          if (isUserScrolledUp && msg.device !== DEVICE_ID) {
            newMsgCount++;
            showScrollFab(newMsgCount);
          } else {
            isUserScrolledUp = false;
            scheduleScrollToBottom();
          }
        }
        calcAndRenderOverall(allMessages);
      }, err => {
        console.warn('[HuấnHà] child_added error:', err.code || err.message || err);
      });
      try {
        const presRef = db.ref('presence/' + DEVICE_ID);
        presRef.set({
          nick: userProfile.nick,
          ts: Date.now(),
          avatar: userProfile.avatar,
          keyType: userProfile.keyType || 'free'
        }).catch(() => {});
        presRef.onDisconnect().remove();
      } catch(e) {}
      db.ref('presence').on('value', snap => {
        const cnt = Math.max(1, snap.numChildren());
        const el = document.getElementById('onlineCount');
        if (el) el.innerHTML = `<i class="fa-solid fa-circle" style="color:var(--green);font-size:7px;animation:pulseDot 2s infinite;"></i> ${cnt} online`;
        updateJerkillOnline(cnt);
        updateOnlineUserStat(cnt);
      }, err => {
        console.warn('[HuấnHà] Presence read error:', err.code || err.message || err);
      });
    }
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => { initJerkillStatusChecker(); }, 800);
    });
    const JK_BUY_URLS = {
      1: 'https://t.me/huanha_dev',
      2: 'https://t.me/huanha_dev',
      3: 'https://t.me/huanha_dev'
    };
    function jkBuyNowClick(btn, planNum) {
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const rect = btn.getBoundingClientRect();
      ripple.style.left = (rect.width / 2) + 'px';
      ripple.style.top = (rect.height / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
      const url = JK_BUY_URLS[planNum] || 'https://t.me/huanha_dev';
      setTimeout(() => window.open(url, '_blank'), 120);
    }
    function showJkKeyAlert(msg, type) {
      const existing = document.getElementById('jkKeyAlertOverlay');
      if (existing) existing.remove();
      const typeMap = {
        locked:  { icon: 'fa-lock',                title: 'KEY BỊ KHÓA!',       subtitle: 'Truy cập bị từ chối',  color: 'var(--red)',    details: ['Key của bạn đã bị khóa do vi phạm điều khoản sử dụng.', 'Không chia sẻ key cho người khác.', 'Liên hệ admin để được hỗ trợ.'] },
        expired: { icon: 'fa-clock',               title: 'KEY ĐÃ HẾT HẠN!',    subtitle: 'Thời gian sử dụng đã kết thúc', color: 'var(--orange)', details: ['Key của bạn đã hết hạn sử dụng.', 'Vui lòng gia hạn hoặc mua gói mới.', 'Liên hệ admin để được hỗ trợ gia hạn.'] },
        deleted: { icon: 'fa-trash-can',           title: 'KEY ĐÃ BỊ XÓA!',     subtitle: 'Key không còn tồn tại',color: 'var(--red)',    details: ['Key này đã bị xóa khỏi hệ thống.', 'Có thể do vi phạm hoặc hết hạn hợp đồng.', 'Vui lòng liên hệ admin để biết thêm chi tiết.'] },
        banned:  { icon: 'fa-ban',                 title: 'KEY BỊ CẤM!',         subtitle: 'Tài khoản bị cấm',    color: 'var(--red)',    details: ['Key của bạn đã bị cấm vĩnh viễn.', 'Lý do: vi phạm điều khoản nghiêm trọng.', 'Không thể khôi phục. Hãy liên hệ admin.'] },
        invalid: { icon: 'fa-circle-exclamation',  title: 'KEY KHÔNG HỢP LỆ!',  subtitle: 'Xác thực thất bại',   color: 'var(--orange)', details: ['Key này không hợp lệ hoặc đã bị thay đổi.', 'Vui lòng nhập lại key chính xác.', 'Liên hệ admin nếu cần hỗ trợ.'] }
      };
      const t = typeMap[type] || typeMap.locked;
      const customMsg = msg || t.subtitle;
      const overlay = document.createElement('div');
      overlay.id = 'jkKeyAlertOverlay';
      overlay.className = 'jk-key-alert-overlay';
      overlay.innerHTML = `
        <div class="jk-key-alert-modal">
          <div class="jk-alert-scan"></div>
          <div class="jk-key-alert-glow"></div>
          <div class="jk-key-alert-icon-wrap">
            <div class="jk-key-alert-ring-pulse"></div>
            <div class="jk-key-alert-ring1"></div>
            <div class="jk-key-alert-ring2"></div>
            <div class="jk-key-alert-icon-inner">
              <i class="fa-solid ${t.icon}"></i>
            </div>
          </div>
          <div class="jk-key-alert-title">${t.title}</div>
          <div class="jk-key-alert-subtitle">${customMsg}</div>
          <div class="jk-key-alert-msg">Không thể tiếp tục sử dụng dịch vụ với key này. Vui lòng liên hệ admin ngay để được hỗ trợ.</div>
          <div class="jk-key-alert-details">
            ${t.details.map(d => `<div class="jk-key-alert-detail-row"><i class="fa-solid fa-circle-dot"></i> ${d}</div>`).join('')}
          </div>
          <div class="jk-key-alert-actions">
            <a class="jk-key-alert-btn-primary" href="https://t.me/huanha_dev" target="_blank">
              <i class="fa-brands fa-telegram"></i> Liên hệ Admin ngay
            </a>
            <button class="jk-key-alert-btn-secondary" onclick="document.getElementById('jkKeyAlertOverlay').remove();showWelcome();">
              <i class="fa-solid fa-rotate-right"></i> Nhập key mới
            </button>
          </div>
        </div>`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) { overlay.remove(); showWelcome(); }
      });
    }
    const DEVICE_SENSITIVITY = {
      'iphone11': { circle: [183,187,191,195], redDot: [143,138,132], x2: [126,120,114], x4: [107,101,96], sniper: [88,83,79], freeCamera: [148,142,136], firePct: [40,43,45,38] },
      'iphone8':  { circle: [175,179,183,187], redDot: [140,135,128], x2: [122,116,110], x4: [103,97,92],  sniper: [84,80,75],  freeCamera: [145,139,133], firePct: [38,41,44,36] },
      'iphone7':  { circle: [176,180,184,188], redDot: [141,136,130], x2: [124,118,112], x4: [105,99,94],  sniper: [86,81,77],  freeCamera: [146,140,134], firePct: [37,40,43,35] },
      'samsung':  { circle: [180,185,189,193], redDot: [144,139,133], x2: [128,122,116], x4: [109,103,98], sniper: [90,85,81],  freeCamera: [149,143,137], firePct: [41,44,45,39] },
      'xiaomi':   { circle: [178,182,186,190], redDot: [142,137,131], x2: [125,119,113], x4: [106,100,95], sniper: [87,82,78],  freeCamera: [147,141,135], firePct: [39,42,44,37] }
    };
    let currentDevice = 'iphone11';
    function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function applyDeviceSensitivity(devKey) {
      const s = DEVICE_SENSITIVITY[devKey];
      if (!s) return;
      const circleVal = rnd(s.circle);
      const rdVal     = rnd(s.redDot);
      const x2Val     = rnd(s.x2);
      const x4Val     = rnd(s.x4);
      const snVal     = rnd(s.sniper);
      const fcVal     = rnd(s.freeCamera);
      const fpVal     = rnd(s.firePct);
      const set = (id, barId, val, max) => {
        const el = document.getElementById(id);
        const bar = document.getElementById(barId);
        if (el) el.textContent = val;
        if (bar) bar.style.width = Math.round((val / max) * 100) + '%';
      };
      set('sensCircle',     'barCircle',     circleVal, 195);
      set('sensRedDot',     'barRedDot',     rdVal,     149);
      set('sens2x',         'bar2x',         x2Val,     149);
      set('sens4x',         'bar4x',         x4Val,     149);
      set('sensSniper',     'barSniper',     snVal,     149);
      set('sensFreeCamera', 'barFreeCamera', fcVal,     149);
      const fpEl = document.getElementById('fireButtonPct');
      if (fpEl) fpEl.textContent = fpVal + '%';
    }
    function selectDevice(devKey, el) {
      document.querySelectorAll('.device-item').forEach(d => {
        d.classList.remove('selected');
        const chk = d.querySelector('.device-item-check');
        if (chk) chk.innerHTML = '';
      });
      el.classList.add('selected');
      const chk = el.querySelector('.device-item-check');
      if (chk) chk.innerHTML = '<svg width="10" height="10" viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
      currentDevice = devKey;
      applyDeviceSensitivity(devKey);
    }
    const ALL_DEVICES = [
      { key: 'iphone11', name: 'iPhone 11', type: 'Apple iOS · 6.1"' },
      { key: 'iphone8',  name: 'iPhone 8',  type: 'Apple iOS · 4.7"' },
      { key: 'iphone7',  name: 'iPhone 7',  type: 'Apple iOS · 4.7"' },
      { key: 'samsung',  name: 'Samsung Galaxy', type: 'Android · 6.4"' },
      { key: 'xiaomi',   name: 'Xiaomi / OPPO / VIVO', type: 'Android · 6.5"' }
    ];
    function filterDevices(q) {
      const clr = document.getElementById('deviceSearchClear');
      if (clr) clr.style.display = q.length ? 'block' : 'none';
      const term = q.toLowerCase().trim();
      ALL_DEVICES.forEach(d => {
        const el = document.getElementById('dev-' + d.key);
        if (!el) return;
        const match = !term || d.name.toLowerCase().includes(term) || d.type.toLowerCase().includes(term);
        el.style.display = match ? '' : 'none';
      });
    }
    function clearDeviceSearch() {
      const inp = document.getElementById('deviceSearchInput');
      if (inp) { inp.value = ''; filterDevices(''); inp.focus(); }
    }
    window.addEventListener('DOMContentLoaded', function() {
      applyDeviceSensitivity(currentDevice);
      setInterval(function() {
        const fpEl = document.getElementById('fireButtonPct');
        if (fpEl) {
          const fireVal = 32 + Math.floor(Math.random() * 14);
          fpEl.textContent = fireVal + '%';
        }
      }, 8000);
    });
    function activateDeviceSensitivity() {
      const inp = document.getElementById('deviceSearchInput');
      const name = inp ? inp.value.trim() : '';
      const listSelected = document.querySelector('.device-item.selected');
      if (name && !listSelected) {
        document.querySelectorAll('.device-item').forEach(d => {
          d.classList.remove('selected');
          const chk = d.querySelector('.device-item-check');
          if (chk) chk.innerHTML = '';
        });
      }
      const randCircle = () => 175 + Math.floor(Math.random() * 21); 
      function genUniqueScopeVals() {
        const used = new Set();
        const ranges = [
          [132,149], [115,131], [96,114], [79,95], [133,149]
        ];
        return ranges.map(([lo, hi]) => {
          let v;
          let attempts = 0;
          do {
            v = lo + Math.floor(Math.random() * (hi - lo + 1));
            attempts++;
          } while (used.has(v) && attempts < 30);
          used.add(v);
          return v;
        });
      }
      const circleVal  = randCircle();
      const scopeVals  = genUniqueScopeVals();
      const redDotVal  = scopeVals[0];
      const x2Val      = scopeVals[1];
      const x4Val      = scopeVals[2];
      const sniperVal  = scopeVals[3];
      const freeCamVal = scopeVals[4];
      const fireVal    = 32 + Math.floor(Math.random() * 14); 
      const set = (id, barId, val, max) => {
        const el  = document.getElementById(id);
        const bar = document.getElementById(barId);
        if (el)  el.textContent = val;
        if (bar) bar.style.width = Math.round((val / max) * 100) + '%';
      };
      set('sensCircle',     'barCircle',     circleVal,  195);
      set('sensRedDot',     'barRedDot',     redDotVal,  149);
      set('sens2x',         'bar2x',         x2Val,      149);
      set('sens4x',         'bar4x',         x4Val,      149);
      set('sensSniper',     'barSniper',     sniperVal,  149);
      set('sensFreeCamera', 'barFreeCamera', freeCamVal, 149);
      const fpEl = document.getElementById('fireButtonPct');
      if (fpEl) fpEl.textContent = fireVal + '%';
      const label = name || (listSelected ? listSelected.querySelector('.device-item-name')?.textContent : '') || 'Thiết bị';
      const devNameEl  = document.getElementById('sensDeviceName');
      const devNameTxt = document.getElementById('sensDeviceNameText');
      if (devNameEl && devNameTxt) {
        devNameTxt.textContent = label;
        devNameEl.style.display = 'flex';
      }
      const sensDevBadge = document.getElementById('sensDeviceBadge');
      if (sensDevBadge) {
        sensDevBadge.textContent = label;
        sensDevBadge.style.display = 'inline-block';
      }
      const btn  = document.getElementById('devStartBtn');
      const icon = document.getElementById('devStartIcon');
      if (btn) {
        btn.classList.add('activated');
        if (icon) {
          icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3" fill="rgba(0,232,122,0.3)"/>';
          icon.setAttribute('stroke', '#00e87a');
        }
        clearTimeout(btn._resetTimer);
        btn._resetTimer = setTimeout(() => {
          btn.classList.remove('activated');
          if (icon) {
            icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3" fill="rgba(255,51,85,0.25)"/>';
            icon.setAttribute('stroke', '#ff3355');
          }
        }, 3500);
      }
      showToast('✓ ' + label + ' — Tìm kiếm thành công!', 'ok');
    }
    const _originalHandleKeyLocked = handleKeyLocked;
    handleKeyLocked = function(msg) {
      isActivated = false;
      updateHeaderStatus(false);
      const b = document.getElementById('keyBadge');
      if (b) {
        b.innerHTML = '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> <span>LOCKED</span>';
        b.className = 'key-badge locked';
      }
      currentKeyData = null;
      let alertType = 'locked';
      if (msg && msg.toLowerCase().includes('hết hạn')) alertType = 'expired';
      else if (msg && msg.toLowerCase().includes('xóa')) alertType = 'deleted';
      else if (msg && msg.toLowerCase().includes('cấm')) alertType = 'banned';
      else if (msg && msg.toLowerCase().includes('không hợp lệ')) alertType = 'invalid';
      showJkKeyAlert(msg, alertType);
    };
    (function() {
      var csOpen = false;
      var csGreeted = false;
      function csInitParticles() {
        var orbit = document.getElementById('csOrbit');
        if (!orbit) return;
        var colors  = ['#a78bfa','#60a5fa','#f472b6','#34d399','#fbbf24'];
        var radii   = [38, 32, 40, 30, 36];
        var durs    = [2.6, 3.1, 2.2, 3.5, 2.9];
        for (var i = 0; i < 5; i++) {
          var dir = i % 2 === 0 ? 1 : -1;
          var kfName = 'csO' + i;
          var r = radii[i];
          var kf = '@keyframes ' + kfName + '{from{transform:rotate(0deg) translateX(' + r + 'px)}to{transform:rotate(' + (dir * 360) + 'deg) translateX(' + r + 'px)}}';
          var s = document.createElement('style');
          s.textContent = kf;
          document.head.appendChild(s);
          var p = document.createElement('div');
          p.className = 'cs-particle';
          p.style.background = colors[i];
          p.style.boxShadow = '0 0 6px ' + colors[i];
          p.style.animation = kfName + ' ' + durs[i] + 's linear ' + (-(i * 0.6)).toFixed(1) + 's infinite';
          orbit.appendChild(p);
        }
      }
      function csEsc(str) {
        return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      }
      function csToggleModal() {
        var modal = document.getElementById('csSupportModal');
        if (!modal) return;
        csOpen = !csOpen;
        if (csOpen) {
          modal.style.display = 'flex';
          requestAnimationFrame(function() {
            requestAnimationFrame(function() { modal.classList.add('open'); });
          });
          if (!csGreeted) { csGreeted = true; setTimeout(csGreet, 380); }
          setTimeout(function() { var inp = document.getElementById('csInput'); if (inp) inp.focus(); }, 400);
        } else {
          modal.classList.remove('open');
          setTimeout(function() { modal.style.display = 'none'; }, 250);
        }
      }
      window.csToggleModal = csToggleModal;
      function csGreet() {
        var devId = (typeof DEVICE_ID !== 'undefined') ? DEVICE_ID :
                    (localStorage.getItem('hh_device_id') || 'UNKNOWN');
        csAddMsg('bot',
          '👋 Xin chào! Tôi là bot hỗ trợ của <b>HuấnHà App</b>.<br>' +
          'Mã thiết bị của bạn:<br><span class="cs-device-id">' + csEsc(devId) + '</span>');
        setTimeout(function() {
          csAddTyping();
          setTimeout(function() {
            csRemoveTyping();
            csAddMsg('bot',
              '📋 Các lệnh hỗ trợ:<br>' +
              '<span class="cs-code">/kiemtra [key]</span> — Kiểm tra key<br>' +
              '<span class="cs-code">/laykey</span> — Lấy key miễn phí<br>' +
              '<span class="cs-code">/sd</span> — Hướng dẫn đăng nhập<br>' +
              '<span class="cs-code">/hotro</span> — Liên hệ hỗ trợ');
            setTimeout(function() {
              csAddTyping();
              setTimeout(function() {
                csRemoveTyping();
                csAddMsg('bot',
                  '💡 Gõ <span class="cs-code">/kiemtra KEY-CỦA-BẠN</span> để kiểm tra trạng thái key ngay nhé!');
              }, 900);
            }, 600);
          }, 1200);
        }, 700);
      }
      function csAddMsg(who, html) {
        var container = document.getElementById('csMessages');
        if (!container) return;
        var el = document.createElement('div');
        el.className = 'cs-msg ' + who;
        if (who === 'bot') {
          el.innerHTML = '<div class="cs-msg-av">🤖</div><div class="cs-msg-bubble">' + html + '</div>';
        } else {
          el.innerHTML = '<div class="cs-msg-bubble">' + csEsc(html) + '</div>' +
            '<div class="cs-msg-av" style="background:linear-gradient(135deg,#0ea5e9,#0284c7);">👤</div>';
        }
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
      }
      function csAddTyping() {
        var container = document.getElementById('csMessages');
        if (!container || container.querySelector('.cs-typing-wrap')) return;
        var el = document.createElement('div');
        el.className = 'cs-msg bot cs-typing-wrap';
        el.innerHTML = '<div class="cs-msg-av">🤖</div><div class="cs-msg-bubble" style="padding:8px 12px;">' +
          '<div class="cs-typing"><span></span><span></span><span></span></div></div>';
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
      }
      function csRemoveTyping() {
        var container = document.getElementById('csMessages');
        if (!container) return;
        var t = container.querySelector('.cs-typing-wrap');
        if (t) t.remove();
      }
      function csSendMsg() {
        var inp = document.getElementById('csInput');
        if (!inp) return;
        var raw = inp.value.trim();
        if (!raw) return;
        inp.value = '';
        csAddMsg('user', raw);
        var cmd = raw.toLowerCase().trim();
        setTimeout(function() {
          csAddTyping();
          setTimeout(function() { csHandleCmd(cmd, raw); }, 800);
        }, 200);
      }
      window.csSendMsg = csSendMsg;
      function csHandleCmd(cmd, raw) {
        csRemoveTyping();
        if (cmd.startsWith('/kiemtra')) {
          var parts = raw.trim().split(/\s+/);
          var key = parts[1] || '';
          if (!key) {
            csAddMsg('bot', '🔑 Vui lòng nhập key cần kiểm tra:<br><span class="cs-code">/kiemtra KEY-CỦA-BẠN</span>');
            return;
          }
          csCheckKey(key);
          return;
        }
        if (cmd === '/sd' || cmd.startsWith('/sd ')) {
          csAddMsg('bot',
            '📱 <b>Hướng dẫn đăng nhập key:</b><br>' +
            '1️⃣ Mở tab <b>Home</b> hoặc nhấn nút <b>KÍCH HOẠT</b><br>' +
            '2️⃣ Nhập key vào ô <b>Nhập key kích hoạt</b><br>' +
            '3️⃣ Nhấn <b>KÍCH HOẠT NGAY</b><br>' +
            '4️⃣ Khi thành công, toàn bộ tính năng sẽ được mở khóa ✅');
          return;
        }
        if (cmd === '/hotro' || cmd.startsWith('/hotro ')) {
          var container = document.getElementById('csMessages');
          if (!container) return;
          var el = document.createElement('div');
          el.className = 'cs-msg bot';
          el.innerHTML = '<div class="cs-msg-av">🤖</div><div class="cs-msg-bubble">' +
            '📞 <b>Liên hệ hỗ trợ:</b>' +
            '<div class="cs-social-btns">' +
              '<a class="cs-social-btn fb" href="https://facebook.com/huanha.dev" target="_blank">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="#60a5fa"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>' +
                ' Facebook — HuấnHà</a>' +
              '<a class="cs-social-btn tt" href="https://tiktok.com/@huanha.dev" target="_blank">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" stroke-width="2" stroke-linecap="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>' +
                ' TikTok — HuấnHà</a>' +
              '<a class="cs-social-btn zl" href="https://zalo.me/huanha_dev" target="_blank">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60c5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
                ' Zalo — HuấnHà</a>' +
            '</div></div>';
          container.appendChild(el);
          container.scrollTop = container.scrollHeight;
          return;
        }
        if (cmd === '/laykey' || cmd.startsWith('/laykey ')) {
          var fkText = '';
          var fkLink = '';
          var fkEl   = document.getElementById('freeKeyText');
          var fkBtn  = document.getElementById('freeKeyLinkBtn');
          if (fkEl)  fkText = fkEl.textContent.trim() || 'HH-DEMO-FREE-2026';
          if (fkBtn) fkLink = fkBtn.href || '#';
          var container2 = document.getElementById('csMessages');
          if (!container2) return;
          var el2 = document.createElement('div');
          el2.className = 'cs-msg bot';
          el2.innerHTML = '<div class="cs-msg-av">🤖</div><div class="cs-msg-bubble">' +
            '🎁 <b>Key miễn phí hiện tại:</b><br>' +
            '<div style="margin:7px 0 5px;background:rgba(0,232,122,0.1);border:1px solid rgba(0,232,122,0.3);border-radius:9px;padding:8px 10px;display:flex;align-items:center;gap:7px;">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e87a" stroke-width="2" stroke-linecap="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 6.5l3 3"/></svg>' +
              '<span style="flex:1;font-weight:800;color:#00e87a;letter-spacing:0.5px;font-size:11px;" id="csLayKeyDisplay">' + csEsc(fkText) + '</span>' +
              '<button onclick="var k=document.getElementById(\'csLayKeyDisplay\');if(k){navigator.clipboard.writeText(k.textContent).then(function(){window.showToast&&showToast(\'<i class=\\\"fa-solid fa-copy\\\"></i> Đã copy key!\',\'ok\')}).catch(function(){})}" style="background:rgba(0,232,122,0.2);border:1px solid rgba(0,232,122,0.4);border-radius:6px;padding:3px 8px;font-size:9px;font-weight:700;color:#00e87a;cursor:pointer;">COPY</button>' +
            '</div>' +
            '<div style="display:flex;gap:6px;margin-top:4px;">' +
              '<a href="' + csEsc(fkLink) + '" target="_blank" style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:6px 10px;background:rgba(59,130,246,0.18);border:1px solid rgba(59,130,246,0.35);border-radius:9px;font-size:10px;font-weight:700;color:#60a5fa;text-decoration:none;">' +
                '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
                ' Lấy key miễn phí</a>' +
              '<button onclick="navigator.clipboard.writeText(\'' + csEsc(fkLink) + '\').then(function(){window.showToast&&showToast(\'<i class=\\\"fa-solid fa-copy\\\"></i> Đã copy link!\',\'ok\')}).catch(function(){})" style="padding:6px 10px;background:rgba(139,92,246,0.18);border:1px solid rgba(139,92,246,0.35);border-radius:9px;font-size:10px;font-weight:700;color:#a78bfa;cursor:pointer;">' +
                '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:inline;vertical-align:middle;"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
                ' Copy link</button>' +
            '</div>' +
            '</div>';
          container2.appendChild(el2);
          container2.scrollTop = container2.scrollHeight;
          return;
        }
        csAddMsg('bot',
          '❓ Lệnh không hợp lệ. Thử:<br>' +
          '<span class="cs-code">/kiemtra [key]</span> — Kiểm tra key<br>' +
          '<span class="cs-code">/laykey</span> — Lấy key miễn phí<br>' +
          '<span class="cs-code">/sd</span> — Hướng dẫn đăng nhập<br>' +
          '<span class="cs-code">/hotro</span> — Liên hệ hỗ trợ');
      }
      function csCheckKey(key) {
        var fbReady = (typeof firebaseReady !== 'undefined') ? firebaseReady : false;
        var dbObj   = (typeof db !== 'undefined') ? db : null;
        csAddMsg('bot', '🔍 Đang kiểm tra key <span class="cs-code">' + csEsc(key) + '</span>...');
        if (fbReady && dbObj) {
          dbObj.ref('keys/' + key).once('value').then(function(snap) {
            var d = snap.val();
            if (!d) { csNotFound(key); return; }
            var locked  = d.status === 'locked' || d.status === 'banned';
            var expired = d.expire && Date.now() > d.expire;
            var expStr  = d.expire ? new Date(d.expire).toLocaleDateString('vi-VN') : 'Vĩnh viễn';
            if (locked) {
              csAddMsg('bot', '🔒 Key <span class="cs-code">' + csEsc(key) + '</span><br><b style="color:var(--red)">Bị khóa/cấm</b> — Liên hệ admin để được hỗ trợ.');
            } else if (expired) {
              csAddMsg('bot', '⌛ Key <span class="cs-code">' + csEsc(key) + '</span><br><b style="color:var(--orange)">Đã hết hạn</b> — Ngày hết hạn: <b>' + expStr + '</b><br>Vui lòng gia hạn hoặc mua key mới.');
            } else {
              csAddMsg('bot',
                '✅ Key hợp lệ!<br>' +
                '<span class="cs-code">' + csEsc(key) + '</span><br>' +
                'Loại: <b style="color:var(--cyan)">' + csEsc((d.type||'unknown').toUpperCase()) + '</b><br>' +
                'Hạn dùng: <b style="color:var(--green)">' + expStr + '</b><br>' +
                'Trạng thái: <b style="color:var(--green)">Active ✓</b>');
            }
          }).catch(function() { csFallbackCheck(key); });
        } else {
          csFallbackCheck(key);
        }
      }
      function csNotFound(key) {
        csAddMsg('bot',
          '❌ Key <span class="cs-code">' + csEsc(key) + '</span><br>' +
          '<b style="color:var(--red)">Chưa xác minh</b> — Key không tồn tại trong hệ thống hoặc chưa được kích hoạt.');
      }
      function csFallbackCheck(key) {
        var demos = {
          'HH-DEMO-FREE-2026': 'free',
          'HH-VIP-2026': 'vip',
          'HH-PREMIUM-2026': 'premium'
        };
        var type = demos[key.toUpperCase()];
        if (type) {
          csAddMsg('bot',
            '✅ Key hợp lệ!<br>' +
            '<span class="cs-code">' + csEsc(key) + '</span><br>' +
            'Loại: <b style="color:var(--cyan)">' + type.toUpperCase() + '</b><br>' +
            'Hạn dùng: <b style="color:var(--green)">Vĩnh viễn</b><br>' +
            'Trạng thái: <b style="color:var(--green)">Active ✓</b>');
        } else {
          csNotFound(key);
        }
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', csInitParticles);
      } else {
        csInitParticles();
      }
    })();
    const _sessionStart = Date.now();
    function updateSettingsStats() {
      const elapsed = Math.floor((Date.now() - _sessionStart) / 1000);
      const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const ss = String(elapsed % 60).padStart(2, '0');
      const stEl = document.getElementById('statSessionTime');
      if (stEl) stEl.textContent = mm + ':' + ss;
      const activeCards = document.querySelectorAll('.feature-card.enabled').length;
      const afEl = document.getElementById('statActiveFeatures');
      if (afEl) afEl.textContent = activeCards;
      const settingsOn = document.querySelectorAll('.si-v2 input[type=checkbox]:checked:not(:disabled)').length;
      const soEl = document.getElementById('statSettingsOn');
      if (soEl) soEl.textContent = settingsOn;
    }
    function updateOnlineUserStat(count) {
      const el = document.getElementById('statOnlineUsers');
      if (el && count != null) el.textContent = count;
    }
    setInterval(updateSettingsStats, 1000);
    const _origSwitchTab = window.switchTab;
    function searchGoogleAvatar() {
      const inp = document.getElementById('gasSearchInput');
      const resultsEl = document.getElementById('gasResults');
      const statusEl = document.getElementById('gasStatus');
      if (!inp || !resultsEl) return;
      const query = inp.value.trim();
      if (!query) {
        resultsEl.innerHTML = '<div class="gas-no-results">Vui lòng nhập tên để tìm kiếm!</div>';
        return;
      }
      statusEl.textContent = 'Đang tải avatar...';
      resultsEl.innerHTML = '<div class="gas-no-results" style="color:var(--cyan);">⏳ Đang tải...</div>';
      const encodedName = encodeURIComponent(query);
      const avatarSources = [
        `https://ui-avatars.com/api/?name=${encodedName}&size=100&background=ff3355&color=fff&bold=true&format=png`,
        `https://ui-avatars.com/api/?name=${encodedName}&size=100&background=FFD700&color=000&bold=true&format=png`,
        `https://ui-avatars.com/api/?name=${encodedName}&size=100&background=8b5cf6&color=fff&bold=true&format=png`,
        `https://ui-avatars.com/api/?name=${encodedName}&size=100&background=00e87a&color=000&bold=true&format=png`,
        `https://ui-avatars.com/api/?name=${encodedName}&size=100&background=3b82f6&color=fff&bold=true&format=png`,
        `https://ui-avatars.com/api/?name=${encodedName}&size=100&background=f97316&color=fff&bold=true&format=png`,
        `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodedName}&scale=90`,
        `https://api.dicebear.com/7.x/bottts/svg?seed=${encodedName}&scale=90`,
        `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodedName}&scale=90`,
        `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodedName}&scale=90`,
      ];
      resultsEl.innerHTML = '';
      avatarSources.forEach((src, idx) => {
        const item = document.createElement('div');
        item.className = 'gas-avatar-item';
        item.title = 'Nhấn để dùng avatar này';
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        img.onerror = function() { item.style.display = 'none'; };
        img.onclick = function() { applyGoogleAvatar(src); };
        item.appendChild(img);
        item.onclick = function() { applyGoogleAvatar(src); };
        resultsEl.appendChild(item);
      });
      statusEl.textContent = avatarSources.length + ' avatar được tạo cho "' + query + '"';
    }
    function applyGoogleAvatar(src) {
      userProfile.avatar = src;
      saveProfileLocal();
      loadProfileUI();
      syncProfileToFirebase ? syncProfileToFirebase() : null;
      if (typeof db !== 'undefined' && typeof DEVICE_ID !== 'undefined') {
        try { db.ref('presence/' + DEVICE_ID).update({ avatar: src }); } catch(e) {}
      }
      showToast('<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e87a" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Đã áp dụng avatar mới!', 'ok');
      const gasEl = document.getElementById('googleAvatarSearch');
      if (gasEl) {
        gasEl.style.borderColor = 'rgba(255,215,0,0.8)';
        gasEl.style.boxShadow = '0 0 30px rgba(255,215,0,0.3)';
        setTimeout(() => {
          gasEl.style.borderColor = '';
          gasEl.style.boxShadow = '';
        }, 1200);
      }
    }
    document.addEventListener('DOMContentLoaded', function() {
      const gasInp = document.getElementById('gasSearchInput');
      if (gasInp) {
        gasInp.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') { e.preventDefault(); searchGoogleAvatar(); }
        });
      }
    });
    let _crwRamHistory = [30,50,38,65,44,55,36,58];
    let _crwCpuHistory = [25,60,35,70,45,80,50,55];
    let _crwBoostActive = {};
    function _crwRand(min, max) { return Math.random() * (max - min) + min; }
    function crwUpdate() {
      const ramPct = Math.round(_crwRand(38, 72));
      const cpuPct = Math.round(_crwRand(22, 85));
      const fps    = Math.round(_crwRand(48, 62) + (_crwBoostActive.bbFps ? 18 : 0));
      const temp   = Math.round(_crwRand(36, 48) - (_crwBoostActive.bbCpu ? 6 : 0));
      const ping   = Math.round(_crwRand(18, 65) - (_crwBoostActive.bbPing ? 12 : 0));
      const ramMB  = Math.round(3200 * ramPct / 100);
      const ramOffset = 188.5 - (188.5 * ramPct / 100);
      const ramRing = document.getElementById('crwRamRing');
      if (ramRing) {
        ramRing.style.strokeDashoffset = ramOffset;
        ramRing.style.stroke = ramPct > 70 ? '#ff3355' : ramPct > 55 ? '#ff8c00' : '#FFD700';
      }
      const cpuOffset = 188.5 - (188.5 * cpuPct / 100);
      const cpuRing = document.getElementById('crwCpuRing');
      if (cpuRing) {
        cpuRing.style.strokeDashoffset = cpuOffset;
        cpuRing.style.stroke = cpuPct > 75 ? '#ff3355' : cpuPct > 55 ? '#ff8c00' : '#8b5cf6';
      }
      const elRamPct = document.getElementById('crwRamPct');
      const elRamVal = document.getElementById('crwRamVal');
      const elCpuPct = document.getElementById('crwCpuPct');
      const elCpuVal = document.getElementById('crwCpuVal');
      const elFps    = document.getElementById('crwFps');
      const elTemp   = document.getElementById('crwTemp');
      const elPing   = document.getElementById('crwPing');
      if (elRamPct) elRamPct.textContent = ramPct + '%';
      if (elRamVal) elRamVal.textContent = ramMB;
      if (elCpuPct) elCpuPct.textContent = cpuPct + '%';
      if (elCpuVal) elCpuVal.textContent = cpuPct;
      if (elFps) elFps.textContent = fps;
      if (elTemp) { elTemp.textContent = temp + '°'; elTemp.style.color = temp > 44 ? '#ff3355' : temp > 40 ? '#ff8c00' : '#FFD700'; }
      if (elPing) { elPing.textContent = ping; elPing.style.color = ping < 30 ? '#00e87a' : ping < 50 ? '#FFD700' : '#ff3355'; }
      _crwRamHistory.push(ramPct); _crwRamHistory = _crwRamHistory.slice(-8);
      _crwCpuHistory.push(cpuPct); _crwCpuHistory = _crwCpuHistory.slice(-8);
      const ramBarsEl = document.getElementById('crwRamBars');
      const cpuBarsEl = document.getElementById('crwCpuBars');
      if (ramBarsEl) {
        const bars = ramBarsEl.querySelectorAll('.crw-spark-bar');
        const mx = Math.max(..._crwRamHistory, 1);
        bars.forEach((b,i) => {
          const v = _crwRamHistory[i] || 0;
          const pct = (v/mx*100).toFixed(0);
          b.style.height = pct + '%';
          const alpha = 0.3 + (v/100) * 0.5;
          b.style.background = v > 70 ? `rgba(255,51,85,${alpha})` : v > 55 ? `rgba(255,140,0,${alpha})` : `rgba(255,215,0,${alpha})`;
        });
      }
      if (cpuBarsEl) {
        const bars = cpuBarsEl.querySelectorAll('.crw-spark-bar');
        const mx = Math.max(..._crwCpuHistory, 1);
        bars.forEach((b,i) => {
          const v = _crwCpuHistory[i] || 0;
          const pct = (v/mx*100).toFixed(0);
          b.style.height = pct + '%';
          const alpha = 0.3 + (v/100) * 0.5;
          b.style.background = v > 75 ? `rgba(255,51,85,${alpha})` : v > 55 ? `rgba(255,140,0,${alpha})` : `rgba(139,92,246,${alpha})`;
        });
      }
    }
    let _crwTimer = null;
    function crwStartIfVisible() {
      const el = document.querySelector('.cpu-ram-widget');
      if (!el) return;
      if (!_crwTimer) {
        crwUpdate();
        _crwTimer = setInterval(crwUpdate, 2000);
      }
    }
    const _crwTabObs = new MutationObserver(() => {
      const tabInfo = document.getElementById('tab-info');
      if (tabInfo && tabInfo.classList.contains('active')) { crwStartIfVisible(); }
      else { clearInterval(_crwTimer); _crwTimer = null; }
    });
    document.addEventListener('DOMContentLoaded', () => {
      const tabInfo = document.getElementById('tab-info');
      if (tabInfo) _crwTabObs.observe(tabInfo, { attributeFilter: ['class'] });
      if (tabInfo && tabInfo.classList.contains('active')) crwStartIfVisible();
      initInfoParticles();
    });
    const _boostConfigs = {
      bbRam:   { color:'#f59e0b', arc:'#FFD700', grad:'linear-gradient(135deg,#fde68a,#f59e0b)', chips:['Quét RAM','Xoá cache','Giải phóng bộ nhớ','Tối ưu heap'], label:'Giải phóng RAM', sub:'Hệ thống đang dọn sạch RAM & tối ưu bộ nhớ...' },
      bbCpu:   { color:'#8b5cf6', arc:'#c4b5fd', grad:'linear-gradient(135deg,#c4b5fd,#7c3aed)', chips:['Hạ nhiệt CPU','Cân bằng tải','Giảm xung nhịp','Tối ưu luồng'],  label:'Làm mát CPU',    sub:'Đang cân bằng tải CPU & tối ưu luồng xử lý...' },
      bbFps:   { color:'#7c3aed', arc:'#a78bfa', grad:'linear-gradient(135deg,#a78bfa,#6d28d9)', chips:['Tăng FPS','Giảm lag','Ưu tiên GPU','Tắt nền'],           label:'Tăng FPS',       sub:'Đang tăng ưu tiên GPU & tối ưu khung hình...' },
      bbPing:  { color:'#0891b2', arc:'#67e8f9', grad:'linear-gradient(135deg,#67e8f9,#0891b2)', chips:['Tối ưu mạng','Giảm độ trễ','DNS cache','TCP tuning'],     label:'Giảm Ping',      sub:'Đang tối ưu kết nối mạng & giảm độ trễ...' },
      bbCache: { color:'#dc2626', arc:'#fca5a5', grad:'linear-gradient(135deg,#fca5a5,#dc2626)', chips:['Xoá cache','Dọn temp','Giải phóng disk','Làm sạch'],      label:'Dọn Cache',      sub:'Đang xoá toàn bộ cache & file tạm thời...' },
    };
    const _boostIcons = {
      bbRam:   `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 7V5m4 2V5m4 2V5m4 2V5"/><path d="M6 17v2m4-2v2m4-2v2m4-2v2"/></svg>`,
      bbCpu:   `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 7V4m6 3V4M9 20v-3m6 3v-3M4 9H7m-3 6h3m10-6h3m-3 6h3"/></svg>`,
      bbFps:   `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>`,
      bbPing:  `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 8.5 A12 12 0 0 1 22.5 8.5"/><path d="M4.5 12 A9 9 0 0 1 19.5 12"/><path d="M7.5 15.5 A6 6 0 0 1 16.5 15.5"/><circle cx="12" cy="19" r="1.5" fill="#67e8f9"/></svg>`,
      bbCache: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>`,
    };
    let _boostModalTimer = null;
    function activateBoost(id, name) {
      if (!isActivated) { showToast('<i class="fa-solid fa-lock"></i> Cần kích hoạt key!', 'err'); showWelcome(); return; }
      const btn = document.getElementById(id);
      if (!btn) return;
      const cfg = _boostConfigs[id] || { color:'#FFD700', arc:'#FFD700', grad:'linear-gradient(135deg,#FFD700,#ff8c00)', chips:['Đang xử lý'], label:name, sub:'Đang tối ưu hệ thống...' };
      if (_crwBoostActive[id]) {
        delete _crwBoostActive[id];
        btn.classList.remove('boosted');
      } else {
        _crwBoostActive[id] = true;
        btn.classList.remove('boosted');
        void btn.offsetWidth;
        btn.classList.add('boosted');
        const circle = btn.querySelector('.boost-btn-circle');
        if (circle) spawnBoostParticles(circle);
      }
      crwUpdate();
      _openBoostModal(id, cfg);
    }
    function _openBoostModal(id, cfg) {
      const overlay = document.getElementById('boostModalOverlay');
      const arc     = document.getElementById('bmArc');
      const iconEl  = document.getElementById('bmIconCenter');
      const titleEl = document.getElementById('bmTitle');
      const subEl   = document.getElementById('bmSub');
      const bar     = document.getElementById('bmProgressBar');
      const chipsEl = document.getElementById('bmChips');
      const closeBtn= document.getElementById('bmCloseBtn');
      if (!overlay) return;
      bar.style.width = '0%';
      bar.style.background = cfg.grad;
      closeBtn.style.display = 'none';
      closeBtn.style.background = cfg.grad;
      closeBtn.style.color = '#000';
      arc.setAttribute('stroke', cfg.arc);
      iconEl.innerHTML = _boostIcons[id] || '';
      titleEl.textContent = cfg.label;
      subEl.textContent   = cfg.sub;
      chipsEl.innerHTML = '';
      cfg.chips.forEach(c => {
        const ch = document.createElement('div');
        ch.className = 'bm-chip';
        ch.innerHTML = '<div class="bm-chip-dot"></div>' + c;
        chipsEl.appendChild(ch);
      });
      const modal = document.getElementById('boostModal');
      _spawnModalParticles(modal, cfg.color);
      overlay.classList.add('show');
      let progress = 0;
      const chipList = chipsEl.querySelectorAll('.bm-chip');
      const totalChips = chipList.length;
      const interval = 40;
      const totalMs = 2800;
      const steps = totalMs / interval;
      let step = 0;
      if (_boostModalTimer) clearInterval(_boostModalTimer);
      _boostModalTimer = setInterval(() => {
        step++;
        progress = Math.min(100, (step / steps) * 100);
        bar.style.width = progress + '%';
        const chipIdx = Math.floor((progress / 100) * totalChips);
        chipList.forEach((ch, i) => {
          if (i < chipIdx) ch.classList.add('done');
        });
        if (progress >= 100) {
          clearInterval(_boostModalTimer);
          chipList.forEach(ch => ch.classList.add('done'));
          titleEl.textContent = cfg.label + ' ✓';
          subEl.textContent = 'Tối ưu hoàn tất! Hiệu suất đã được cải thiện.';
          closeBtn.style.display = 'block';
          showToast('⚡ ' + cfg.label + ' hoàn tất!', 'ok');
        }
      }, interval);
    }
    function _spawnModalParticles(modal, color) {
      modal.querySelectorAll('.bm-particle').forEach(p => p.remove());
      const colors = [color, '#FFD700', '#ffffff', color + 'aa'];
      const count = 18;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'bm-particle';
        const size = 3 + Math.random() * 5;
        const delay = Math.random() * 3;
        const dur   = 2 + Math.random() * 3;
        const startX = 10 + Math.random() * 80;
        const startY = 20 + Math.random() * 80;
        const tx = (Math.random() - 0.5) * 120;
        const ty = -(30 + Math.random() * 100);
        p.style.cssText = [
          `width:${size}px`, `height:${size}px`,
          `background:${colors[i % colors.length]}`,
          `left:${startX}%`, `top:${startY}%`,
          `animation-duration:${dur}s`,
          `animation-delay:${delay}s`,
          `box-shadow:0 0 ${size*2}px ${colors[i % colors.length]}`,
          `--tx:${tx}px`,`--ty:${ty}px`,
        ].join(';');
        modal.appendChild(p);
      }
    }
    function closeBoostModal(e) {
      if (e && e.target !== document.getElementById('boostModalOverlay')) return;
      const overlay = document.getElementById('boostModalOverlay');
      if (!overlay) return;
      if (_boostModalTimer) { clearInterval(_boostModalTimer); _boostModalTimer = null; }
      overlay.classList.remove('show');
      const modal = document.getElementById('boostModal');
      if (modal) modal.querySelectorAll('.bm-particle').forEach(p => p.remove());
    }
    function spawnBoostParticles(el) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const colors = ['#FFD700','#ff3355','#8b5cf6','#00e87a','#00d4ff','#ff8c00'];
      for (let i = 0; i < 12; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = [
          'position:fixed',
          `left:${cx}px`, `top:${cy}px`,
          'width:6px', 'height:6px',
          'border-radius:50%',
          `background:${colors[i % colors.length]}`,
          'pointer-events:none',
          'z-index:9999',
          'transform:translate(-50%,-50%)',
          'box-shadow:0 0 6px currentColor',
        ].join(';');
        document.body.appendChild(dot);
        const angle = (i / 12) * Math.PI * 2;
        const dist = 40 + Math.random() * 40;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        dot.animate([
          { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
        ], { duration: 600 + Math.random() * 400, easing: 'cubic-bezier(0,0,0.3,1)', fill: 'forwards' })
        .onfinish = () => dot.remove();
      }
    }
    function initInfoParticles() {
      const wraps = document.querySelectorAll('.info-particle-wrap');
      const COLORS = ['rgba(255,215,0,0.6)','rgba(255,140,0,0.5)','rgba(255,215,0,0.4)','rgba(255,200,50,0.7)'];
      wraps.forEach(wrap => {
        const n = 6 + Math.floor(Math.random() * 4); // 6-9 particles per wrap
        for (let i = 0; i < n; i++) {
          const dot = document.createElement('div');
          dot.className = 'ipt';
          const size = 2 + Math.random() * 3;
          const color = COLORS[Math.floor(Math.random() * COLORS.length)];
          const duration = 3 + Math.random() * 4;
          const delay = Math.random() * 5;
          const left = 2 + Math.random() * 96;
          dot.style.cssText = [
            `width:${size}px`, `height:${size}px`,
            `background:${color}`,
            `left:${left}%`, `bottom:0`,
            `animation-duration:${duration}s`,
            `animation-delay:${delay}s`,
            `box-shadow:0 0 ${size*2}px ${color}`,
          ].join(';');
          wrap.appendChild(dot);
        }
      });
    }
    let _gboTimer     = null;
    let _gboLtTimer   = null;
    let _gboCurrentGame = null;
    const _gboGameData = {
      ff: {
        name: 'Free Fire',
        sub: 'Đang tối ưu Free Fire — Battle Royale',
        fps: 60, ping: 28, cpu: '18%', ram: '1.1G',
        color: '#FFD700',
        steps: ['Dọn bộ nhớ nền','Ưu tiên tiến trình game','Tối ưu mạng & giảm Ping','Tăng FPS & ổn định khung hình','Kích hoạt chế độ hiệu năng cao']
      },
      ffmax: {
        name: 'Free Fire Max',
        sub: 'Đang tối ưu Free Fire Max — Ultra Graphics',
        fps: 90, ping: 22, cpu: '22%', ram: '1.4G',
        color: '#ff8c00',
        steps: ['Dọn bộ nhớ nền','Tối ưu render GPU Ultra','Giảm Ping & tối ưu kết nối','Tăng FPS lên 90 — ổn định','Kích hoạt Max Performance Mode']
      }
    };
    function openGameBoost(gameId, gameName, logoUrl) {
      const overlay = document.getElementById('gboOverlay');
      if (!overlay) return;
      _gboCurrentGame = gameId;
      const gd = _gboGameData[gameId] || _gboGameData.ff;
      const logoImg = document.getElementById('gboLogo');
      const logoFb  = document.getElementById('gboLogoFallback');
      if (logoImg) { logoImg.src = logoUrl; logoImg.style.display = 'block'; }
      if (logoFb)    logoFb.style.display = 'none';
      document.getElementById('gboGameName').textContent = gd.name;
      document.getElementById('gboGameSub').textContent  = gd.sub;
      const bar = document.getElementById('gboProgressBar');
      const pct = document.getElementById('gboProgressPct');
      if (bar) { bar.style.width = '0%'; bar.style.boxShadow = `0 0 14px ${gd.color}`; }
      if (pct) pct.textContent = '0%';
      document.getElementById('gboFps').textContent  = '--';
      document.getElementById('gboPing').textContent  = '--';
      document.getElementById('gboCpu').textContent   = '--';
      document.getElementById('gboRam').textContent   = '--';
      const stepEls = document.querySelectorAll('.gbo-step');
      stepEls.forEach(s => s.classList.remove('done','active'));
      stepEls.forEach((s, i) => {
        const span = s.querySelector('span');
        if (span && gd.steps[i]) span.textContent = gd.steps[i];
      });
      const doneEl = document.getElementById('gboDone');
      if (doneEl) { doneEl.style.display = 'none'; }
      const stepsEl = document.getElementById('gboSteps');
      if (stepsEl) stepsEl.style.display = 'block';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      _gboStartLightning(gd.color);
      _gboSpawnParticles(gd.color);
      _gboRunProgress(gd);
    }
    function closeGameBoost() {
      const overlay = document.getElementById('gboOverlay');
      if (!overlay) return;
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      if (_gboTimer) { clearInterval(_gboTimer); _gboTimer = null; }
      if (_gboLtTimer) { clearInterval(_gboLtTimer); _gboLtTimer = null; }
      const pWrap = document.getElementById('gboParticles');
      if (pWrap) pWrap.innerHTML = '';
    }
    function _gboRunProgress(gd) {
      if (_gboTimer) clearInterval(_gboTimer);
      let p = 0;
      const totalMs = 3500;
      const interval = 50;
      const steps = totalMs / interval;
      let step = 0;
      const bar = document.getElementById('gboProgressBar');
      const pct = document.getElementById('gboProgressPct');
      const stepEls = document.querySelectorAll('.gbo-step');
      const totalSteps = stepEls.length;
      _gboTimer = setInterval(() => {
        step++;
        p = Math.min(100, (step / steps) * 100);
        if (bar) bar.style.width = p + '%';
        if (pct) pct.textContent = Math.floor(p) + '%';
        const stepIdx = Math.floor((p / 100) * totalSteps);
        stepEls.forEach((s, i) => {
          if (i < stepIdx) {
            s.classList.add('done'); s.classList.remove('active');
          } else if (i === stepIdx) {
            s.classList.add('active'); s.classList.remove('done');
          } else {
            s.classList.remove('done','active');
          }
        });
        if (p > 20) document.getElementById('gboFps').textContent  = Math.floor(gd.fps * (p/100) * 0.9 + 10);
        if (p > 40) document.getElementById('gboPing').textContent  = Math.floor(gd.ping + (100 - p) * 0.8);
        if (p > 30) document.getElementById('gboCpu').textContent   = gd.cpu;
        if (p > 50) document.getElementById('gboRam').textContent   = gd.ram;
        if (p >= 100) {
          clearInterval(_gboTimer);
          stepEls.forEach(s => { s.classList.add('done'); s.classList.remove('active'); });
          document.getElementById('gboFps').textContent  = gd.fps;
          document.getElementById('gboPing').textContent  = gd.ping;
          setTimeout(() => {
            const stepsEl = document.getElementById('gboSteps');
            const doneEl  = document.getElementById('gboDone');
            const doneSub = document.getElementById('gboDoneSub');
            if (stepsEl) stepsEl.style.display = 'none';
            if (doneEl)  doneEl.style.display  = 'block';
            if (doneSub) doneSub.textContent    = gd.name + ' đã được tối ưu hoàn toàn!';
            showToast('⚡ ' + gd.name + ' Boost hoàn tất!', 'ok');
          }, 600);
        }
      }, interval);
    }
    function _gboStartLightning(color) {
      const canvas = document.getElementById('gboLightningCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (_gboLtTimer) clearInterval(_gboLtTimer);
      function resize() {
        canvas.width  = canvas.offsetWidth  || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;
      }
      resize();
      function drawLightningBolt(x1, y1, x2, y2, branches, branchProb, col, alpha) {
        if (branches <= 0 || alpha < 0.05) return;
        const dx = x2 - x1, dy = y2 - y1;
        const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * Math.abs(dy) * 0.6;
        const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * Math.abs(dx) * 0.6;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(midX, midY);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255,215,0,${alpha})`;
        ctx.lineWidth   = alpha * 2.5;
        ctx.shadowBlur  = 18;
        ctx.shadowColor = col;
        ctx.stroke();
        if (Math.random() < branchProb) {
          const bx = midX + (Math.random() - 0.5) * 80;
          const by = midY + Math.random() * 60;
          drawLightningBolt(midX, midY, bx, by, branches - 1, branchProb * 0.7, col, alpha * 0.6);
        }
        drawLightningBolt(x1, y1, midX, midY, branches - 1, branchProb * 0.5, col, alpha * 0.7);
        drawLightningBolt(midX, midY, x2, y2, branches - 1, branchProb * 0.5, col, alpha * 0.7);
      }
      _gboLtTimer = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.55) {
          const startX = Math.random() * canvas.width;
          const startY = 0;
          const endX   = startX + (Math.random() - 0.5) * 120;
          const endY   = 100 + Math.random() * (canvas.height * 0.5);
          const alpha  = 0.3 + Math.random() * 0.5;
          drawLightningBolt(startX, startY, endX, endY, 5, 0.6, color, alpha);
        }
        if (Math.random() < 0.25) {
          const sx = Math.random() * canvas.width;
          drawLightningBolt(sx, canvas.height, sx + (Math.random()-0.5)*80, canvas.height * 0.6, 4, 0.5, color, 0.3 + Math.random()*0.35);
        }
      }, 120);
    }
    function _gboSpawnParticles(color) {
      const wrap = document.getElementById('gboParticles');
      if (!wrap) return;
      wrap.innerHTML = '';
      const colors = [color, '#FFD700', '#ffffff', 'rgba(255,215,0,0.6)', 'rgba(255,200,0,0.4)'];
      const count = 28;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'gbo-fp';
        const size = 2 + Math.random() * 5;
        const dur  = 3 + Math.random() * 5;
        const del  = Math.random() * 4;
        const tx   = (Math.random() - 0.5) * 200;
        const ty   = -(60 + Math.random() * 150);
        el.style.cssText = [
          `width:${size}px`, `height:${size}px`,
          `background:${colors[i % colors.length]}`,
          `left:${Math.random() * 100}%`,
          `top:${20 + Math.random() * 80}%`,
          `animation-duration:${dur}s`,
          `animation-delay:${del}s`,
          `box-shadow:0 0 ${size * 2}px ${colors[i % colors.length]}`,
          `--tx:${tx}px`, `--ty:${ty}px`,
        ].join(';');
        wrap.appendChild(el);
      }
    }
    (function _bgChartAnimate() {
      const barsEl = document.getElementById('bgChartBars');
      if (!barsEl) return;
      function randomizeBars() {
        const fps  = barsEl.querySelectorAll('.bg-fps');
        const ping = barsEl.querySelectorAll('.bg-ping');
        fps.forEach(b  => { b.style.height  = (55 + Math.random() * 40) + '%'; });
        ping.forEach(b => { b.style.height  = (10 + Math.random() * 30) + '%'; });
        const fpsEl = document.getElementById('bgFps');
        const pingEl = document.getElementById('bgPing');
        if (fpsEl)  fpsEl.textContent  = 50 + Math.floor(Math.random() * 30);
        if (pingEl) pingEl.textContent = 18 + Math.floor(Math.random() * 25);
      }
      randomizeBars();
      setInterval(randomizeBars, 2000);
    })();