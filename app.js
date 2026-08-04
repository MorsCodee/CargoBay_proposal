/* ==========================================================================
   CARGOBAY ASSISTANT — APP CONTROLLER
   ========================================================================== */

(function () {
  /* ── Particle Generator ── */
  function spawnParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const COLORS = ['#f97316', '#22d3ee', '#a78bfa', '#fb923c'];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left        = Math.random() * 100 + 'vw';
      p.style.width       = (Math.random() * 2 + 1.5) + 'px';
      p.style.height      = p.style.width;
      p.style.background  = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.style.animationDuration = (Math.random() * 14 + 10) + 's';
      p.style.animationDelay   = (Math.random() * 12) + 's';
      container.appendChild(p);
    }
  }

  /* ── Chat state ── */
  const feed    = () => document.getElementById('chat-feed');
  const input   = () => document.getElementById('chat-input');
  const sendBtn = () => document.getElementById('send-btn');
  let isBusy = false;

  /* ── Helpers ── */
  function scrollToBottom() {
    const f = feed();
    if (f) f.scrollTop = f.scrollHeight;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatText(str) {
    // Already has some HTML from engine (bold, em tags)
    // Just handle newlines
    return str.replace(/\n/g, '<br>');
  }

  /* ── Append a message row to the feed ── */
  function appendMessage(role, htmlContent, isRisk) {
    const row = document.createElement('div');
    row.className = 'msg-row ' + role;

    if (role === 'assistant') {
      const av = document.createElement('div');
      av.className = 'msg-avatar-sm';
      av.textContent = 'CB';
      row.appendChild(av);
    }

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble' + (isRisk ? ' is-risk' : '');

    if (isRisk) {
      const badge = document.createElement('div');
      badge.className = 'risk-label';
      badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Route Delay Risk Detected';
      bubble.appendChild(badge);
    }

    const content = document.createElement('div');
    content.innerHTML = htmlContent;
    bubble.appendChild(content);

    row.appendChild(bubble);
    feed().appendChild(row);
    scrollToBottom();
    return row;
  }

  /* ── Typing indicator ── */
  function showTyping() {
    const row = document.createElement('div');
    row.className = 'typing-row';
    row.id = 'typing-row';

    const av = document.createElement('div');
    av.className = 'msg-avatar-sm';
    av.textContent = 'CB';

    const bub = document.createElement('div');
    bub.className = 'typing-bubble';
    bub.innerHTML = '<div class="td"></div><div class="td"></div><div class="td"></div>';

    row.appendChild(av);
    row.appendChild(bub);
    feed().appendChild(row);
    scrollToBottom();
  }

  function hideTyping() {
    const row = document.getElementById('typing-row');
    if (row) row.remove();
  }

  /* ── Send a prompt ── */
  function send(text) {
    if (isBusy || !text.trim()) return;
    isBusy = true;

    // Disable input while processing
    input().disabled = true;
    sendBtn().disabled = true;

    // Append user message
    appendMessage('user', escapeHtml(text.trim()), false);
    input().value = '';

    // Show typing
    showTyping();

    // Simulate realistic delay
    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      hideTyping();

      // Get AI response
      const res = window.cbEngine.respond(text);
      appendMessage('assistant', formatText(res.text), res.isRisk);

      // Re-enable
      input().disabled = false;
      sendBtn().disabled = false;
      input().focus();
      isBusy = false;
    }, delay);
  }

  /* ── Public sendPrompt called by chips ── */
  window.sendPrompt = function (text) {
    if (isBusy) return;
    send(text);
  };

  /* ── Initial greeting on load ── */
  function showInitialGreeting() {
    const greeting = {
      text: `Hello & Welcome! 👋 I'm the <strong>CargoBay Assistant</strong> 🇨🇭\n\nI provide **simple & direct shipping answers**:\n\n• 💰 <strong>Freight Prices:</strong> Air, Sea & Road cost estimates worldwide\n• ⚡ <strong>Fastest Routes:</strong> Best way to ship your cargo quickly\n• ⚠️ <strong>Delay Alerts:</strong> Red Sea & Hormuz route warnings\n• 📋 <strong>Customs Help:</strong> Simple document checklist\n\n<em>Ask me anything in simple words: e.g., "How much to ship 100kg from Pakistan to UK?" or "Fastest route from China to USA?"</em>`,
      isRisk: false
    };
    appendMessage('assistant', formatText(greeting.text), greeting.isRisk);
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    spawnParticles();
    showInitialGreeting();

    const form = document.getElementById('chat-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        send(input().value);
      });
    }

    // Allow Enter key (form submit handles it already)
    // Extra: animate input on focus
    const inp = input();
    if (inp) {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          send(inp.value);
        }
      });
    }
  });
})();
