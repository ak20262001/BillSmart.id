const fs = require('fs');
let html = fs.readFileSync('indexASLI.html', 'utf8');

// Strip Firebase module
html = html.replace(/<script type="module">[\s\S]*?<\/script>/, '');

// Inject apiFetch and token auth at start of custom scripts
html = html.replace(/(<script>[\s\S]*?)(const menuItems|\/\/ DATA MOCKUP)/i, \
    // --- API & Auth Logic Mapped ---
    const token = localStorage.getItem('bs_token') || localStorage.getItem('token');
    if (!token) window.location.replace('login.html');
    
    async function apiFetch(url, method='GET', body=null) {
        const opts = { method, headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' } };
        if (body) opts.body = JSON.stringify(body);
        const r = await fetch(url, opts);
        if (r.status === 401) { localStorage.clear(); window.location.replace('login.html'); throw new Error('Unauthorized'); }
        return r.json();
    }

    // Attempted mock/mapping wrappers to prevent Firebase crash:
    window.db = {}; 
    window.onSnapshot = () => {}; 
    window.collection = () => {};
    \);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Processed indexASLI.html -> index.html');
