const loginSection = document.querySelector("[data-view='login']");
const dashboardSection = document.querySelector("[data-view='dashboard']");
const loginForm = document.querySelector('#login-form');
const logoutBtn = document.querySelector('#logout-btn');
const adminUser = document.querySelector('[data-admin-user]');
const inquiryList = document.querySelector('[data-inquiry-list]');

const statusLabels = {
  new: '신규',
  in_progress: '진행중',
  completed: '완료',
};

function escapeHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function checkSession() {
  try {
    const response = await fetch('/api/admin/session');
    if (!response.ok) throw new Error('세션을 확인할 수 없습니다.');
    const data = await response.json();
    if (data.authenticated) {
      showDashboard(data.username);
      fetchInquiries();
    } else {
      showLogin();
    }
  } catch (error) {
    console.error(error);
    showLogin();
  }
}

function showLogin() {
  loginSection.hidden = false;
  dashboardSection.hidden = true;
  adminUser.textContent = '로그인 필요';
}

function showDashboard(username) {
  loginSection.hidden = true;
  dashboardSection.hidden = false;
  adminUser.textContent = `${username}님`;
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const feedback = loginForm.querySelector('.form-feedback');
    feedback.textContent = '로그인 중입니다...';
    feedback.style.color = 'var(--muted)';

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '로그인에 실패했습니다.');
      }
      feedback.textContent = data.message;
      feedback.style.color = 'var(--secondary)';
      showDashboard(data.username || '관리자');
      fetchInquiries();
    } catch (error) {
      feedback.textContent = error.message;
      feedback.style.color = 'var(--accent)';
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('/admin/logout', { method: 'POST' });
    } finally {
      showLogin();
    }
  });
}

async function fetchInquiries() {
  try {
    const response = await fetch('/api/admin/inquiries');
    if (!response.ok) {
      if (response.status === 401) {
        showLogin();
        return;
      }
      throw new Error('문의 목록을 불러오지 못했습니다.');
    }
    const data = await response.json();
    renderInquiries(data.inquiries || []);
  } catch (error) {
    console.error(error);
  }
}

function renderInquiries(inquiries) {
  if (!inquiryList) return;
  if (inquiries.length === 0) {
    inquiryList.innerHTML = `<tr><td colspan="8">아직 접수된 문의가 없습니다.</td></tr>`;
    return;
  }

  inquiryList.innerHTML = inquiries
    .map((item) => {
      const created = new Date(item.created_at).toLocaleString('ko-KR');
      const note = escapeHtml(item.admin_note || '');
      const messageHtml = escapeHtml(item.message).replace(/\n/g, '<br />');
      return `
        <tr data-id="${item.id}">
          <td>#${item.id}</td>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.phone)}</td>
          <td>${messageHtml}</td>
          <td>
            <span class="status-pill status-${item.status}">
              ${statusLabels[item.status] || item.status}
            </span>
          </td>
          <td>
            <div class="admin-actions">
              <select name="status" data-field="status">
                ${Object.entries(statusLabels)
                  .map(
                    ([value, label]) => `
                      <option value="${value}" ${
                      value === item.status ? 'selected' : ''
                    }>${label}</option>
                    `
                  )
                  .join('')}
              </select>
              <textarea name="admin_note" data-field="admin_note" placeholder="메모를 입력하세요">${note}</textarea>
              <button type="button" data-action="update">업데이트</button>
            </div>
          </td>
          <td>${created}</td>
          <td>${new Date(item.updated_at).toLocaleString('ko-KR')}</td>
        </tr>
      `;
    })
    .join('');
}

inquiryList?.addEventListener('click', async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.action !== 'update') return;

  const row = target.closest('tr');
  if (!row) return;
  const id = row.dataset.id;
  if (!id) return;

  const statusSelect = row.querySelector('[data-field="status"]');
  const noteField = row.querySelector('[data-field="admin_note"]');
  const payload = {
    status: statusSelect?.value,
    admin_note: noteField?.value ?? '',
  };

  target.textContent = '저장 중...';
  target.disabled = true;

  try {
    const response = await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 401) {
        showLogin();
        return;
      }
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || '업데이트에 실패했습니다.');
    }
    await fetchInquiries();
  } catch (error) {
    alert(error.message);
  } finally {
    target.textContent = '업데이트';
    target.disabled = false;
  }
});

checkSession();

setInterval(() => {
  if (!dashboardSection.hidden) {
    fetchInquiries();
  }
}, 15000);
