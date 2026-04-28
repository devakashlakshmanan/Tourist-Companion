const { useState, useEffect, useRef, useMemo } = React;

// --- App Entry ---
const App = () => {
    const [view, setView] = useState('login');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [initialAiMessage, setInitialAiMessage] = useState(null);
    const [mapTarget, setMapTarget] = useState(null);
    const [activeUser, setActiveUser] = useState('Traveler');

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
            const savedUsr = localStorage.getItem('username');
            if (savedUsr) setActiveUser(savedUsr);
        }
    }, []);

    const login = (usernameParam) => {
        setIsLoggedIn(true);
        setActiveUser(usernameParam || 'Traveler');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', usernameParam || 'Traveler');
        setView('destinations');
    };
    const logout = () => { setIsLoggedIn(false); localStorage.removeItem('isLoggedIn'); localStorage.removeItem('username'); setView('login'); };
    const askAi = (msg) => { setInitialAiMessage(msg); setView('ai'); };
    const openMap = (dest) => { setMapTarget(dest); setView('maps'); };

    if (!isLoggedIn || view === 'login') return <Login onLogin={login} />;

    return (
        <div className="app-layout">
            <Sidebar view={view} setView={setView} onLogout={logout} />
            <main className="main-content">
                <header className="top-header">
                    <h1>{view === 'ai' ? 'Tourist AI' : view.charAt(0).toUpperCase() + view.slice(1)}</h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '20px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <span className="material-icons-round" style={{ fontSize: '1.2rem', color: '#10b981' }}>account_circle</span>
                            {activeUser}
                        </div>
                    </div>
                </header>
                <div className="page-content">
                    {view === 'destinations' && <Destinations onAskAi={askAi} onOpenMap={openMap} />}
                    {view === 'overview' && <Overview />}
                    {view === 'ai' && <AIGuide initMsg={initialAiMessage} clearMsg={() => setInitialAiMessage(null)} />}
                    {view === 'planner' && <TripPlanner />}
                    {view === 'visa' && <VisaInfo />}
                    {view === 'weather' && <Weather />}
                    {view === 'festivals' && <Festivals setView={setView} />}
                    {view === 'community' && <Community />}
                    {view === 'safety' && <Safety />}
                    {view === 'food' && <FoodGuide />}
                    {view === 'transport' && <TransportGuide />}
                    {view === 'currency' && <CurrencyConverter />}
                    {view === 'hotels' && <HotelBooking />}
                    {view === 'maps' && <TouristMap targetDest={mapTarget} />}
                </div>
            </main>
        </div>
    );
};

const GoogleAuthPopup = ({ onSelect, onClose }) => {
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(2px)' }}>
            <div style={{ background: 'white', width: '400px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', overflow: 'hidden', animation: 'fadeIn 0.2s ease-out' }}>
                <div style={{ padding: '2rem 2rem 1rem', textAlign: 'center' }}>
                    <svg viewBox="0 0 48 48" width="40px" height="40px" style={{ margin: '0 auto 1rem' }}><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '500', color: '#202124', marginBottom: '0.5rem' }}>Sign in with Google</h2>
                    <p style={{ color: '#5f6368', fontSize: '0.9rem' }}>Choose an account to continue to Tourist Companion</p>
                </div>
                <div style={{ borderTop: '1px solid #dadce0', borderBottom: '1px solid #dadce0', padding: '0.5rem 0' }}>
                    <div style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => onSelect('Alex Traveler')}>
                        <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#1d4ed8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '1.2rem' }}>A</div>
                        <div style={{ textAlign: 'left' }}><div style={{ fontWeight: '500', color: '#3c4043', fontSize: '0.95rem' }}>Alex Traveler</div><div style={{ color: '#5f6368', fontSize: '0.8rem' }}>alex.explorer@gmail.com</div></div>
                    </div>
                    <div style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => onSelect('Jane Doe')}>
                        <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#b91c1c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '1.2rem' }}>J</div>
                        <div style={{ textAlign: 'left' }}><div style={{ fontWeight: '500', color: '#3c4043', fontSize: '0.95rem' }}>Jane Doe</div><div style={{ color: '#5f6368', fontSize: '0.8rem' }}>jane.doe@gmail.com</div></div>
                    </div>
                </div>
                <div style={{ padding: '1rem 2rem', textAlign: 'right' }}>
                    <button style={{ background: 'none', border: 'none', color: '#1a73e8', fontWeight: '500', cursor: 'pointer', padding: '0.5rem 1rem' }} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showGoogleAuth, setShowGoogleAuth] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Strict credential validation logic
        if (email === 'traveler@example.com' && password === '123456') {
            onLogin('Traveler');
        } else if (email === 'admin@example.com' && password === 'admin') {
            onLogin('Admin');
        } else {
            setError('Invalid credentials. Hint: Try traveler@example.com / 123456');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(79, 70, 229, 0.8)), url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80") center/cover no-repeat', alignItems: 'center', justifyContent: 'center' }}>
            {showGoogleAuth && <GoogleAuthPopup onSelect={(usr) => onLogin(usr)} onClose={() => setShowGoogleAuth(false)} />}
            <div style={{ background: 'white', padding: '3rem', borderRadius: '1.5rem', width: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--sidebar-bg) 0%, var(--primary) 100%)', color: 'white', width: '70px', height: '70px', borderRadius: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 15px -3px rgba(79,70,229,0.3)' }}>
                    <span className="material-icons-round" style={{ fontSize: '2.5rem' }}>flight_takeoff</span>
                </div>
                <h1 style={{ marginBottom: '0.5rem', fontSize: '1.8rem', color: 'var(--text-primary)' }}>Tourist Companion - India's Virtual Tourist Guide</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>Enter your credentials to access the portal</p>

                {error && <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.8rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '500' }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email or Username</label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none' }} placeholder="traveler@example.com" />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.95rem', outline: 'none' }} placeholder="••••••••" />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem', fontSize: '1rem' }}>Secure Login</button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                    <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '600' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                </div>

                <button type="button" className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', padding: '0.9rem', fontSize: '0.95rem' }} onClick={() => setShowGoogleAuth(true)}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

const Sidebar = ({ view, setView, onLogout }) => {
    const sections = [
        { title: 'MAIN', links: [{ id: 'destinations', i: 'map', l: 'Explore' }, { id: 'overview', i: 'dashboard', l: 'Dashboard' }, { id: 'ai', i: 'smart_toy', l: 'AI Assistant' }, { id: 'planner', i: 'route', l: 'Trip Planner' }, { id: 'visa', i: 'fact_check', l: 'Visa Info' }, { id: 'maps', i: 'navigation', l: 'Live Maps' }] },
        { title: 'DISCOVER', links: [{ id: 'weather', i: 'cloud', l: 'Weather' }, { id: 'festivals', i: 'celebration', l: 'Festivals' }, { id: 'hotels', i: 'bed', l: 'Hotel Booking' }, { id: 'community', i: 'groups', l: 'Community Forum' }] },
        { title: 'BONUS TOOLS', links: [{ id: 'food', i: 'restaurant', l: 'Food Guide' }, { id: 'transport', i: 'directions_bus', l: 'Transport' }, { id: 'currency', i: 'currency_exchange', l: 'Currency' }] }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header"><div className="sidebar-logo"><span className="material-icons-round">explore</span></div><div><h2 style={{ fontSize: '1.1rem' }}>Tourist Companion</h2><p style={{ fontSize: '0.7rem', color: 'gray' }}>Professional Edition</p></div></div>
            {sections.map(s => (
                <div key={s.title} style={{ marginBottom: '2rem', padding: '0 1rem' }}>
                    <div className="sidebar-section-title">{s.title}</div>
                    {s.links.map(l => <a key={l.id} className={`nav-link ${view === l.id ? 'active' : ''}`} onClick={() => setView(l.id)}><span className="material-icons-round">{l.i}</span> {l.l}</a>)}
                </div>
            ))}
            <a className="nav-link" onClick={onLogout} style={{ color: 'var(--danger)', marginTop: 'auto', padding: '2rem' }}><span className="material-icons-round">logout</span> Disconnect</a>
        </aside>
    );
};

// --- 1. DESTINATIONS ---
const Destinations = ({ onAskAi, onOpenMap }) => {
    const [dests, setDests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ q: '', b: 'All', s: 'All', t: 'All' });
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => { fetch('http://localhost:5000/api/destinations').then(r => r.json()).then(d => { setDests(d); setLoading(false); }); }, []);

    const filtered = dests.filter(d =>
        (filters.b === 'All' || d.budget_est === filters.b) &&
        (filters.s === 'All' || d.season === filters.s) &&
        (filters.t === 'All' || d.type === filters.t) &&
        (d.name.toLowerCase().includes(filters.q.toLowerCase()) || d.location.toLowerCase().includes(filters.q.toLowerCase()))
    );

    const paginated = filtered.slice((page - 1) * 12, page * 12);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading robust destination matrix...</div>;

    return (
        <div>
            <div className="filter-dashboard">
                <div className="search-wrapper">
                    <span className="material-icons-round">search</span>
                    <input type="text" placeholder="Search by Monument, City, or Category..." value={filters.q} onChange={e => { setFilters({ ...filters, q: e.target.value }); setPage(1); }} />
                </div>
                <div className="filter-controls">
                    <div className="filter-block"><h4>Category</h4><div className="chip-row">{['All', 'Heritage', 'Nature', 'Spiritual', 'Adventure'].map(t => <button key={t} className={`chip ${filters.t === t ? 'active' : ''}`} onClick={() => { setFilters({ ...filters, t }); setPage(1); }}>{t}</button>)}</div></div>
                    <div className="filter-block"><h4>Budget Level</h4><div className="chip-row">{['All', 'Budget', 'Mid-range', 'Luxury'].map(b => <button key={b} className={`chip ${filters.b === b ? 'active' : ''}`} onClick={() => { setFilters({ ...filters, b }); setPage(1); }}>{b}</button>)}</div></div>
                    <div className="filter-block"><h4>Season</h4><div className="chip-row">{['All', 'Summer', 'Winter', 'Monsoon', 'All-Year'].map(s => <button key={s} className={`chip ${filters.s === s ? 'active' : ''}`} onClick={() => { setFilters({ ...filters, s }); setPage(1); }}>{s}</button>)}</div></div>
                </div>
            </div>

            <div className="cards-grid">
                {paginated.map(d => (
                    <div key={d.id} className="destination-card" onClick={() => setSelected(d)}>
                        <div className="dest-image-placeholder" style={{ background: `linear-gradient(135deg, hsl(${(d.id * 137) % 360}, 85%, 60%), hsl(${(d.id * 137 + 45) % 360}, 90%, 50%))` }}>
                            {d.trending && <div className="dest-badge-top"><span className="material-icons-round" style={{ fontSize: '1rem', color: '#f97316' }}>local_fire_department</span> Trending</div>}
                            {d.hidden_gem && <div className="dest-badge-top" style={{ color: '#059669' }}><span className="material-icons-round" style={{ fontSize: '1rem' }}>diamond</span> Hidden Gem</div>}
                            <span className="material-icons-round" style={{ fontSize: '4rem', color: 'rgba(255, 255, 255, 0.95)', textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>{d.icon}</span>
                        </div>
                        <div className="dest-content">
                            <h3 className="dest-title">{d.name}</h3>
                            <p className="dest-desc">{d.description}</p>
                            <div className="dest-grid-info">
                                <div className="info-row"><span className="material-icons-round">location_on</span> {d.location}</div>
                                <div className="info-row"><span className="material-icons-round">calendar_month</span> {d.days} Days</div>
                                <div className="info-row"><span className="material-icons-round">payments</span> {d.budget_est}</div>
                                <div className="info-row"><span className="material-icons-round">star</span> {d.rating}</div>
                            </div>
                            <button className="btn-secondary" style={{ width: '100%' }}>View Comprehensive Intel</button>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length > 0 && Math.ceil(filtered.length / 12) > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
                    <button className="btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>&laquo; Previous</button>
                    <span style={{ fontWeight: 'bold', color: 'var(--sidebar-bg)' }}>Page {page} of {Math.ceil(filtered.length / 12)}</span>
                    <button className="btn-secondary" disabled={page === Math.ceil(filtered.length / 12)} onClick={() => setPage(page + 1)}>Next &raquo;</button>
                </div>
            )}

            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)}>
                    <div className="modal-window" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-hero">
                            <button className="modal-close" onClick={() => setSelected(null)}><span className="material-icons-round">close</span></button>
                            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '1rem', display: 'inline-block' }}>{selected.type} Experience</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>{selected.name}</h2>
                            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{selected.location}</p>
                        </div>
                        <div className="modal-body-scroll">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <section>
                                    <h3 className="modal-h3"><span className="material-icons-round" style={{ color: 'var(--primary)' }}>info</span> Overview</h3>
                                    <p>{selected.description}</p>
                                    <p style={{ marginTop: '1rem' }}><strong>📌 Google Maps Reference:</strong> {selected.gmaps}</p>
                                    <p><strong>🎯 Nearby Attractions:</strong> {selected.nearby.join(', ')}</p>
                                </section>
                                <section>
                                    <h3 className="modal-h3"><span className="material-icons-round" style={{ color: 'var(--danger)' }}>warning</span> Warning & Safety</h3>
                                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#991b1b' }}>
                                        <strong>Tourist Safety Tip:</strong> {selected.safety_tips}<br /><br />
                                        <strong>Common Mistake:</strong> {selected.mistakes}
                                    </div>
                                </section>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="deep-stats-grid">
                                    <div className="deep-stat"><strong>Nearest Airport</strong><span>{selected.airport}</span></div>
                                    <div className="deep-stat"><strong>Nearest Station</strong><span>{selected.station}</span></div>
                                    <div className="deep-stat"><strong>Road Network</strong><span>{selected.connectivity}</span></div>
                                    <div className="deep-stat"><strong>Local Transport</strong><span>{selected.local_transport}</span></div>
                                    <div className="deep-stat"><strong>Entry Fees</strong><span>{selected.entry_fees}</span></div>
                                    <div className="deep-stat"><strong>Daily Budget</strong><span>{selected.budget_daily}</span></div>
                                    <div className="deep-stat"><strong>Timings</strong><span>{selected.opening_hours}</span></div>
                                </div>
                                <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setSelected(null); onAskAi(`Help me plan a trip to ${selected.name}`); }}>
                                    Plan with AI Assistant
                                </button>
                                <button className="btn-secondary" style={{ marginTop: '0.5rem', background: '#ecfeff', borderColor: '#06b6d4', color: '#0891b2', display: 'flex', justifyContent: 'center', gap: '0.5rem' }} onClick={() => { setSelected(null); onOpenMap(selected); }}>
                                    <span className="material-icons-round" style={{ fontSize: '1.2rem' }}>navigation</span> Start Live Navigation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 2. OVERVIEW DASHBOARD ---
const Overview = () => {
    const pieRef = useRef(null);
    const lineRef = useRef(null);
    const barRef = useRef(null);

    const pieChart = useRef(null);
    const lineChart = useRef(null);
    const barChart = useRef(null);

    useEffect(() => {
        if (pieRef.current) {
            if (pieChart.current) pieChart.current.destroy();
            pieChart.current = new Chart(pieRef.current, {
                type: 'pie',
                data: {
                    labels: ['Heritage & Monuments', 'Nature & Wildlife', 'Spiritual Destinations', 'Adventure & Trekking'],
                    datasets: [{
                        data: [40, 25, 20, 15],
                        backgroundColor: ['#f97316', '#10b981', '#a855f7', '#3b82f6'],
                        hoverOffset: 15,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'right', labels: { font: { family: 'Inter', size: 14 } } } }
                }
            });
        }
        if (lineRef.current) {
            if (lineChart.current) lineChart.current.destroy();
            lineChart.current = new Chart(lineRef.current, {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                        label: 'Foreign Tourist Arrivals (Millions)',
                        data: [10.93, 2.74, 1.52, 6.19, 9.23, 11.50],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
        if (barRef.current) {
            if (barChart.current) barChart.current.destroy();
            barChart.current = new Chart(barRef.current, {
                type: 'bar',
                data: {
                    labels: ['Delhi', 'Maharashtra', 'Tamil Nadu', 'UP', 'Rajasthan'],
                    datasets: [{
                        label: 'Top Visited States (Millions)',
                        data: [28, 25, 22, 19, 15],
                        backgroundColor: '#f59e0b',
                        borderRadius: 4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
        return () => {
            if (pieChart.current) pieChart.current.destroy();
            if (lineChart.current) lineChart.current.destroy();
            if (barChart.current) barChart.current.destroy();
        };
    }, []);

    return (
        <div>
            <div className="hero-banner">
                <h2>India Travel Dashboard</h2>
                <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Macro-level insights for surviving and thriving in the subcontinent.</p>
            </div>
            <div className="snapshot-grid">
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon"><span className="material-icons-round">language</span></div><h3>Country Snapshot</h3></div>
                    <ul className="snap-list">
                        <li><span className="material-icons-round">payments</span> Currency: Indian Rupee (INR). ≈92 INR to 1 USD.</li>
                        <li><span className="material-icons-round">translate</span> Languages: Hindi & English dominant. 22 regional official languages.</li>
                        <li><span className="material-icons-round">schedule</span> Time Zone: IST (UTC +5:30). No daylight saving.</li>
                    </ul>
                </div>
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon" style={{ color: 'var(--accent)', background: 'var(--accent-light)' }}><span className="material-icons-round">sim_card</span></div><h3>Digital Essentials</h3></div>
                    <ul className="snap-list">
                        <li><span className="material-icons-round">power</span> Plugs: Type C, D, and M (230V @ 50Hz). Bring universal adapters.</li>
                        <li><span className="material-icons-round">cell_tower</span> SIM: Airtel/Jio. Requires passport and physical photo upon arrival at airport.</li>
                        <li><span className="material-icons-round">app_shortcut</span> Apps: Uber, Ola (Cabs), Zomato, Swiggy (Food).</li>
                    </ul>
                </div>
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon" style={{ color: 'var(--danger)', background: '#fee2e2' }}><span className="material-icons-round">diversity_3</span></div><h3>Cultural Rules</h3></div>
                    <ul className="snap-list">
                        <li><span className="material-icons-round">do_not_step</span> DO: Remove shoes before entering ANY temple or home.</li>
                        <li><span className="material-icons-round">pan_tool</span> DON'T: Eat or pass objects with your left hand.</li>
                        <li><span className="material-icons-round">checkroom</span> DRESS: Modestly. Cover shoulders and knees outside urban centers.</li>
                    </ul>
                </div>
            </div>

            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Indian Tourism Analytics</h3>
            <div className="cards-grid">
                <div className="snap-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Prime Tourist Attractions</h4>
                    <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                        <canvas ref={pieRef}></canvas>
                    </div>
                </div>
                <div className="snap-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Key Inbound Demographics</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem' }}><span>Europe & UK</span><span>45%</span></div>
                            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px' }}><div style={{ width: '45%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div></div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem' }}><span>North America</span><span>28%</span></div>
                            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px' }}><div style={{ width: '28%', height: '100%', background: '#10b981', borderRadius: '4px' }}></div></div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem' }}><span>Asia Pacific</span><span>18%</span></div>
                            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px' }}><div style={{ width: '18%', height: '100%', background: '#fbbf24', borderRadius: '4px' }}></div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cards-grid" style={{ marginTop: '2rem' }}>
                <div className="snap-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Foreign Tourist Arrivals Trend</h4>
                    <div style={{ height: '250px', width: '100%', position: 'relative' }}>
                        <canvas ref={lineRef}></canvas>
                    </div>
                </div>
                <div className="snap-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Top Visited States</h4>
                    <div style={{ height: '250px', width: '100%', position: 'relative' }}>
                        <canvas ref={barRef}></canvas>
                    </div>
                </div>
            </div>

            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Budget Tier Estimator</h3>
            <table className="modern-table">
                <thead><tr><th>Travel Profile</th><th>Accommodation Type</th><th>Transport Method</th><th>Avg Local Cost / Day</th></tr></thead>
                <tbody>
                    <tr><td><strong>Backpacker</strong></td><td>Hostels / Guesthouses</td><td>Buses, General Train Class</td><td>₹1,000 - ₹2,000</td></tr>
                    <tr><td><strong>Mid-Range</strong></td><td>3-Star Hotels / AirBnB</td><td>AC Trains, Ola/Uber Cabs</td><td>₹3,500 - ₹6,000</td></tr>
                    <tr><td><strong>Luxury</strong></td><td>5-Star Resorts / Heritage Palaces</td><td>Private AC Car / Flights</td><td>₹10,000+</td></tr>
                </tbody>
            </table>

            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Unique Aspects of Indian Tourism</h3>
            <div className="snapshot-grid">
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon" style={{ background: '#fef2f2', color: '#ef4444' }}><span className="material-icons-round">festival</span></div><h3>Land of Festivals</h3></div>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Experience unmatched vibrant celebrations like Diwali, Holi, and Durga Puja which transform entire cities across the nation with light, color, and music.</p>
                </div>
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon" style={{ background: '#ecfdf5', color: '#10b981' }}><span className="material-icons-round">forest</span></div><h3>Incredible Biodiversity</h3></div>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>From the majestic Royal Bengal Tiger in Ranthambore to the one-horned rhinoceros in Kaziranga, India boasts 106 national parks spreading across dramatic terrains.</p>
                </div>
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}><span className="material-icons-round">architecture</span></div><h3>Architectural Marvels</h3></div>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Home to 42 UNESCO World Heritage Sites, including the timeless Taj Mahal, ancient caves of Ajanta & Ellora, and the spectacular temples of Hampi.</p>
                </div>
            </div>

            {/* 1. Travel Advisory & Safety Insights */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Travel Advisory & Safety Insights</h3>
            <div className="snapshot-grid">
                <div className="snap-card" style={{ borderLeft: '4px solid #ef4444' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b' }}><span className="material-icons-round">gavel</span> Safety Level & Scams</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Current Safety Level:</strong> Moderate. Exercise standard precautions.</li>
                        <li><strong>Common Scams:</strong> Unofficial guides, taxi meter tampering, fake train ticket offices. Always book through official channels.</li>
                    </ul>
                </div>
                <div className="snap-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e3a8a' }}><span className="material-icons-round">contact_phone</span> Emergency Contacts</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Police:</strong> 100 or 112 (National Emergency Number)</li>
                        <li><strong>Ambulance:</strong> 102 or 108</li>
                        <li><strong>Tourist Helpline:</strong> 1363 (Multilingual)</li>
                    </ul>
                </div>
                <div className="snap-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#064e3b' }}><span className="material-icons-round">medical_services</span> Health & Weather Risks</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Water:</strong> Drink only sealed bottled or RO-filtered water.</li>
                        <li><strong>Weather:</strong> Heavy monsoons (June-Sept) can cause travel disruptions. Stay hydrated in scorching summer heat (April-June).</li>
                    </ul>
                </div>
            </div>

            {/* 2. Cost of Living Breakdown */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Cost of Living Breakdown</h3>
            <div className="cards-grid">
                <div className="snap-card">
                    <h4><span className="material-icons-round" style={{ fontSize: '1.2rem', verticalAlign: 'middle', color: '#f59e0b' }}>restaurant</span> Food Cost</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Street Food / Local Dhaba:</strong> ₹50 - ₹150 per meal</li>
                        <li><strong>Mid-Range Restaurant:</strong> ₹300 - ₹800 per meal</li>
                        <li><strong>Fine Dining:</strong> ₹1500+ per meal</li>
                    </ul>
                </div>
                <div className="snap-card">
                    <h4><span className="material-icons-round" style={{ fontSize: '1.2rem', verticalAlign: 'middle', color: '#3b82f6' }}>directions_car</span> Transport Cost</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Local Bus / Metro:</strong> ₹10 - ₹50 per trip</li>
                        <li><strong>Auto Rickshaw:</strong> ₹50 - ₹200 (negotiate or use meter/app)</li>
                        <li><strong>Private Cab (Uber/Ola):</strong> ₹200 - ₹500+ depending on distance</li>
                    </ul>
                </div>
                <div className="snap-card">
                    <h4><span className="material-icons-round" style={{ fontSize: '1.2rem', verticalAlign: 'middle', color: '#10b981' }}>hotel</span> Accommodation</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Budget Hostels:</strong> ₹400 - ₹1000 / night</li>
                        <li><strong>Mid-Range Hotels:</strong> ₹1500 - ₹4000 / night</li>
                        <li><strong>Luxury Resorts:</strong> ₹6000+ / night</li>
                    </ul>
                </div>
            </div>
            <div className="snap-card" style={{ marginTop: '1rem', background: '#f8fafc', padding: '1rem' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><span className="material-icons-round" style={{ fontSize: '1.2rem', color: '#8b5cf6' }}>currency_exchange</span> Currency Exchange Tip:</strong> Always carry some cash (rupees) for small vendors, but UPI (digital payments) is widely accepted even by street vendors (though foreigners might need specific wallets linked to their international cards). Exchange currency at authorized dealers, not at airports (due to high fees).
            </div>

            {/* 3. Top Tourist Cities & Highlights */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Top Tourist Cities & Highlights</h3>
            <div className="cards-grid">
                {[
                    { city: 'Delhi', desc: 'The bustling capital showcasing a blend of ancient history and modern metropolis.', time: 'Oct to March', attractions: 'Red Fort, Qutub Minar, India Gate', type: 'Cultural & Historical' },
                    { city: 'Mumbai', desc: 'The city of dreams, home to Bollywood and colonial-era architecture.', time: 'Nov to Feb', attractions: 'Gateway of India, Marine Drive', type: 'Urban & Coastal' },
                    { city: 'Jaipur', desc: 'The Pink City offering majestic forts, vibrant markets, and rich Rajasthani culture.', time: 'Nov to Feb', attractions: 'Amber Fort, Hawa Mahal', type: 'Heritage' },
                    { city: 'Goa', desc: 'Famous for its pristine beaches, laid-back vibe, and Portuguese heritage.', time: 'Nov to Feb', attractions: 'Baga Beach, Basilica of Bom Jesus', type: 'Beach / Leisure' },
                    { city: 'Varanasi', desc: 'One of the oldest living cities, offering a profound spiritual experience on the Ganges.', time: 'Oct to March', attractions: 'Kashi Vishwanath, Dashashwamedh Ghat', type: 'Spiritual' }
                ].map((item, idx) => (
                    <div key={idx} className="snap-card">
                        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{item.city}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{item.desc}</p>
                        <ul className="snap-list" style={{ fontSize: '0.85rem' }}>
                            <li style={{ marginBottom: '0.3rem' }}><strong><span className="material-icons-round" style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: '0.2rem' }}>event</span> Best Time:</strong> {item.time}</li>
                            <li style={{ marginBottom: '0.3rem' }}><strong><span className="material-icons-round" style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: '0.2rem' }}>place</span> Attractions:</strong> {item.attractions}</li>
                            <li><strong><span className="material-icons-round" style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: '0.2rem' }}>category</span> Type:</strong> {item.type}</li>
                        </ul>
                    </div>
                ))}
            </div>

            {/* 4. Transportation Guide */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Transportation Guide</h3>
            <div className="snapshot-grid">
                <div className="snap-card">
                    <h4>Available Modes</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Train:</strong> Extensive network (Indian Railways). Great for long distances.</li>
                        <li><strong>Flight:</strong> Fastest for interstate travel (IndiGo, Air India).</li>
                        <li><strong>Bus:</strong> Good for shorter regional trips (Volvo AC buses).</li>
                        <li><strong>Local:</strong> Metro (in major cities), Auto-rickshaws, and Cabs.</li>
                    </ul>
                </div>
                <div className="snap-card">
                    <h4>Booking Tips</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Trains:</strong> Book via IRCTC. Advance booking is crucial (up to 120 days). Consider Foreign Tourist Quota.</li>
                        <li><strong>Cabs:</strong> Use Uber or Ola apps for fixed transparent pricing to avoid scams.</li>
                    </ul>
                </div>
                <div className="snap-card">
                    <h4>Recommendations</h4>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li>For scenic routes, try toy trains (like Darjeeling Himalayan Railway).</li>
                        <li>Overnight trains (AC classes like 2AC or 3AC) save daytime travel and accommodation costs.</li>
                    </ul>
                </div>
            </div>

            {/* 5. Food & Cuisine Explorer */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Food & Cuisine Explorer</h3>
            <div className="cards-grid">
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon" style={{ background: '#fef3c7', color: '#d97706' }}><span className="material-icons-round">ramen_dining</span></div><h3>Popular Dishes</h3></div>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}><strong>North:</strong> Butter Chicken, Chole Bhature, Biryani.<br /><strong>South:</strong> Dosa, Idli, Sambhar.<br /><strong>Street:</strong> Chaat, Pani Puri, Vada Pav.</p>
                </div>
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><span className="material-icons-round">eco</span></div><h3>Veg vs Non-Veg</h3></div>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>India has a massive vegetarian population. Restaurants clearly mark their food with a Green dot (Veg) or Brown/Red dot (Non-Veg). Distinct pure-veg localities exist.</p>
                </div>
                <div className="snap-card">
                    <div className="snap-header"><div className="snap-icon" style={{ background: '#fee2e2', color: '#dc2626' }}><span className="material-icons-round">health_and_safety</span></div><h3>Safety Tips</h3></div>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Eat at busy places (high turnover). Avoid raw salads or pre-cut fruits from street vendors. Specify spice levels ("no spice" usually still means mild spice).</p>
                </div>
            </div>

            {/* 6. Cultural Do’s & Don’ts (Expanded) */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Cultural Do’s & Don’ts (Expanded)</h3>
            <table className="modern-table">
                <thead><tr><th>Category</th><th>Insights & Rules</th></tr></thead>
                <tbody>
                    <tr><td><strong>Greetings</strong></td><td>Saying "Namaste" with folded hands is highly appreciated. Men shaking hands is common, but wait for a female to initiate a handshake.</td></tr>
                    <tr><td><strong>Dress Code</strong></td><td>Temples require covered shoulders and knees. Women often carry a scarf (dupatta) to cover their heads in Sikh Gurudwaras and some mosques.</td></tr>
                    <tr><td><strong>Tipping</strong></td><td>Not mandatory but appreciated. 5-10% in restaurants (if service charge isn't included). Small tips (₹20-50) for bellboys/porters.</td></tr>
                    <tr><td><strong>Photography</strong></td><td>Always ask permission before photographing locals, especially in rural areas. Do not photograph military installations or inside sanctums of many temples.</td></tr>
                    <tr><td><strong>Public Behavior</strong></td><td>Public displays of affection (kissing) are frowned upon. It's common to see people of the same gender holding hands as a sign of friendship.</td></tr>
                </tbody>
            </table>

            {/* 7. Internet & Connectivity Info */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Internet & Connectivity</h3>
            <div className="snapshot-grid">
                <div className="snap-card">
                    <h4>SIM Cards</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Available at international airports (most convenient) or local shops. You will need your passport, visa copy, and a passport-sized photograph. Activation can take 2-24 hours.</p>
                </div>
                <div className="snap-card">
                    <h4>Providers & Speed</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Top providers are <strong>Airtel</strong> and <strong>Jio</strong>. Both offer excellent 4G/5G coverage. Data is extremely cheap in India (e.g., 1.5GB/day for a month costs around $3-$4).</p>
                </div>
                <div className="snap-card">
                    <h4>WiFi Availability</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Most mid-range to luxury hotels, modern cafes, and major railway stations offer free WiFi. However, having a local SIM with a data pack is highly recommended for navigation.</p>
                </div>
            </div>

            {/* 8. AI Travel Recommendations (Smart Section) */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>AI Travel Recommendations <span style={{ fontSize: '0.8rem', background: '#8b5cf6', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', verticalAlign: 'middle', marginLeft: '0.5rem' }}>SMART</span></h3>
            <div className="cards-grid">
                <div className="snap-card" style={{ borderTop: '4px solid #3b82f6' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="material-icons-round" style={{ color: '#3b82f6' }}>person</span> Solo Traveler</h4>
                    <p style={{ fontSize: '0.85rem', color: 'gray', margin: '0.5rem 0' }}>Focus on safety, community, and exploration.</p>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Route:</strong> The Golden Triangle (Delhi-Agra-Jaipur) + Rajasthan.</li>
                        <li><strong>Pace:</strong> Moderate. Stay in backpacker hostels (Zostel) to meet people.</li>
                        <li><strong>Tip:</strong> Join group walking tours in large cities.</li>
                    </ul>
                </div>
                <div className="snap-card" style={{ borderTop: '4px solid #10b981' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="material-icons-round" style={{ color: '#10b981' }}>family_restroom</span> Family Plan</h4>
                    <p style={{ fontSize: '0.85rem', color: 'gray', margin: '0.5rem 0' }}>Focus on comfort, minimal transit, and diverse activities.</p>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Route:</strong> Kerala (Munnar, Alleppey) or Goa.</li>
                        <li><strong>Pace:</strong> Relaxed. Book private cabs for intercity travel.</li>
                        <li><strong>Tip:</strong> Choose resorts with kid-friendly amenities and pools.</li>
                    </ul>
                </div>
                <div className="snap-card" style={{ borderTop: '4px solid #f59e0b' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="material-icons-round" style={{ color: '#f59e0b' }}>account_balance_wallet</span> Budget Plan</h4>
                    <p style={{ fontSize: '0.85rem', color: 'gray', margin: '0.5rem 0' }}>Maximize experiences while minimizing expenditure.</p>
                    <ul className="snap-list" style={{ marginTop: '0.8rem' }}>
                        <li><strong>Route:</strong> Varanasi, Rishikesh, Dharamshala, Pushkar.</li>
                        <li><strong>Pace:</strong> Slow. Use sleeper class trains and local buses.</li>
                        <li><strong>Tip:</strong> Eat at local dhabas and stay in guesthouses.</li>
                    </ul>
                </div>
            </div>

            {/* 9. Festivals & Events Preview */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Festivals & Events Preview</h3>
            <table className="modern-table">
                <thead><tr><th>Festival</th><th>Usual Time</th><th>Vibe & Tourist Impact</th></tr></thead>
                <tbody>
                    <tr><td><strong>Diwali</strong></td><td>Oct / Nov</td><td>Festival of Lights. Nationwide. Homes lit up, fireworks. High pollution in the North. Public transport crowded.</td></tr>
                    <tr><td><strong>Holi</strong></td><td>March</td><td>Festival of Colors. Nationwide. Vibrant street parties. Keep cameras waterproofed. Advised to celebrate in safe hotel environments.</td></tr>
                    <tr><td><strong>Durga Puja</strong></td><td>Oct</td><td>Major in West Bengal (Kolkata). Elaborate pandals (stages) and artistic idols. Crowded streets but incredibly cultural.</td></tr>
                    <tr><td><strong>Pushkar Camel Fair</strong></td><td>Nov</td><td>Rajasthan. Massive trading fair, cultural events, hot air balloons. Accommodation prices peak locally.</td></tr>
                </tbody>
            </table>

            {/* 10. Quick Travel Checklist */}
            <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Quick Travel Checklist</h3>
            <div className="snap-card" style={{ background: '#f8fafc', marginBottom: '2rem' }}>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}><span className="material-icons-round" style={{ color: '#10b981' }}>check_circle</span> Passport validity (&gt;6 months)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}><span className="material-icons-round" style={{ color: '#10b981' }}>check_circle</span> e-Visa approved & printed</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}><span className="material-icons-round" style={{ color: '#10b981' }}>check_circle</span> Comprehensive travel insurance</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}><span className="material-icons-round" style={{ color: '#10b981' }}>check_circle</span> Initial local currency (Cash)</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}><span className="material-icons-round" style={{ color: '#10b981' }}>check_circle</span> Universal power adapter</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}><span className="material-icons-round" style={{ color: '#10b981' }}>check_circle</span> Offline maps & translator app</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}><span className="material-icons-round" style={{ color: '#10b981' }}>check_circle</span> Basic first-aid & meds</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}><span className="material-icons-round" style={{ color: '#10b981' }}>check_circle</span> Emergency contacts saved</li>
                </ul>
            </div>
        </div>
    );
};

// --- 3. AI GUIDE ---
const AIGuide = ({ initMsg, clearMsg }) => {
    const [msgs, setMsgs] = useState([{ id: 1, type: 'ai', text: 'Hello! I am your AI Tourist Companion. What region of India are you exploring?' }]);
    const [inp, setInp] = useState('');
    const [loading, setLoading] = useState(false);
    const endR = useRef(null);

    useEffect(() => { if (endR.current) endR.current.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

    const send = async (msg) => {
        if (!msg.trim() || loading) return;
        setInp(''); setLoading(true);
        setMsgs(p => [...p, { id: Date.now(), type: 'usr', text: msg }]);
        try {
            const r = await fetch('http://localhost:5000/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, history: msgs }) });
            const d = await r.json();
            setMsgs(p => [...p, { id: Date.now() + 1, type: 'ai', text: d.reply }]);
        } catch (e) { setMsgs(p => [...p, { id: Date.now() + 1, type: 'ai', text: 'Connection failed.' }]); }
        finally { setLoading(false); }
    }

    useEffect(() => { if (initMsg) { send(initMsg); clearMsg(); } }, [initMsg]);

    return (
        <div className="chat-ui">
            <div className="chat-prompts">
                <button className="chip" onClick={() => send('Plan 3 days in Goa')}>Plan 3 days in Goa</button>
                <button className="chip" onClick={() => send('Safe places for solo female travelers')}>Solo Female Travel Tips</button>
                <button className="chip" onClick={() => send('Cheap hotels in Chennai')}>Chennai Budget Help</button>
                <button className="chip" style={{ color: '#ef4444', borderColor: '#fca5a5', background: '#fef2f2' }} onClick={() => send('EMERGENCY: I lost my passport in India, what should I do?')}>Lost Passport Protocol</button>
            </div>
            <div className="chat-messages">
                {msgs.map(m => (
                    <div key={m.id} className={`msg-bubble ${m.type === 'ai' ? 'msg-ai' : 'msg-usr'}`}>{m.text}</div>
                ))}
                {loading && <div className="msg-bubble msg-ai" style={{ fontStyle: 'italic' }}>Generating response using India Tourism Matrix...</div>}
                <div ref={endR} />
            </div>
            <div className="chat-input-bar">
                <button className="btn-secondary" style={{ padding: '0.8rem', borderRadius: '50%', background: '#f8fafc', border: '1px solid #cbd5e1' }} onClick={() => alert("Voice input mockup triggered. Waiting for microphone permission...")}>
                    <span className="material-icons-round" style={{ color: 'var(--primary)' }}>mic</span>
                </button>
                <input type="text" value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(inp)} placeholder="Ask about safety, routes, or local food..." />
                <button className="btn-primary" onClick={() => send(inp)}><span className="material-icons-round">send</span></button>
            </div>
        </div>
    );
};

// --- 4. SMART TRIP PLANNER 2.0 ---

const TIPS = [
    "Carry a reusable filtered water bottle to stay safely hydrated.",
    "Dress modestly (covering shoulders/knees) when visiting religious sites.",
    "Keep small denomination rupee notes for local transport and tips.",
    "Download regional offline Google Maps just in case network drops.",
    "Apply sunscreen frequently even if it looks cloudy or overcast.",
    "Negotiate prices politely but firmly at unpriced local markets.",
    "Book train tickets natively via the IRCTC app."
];

const TripPlanner = () => {
    const [destinations, setDestinations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({ state: '', days: 3, budget: 'Mid-range', vibe: 'Culture & Heritage', style: 'Balanced' });
    const [itin, setItin] = useState(null);
    const pdfRef = useRef();

    useEffect(() => {
        fetch('http://localhost:5000/api/destinations')
            .then(res => res.json())
            .then(d => {
                setDestinations(d);
                // Extract unique locations from the 300+ item DB
                const locs = [...new Set(d.map(item => item.location))].sort();
                setLocations(locs);
                if (locs.length > 0) setForm(prev => ({ ...prev, state: locs[0] }));
            })
            .catch(err => console.error("Could not fetch destinations:", err));
    }, []);

    const generate = () => {
        if (!form.state || destinations.length === 0) return;

        let plan = [];
        let stateDests = destinations.filter(d => d.location === form.state);

        const shuffle = (array) => {
            let arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };

        stateDests = shuffle(stateDests);

        // Contextually group places 
        let mPool = stateDests.filter(d => ['Nature', 'Spiritual', 'Heritage'].includes(d.type));
        let aPool = stateDests.filter(d => ['Heritage', 'Museum', 'Shopping'].includes(d.type));
        let ePool = stateDests.filter(d => ['Market', 'Shopping', 'Nightlife', 'Leisure', 'Spiritual'].includes(d.type));

        if (mPool.length === 0) mPool = [...stateDests];
        if (aPool.length === 0) aPool = [...stateDests];
        if (ePool.length === 0) ePool = [...stateDests];

        let usedIds = new Set();
        let currentTips = shuffle([...TIPS]);

        const getUniqueDest = (preferredPool) => {
            for (let d of preferredPool) {
                if (!usedIds.has(d.id)) {
                    usedIds.add(d.id);
                    return d;
                }
            }
            for (let d of stateDests) {
                if (!usedIds.has(d.id)) {
                    usedIds.add(d.id);
                    return d;
                }
            }
            const randomD = stateDests[Math.floor(Math.random() * stateDests.length)];
            return randomD || null;
        };

        for (let i = 1; i <= form.days; i++) {
            let mDest = getUniqueDest(mPool);
            let aDest = getUniqueDest(aPool);
            let eDest = getUniqueDest(ePool);

            if (currentTips.length === 0) currentTips = shuffle([...TIPS]);
            let tip = currentTips.pop();

            const formatAct = (dest, timeLabel) => {
                if (!dest) return null;
                let desc = dest.description;
                if (form.style === 'Packed') desc += ` (Recommended intense pace)`;
                if (form.style === 'Relaxed') desc = `Leisurely explore: ${desc}`;

                return {
                    name: dest.name,
                    icon: dest.icon || 'place',
                    desc: desc,
                    type: dest.type,
                    insight: dest.safety_tips || `Best positioned for ${timeLabel} visits.`
                };
            };

            let mAct = formatAct(mDest, 'Morning');
            let aAct = formatAct(aDest, 'Afternoon');
            let eAct = formatAct(eDest, 'Evening');

            if (form.style === 'Relaxed') {
                if (i % 2 === 0) aAct = { name: 'Resort / Stay Leisure', icon: 'spa', desc: `Rest and leisure at your ${form.budget} accommodation. Escape the peak afternoon heat.`, type: 'Relaxation', insight: 'Pace your journey safely.' };
                if (i % 3 === 0) mAct = { name: 'Late Leisure Start', icon: 'free_breakfast', desc: `Enjoy a heavy local breakfast before slowly venturing out.`, type: 'Relaxation', insight: 'Conserve energy for deeper evening explorations.' };
            }

            plan.push({ day: i, m: mAct, a: aAct, e: eAct, tip });
        }

        let basePerDay = form.budget === 'Budget' ? 2200 : form.budget === 'Mid-range' ? 5500 : 16000;
        let total = basePerDay * form.days;

        let breakdown = {
            acc: Math.round(total * 0.40),
            food: Math.round(total * 0.25),
            trans: Math.round(total * 0.15),
            act: Math.round(total * 0.20),
            total
        };

        setItin({ form, plan, costConfig: breakdown });
    }

    const exportPDF = async () => {
        const canvas = await html2canvas(pdfRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = pdfWidth / imgWidth;
        const scaledHeight = imgHeight * ratio;

        let heightLeft = scaledHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - scaledHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`${form.state}_Smart_Itinerary.pdf`);
    }

    return (
        <div className="planner-layout">
            <div className="planner-form-box">
                <h3 style={{ marginBottom: '2rem', color: 'var(--sidebar-bg)' }}>Plan Parameters</h3>

                <label className="form-label">Destination</label>
                <select className="form-input" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}>
                    {locations.length > 0 ? (
                        locations.map(loc => <option key={loc} value={loc}>{loc}</option>)
                    ) : (
                        <option>Loading Destinations...</option>
                    )}
                </select>

                <label className="form-label">Duration (Days)</label><input className="form-input" type="number" min="1" max="14" value={form.days} onChange={e => setForm({ ...form, days: e.target.value })} />

                <label className="form-label">Budget Tier</label>
                <select className="form-input" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                    <option>Budget</option><option>Mid-range</option><option>Luxury</option>
                </select>

                <label className="form-label">Primary Interest</label>
                <select className="form-input" value={form.vibe} onChange={e => setForm({ ...form, vibe: e.target.value })}>
                    <option>Culture & Heritage</option><option>Food & Culinary</option><option>Nature & Adventure</option><option>Relaxation</option><option>Nightlife & Shopping</option>
                </select>

                <label className="form-label">Travel Pace</label>
                <select className="form-input" value={form.style} onChange={e => setForm({ ...form, style: e.target.value })}>
                    <option>Balanced</option><option>Relaxed</option><option>Packed</option>
                </select>

                <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={generate}>
                    Generate Smart Itinerary
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {itin ? (
                    <div className="itinerary-canvas" ref={pdfRef}>
                        <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                            <h2 style={{ color: 'var(--primary)', fontSize: '2.2rem', marginBottom: '0.5rem' }}>{itin.form.state} Expedition</h2>
                            <p style={{ color: 'gray', fontSize: '1.1rem' }}>
                                {itin.form.days} Days • {itin.form.budget} ({itin.form.style}) • Theme: {itin.form.vibe}
                            </p>

                            <div style={{ marginTop: '1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem' }}>Enterprise Cost Breakdown</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
                                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Accommodation</div>
                                        <div style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 'bold' }}>₹{itin.costConfig.acc.toLocaleString()}</div>
                                    </div>
                                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Food & Dining</div>
                                        <div style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 'bold' }}>₹{itin.costConfig.food.toLocaleString()}</div>
                                    </div>
                                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Local Transit</div>
                                        <div style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 'bold' }}>₹{itin.costConfig.trans.toLocaleString()}</div>
                                    </div>
                                    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Experiences</div>
                                        <div style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 'bold' }}>₹{itin.costConfig.act.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '1.2rem', textAlign: 'right', fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary)' }}>Estimated Total: ₹{itin.costConfig.total.toLocaleString()}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {itin.plan.map(d => (
                                <div key={d.day} style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: 'linear-gradient(to bottom, #d946ef, #6366f1)' }}></div>
                                    <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '1.5rem', borderBottom: '2px solid #f8fafc', paddingBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="material-icons-round" style={{ color: '#8b5cf6' }}>event</span> Day {d.day} Strategy
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {[
                                            { act: d.m, label: 'Morning', color: '#f59e0b', icon: 'wb_sunny' },
                                            { act: d.a, label: 'Afternoon', color: '#ef4444', icon: 'light_mode' },
                                            { act: d.e, label: 'Evening', color: '#3b82f6', icon: 'nights_stay' }
                                        ].map((block, idx) => block.act && (
                                            <div key={idx} style={{ paddingLeft: '1rem', borderLeft: `3px solid ${block.color}`, position: 'relative' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <span className="material-icons-round" style={{ fontSize: '1.2rem', color: block.color }}>{block.icon}</span>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: block.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{block.label}</span>
                                                </div>
                                                <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '1rem' }}>
                                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                                        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                            <span className="material-icons-round" style={{ color: '#64748b' }}>{block.act.icon}</span>
                                                        </div>
                                                        <div style={{ flex: 1 }}>
                                                            <h4 style={{ margin: '0 0 0.3rem 0', color: '#1e293b', fontSize: '1.1rem' }}>{block.act.name}</h4>
                                                            <p style={{ margin: '0', color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>{block.act.desc}</p>
                                                            {block.act.insight && (
                                                                <div style={{ marginTop: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.8rem', background: '#ecfdf5', padding: '0.5rem 0.8rem', borderRadius: '6px', borderLeft: '2px solid #10b981' }}>
                                                                    <span className="material-icons-round" style={{ fontSize: '1.1rem' }}>stars</span>
                                                                    {block.act.insight}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ borderTop: '1px dashed #cbd5e1', margin: '1.5rem 0 1rem 0' }}></div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="material-icons-round" style={{ fontSize: '1rem', color: '#94a3b8' }}>insights</span> Travel Tip: {d.tip}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="itinerary-canvas" style={{ textAlign: 'center', padding: '5rem 2rem', color: 'gray' }}>
                        <span className="material-icons-round" style={{ fontSize: '4rem', opacity: 0.3 }}>route</span>
                        <h3>Intelligent Engine Ready</h3>
                        <p>Select your destination to instantly build a hyper-localized, structured itinerary.</p>
                    </div>
                )}
                {itin && <button className="btn-secondary" style={{ alignSelf: 'flex-start', padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'white', border: 'none' }} onClick={exportPDF}>Download Official PDF Guide</button>}
            </div>
        </div>
    );
}

// --- 5. VISA INFO ---
const VISA_DATA = [
    {
        id: 'e-tourist',
        title: 'e-Tourist Visa',
        badge: 'MOST POPULAR',
        colorBorder: '#a855f7',
        badgeColor: '#7e22ce',
        badgeBg: '#f3e8ff',
        shortDesc: 'For recreation, sightseeing, or casual visit to meet friends or relatives.',
        duration: '30 Days / 1 Yr / 5 Yr',
        fee: '$25 – $80',
        note: 'Electronic Travel Authorization (ETA) valid for entry at 28 designated airports.',
        noteColor: '#6b21a8',
        noteBg: '#faf5ff',
        noteBorder: '#7e22ce',
        eligibility: ['Most foreign nationals', 'Passport valid for at least 6 months from arrival'],
        processing: ['Average: 72 hours (apply at least 4 days in advance)', 'Urgent processing not officially supported'],
        validityDesc: ['Multiple entries (1 Year & 5 Year)', 'Double entry (30 Days)', 'Max 90 days stay per visit (180 days for US/UK/Canada/Japan)'],
        requirements: ['Passport Scan (Bio Page)', 'Recent Digital Photo (White Background)', 'Return flight ticket (sometimes asked at immigration)'],
        commonRejections: ['Blurred or compressed document uploads', 'Name mismatch with passport', 'Incorrect passport details entered'],
        travelTips: ['Apply at least 7 days before your travel date.', 'Always carry a printed copy of the approved ETA.', 'Immigration may require proof of sufficient funds.']
    },
    {
        id: 'e-business',
        title: 'e-Business Visa',
        badge: 'PROFESSIONAL',
        colorBorder: '#0ea5e9',
        badgeColor: '#0369a1',
        badgeBg: '#e0f2fe',
        shortDesc: 'For technical/business meetings, setting up industrial/business venture.',
        duration: 'Up to 1 Year',
        fee: '$80 – $100',
        note: 'Multiple entries allowed within the validity period.',
        noteColor: '#075985',
        noteBg: '#f0f9ff',
        noteBorder: '#0369a1',
        eligibility: ['Business travelers and investors', 'Must have a valid invitation from an Indian entity'],
        processing: ['Average: 72 hours to 4 days', 'Processing may be delayed if documents are unclear'],
        validityDesc: ['Multiple entries allowed', 'Max stay 180 days per visit (if staying longer, FRRO registration is required)'],
        requirements: ['Business Card / Invitation Letter from Indian company', 'Passport Scan (Bio Page)', 'Indian Entity Details (Address, contact)'],
        commonRejections: ['Invalid or generic invitation letter', 'Unverifiable Indian entity details', 'Mismatch between business intent and visa type'],
        travelTips: ['Include the exact address and contact number of your host.', 'Carry physical copies of the invitation letter.', 'Ensure your business card clearly states your designation.']
    },
    {
        id: 'e-medical',
        title: 'e-Medical Visa',
        badge: 'HEALTHCARE',
        colorBorder: '#10b981',
        badgeColor: '#047857',
        badgeBg: '#d1fae5',
        shortDesc: 'For short-term medical treatment under Indian systems of medicine.',
        duration: '60 Days',
        fee: '$80 – $100',
        note: 'Triple entry allowed for the patient and two attendants.',
        noteColor: '#065f46',
        noteBg: '#f0fdf4',
        noteBorder: '#047857',
        eligibility: ['Patients seeking certified treatment', 'Up to 2 family members/attendants can apply for e-Medical Attendant Visa'],
        processing: ['Average: 48 to 72 hours', 'Expedited in critical cases via High Commission assistance (offline)'],
        validityDesc: ['Triple entry allowed', 'Valid for 60 days from the date of first arrival'],
        requirements: ['Official Letter from recognized Indian Hospital on its letterhead', 'Passport Scan (Bio Page)', 'Initial Medical Diagnosis Records from home country'],
        commonRejections: ['Hospital not legally recognized for medical tourism', 'Incomplete medical letters', 'Vague or missing dates for treatment'],
        travelTips: ['Always verify the Indian hospital is accredited for foreign patients.', 'Attendants must apply simultaneously.', 'Ensure the letterhead contains hospital contact emails for verification.']
    }
];

const VisaInfo = () => {
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCard = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div>
            <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)', marginBottom: '1.5rem' }}>
                <h2>Visa Information & e-Visa Guide</h2>
                <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Complete guide to acquiring your Indian visa. Most nationalities are now eligible for the hassle-free e-Visa program.</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#fbbf24' }}>auto_awesome</span> 100% Online Process</span>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#3b82f6' }}>schedule</span> 72-Hour Processing</span>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#10b981' }}>public</span> 160+ Countries Eligible</span>
                </div>
            </div>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', borderTop: '4px solid #f59e0b', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#1e293b' }}>
                    <span className="material-icons-round" style={{ color: '#f59e0b' }}>verified_user</span> Apply for Indian e-Visa (Official Links)
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.2rem' }}>Always use the official government website. Avoid third-party agents who charge high processing fees.</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href="https://indianvisaonline.gov.in/evisa/" title="Opens official government website" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#f59e0b', color: 'white', border: 'none' }}>
                        <span className="material-icons-round" style={{ fontSize: '1.2rem' }}>open_in_new</span> Primary Portal
                    </a>
                    <a href="https://indianvisaonline.gov.in/evisa/StatusEnquiry" title="Opens official government website" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span className="material-icons-round" style={{ fontSize: '1.2rem' }}>manage_search</span> Check Status
                    </a>
                    <a href="https://indianvisaonline.gov.in/evisa/tvoa.html" title="Opens official government website" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span className="material-icons-round" style={{ fontSize: '1.2rem' }}>help_outline</span> Instructions Page
                    </a>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#b45309', background: '#fef3c7', padding: '0.5rem 1rem', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-icons-round" style={{ fontSize: '1rem' }}>warning_amber</span> Disclaimer: We do not process visas. Always verify details on the official MHA website.
                </div>
            </div>

            <div className="cards-grid">
                {VISA_DATA.map(visa => (
                    <div key={visa.id} className="snap-card" style={{ borderTop: `4px solid ${visa.colorBorder}`, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <h3>{visa.title}</h3>
                            <span style={{ fontSize: '0.65rem', background: visa.badgeBg, color: visa.badgeColor, padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 'bold' }}>{visa.badge}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'gray', margin: '0.5rem 0' }}>{visa.shortDesc}</p>

                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
                            <div><small style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><span className="material-icons-round" style={{ fontSize: '0.9rem' }}>event</span> Duration</small><div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{visa.duration}</div></div>
                            <div><small style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><span className="material-icons-round" style={{ fontSize: '0.9rem' }}>payments</span> Fee (USD)</small><div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{visa.fee}</div></div>
                        </div>

                        <div style={{ padding: '0.8rem', borderLeft: `3px solid ${visa.noteBorder}`, background: visa.noteBg, fontSize: '0.85rem', color: visa.noteColor, marginBottom: '1.5rem' }}>
                            {visa.note}
                        </div>

                        {expandedCard === visa.id && (
                            <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
                                <div style={{ marginBottom: '1.2rem' }}>
                                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#64748b' }}>assignment_ind</span> Eligibility & Validity</h4>
                                    <ul className="snap-list" style={{ gap: '0.4rem', marginBottom: '0.8rem' }}>
                                        {visa.eligibility.map((el, i) => <li key={i} style={{ fontSize: '0.85rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#10b981' }}>how_to_reg</span> {el}</li>)}
                                    </ul>
                                    <ul className="snap-list" style={{ gap: '0.4rem' }}>
                                        {visa.validityDesc.map((val, i) => <li key={i} style={{ fontSize: '0.85rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#3b82f6' }}>fact_check</span> {val}</li>)}
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '1.2rem' }}>
                                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#64748b' }}>folder_shared</span> Requirements</h4>
                                    <ul className="snap-list" style={{ gap: '0.4rem' }}>
                                        {visa.requirements.map((req, i) => <li key={i} style={{ fontSize: '0.85rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: visa.colorBorder }}>check_circle</span> {req}</li>)}
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '1.2rem' }}>
                                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#64748b' }}>schedule</span> Process & Rejections</h4>
                                    <ul className="snap-list" style={{ gap: '0.4rem', marginBottom: '0.8rem' }}>
                                        {visa.processing.map((proc, i) => <li key={i} style={{ fontSize: '0.85rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#f59e0b' }}>pending_actions</span> {proc}</li>)}
                                    </ul>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.3rem' }}>Common Rejection Reasons:</p>
                                    <ul className="snap-list" style={{ gap: '0.4rem' }}>
                                        {visa.commonRejections.map((rej, i) => <li key={i} style={{ fontSize: '0.85rem', color: '#991b1b' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#ef4444' }}>cancel</span> {rej}</li>)}
                                    </ul>
                                </div>

                                <div>
                                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#475569', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#64748b' }}>lightbulb</span> Travel Tips</h4>
                                    <ul className="snap-list" style={{ gap: '0.4rem', background: '#fffbeb', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                                        {visa.travelTips.map((tip, i) => <li key={i} style={{ fontSize: '0.85rem', color: '#b45309' }}><span className="material-icons-round" style={{ fontSize: '1rem', color: '#f59e0b' }}>star</span> {tip}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <button
                            className="btn-secondary"
                            style={{
                                marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                background: expandedCard === visa.id ? '#f1f5f9' : 'white',
                                color: expandedCard === visa.id ? '#64748b' : visa.colorBorder,
                                borderColor: expandedCard === visa.id ? '#e2e8f0' : visa.colorBorder
                            }}
                            onClick={() => toggleCard(visa.id)}
                        >
                            <span>{expandedCard === visa.id ? 'Hide Details' : 'View More Details'}</span>
                            <span className="material-icons-round" style={{ fontSize: '1.2rem' }}>
                                {expandedCard === visa.id ? 'expand_less' : 'expand_more'}
                            </span>
                        </button>
                    </div>
                ))}
            </div>

            <div className="snapshot-grid" style={{ marginTop: '2rem' }}>
                <div className="snap-card" style={{ borderLeft: '6px solid #ef4444', background: '#fff1f2', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.15)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', fontSize: '1.2rem', fontWeight: '800' }}><span className="material-icons-round" style={{ fontSize: '1.5rem' }}>gavel</span> STRICT OVERSTAY RULES</h3>
                    <p style={{ fontSize: '0.95rem', color: '#7f1d1d', lineHeight: 1.6, marginTop: '1rem', fontWeight: '500' }}>Overstaying your visa in India is a serious offense. Penalties include heavy fines (in USD), detention, and deportation. Visas <strong style={{ color: '#ef4444' }}>CANNOT be extended</strong> from within India except in rare medical emergencies.</p>
                </div>
                <div className="snap-card" style={{ borderLeft: '6px solid #3b82f6', background: '#eff6ff', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.15)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e3a8a', fontSize: '1.2rem', fontWeight: '800' }}><span className="material-icons-round" style={{ fontSize: '1.5rem' }}>how_to_reg</span> FOREIGNER REGISTRATION (FRRO)</h3>
                    <p style={{ fontSize: '0.95rem', color: '#1e40af', lineHeight: 1.6, marginTop: '1rem', fontWeight: '500' }}>If you enter on a 1 Year/5 Year visa and stay continuously for more than 180 days, you <strong style={{ color: '#2563eb' }}>MUST register with FRRO online within 14 days</strong> of crossing the 180-day mark.</p>
                </div>
                <div className="snap-card" style={{ borderLeft: '6px solid #10b981', background: '#ecfdf5', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.15)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#064e3b', fontSize: '1.2rem', fontWeight: '800' }}><span className="material-icons-round" style={{ fontSize: '1.5rem' }}>update</span> VISA EXTENSION POLICY</h3>
                    <p style={{ fontSize: '0.95rem', color: '#065f46', lineHeight: 1.6, marginTop: '1rem', fontWeight: '500' }}>Visa extension in India is generally not permitted for most visa types. Extensions are granted only under exceptional circumstances such as medical emergencies or unforeseen situations. Applications must be submitted through the official FRRO portal before visa expiry.</p>
                </div>
                <div className="snap-card" style={{ borderLeft: '6px solid #f59e0b', background: '#fffbeb', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#78350f', fontSize: '1.2rem', fontWeight: '800' }}><span className="material-icons-round" style={{ fontSize: '1.5rem' }}>folder_shared</span> DOCUMENT REQUIREMENTS</h3>
                    <p style={{ fontSize: '0.95rem', color: '#92400e', lineHeight: 1.6, marginTop: '1rem', fontWeight: '500' }}>Travelers must carry valid documents including passport (with at least 6 months validity), visa approval, return ticket, and proof of accommodation. Additional documents may be required depending on the visa type and purpose of visit.</p>
                </div>
            </div>
        </div>
    );
};


// --- 6. WEATHER ---
const Weather = () => {
    const [destinations, setDestinations] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/destinations')
            .then(res => res.json())
            .then(d => setDestinations(d));
    }, []);

    const handleSelect = (e) => {
        const dest = destinations.find(d => d.id.toString() === e.target.value);
        if (dest) {
            const city = dest.location.split(',')[0].trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
            setSelectedCity(city);
        } else {
            setSelectedCity('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem', minHeight: '80vh' }}>
            <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', marginBottom: '0' }}>
                <h2>Live Weather Matrix</h2>
                <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Real-time meteorological readings for all 305+ destinations.</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <span className="material-icons-round" style={{ color: '#94a3b8' }}>cloud</span>
                <select
                    onChange={handleSelect}
                    style={{ flex: 1, padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', background: '#f8fafc', fontSize: '1rem', outline: 'none' }}
                >
                    <option value="">Overview (India) - Select a Destination</option>
                    {destinations.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.location})</option>
                    ))}
                </select>
            </div>
            <div style={{ flex: 1, background: '#e2e8f0', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <iframe
                    src={`https://www.ventusky.com/${selectedCity ? selectedCity : '?p=22.5;79.6;5'}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '600px' }}
                    allowFullScreen=""
                    loading="lazy">
                </iframe>
            </div>
        </div>
    );
};

// --- 7. FESTIVALS EXPLORER ---
const FESTIVAL_DB = [
    {
        id: 'diwali',
        name: 'Diwali',
        alias: 'Festival of Lights',
        month: 'October/November',
        monthNum: 10,
        state: 'Entire India',
        category: 'Religious',
        season: 'Autumn',
        shortDesc: 'The biggest and brightest festival in India, symbolizing the victory of light over darkness.',
        famousFor: 'Oil lamps (diyas), firecrackers, and sweets.',
        bestPlace: 'Varanasi (Ghats), Jaipur (Local Markets), Ayodhya (Deepotsav).',
        popularFoods: 'Kaju Katli, Gulab Jamun, Besan Ladoo, Samosas.',
        activities: 'Lighting diyas, performing Lakshmi Puja, bursting firecrackers, exchanging gifts.',
        icon: 'light',
        gradient: 'from-orange-500 to-yellow-400',
        history: 'Diwali marks the return of Lord Rama to Ayodhya after 14 years of exile and his victory over the demon king Ravana.',
        traditions: 'Houses are cleaned and decorated with Rangoli and lights. New clothes are worn, and families gather for a feast.',
        dressCode: 'Traditional Indian attire like Saree, Kurta-Pajama, or Lehengas.',
        touristTips: 'Book accommodation months in advance for Varanasi or Jaipur. Be prepared for loud noises and smoke from firecrackers.',
        nearby: 'Dashashwamedh Ghat (Varanasi), Amer Fort (Jaipur).'
    },
    {
        id: 'holi',
        name: 'Holi',
        alias: 'Festival of Colors',
        month: 'March',
        monthNum: 2,
        state: 'North India',
        category: 'Cultural',
        season: 'Spring',
        shortDesc: 'A vibrant celebration of the arrival of spring and the triumph of good over evil.',
        famousFor: 'Splashing colors (Gulal) and water fights.',
        bestPlace: 'Mathura & Vrindavan (Braj Holi), Jaipur, Udaipur.',
        popularFoods: 'Gujiya, Thandai (with/without Bhang), Dahi Bhalla.',
        activities: 'Playing with colors, dancing to dhol beats, visiting friends and relatives.',
        icon: 'palette',
        gradient: 'from-pink-500 to-purple-500',
        history: 'Associated with the legend of Prahlad and Holika, and the playful love of Radha and Krishna.',
        traditions: 'Burning of the Holika bonfire on the eve, followed by a day of color play.',
        dressCode: 'Old white clothes that you don\'t mind getting stained with permanent colors.',
        touristTips: 'Apply oil to your skin and hair to prevent colors from sticking. Wear sunglasses to protect your eyes.',
        nearby: 'Banke Bihari Temple (Vrindavan), City Palace (Udaipur).'
    },
    {
        id: 'durga-puja',
        name: 'Durga Puja',
        alias: 'Navratri in West Bengal',
        month: 'October',
        monthNum: 9,
        state: 'West Bengal / Gujarat',
        category: 'Religious',
        season: 'Autumn',
        shortDesc: 'Ten-day festival worshipping Goddess Durga and her victory over Mahishasura.',
        famousFor: 'Elaborate Pandals, Garba/Dandiya dances, and life-size idols.',
        bestPlace: 'Kolkata (Pandal Hopping), Ahmedabad (Garba Nights).',
        popularFoods: 'Khichuri, Dhokla, Fafda, Mishti Doi.',
        activities: 'Pandal hopping, Garba dance, Sandhya Aarti with Dhak music.',
        icon: 'self_improvement',
        gradient: 'from-red-600 to-yellow-600',
        history: 'Celebrates Goddess Durga\'s victory over the shape-shifting demon Mahishasura.',
        traditions: 'Installation of magnificent idols in artistic pandals. Cultural performances and community feasting.',
        dressCode: 'Bengali Saree (Lal Paar) for women, Dhoti-Panjabi for men.',
        touristTips: 'Kolkata streets are extremely crowded; best to explore late at night or early morning.',
        nearby: 'Howrah Bridge (Kolkata), Sabarmati Ashram (Ahmedabad).'
    },
    {
        id: 'ganesh-chaturthi',
        name: 'Ganesh Chaturthi',
        alias: 'Vinayaka Chaturthi',
        month: 'August/September',
        monthNum: 8,
        state: 'Maharashtra',
        category: 'Religious',
        season: 'Monsoon',
        shortDesc: 'A grand festival honoring the birth of Lord Ganesha, the elephant-headed god.',
        famousFor: 'Gigantic Ganesha idols and massive street processions.',
        bestPlace: 'Mumbai (Lalbaugcha Raja), Pune.',
        popularFoods: 'Modak (Steamed or Fried), Puran Poli.',
        activities: 'Idol installation (Sthapana), Visarjan (Immersion) in the sea.',
        icon: 'pets',
        gradient: 'from-orange-600 to-red-500',
        history: 'Revived as a public event by Bal Gangadhar Tilak to foster national unity during the British Raj.',
        traditions: 'Bringing the deity home with music and dance. Daily aarti and offerings of 21 modaks.',
        dressCode: 'Traditional Maharashtrian Nauvari Saree or Kurta.',
        touristTips: 'The final day Visarjan at Girgaon Chowpatty is a sight to behold but very congested.',
        nearby: 'Gateway of India, Marine Drive.'
    },
    {
        id: 'pongal',
        name: 'Pongal',
        alias: 'Harvest Festival',
        month: 'January',
        monthNum: 0,
        state: 'Tamil Nadu',
        category: 'Harvest',
        season: 'Winter',
        shortDesc: 'Four-day harvest festival dedicated to the Sun God (Surya).',
        famousFor: 'Cooking the Pongal dish (rice and milk) until it boils over.',
        bestPlace: 'Madurai, Thanjavur, Rural Tamil Nadu.',
        popularFoods: 'Sweet Pongal (Chakkara Pongal), Ven Pongal, Medu Vada.',
        activities: 'Decorating cows (Mattu Pongal), Jallikattu (Bull taming), traditional dance.',
        icon: 'agriculture',
        gradient: 'from-green-500 to-yellow-500',
        history: 'Rooted in ancient Tamil tradition as a way to thank the sun, nature, and farm animals for a bountiful harvest.',
        traditions: 'Burning old household items in Bhogi, drawing Kolams (Rangoli), and boiling milk in new clay pots.',
        dressCode: 'Veshti/Lungi for men, Silk Saree for women.',
        touristTips: 'Visit a traditional Tamil home or a village to experience the authentic rural Pongal.',
        nearby: 'Meenakshi Amman Temple (Madurai), Brihadisvara Temple (Thanjavur).'
    },
    {
        id: 'onam',
        name: 'Onam',
        alias: 'King Mahabali\'s Return',
        month: 'August/September',
        monthNum: 8,
        state: 'Kerala',
        category: 'Harvest',
        season: 'Monsoon',
        shortDesc: 'The largest harvest festival of Kerala, welcoming the legendary King Mahabali.',
        famousFor: 'Vallam Kali (Snake Boat Race) and Pookalam (Flower Carpets).',
        bestPlace: 'Kochi, Thrissur, Aranmula.',
        popularFoods: 'Onam Sadya (26+ dishes served on banana leaf).',
        activities: 'Boat races, Pulikali (Tiger Dance), Kathakali performances.',
        icon: 'sailing',
        gradient: 'from-emerald-600 to-yellow-400',
        history: 'Commemorates the vaman avatar of Lord Vishnu and the subsequent homecoming of the mythical King Mahabali.',
        traditions: 'Laying floral carpets (Pookalam) for ten days (Atham to Thiruvonam).',
        dressCode: 'Kerala Kasavu (White & Gold) Saree or Mundu.',
        touristTips: 'The Aranmula Boat Race is held on the last days; book ferry and tickets in advance.',
        nearby: 'Fort Kochi, Backwaters of Alleppey.'
    },
    {
        id: 'hampi-utsav',
        name: 'Hampi Utsav',
        alias: 'Vijaya Utsav',
        month: 'January',
        monthNum: 0,
        state: 'Karnataka',
        category: 'Cultural',
        season: 'Winter',
        shortDesc: 'A grand cultural festival held amidst the ruins of the Vijayanagara Empire.',
        famousFor: 'Illuminated monuments, puppet shows, and classical music.',
        bestPlace: 'Hampi (UNESCO World Heritage Site).',
        popularFoods: 'Bisi Bele Bath, Jolada Rotti, South Indian Filter Coffee.',
        activities: 'Light and sound shows, folk dance, jumbo circus, elephant marches.',
        icon: 'castle',
        gradient: 'from-amber-700 to-yellow-600',
        history: 'Revived to capture the splendor of the Vijayanagara Empire as described by old chroniclers.',
        traditions: 'Processions of decorated elephants and displays of the local art form of "Harikathe".',
        dressCode: 'Comfortable cotton ethnics suitable for walking among ruins.',
        touristTips: 'Monuments are beautifully lit; stay until late evening to see the ruins glowing.',
        nearby: 'Virupaksha Temple, Vitthala Temple complex.'
    },
    {
        id: 'hornbill',
        name: 'Hornbill Festival',
        alias: 'Festival of Festivals',
        month: 'December',
        monthNum: 11,
        state: 'Nagaland',
        category: 'Cultural',
        season: 'Winter',
        shortDesc: 'A massive celebration of the rich culture and heritage of the Naga tribes.',
        famousFor: 'Tribal warfare dances, Naga chilly eating contests, and rock concerts.',
        bestPlace: 'Kisama Heritage Village (near Kohima).',
        popularFoods: 'Smoked Pork with Bamboo Shoots, Axone, Rice Beer (Zutho).',
        activities: 'Archery contests, traditional Naga wrestling, indigenous games.',
        icon: 'forest',
        gradient: 'from-red-800 to-black',
        history: 'Organized by the State Government to encourage inter-tribal interaction and promote Nagaland as a global tourist destination.',
        traditions: 'Each tribe builds a traditional hut (Morung) and performs their unique tribal ceremonies.',
        dressCode: 'Traditional Naga shawls and bead jewelry; warm winter wear is essential.',
        touristTips: 'Requires an Inner Line Permit (ILP) for Indian citizens and registration for foreigners. Cold at night.',
        nearby: 'Kohima War Cemetery, Dzukou Valley.'
    },
    {
        id: 'pushkar-fair',
        name: 'Pushkar Fair',
        alias: 'Pushkar Camel Fair',
        month: 'November',
        monthNum: 10,
        state: 'Rajasthan',
        category: 'Cultural',
        season: 'Autumn',
        shortDesc: 'One of the world\'s largest camel and livestock fairs held on the banks of Pushkar Lake.',
        famousFor: 'Competitions like "longest moustache", camel races, and cricket matches between locals and tourists.',
        bestPlace: 'Pushkar (Near Ajmer).',
        popularFoods: 'Malpua, Rabri, Dal Baati Churma.',
        activities: 'Hiring a camel, hot air ballooning, taking a holy dip in the lake.',
        icon: 'wb_sunny',
        gradient: 'from-orange-800 to-yellow-700',
        history: 'Primarily a livestock trade fair that has evolved into a major cultural and religious event during Kartik Purnima.',
        traditions: 'Trading thousands of camels and cattle. Religious rituals at the Brahma Temple.',
        dressCode: 'Bright colorful Rajasthani turbans and ghagras; scarves for visiting temples.',
        touristTips: 'Beware of "purohits" offering holy thread for money. Accommodation prices surge 3x.',
        nearby: 'Brahma Temple, Ajmer Sharif Dargah.'
    },
    {
        id: 'hemis',
        name: 'Hemis Festival',
        alias: 'Buddhist Lunar Festival',
        month: 'June/July',
        monthNum: 5,
        state: 'Ladakh',
        category: 'Religious',
        season: 'Summer',
        shortDesc: 'A spiritual festival held at the Hemis Monastery, celebrating the birth of Guru Padmasambhava.',
        famousFor: 'Sacred Mask Dances (Cham Dance) by Buddhist monks.',
        bestPlace: 'Hemis Monastery, Leh.',
        popularFoods: 'Thukpa, Skyu, Butter Tea (Gur Gur Chai).',
        activities: 'Watching Cham dance, visiting the monastery museum, unfolding the giant Thangka (every 12 years).',
        icon: 'temple_buddhist',
        gradient: 'from-blue-700 to-red-700',
        history: 'Honors Guru Padmasambhava, the founder of Tibetan Buddhism, who represents the victory of the spirit over demonic forces.',
        traditions: 'Monks perform mystic mask dances representing various deities and animal spirits.',
        dressCode: 'Modest clothing; carry a jacket as weather can change quickly.',
        touristTips: 'Reach early to get a seat in the monastery courtyard. Very high altitude (3500m+).',
        nearby: 'Thiksey Monastery, Shanti Stupa.'
    }
];

const Festivals = ({ setView }) => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({ month: 'All', state: 'All', type: 'All', season: 'All' });
    const [selected, setSelected] = useState(null);
    const [timeline, setTimeline] = useState(false);

    const currentMonthNum = new Date().getMonth();
    const currentMonthStr = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ][currentMonthNum];

    const filtered = FESTIVAL_DB.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.state.toLowerCase().includes(search.toLowerCase());
        const matchesMonth = filter.month === 'All' || f.month.includes(filter.month);
        const matchesState = filter.state === 'All' || f.state.includes(filter.state);
        const matchesType = filter.type === 'All' || f.category === filter.type;
        const matchesSeason = filter.season === 'All' || f.season === filter.season;
        return matchesSearch && matchesMonth && matchesState && matchesType && matchesSeason;
    });

    const happeningThisMonth = FESTIVAL_DB.filter(f => f.month.includes(currentMonthStr));
    const topTourist = FESTIVAL_DB.filter(f => ['holi', 'diwali', 'durga-puja', 'onam', 'pongal'].includes(f.id));

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const states = ['Entire India', 'North India', 'West Bengal', 'Gujarat', 'Maharashtra', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Nagaland', 'Rajasthan', 'Ladakh'];
    const types = ['Religious', 'Cultural', 'Harvest'];
    const seasons = ['Summer', 'Winter', 'Monsoon', 'Spring', 'Autumn'];

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="hero-banner relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-2 flex items-center gap-3">
                        <span className="material-icons-round text-5xl">celebration</span>
                        Festivals
                    </h2>
                    <p className="text-lg opacity-90 max-w-2xl">
                        Discover the vibrant celebrations of India throughout the year. From the colors of Holi to the lights of Diwali, experience the spirit of the subcontinent.
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-8 transform rotate-12 opacity-10">
                    <span className="material-icons-round text-[200px]">festival</span>
                </div>
            </div>

            {/* Widgets Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold uppercase text-xs tracking-wider">
                        <span className="material-icons-round text-sm">event</span>
                        Happening in {currentMonthStr}
                    </div>
                    <div className="flex-1 space-y-3">
                        {happeningThisMonth.length > 0 ? happeningThisMonth.slice(0, 3).map(f => (
                            <div key={f.id} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all" onClick={() => setSelected(f)}>
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white`}>
                                    <span className="material-icons-round text-lg">{f.icon}</span>
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{f.name}</div>
                                    <div className="text-xs text-slate-500">{f.state}</div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-slate-400 italic">No major festivals this month</div>
                        )}
                    </div>
                    <button className="mt-4 text-emerald-600 text-sm font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all" onClick={() => setTimeline(true)}>
                        View Full Year Calendar <span className="material-icons-round text-sm">arrow_forward</span>
                    </button>
                </div>

                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 text-white group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold uppercase text-xs tracking-wider">
                            <span className="material-icons-round text-sm">stars</span>
                            Top Tourist Destinations
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide py-2">
                            {topTourist.map(f => (
                                <div key={f.id} className="flex-shrink-0 w-48 p-4 rounded-xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm cursor-pointer hover:border-indigo-400 transition-all group/card hover:-translate-y-1" onClick={() => setSelected(f)}>
                                    <div className="text-indigo-400 mb-2 truncate font-bold text-xs uppercase tracking-tighter">Recommended</div>
                                    <div className="font-black text-lg mb-1 leading-tight">{f.name}</div>
                                    <div className="text-xs text-slate-400 mb-3">{f.bestPlace.split('(')[0]}</div>
                                    <div className="flex items-center gap-1 text-[10px] bg-slate-700/50 w-fit px-2 py-1 rounded text-slate-300">
                                        <span className="material-icons-round text-[12px]">calendar_month</span>
                                        {f.month}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-4 z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2 relative group">
                        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            type="text"
                            placeholder="Search by festival, state, or ritual..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent border-slate-100 rounded-xl outline-none focus:border-primary focus:bg-white transition-all text-sm"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <select className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-primary transition-all" value={filter.month} onChange={e => setFilter({ ...filter, month: e.target.value })}>
                        <option value="All">All Months</option>
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-primary transition-all" value={filter.state} onChange={e => setFilter({ ...filter, state: e.target.value })}>
                        <option value="All">All States</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-primary transition-all" value={filter.type} onChange={e => setFilter({ ...filter, type: e.target.value })}>
                        <option value="All">All Categories</option>
                        {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                {filtered.map(f => (
                    <div key={f.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col group cursor-pointer" onClick={() => setSelected(f)}>
                        <div className={`h-40 bg-gradient-to-br ${f.gradient} p-6 relative flex items-center justify-center`}>
                            <span className="material-icons-round text-7xl text-white/40 absolute bottom-0 right-4 transform translate-y-4 group-hover:translate-y-2 transition-transform">{f.icon}</span>
                            <div className="text-center z-10">
                                <span className="material-icons-round text-5xl text-white mb-2 shadow-lg rounded-full h-16 w-16 bg-white/20 flex items-center justify-center backdrop-blur-md mx-auto">{f.icon}</span>
                                <div className="text-white font-black text-2xl tracking-tight">{f.name}</div>
                            </div>
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">{f.category}</span>
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-slate-500 text-xs font-bold flex items-center gap-1 uppercase tracking-tighter">
                                        <span className="material-icons-round text-[12px]">location_on</span>
                                        {f.state.split('/')[0]}
                                    </div>
                                    <div className="text-primary font-bold text-sm">{f.month}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] px-2 py-1 rounded bg-slate-100 text-slate-500 font-bold">{f.season}</div>
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                                {f.shortDesc}
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="space-y-1">
                                    <div className="text-[9px] uppercase font-bold text-slate-400">Famous For</div>
                                    <div className="text-[11px] font-bold text-slate-700 truncate">{f.famousFor}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] uppercase font-bold text-slate-400">Best Experience</div>
                                    <div className="text-[11px] font-bold text-slate-700 truncate">{f.bestPlace.split('(')[0]}</div>
                                </div>
                            </div>
                            <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${f.gradient} text-white font-bold text-sm shadow-md hover:shadow-lg transition-all`}>
                                View Cultural Insights
                            </button>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <span className="material-icons-round text-6xl text-slate-200 mb-4">search_off</span>
                        <div className="text-xl font-bold text-slate-400">No celebrations found for these filters</div>
                        <button className="mt-4 text-primary font-bold" onClick={() => { setSearch(''); setFilter({ month: 'All', state: 'All', type: 'All', season: 'All' }); }}>Clear All Filters</button>
                    </div>
                )}
            </div>

            {/* Full Year Timeline Modal */}
            {timeline && (
                <div className="modal-overlay" onClick={() => setTimeline(false)}>
                    <div className="modal-window max-w-2xl bg-slate-50" onClick={e => e.stopPropagation()}>
                        <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black">Annual Festival Timeline</h3>
                                <p className="text-sm opacity-60">Indian Celebrations Month-by-Month</p>
                            </div>
                            <button className="modal-close bg-white/10 hover:bg-white/20" onClick={() => setTimeline(false)}>
                                <span className="material-icons-round">close</span>
                            </button>
                        </div>
                        <div className="modal-body-scroll p-0 block">
                            <div className="p-8 space-y-12 relative">
                                <div className="absolute left-[47px] top-12 bottom-12 w-0.5 bg-slate-200"></div>
                                {months.map((m, idx) => {
                                    const monthFests = FESTIVAL_DB.filter(f => f.month.includes(m));
                                    return (
                                        <div key={m} className="relative flex gap-12 z-10 group">
                                            <div className="w-10 h-10 rounded-full bg-white border-4 border-slate-200 flex items-center justify-center font-bold text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-slate-400 font-black uppercase tracking-widest text-xs mb-2">{m}</div>
                                                <div className="space-y-3">
                                                    {monthFests.length > 0 ? monthFests.map(f => (
                                                        <div key={f.id} className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-between group/item hover:border-primary transition-colors cursor-pointer" onClick={() => { setSelected(f); setTimeline(false); }}>
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white text-xs`}>
                                                                    <span className="material-icons-round text-sm">{f.icon}</span>
                                                                </div>
                                                                <div className="font-bold text-slate-700">{f.name}</div>
                                                            </div>
                                                            <span className="material-icons-round text-slate-300 group-hover/item:text-primary transition-colors">chevron_right</span>
                                                        </div>
                                                    )) : (
                                                        <div className="p-4 bg-slate-100/50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs italic">Regional folk festivals only</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)}>
                    <div className="modal-window max-w-4xl" onClick={e => e.stopPropagation()}>
                        <div className={`p-12 bg-gradient-to-br ${selected.gradient} text-white relative`}>
                            <button className="modal-close" onClick={() => setSelected(null)}>
                                <span className="material-icons-round">close</span>
                            </button>
                            <div className="flex items-center gap-2 text-white/70 uppercase font-black text-xs tracking-widest mb-4">
                                <span className="material-icons-round text-sm">{selected.icon}</span>
                                {selected.category} Festival
                            </div>
                            <h2 className="text-5xl font-black mb-2">{selected.name}</h2>
                            <p className="text-xl opacity-90 italic">"{selected.alias}"</p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                                    <span className="material-icons-round text-sm">calendar_month</span>
                                    {selected.month}
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                                    <span className="material-icons-round text-sm">location_on</span>
                                    {selected.state}
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2">
                                    <span className="material-icons-round text-sm">wb_sunny</span>
                                    {selected.season}
                                </div>
                            </div>
                        </div>

                        <div className="modal-body-scroll p-12 bg-slate-50 flex flex-col lg:grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-8">
                                <section>
                                    <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="material-icons-round text-primary text-lg">history_edu</span>
                                        Historical Significance
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-lg bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        {selected.history}
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="material-icons-round text-primary text-lg">mosque</span>
                                        Rituals & Traditions
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        {selected.traditions}
                                    </p>
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                                        <h4 className="font-black text-xs text-emerald-800 uppercase mb-3 tracking-wider flex items-center gap-2">
                                            <span className="material-icons-round">restaurant</span> Popular Foods
                                        </h4>
                                        <p className="text-emerald-900 text-sm font-medium">{selected.popularFoods}</p>
                                    </div>
                                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                                        <h4 className="font-black text-xs text-indigo-800 uppercase mb-3 tracking-wider flex items-center gap-2">
                                            <span className="material-icons-round">checkroom</span> Recommended Attire
                                        </h4>
                                        <p className="text-indigo-900 text-sm font-medium">{selected.dressCode}</p>
                                    </div>
                                </div>

                                <section>
                                    <h4 className="font-black text-xs text-slate-400 uppercase mb-4 tracking-wider">Main Festivities</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selected.activities.split(',').map((act, i) => (
                                            <span key={i} className="px-4 py-2 bg-white rounded-xl text-slate-700 text-sm font-bold border border-slate-100 shadow-sm">{act.trim()}</span>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                                    <div className="absolute bottom-0 right-0 p-4 opacity-10">
                                        <span className="material-icons-round text-8xl">airplane_ticket</span>
                                    </div>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                        <span className="material-icons-round text-indigo-400">tips_and_updates</span>
                                        Traveler Guide
                                    </h3>

                                    <div className="space-y-6 relative z-10">
                                        <div>
                                            <div className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">Top Hubs</div>
                                            <div className="text-sm font-medium leading-relaxed">{selected.bestPlace}</div>
                                        </div>
                                        <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                            <div className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-1">Pro Tip</div>
                                            <div className="text-xs italic text-indigo-100">{selected.touristTips}</div>
                                        </div>
                                        <button
                                            className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black text-sm rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
                                            onClick={() => { setView('planner'); setSelected(null); }}
                                        >
                                            <span className="material-icons-round">route</span>
                                            Plan Trip for {selected.name}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <h4 className="font-black text-xs text-slate-400 uppercase mb-4 tracking-wider">Nearby Attractions</h4>
                                    <div className="text-sm text-slate-600 font-medium">
                                        {selected.nearby}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 8. COMMUNITY SOCIAL HUB ---


// --- 8. COMMUNITY ---
const Community = () => {
    // Current user context as per requirements
    const storedUsername = localStorage.getItem('username') || "Traveler";
    const currentUser = {
        id: "usr_" + storedUsername.toLowerCase().replace(/\s/g, ''),
        name: storedUsername,
        verified: true,
        avatar: storedUsername.charAt(0).toUpperCase(),
        avatarBg: "#10b981"
    };

    const getTimeAgo = (timestamp) => {
        if (!timestamp) return "";
        const now = new Date();
        const diff = Math.floor((now - new Date(timestamp)) / 1000);

        if (diff < 60) return "Just now";
        if (diff < 3600) return Math.floor(diff / 60) + " mins ago";
        if (diff < 86400) return Math.floor(diff / 3600) + " hrs ago";
        return Math.floor(diff / 86400) + " days ago";
    };

    // State initialization from local storage
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('ti_community_posts_v4');
        if (saved) return JSON.parse(saved);
        return [
            {
                id: 1,
                user: { id: "usr_janeaustrian", name: "Jane Austrian" },
                avatar: "J",
                avatarBg: "var(--primary)",
                verified: true,
                content: "Just completed the Golden Triangle as a solo female! Tip: Use Uber for everything in Delhi/Jaipur to avoid auto haggling. Totally safe if you stick to daytime transits.",
                likes: 142,
                commentsLabel: "Comments",
                originalCommentsCount: 15,
                comments: [],
                createdAt: new Date(Date.now() - 3600000).toISOString()
            },
            {
                id: 2,
                user: { id: "usr_mikechen", name: "Mike Chen" },
                avatar: "M",
                avatarBg: "#8b5cf6",
                verified: false,
                content: "Any recommendations for trustworthy filtered water brands when traveling rural Kerala?",
                likes: 12,
                commentsLabel: "Answers",
                originalCommentsCount: 8,
                comments: [],
                createdAt: new Date(Date.now() - 86500000).toISOString()
            }
        ];
    });

    const [userLikes, setUserLikes] = useState(() => {
        const saved = localStorage.getItem('ti_community_likes_v4');
        return saved ? JSON.parse(saved) : {};
    });

    const [tick, setTick] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), 60000);
        return () => clearInterval(timer);
    }, []);

    // Sub-states
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState('');
    const [newPost, setNewPost] = useState({ title: '', content: '', destination: '', category: 'Travel Experience' });
    const [openComments, setOpenComments] = useState({});
    const [commentInputs, setCommentInputs] = useState({});

    // Persistence effects
    useEffect(() => {
        localStorage.setItem('ti_community_posts_v4', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('ti_community_likes_v4', JSON.stringify(userLikes));
    }, [userLikes]);

    // Handlers
    const handlePostUpdateClick = () => {
        if (!currentUser.verified) {
            alert("Only verified travelers can post updates");
            return;
        }
        setShowModal(true);
    };

    const submitPost = (e) => {
        e.preventDefault();
        if (!newPost.content.trim()) return;

        const post = {
            id: Date.now(),
            user: { id: currentUser.id, name: currentUser.name },
            avatar: currentUser.avatar,
            avatarBg: currentUser.avatarBg,
            verified: currentUser.verified,
            title: newPost.title,
            category: newPost.category,
            destination: newPost.destination,
            content: newPost.content,
            likes: 0,
            originalCommentsCount: 0,
            commentsLabel: "Comments",
            comments: [],
            createdAt: new Date().toISOString()
        };

        setPosts([post, ...posts]);
        setShowModal(false);
        setNewPost({ title: '', content: '', destination: '', category: 'Travel Experience' });

        setToast("Post shared successfully");
        setTimeout(() => setToast(''), 3000);
    };

    const deletePost = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            setPosts(posts.filter(p => p.id !== postId));
            setToast("Post deleted successfully");
            setTimeout(() => setToast(''), 3000);
        }
    };

    const toggleLike = (postId) => {
        const isLiked = userLikes[postId];
        const newLikes = { ...userLikes };

        if (isLiked) {
            delete newLikes[postId];
            setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
        } else {
            newLikes[postId] = true;
            setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
        }
        setUserLikes(newLikes);
    };

    const submitComment = (postId) => {
        const text = commentInputs[postId];
        if (!text || !text.trim()) return;

        setPosts(posts.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    comments: [...p.comments, { id: Date.now(), user: currentUser.name, text }]
                };
            }
            return p;
        }));

        setCommentInputs({ ...commentInputs, [postId]: '' });
    };

    return (
        <div style={{ position: 'relative' }}>
            {toast && (
                <div style={{ position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', fontWeight: 'bold', zIndex: 1000, animation: 'fadeIn 0.3s ease-out' }}>
                    {toast}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--sidebar-bg)' }}>Verified Traveler Forum</h2>
                <button className="btn-primary" onClick={handlePostUpdateClick}>Post Update</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {posts.map(post => (
                    <div className="snap-card" key={post.id} style={{ position: 'relative' }}>
                        {currentUser.id === post.user.id && (
                            <button onClick={() => deletePost(post.id)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%' }} title="Delete Post">
                                <span className="material-icons-round" style={{ fontSize: '1.2rem' }}>delete</span>
                            </button>
                        )}
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                            <div className="time-bubble" style={{ width: '40px', height: '40px', background: post.avatarBg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{post.avatar}</div>
                            <div>
                                <strong>{post.user.name}</strong>
                                {post.verified && <span style={{ fontSize: '0.7rem', background: '#d1fae5', color: '#065f46', padding: '0.2rem 0.5rem', borderRadius: '4px', marginLeft: '0.5rem' }}>Verified Traveler</span>}
                                {post.createdAt && <span style={{ fontSize: '0.8rem', color: 'gray', marginLeft: '0.5rem' }}>• {getTimeAgo(post.createdAt)}</span>}
                                {post.destination && <span style={{ fontSize: '0.75rem', background: '#fef5e7', color: '#b7791f', padding: '0.2em 0.5em', borderRadius: '4px', marginLeft: '0.5rem' }}>📍 {post.destination}</span>}
                            </div>
                        </div>

                        {post.title && <h3 style={{ marginBottom: '0.25rem', color: 'var(--sidebar-bg)' }}>{post.title}</h3>}
                        {post.category && <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>{post.category}</div>}

                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{post.content}</p>

                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                            <span
                                onClick={() => toggleLike(post.id)}
                                style={{ color: userLikes[post.id] ? 'var(--primary)' : 'gray', cursor: 'pointer', fontWeight: '600', transition: 'color 0.2s', userSelect: 'none' }}
                            >
                                👍 {post.likes} Likes
                            </span>
                            <span
                                onClick={() => setOpenComments({ ...openComments, [post.id]: !openComments[post.id] })}
                                style={{ color: openComments[post.id] || post.comments.length > 0 ? 'var(--primary)' : 'gray', cursor: 'pointer', fontWeight: '600', transition: 'color 0.2s', userSelect: 'none' }}
                            >
                                💬 {post.originalCommentsCount + post.comments.length} {post.commentsLabel || 'Comments'}
                            </span>
                        </div>

                        {openComments[post.id] && (
                            <div style={{ marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', animation: 'fadeIn 0.2s ease-out' }}>
                                {post.comments.map(c => (
                                    <div key={c.id} style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>{c.user}</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{c.text}</div>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Add to the conversation..."
                                        value={commentInputs[post.id] || ''}
                                        onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                                        onKeyPress={e => e.key === 'Enter' && submitComment(post.id)}
                                        style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid #cbd5e1', outline: 'none' }}
                                    />
                                    <button onClick={() => submitComment(post.id)} className="btn-primary" style={{ padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)' }}>Post</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, animation: 'fadeIn 0.2s ease-out' }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '90%', maxWidth: '500px', padding: '2rem', boxShadow: 'var(--shadow-xl)' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--sidebar-bg)' }}>Share an Update</h2>
                        <form onSubmit={submitPost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'gray', marginBottom: '0.3rem' }}>Title</label>
                                <input required type="text" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="e.g., Hidden cafe in Jaipur!" style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'gray', marginBottom: '0.3rem' }}>Destination (Optional)</label>
                                    <input type="text" value={newPost.destination} onChange={e => setNewPost({ ...newPost, destination: e.target.value })} placeholder="e.g., Jaipur" style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', outline: 'none' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'gray', marginBottom: '0.3rem' }}>Category</label>
                                    <select value={newPost.category} onChange={e => setNewPost({ ...newPost, category: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', outline: 'none', background: 'white' }}>
                                        <option>Travel Experience</option>
                                        <option>Travel Tip</option>
                                        <option>Question</option>
                                        <option>Alert</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'gray', marginBottom: '0.3rem' }}>Experience / Update</label>
                                <textarea required value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} placeholder="Tell the community about your travel experience..." style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)', outline: 'none', minHeight: '100px', resize: 'vertical' }}></textarea>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'gray', fontSize: '0.85rem' }}>
                                <span className="material-icons-round" style={{ fontSize: '1.2rem' }}>image</span> Optional Image Upload
                                <input type="file" style={{ fontSize: '0.7rem' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.8rem 1.5rem', background: '#f1f5f9', color: '#475569', borderRadius: 'var(--radius-md)', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-md)' }}>Submit Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- 9. SAFETY ---
const Safety = () => (
    <div>
        <div className="sos-card">
            <h1 style={{ color: '#991b1b', fontSize: '3rem', marginBottom: '2rem' }}>DISPATCH EMERGENCY</h1>
            <button className="sos-btn-huge"><span className="material-icons-round" style={{ fontSize: '4rem' }}>sensors</span></button>
            <p style={{ color: '#b91c1c', fontWeight: 'bold', fontSize: '1.2rem' }}>Pressing this broadcasts your live GPS location to local Indian Authorities and your emergency contacts.</p>
        </div>
        <div className="snapshot-grid">
            <div className="snap-card" style={{ borderColor: 'var(--danger)' }}><h3 style={{ color: 'var(--danger)' }}>Direct Hotlines</h3><ul className="snap-list" style={{ marginTop: '1rem' }}><li><strong>112</strong> - National Emergency (Pan India)</li><li><strong>108</strong> - Ambulance Operations</li><li><strong>1091</strong> - Women Helpline</li></ul></div>
            <div className="snap-card"><h3>Health Defense</h3><ul className="snap-list" style={{ marginTop: '1rem' }}><li>Never consume open tap water. Buy sealed "Kinley" or "Aquafina".</li><li>Carry Mosquito Repellent (Odomos).</li><li>Street food MUST be served piping hot in front of you.</li></ul></div>
            <div className="snap-card"><h3>Scam Radar</h3><ul className="snap-list" style={{ marginTop: '1rem' }}><li>Ignore people telling you "Your hotel is closed/burned down".</li><li>Always enforce taximeters or pre-pay via apps.</li><li>Book trains ONLY on IRCTC or verified agents.</li></ul></div>
        </div>
    </div>
);

// --- BONUS SECTIONS ---
// --- FOOD GUIDE DATA ---
const FOOD_STATES = [
    { id: 'tn', name: "Tamil Nadu", famous: "Dosa, Idli, Pongal", city: "Chennai, Madurai", type: "South Indian", drink: "Filter Coffee", sweet: "Mysore Pak", spice: "Medium", vegScore: "95%", history: "Rooted in Sangam literature, Tamil cuisine heavily features rice, legumes, and intricate spice blends.", ingredients: "Rice, Urad Dal, Curry Leaves, Tamarind, Mustard seeds.", price: "₹50 - ₹200", recommend: "Highly Recommended for Vegetarians." },
    { id: 'kl', name: "Kerala", famous: "Appam, Puttu, Fish Curry", city: "Kochi, Trivandrum", type: "South Indian Coastal", drink: "Toddy, Sambharam", sweet: "Palada Payasam", spice: "High", vegScore: "40%", history: "Known as the Land of Spices, Kerala cuisine is heavily influenced by its coastline and historical trade routes.", ingredients: "Coconut, River Fish, Black Pepper, Rice flour.", price: "₹100 - ₹400", recommend: "Seafood lovers paradise." },
    { id: 'ka', name: "Karnataka", famous: "Bisi Bele Bath, Neer Dosa", city: "Mysuru, Bangalore", type: "South Indian", drink: "Filter Coffee", sweet: "Mysore Pak, Dharwad Peda", spice: "Medium", vegScore: "85%", history: "Features unique geographic culinary divides (Udupi, Mangalorean, Kodava). Udupi cuisine popularized the Masala Dosa globally.", ingredients: "Toor dal, Tamarind, Coconut, Rice.", price: "₹60 - ₹250", recommend: "Very safe for mild-spice seekers." },
    { id: 'ap', name: "Andhra Pradesh", famous: "Gongura Pachadi, Pesarattu", city: "Vijayawada", type: "South Indian", drink: "Buttermilk", sweet: "Pootharekulu", spice: "Extreme", vegScore: "60%", history: "Famed for being the spiciest cuisine in India, heavily utilizing red chilies and tamarind.", ingredients: "Gongura leaves, Red chilies, Rice.", price: "₹80 - ₹300", recommend: "Warning: Extremely Spicy!" },
    { id: 'tg', name: "Telangana", famous: "Hyderabadi Biryani, Haleem", city: "Hyderabad", type: "Mughlai & Telugu", drink: "Irani Chai", sweet: "Double ka Meetha", spice: "High", vegScore: "35%", history: "A royal blend of traditional Telugu cuisine and the rich, slow-cooked Mughlai culinary traditions.", ingredients: "Basmati rice, Mutton, Saffron, Ghee.", price: "₹200 - ₹500", recommend: "A global culinary heritage site." },
    { id: 'mh', name: "Maharashtra", famous: "Vada Pav, Misal Pav", city: "Mumbai, Pune", type: "West Indian", drink: "Kokum Juice", sweet: "Modak, Puran Poli", spice: "High", vegScore: "75%", history: "From fast-paced Mumbai street food to the fiery coastal Malvani seafood.", ingredients: "Besan, Potatoes, Tamarind, Coconut.", price: "₹20 - ₹200", recommend: "The ultimate street food destination." },
    { id: 'gj', name: "Gujarat", famous: "Dhokla, Thepla, Fafda", city: "Ahmedabad, Surat", type: "West Indian", drink: "Chaas (Buttermilk)", sweet: "Jalebi", spice: "Mild (Sweet undertones)", vegScore: "99%", history: "Predominantly vegetarian cuisine known for adding slight sweetness (jaggery/sugar) to savory dishes.", ingredients: "Gram flour, Yogurt, Sugar, Spices.", price: "₹50 - ₹250", recommend: "Perfect for foreign tourists easing into Indian food." },
    { id: 'rj', name: "Rajasthan", famous: "Dal Baati Churma, Laal Maas", city: "Jaipur, Jodhpur", type: "North/Desert Indian", drink: "Makhaniya Lassi", sweet: "Ghevar", spice: "High", vegScore: "80%", history: "Shaped by harsh desert conditions and a royal heritage, dishes are rich in ghee and can last for days without water.", ingredients: "Lentils, Whole wheat, Ghee, Mathania chilies.", price: "₹150 - ₹600", recommend: "Rich, heavy, and majestic." },
    { id: 'pb', name: "Punjab", famous: "Butter Chicken, Chole Bhature", city: "Amritsar", type: "North Indian", drink: "Lassi", sweet: "Pinni", spice: "Medium", vegScore: "60%", history: "The breadbasket of India. Rich, robust flavors heavily utilizing dairy and tandoor (clay oven) cooking.", ingredients: "Wheat, Paneer, Chicken, Butter, Cream.", price: "₹100 - ₹400", recommend: "Globally recognized flavors, very satisfying." },
    { id: 'dl', name: "Delhi", famous: "Chaat, Nihari, Paranthas", city: "Old Delhi", type: "Mughlai/Street", drink: "Banta (Lemon Soda)", sweet: "Rabri Falooda", spice: "Medium-High", vegScore: "50%", history: "A historic melting pot of empires resulting in incredible street food and ancient Mughlai kitchens.", ingredients: "Flour, Chickpeas, Mutton, Spices.", price: "₹50 - ₹500", recommend: "Food capitals of the world. Eat carefully on the street." },
    { id: 'up', name: "Uttar Pradesh", famous: "Tunday Kebab, Chaat", city: "Lucknow, Varanasi", type: "Awadhi / North Indian", drink: "Thandai", sweet: "Peda", spice: "Medium", vegScore: "55%", history: "Lucknow represents the pinnacle of Awadhi royal cuisine with melt-in-the-mouth slow-cooked kebabs.", ingredients: "Minced meat, Green cardamom, Saffron, Besan.", price: "₹100 - ₹400", recommend: "The kebab capital of India." },
    { id: 'wb', name: "West Bengal", famous: "Kosha Mangsho, Fish Curry", city: "Kolkata", type: "East Indian", drink: "Aam Pora Shorbot", sweet: "Rosogolla, Sandesh", spice: "Medium", vegScore: "30%", history: "Characterized by mustard oil, subtle spicing (Panch Phoron), and an obsession with river fish and sweets.", ingredients: "Mustard oil, Hilsa Fish, Chhena, Poppy seeds.", price: "₹100 - ₹350", recommend: "A must-visit for dessert and fish lovers." },
    { id: 'bh', name: "Bihar", famous: "Litti Chokha", city: "Patna", type: "East Indian", drink: "Sattu Sharbat", sweet: "Khaja", spice: "Medium", vegScore: "85%", history: "Rustic, robust cuisine heavily reliant on roasted gram flour (sattu) and mustard oil.", ingredients: "Sattu, Wheat flour, Brinjal, Garlic.", price: "₹30 - ₹150", recommend: "Earthy, healthy, and deeply traditional." },
    { id: 'as', name: "Assam", famous: "Masor Tenga, Pitha", city: "Guwahati", type: "Northeast Indian", drink: "Assam Tea", sweet: "Narikolor Laru", spice: "Mild-Medium", vegScore: "30%", history: "Minimal use of spices, focusing on fresh, fermented ingredients, bamboo shoots, and souring agents.", ingredients: "River fish, Elephant apple, Bamboo shoot, Rice.", price: "₹100 - ₹300", recommend: "Very different from mainstream Indian food. Fresh flavors." },
    { id: 'jk', name: "Kashmir", famous: "Wazwan, Rogan Josh", city: "Srinagar", type: "North / Mountain", drink: "Kahwa", sweet: "Shufta", spice: "Mild", vegScore: "20%", history: "The ultimate meat feast. The Wazwan is a 36-course meal of predominantly sheep/lamb dishes.", ingredients: "Lamb, Fennel, Mawal flowers, Saffron.", price: "₹400 - ₹1500", recommend: "A luxurious experience for meat eaters." },
    { id: 'ga', name: "Goa", famous: "Prawn Curry, Vindaloo", city: "Panaji", type: "Coastal / Indo-Portuguese", drink: "Feni", sweet: "Bebinca", spice: "Medium-High", vegScore: "30%", history: "A 400-year Portuguese culinary influence blended with vibrant Konkan coastal spices.", ingredients: "Prawns, Pork, Coconut vinegar, Kokum.", price: "₹200 - ₹800", recommend: "Holiday food. Amazing seafood and unique alcohol." }
];

const STREET_FOODS = [
    { name: "Mumbai Vada Pav", city: "Mumbai", hygiene: "Moderate", time: "Evening Snack", cost: "₹20", icon: "fastfood" },
    { name: "Delhi Chaat", city: "Delhi", hygiene: "Low/Caution", time: "Late Afternoon", cost: "₹60", icon: "restaurant" },
    { name: "Kolkata Kathi Roll", city: "Kolkata", hygiene: "Moderate", time: "Evening", cost: "₹50", icon: "lunch_dining" },
    { name: "Chennai Sundal", city: "Chennai", hygiene: "High", time: "Beach Evening", cost: "₹30", icon: "tapas" },
    { name: "Hyderabad Haleem", city: "Hyderabad", hygiene: "High", time: "Ramadan Nights", cost: "₹200", icon: "rice_bowl" },
    { name: "Lucknow Kebabs", city: "Lucknow", hygiene: "Moderate", time: "Dinner", cost: "₹150", icon: "kebab_dining" },
    { name: "Jaipur Pyaaz Kachori", city: "Jaipur", hygiene: "High", time: "Breakfast", cost: "₹40", icon: "bakery_dining" }
];

const BUDGET_DATA = {
    under100: ["Samosa", "Idli", "Chai", "Vada Pav", "Poha", "Chole Kulche"],
    mid: ["Meals Combo", "Thali", "Dosa Sets", "Biryani (Half)", "Kathi Rolls"],
    premium: ["Seafood Platters", "Specialty Thalis", "Fine Dining Regional Meals", "Wazwan", "Laal Maas"]
};

// --- BONUS SECTIONS ---
const FoodGuide = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedDish, setSelectedDish] = useState(null);

    const filters = ["All", "South Indian", "North Indian", "Street Food", "Mild Spice", "Veg Heavily", "Coastal"];

    // Basic logic mapping for filters
    const filteredStates = FOOD_STATES.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.famous.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.city.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;
        if (activeFilter === "South Indian") matchesFilter = s.type.includes("South");
        if (activeFilter === "North Indian") matchesFilter = s.type.includes("North");
        if (activeFilter === "Mild Spice") matchesFilter = s.spice.includes("Mild");
        if (activeFilter === "Veg Heavily") matchesFilter = parseInt(s.vegScore) > 70;
        if (activeFilter === "Coastal") matchesFilter = s.type.includes("Coastal") || s.id === 'wb' || s.id === 'ga' || s.id === 'kl';

        return matchesSearch && matchesFilter;
    });

    const smartAssistantRecs = useMemo(() => {
        const safe = ["Idli & Sambar", "Plain Dosa", "Khichdi", "Paneer Butter Masala", "Appam & Stew", "Dal Tadka (Less spicy)"];
        const cooling = ["Curd Rice", "Sweet Lassi", "Raita", "Coconut Water", "Chaas (Buttermilk)", "Plain Yogurt"];
        const random = FOOD_STATES[Math.floor(Math.random() * FOOD_STATES.length)];
        return { safe, cooling, random };
    }, []);

    const openModal = (data) => setSelectedDish(data);
    const closeModal = () => setSelectedDish(null);

    return (
        <div className="space-y-8 animate-fadeIn text-slate-800">
            {/* EXISTING SURVIVAL GUIDE SECTION - PRESERVED EXACTLY */}
            <div>
                <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}>
                    <h2>Ultimate Survival Food Guide</h2>
                    <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Navigate the incredibly diverse and spicy world of Indian cuisine safely.</p>
                </div>
                <div className="snapshot-grid">
                    <div className="snap-card" style={{ borderTop: '4px solid #ef4444' }}>
                        <div className="snap-header"><div className="snap-icon" style={{ background: '#fef2f2', color: '#ef4444' }}><span className="material-icons-round">local_fire_department</span></div><h3>Spice Protocols</h3></div>
                        <ul className="snap-list">
                            <li>"Medium spicy" in India is often "Very Spicy" for tourists. Ask for "Non-spicy" intentionally.</li>
                            <li>Always keep cooling sides like Raita (yogurt) or Lassi handy while eating curries.</li>
                            <li>Carry basic antacids; adjusting to Indian spices takes around 3-4 days.</li>
                        </ul>
                    </div>
                    <div className="snap-card" style={{ borderTop: '4px solid #10b981' }}>
                        <div className="snap-header"><div className="snap-icon" style={{ background: '#ecfdf5', color: '#10b981' }}><span className="material-icons-round">health_and_safety</span></div><h3>Hygiene Rules</h3></div>
                        <ul className="snap-list">
                            <li><strong>Never</strong> consume tap water, salads, or cut fruits from street vendors.</li>
                            <li>Eat street food only where you see high crowds and food cooked piping hot in front of you.</li>
                            <li>Stick to packaged mineral water (look for unbroken seals on Kinley or Bisleri).</li>
                        </ul>
                    </div>
                    <div className="snap-card" style={{ borderTop: '4px solid #f59e0b' }}>
                        <div className="snap-header"><div className="snap-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}><span className="material-icons-round">restaurant</span></div><h3>Regional Highlights</h3></div>
                        <ul className="snap-list">
                            <li><strong>North:</strong> Butter Chicken, Chole Bhature, Tandoori Naan.</li>
                            <li><strong>South:</strong> Dosa, Idli, Coconut Chutney, Malabar Seafood.</li>
                            <li><strong>West:</strong> Vada Pav, Dhokla, Goan Fish Curry.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* SEPARATOR */}
            <div className="pt-8 border-t border-slate-200">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-slate-900">Indian Food Explorer</h2>
                    <p className="text-slate-500 mt-2 text-lg">A premium discovery engine for the continent's culinary depths.</p>
                </div>
            </div>

            {/* 1. SEARCH & FILTER */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="relative">
                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder="Search dishes, state, city, ingredients..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-700"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {filters.map(c => (
                        <button
                            key={c}
                            onClick={() => setActiveFilter(c)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeFilter === c ? 'bg-orange-500 border-orange-500 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* 5. SMART TOURIST FOOD ASSISTANT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[30px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <h3 className="font-black text-lg">What Should I Eat?</h3>
                        <span className="material-icons-round">shuffle</span>
                    </div>
                    <p className="text-indigo-100 text-sm mb-4 relative z-10 h-10">Random authentic recommendation based on current mood.</p>
                    <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg relative z-10 active:scale-95 transition-transform" onClick={() => openModal(smartAssistantRecs.random)}>
                        Generate Dish
                    </button>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-emerald-600">
                        <span className="material-icons-round">health_and_safety</span>
                        <h3 className="font-black text-slate-900">Safe for Tourists</h3>
                    </div>
                    <p className="text-slate-500 text-xs mb-4">Mild, widely available dishes recommended for foreign stomachs.</p>
                    <div className="flex flex-wrap gap-2">
                        {smartAssistantRecs.safe.map(d => <span key={d} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg">{d}</span>)}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-blue-600">
                        <span className="material-icons-round">dew_point</span>
                        <h3 className="font-black text-slate-900">Too Spicy?</h3>
                    </div>
                    <p className="text-slate-500 text-xs mb-4">Immediate cooling relief options available at any restaurant.</p>
                    <div className="flex flex-wrap gap-2">
                        {smartAssistantRecs.cooling.map(d => <span key={d} className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg">{d}</span>)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* 6. REGIONAL FOOD MAPS (INTERACTIVE GRID) & 2. EXPLORE STATES */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between pointer-events-none">
                        <h3 className="font-black text-xl text-slate-900">Explore by State</h3>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredStates.length} Regions Found</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredStates.map(state => (
                            <div key={state.id} onClick={() => openModal(state)} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-orange-500/80 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-black text-lg text-slate-900 group-hover:text-orange-600 transition-colors">{state.name}</h4>
                                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">{state.city}</div>
                                    </div>
                                    <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${state.spice.includes('High') || state.spice.includes('Extreme') ? 'bg-red-50 text-red-600' : state.spice.includes('Mild') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                        {state.spice} Spice
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-slate-700 mb-4">{state.famous}</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-slate-50 p-2 rounded-lg text-slate-600">
                                        <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Drink</span>
                                        {state.drink}
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded-lg text-slate-600">
                                        <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Veg Score</span>
                                        <span className="font-black text-emerald-600">{state.vegScore}</span> Local
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* 4. STREET FOOD EXPLORER */}
                    <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 text-slate-800 opacity-50">
                            <span className="material-icons-round text-[120px]">storefront</span>
                        </div>
                        <h3 className="font-black text-xl mb-6 relative z-10 text-orange-400">Iconic Street Foods</h3>
                        <div className="space-y-4 relative z-10 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                            {STREET_FOODS.map(sf => (
                                <div key={sf.name} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-bold text-white group-hover:text-orange-400 transition-colors">{sf.name}</div>
                                        <div className="text-xs font-black bg-slate-900 px-2 py-1 rounded text-slate-300">{sf.cost}</div>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider font-bold">
                                        <span className="text-slate-400 flex items-center gap-1"><span className="material-icons-round text-sm">schedule</span> {sf.time}</span>
                                        <span className={`flex items-center gap-1 ${sf.hygiene === 'High' ? 'text-emerald-400' : sf.hygiene === 'Moderate' ? 'text-amber-400' : 'text-red-400'}`}>
                                            <span className="material-icons-round text-sm">policy</span> {sf.hygiene}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 7. FOOD BUDGET GUIDE */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-icons-round text-emerald-500">payments</span>
                            Budget Navigation
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-widest">Under ₹100 ($1.20)</div>
                                <div className="flex flex-wrap gap-1">
                                    {BUDGET_DATA.under100.map(i => <span key={i} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded-md">{i}</span>)}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase text-amber-600 mb-2 tracking-widest">₹100 - ₹300 ($4)</div>
                                <div className="flex flex-wrap gap-1">
                                    {BUDGET_DATA.mid.map(i => <span key={i} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded-md">{i}</span>)}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase text-purple-600 mb-2 tracking-widest">Premium ₹300+</div>
                                <div className="flex flex-wrap gap-1">
                                    {BUDGET_DATA.premium.map(i => <span key={i} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded-md">{i}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 8. MUST TRY BY CATEGORY & 10. SEASONAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 relative overflow-hidden">
                    <span className="material-icons-round absolute -right-4 -bottom-4 text-[100px] text-rose-500/10">cake</span>
                    <h3 className="font-black text-rose-900 mb-4 flex items-center gap-2 relative z-10">
                        <span className="material-icons-round text-rose-500">bakery_dining</span> Category Hits
                    </h3>
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <div>
                            <div className="text-rose-800 text-xs font-black uppercase mb-1">Breakfast</div>
                            <div className="text-sm text-rose-700/80">Idli, Poha, Paratha</div>
                        </div>
                        <div>
                            <div className="text-rose-800 text-xs font-black uppercase mb-1">Snacks (Chaat)</div>
                            <div className="text-sm text-rose-700/80">Samosa, Pakora, Bhel</div>
                        </div>
                        <div>
                            <div className="text-rose-800 text-xs font-black uppercase mb-1">Lunch Meals</div>
                            <div className="text-sm text-rose-700/80">Thali, Biryani</div>
                        </div>
                        <div>
                            <div className="text-rose-800 text-xs font-black uppercase mb-1">Desserts</div>
                            <div className="text-sm text-rose-700/80">Gulab Jamun, Rasmalai</div>
                        </div>
                    </div>
                </div>

                <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 relative overflow-hidden">
                    <span className="material-icons-round absolute -right-4 -bottom-4 text-[100px] text-sky-500/10">ac_unit</span>
                    <h3 className="font-black text-sky-900 mb-4 flex items-center gap-2 relative z-10">
                        <span className="material-icons-round text-sky-500">wb_sunny</span> Seasonal Shifts
                    </h3>
                    <div className="space-y-3 relative z-10">
                        <div className="flex border-b border-sky-200/50 pb-2">
                            <span className="w-24 text-xs font-black text-sky-800 uppercase tracking-wider">Summer</span>
                            <span className="text-sm text-sky-700/80">Lassi, Aamras, Buttermilk, Sugarcane Juice</span>
                        </div>
                        <div className="flex border-b border-sky-200/50 pb-2">
                            <span className="w-24 text-xs font-black text-sky-800 uppercase tracking-wider">Monsoon</span>
                            <span className="text-sm text-sky-700/80">Pakora, Ginger Chai, Bhutta (Roasted Corn)</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-xs font-black text-sky-800 uppercase tracking-wider">Winter</span>
                            <span className="text-sm text-sky-700/80">Gajar Halwa, Sarson da Saag, Kashmiri Kahwa</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 9. TOURIST SAFETY EXTENSION */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                <h3 className="font-black text-amber-900 mb-4 flex items-center gap-2">
                    <span className="material-icons-round text-amber-600">warning</span>
                    Golden Rules for Foreign Stomachs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-amber-100 text-center">
                        <span className="material-icons-round text-amber-400 mb-2">water_drop</span>
                        <div className="text-xs font-bold text-slate-700">Strictly Bottled Water</div>
                        <div className="text-[10px] text-slate-500 mt-1">Check seals. Use Kinley/Bisleri.</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-amber-100 text-center">
                        <span className="material-icons-round text-emerald-400 mb-2">local_fire_department</span>
                        <div className="text-xs font-bold text-slate-700">Piping Hot Only</div>
                        <div className="text-[10px] text-slate-500 mt-1">If it's steaming, bacteria is dead.</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-amber-100 text-center">
                        <span className="material-icons-round text-red-400 mb-2">block</span>
                        <div className="text-xs font-bold text-slate-700">No Raw Cut Fruits</div>
                        <div className="text-[10px] text-slate-500 mt-1">Unless you peel it yourself.</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-amber-100 text-center">
                        <span className="material-icons-round text-blue-400 mb-2">qr_code_2</span>
                        <div className="text-xs font-bold text-slate-700">Use UPI Payments</div>
                        <div className="text-[10px] text-slate-500 mt-1">Avoids handling dirty cash.</div>
                    </div>
                </div>
            </div>

            {/* 3. MODAL / POPUP DETAILS */}
            {selectedDish && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fadeIn" onClick={e => e.stopPropagation()}>
                        <div className="relative h-32 bg-gradient-to-r from-orange-400 to-rose-500 flex flex-col justify-end p-6 text-white">
                            <button className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 p-1 rounded-full text-white transition-colors flex items-center justify-center p-1" onClick={closeModal}>
                                <span className="material-icons-round">close</span>
                            </button>
                            <div className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">{selectedDish.type} Cuisine</div>
                            <h2 className="text-3xl font-black">{selectedDish.name}</h2>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-center">
                                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Spice Level</span>
                                    <span className={`font-black text-sm ${selectedDish.spice.includes('High') || selectedDish.spice.includes('Extreme') ? 'text-red-500' : selectedDish.spice.includes('Mild') ? 'text-emerald-500' : 'text-amber-500'}`}>{selectedDish.spice}</span>
                                </div>
                                <div className="w-px h-8 bg-slate-200"></div>
                                <div className="text-center">
                                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Avg Price</span>
                                    <span className="font-black text-sm text-slate-700">{selectedDish.price}</span>
                                </div>
                                <div className="w-px h-8 bg-slate-200"></div>
                                <div className="text-center">
                                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Veg Friendly</span>
                                    <span className="font-black text-sm text-emerald-600">{selectedDish.vegScore}</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><span className="material-icons-round text-sm">history_edu</span> Culinary History</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{selectedDish.history}</p>
                            </div>

                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                <h4 className="text-xs font-black text-orange-800 uppercase tracking-widest mb-2 flex items-center gap-2"><span className="material-icons-round text-sm">star</span> Must Try Dishes</h4>
                                <p className="text-orange-900 font-bold">{selectedDish.famous}, ending with {selectedDish.sweet}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Key Ingredients</h4>
                                    <p className="text-sm text-slate-700 font-medium">{selectedDish.ingredients}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Best Cities to Eat</h4>
                                    <p className="text-sm text-slate-700 font-medium">{selectedDish.city}</p>
                                </div>
                            </div>

                            <div className="bg-slate-900 text-white p-4 rounded-xl flex items-start gap-4">
                                <span className="material-icons-round text-emerald-400 mt-0.5">verified_user</span>
                                <div>
                                    <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-1">Tourist Verdict</div>
                                    <div className="text-sm font-medium leading-snug">{selectedDish.recommend}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TRANSPORT_DOMAINS = {
    train: {
        title: "Train Travel (IRCTC)",
        icon: "train", color: "blue",
        desc: "The world's 4th largest railway network. Ideal for overnight medium to long-distance travel.",
        tips: ["Book 30-90 days in advance via IRCTC.", "Use the 'Foreign Tourist Quota' if regular tickets are waitlisted.", "Opt for 2AC or 3AC (Air-Conditioned) classes for comfort and security."],
        links: [{ name: "IRCTC Official Website", url: "https://www.irctc.co.in/" }, { name: "IRCTC Rail Connect App", url: "https://play.google.com/store/apps/details?id=cris.org.in.prs.ima" }]
    },
    flight: {
        title: "Domestic Flights",
        icon: "flight", color: "sky",
        desc: "Best for saving time when skipping across regions (e.g., North to South India).",
        tips: ["Book 3-4 weeks prior for budget airlines (IndiGo, Akasa, Air India Express).", "Baggage is strictly 15kg for check-in on budget airlines.", "Arrive 2 hours early; entry requires seeing an itinerary and ID/Passport at the physical door."],
        links: [{ name: "MakeMyTrip", url: "https://www.makemytrip.com/" }, { name: "Skyscanner India", url: "https://www.skyscanner.co.in/" }]
    },
    ride: {
        title: "Ride-Hailing & Cabs",
        icon: "local_taxi", color: "slate",
        desc: "The safest and most reliable way to navigate cities and suburban zones without negotiating.",
        tips: ["Uber is reliable in metros; Ola (Indian alternative) has deeper reach in Tier-2 cities.", "Always verify the 4-digit OTP with the driver before entering.", "Rapido (bike taxis) is incredibly cheap and fast for solo travelers."],
        links: [{ name: "Download Uber", url: "https://www.uber.com/in/en/" }, { name: "Download Ola", url: "https://www.olacabs.com/" }, { name: "Download Rapido", url: "https://www.rapido.bike/" }]
    },
    bus: {
        title: "Intercity Bus Travel",
        icon: "directions_bus", color: "rose",
        desc: "Highly prevalent for 4-10 hour cross-state journeys. Volvo AC Sleeper buses are recommended.",
        tips: ["Choose 'AC Sleeper' for night journeys to save on a hotel night.", "Private Volvo buses are vastly superior to standard government transit.", "Always check boarding point locations; large buses often pick up outside city centers."],
        links: [{ name: "RedBus (Primary Booking)", url: "https://www.redbus.in/" }, { name: "AbhiBus", url: "https://www.abhibus.com/" }]
    },
    local: {
        title: "Local Micro-Transit",
        icon: "electric_rickshaw", color: "emerald",
        desc: "The chaotic, thrilling, and necessary final-mile transport systems of India.",
        tips: ["Auto-rickshaws: Always secure the price BEFORE boarding if they refuse the meter.", "E-rickshaws: Shared electric buggies prevalent in North India, usually ₹10-₹20 per seat.", "Metro: Delhi, Mumbai, and Bangalore have world-class metros heavily shielded from traffic."],
        links: []
    }
};

const TransportGuide = () => {
    const [distance, setDistance] = useState('long');
    const [budget, setBudget] = useState('mid');

    // Smart Engine Logic
    const recommendations = useMemo(() => {
        if (distance === 'short') { // < 50km
            return { recommend: ["Cab/Uber", "Metro", "Auto-Rickshaw"], avoid: ["Flight", "Train"] };
        } else if (distance === 'mid') { // 50km - 500km
            if (budget === 'budget') return { recommend: ["Train (Sleeper)", "Intercity Bus"], avoid: ["Flight"] };
            return { recommend: ["Train (AC Classes)", "Intercity Cab"], avoid: ["Flight"] };
        } else { // Long > 500km
            if (budget === 'premium') return { recommend: ["Flight"], avoid: ["Intercity Bus"] };
            return { recommend: ["Train (AC Classes)", "Flight"], avoid: ["Intercity Bus"] };
        }
    }, [distance, budget]);

    const estimator = useMemo(() => {
        if (distance === 'short') return { route: 'City Center → Outskirts (15km)', train: '-', cab: '₹400 - ₹600 (45m)', flight: '-' };
        if (distance === 'mid') return { route: 'Delhi → Jaipur (280km)', train: '₹800 - ₹1200 (5h)', cab: '₹3500 - ₹5000 (6h)', flight: '₹3000 (1h)' };
        return { route: 'Delhi → Kerala (2500km)', train: '₹2500 - ₹4000 (48h)', cab: '-', flight: '₹6000 - ₹9000 (3h)' };
    }, [distance]);

    return (
        <div className="space-y-8 animate-fadeIn text-slate-800">
            {/* Header section untouched stylistically */}
            <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}>
                <h2>Subcontinent Transit System</h2>
                <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Mastering movement across 3.2 million sq km: from bullet-fast flights to rickshaws.</p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="https://www.irctc.co.in/" target="_blank" className="bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-200 flex flex-col items-center justify-center font-black hover:bg-blue-600 hover:text-white transition-all group">
                    <span className="material-icons-round text-3xl mb-2 group-hover:scale-110 transition-transform">train</span>
                    Book Trains (IRCTC)
                </a>
                <a href="https://www.makemytrip.com/" target="_blank" className="bg-sky-50 text-sky-700 p-4 rounded-xl border border-sky-200 flex flex-col items-center justify-center font-black hover:bg-sky-500 hover:text-white transition-all group">
                    <span className="material-icons-round text-3xl mb-2 group-hover:scale-110 transition-transform">flight_takeoff</span>
                    Find Flights
                </a>
                <a href="https://www.uber.com/in/en/" target="_blank" className="bg-slate-800 text-slate-100 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center font-black hover:bg-black transition-all group">
                    <span className="material-icons-round text-3xl mb-2 group-hover:scale-110 transition-transform">local_taxi</span>
                    Get Cab
                </a>
            </div>

            {/* SMART RECOMMENDATION ENGINE */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                    <span className="material-icons-round text-blue-600">engineering</span>
                    <h3 className="font-black text-xl text-slate-900">Smart Travel Engine</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                        <div>
                            <div className="text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Travel Distance</div>
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                {['short', 'mid', 'long'].map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDistance(d)}
                                        className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${distance === d ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
                                    >
                                        {d === 'short' ? 'Local City' : d === 'mid' ? 'Intercity (5h)' : 'Cross Country'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Budget Level</div>
                            <div className="flex gap-2">
                                {['budget', 'mid', 'premium'].map(b => (
                                    <button
                                        key={b}
                                        onClick={() => setBudget(b)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${budget === b ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600'}`}
                                    >
                                        {b.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="text-[10px] font-black uppercase text-blue-500 tracking-wider mb-2">Engine Output</div>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="text-xs font-bold text-slate-600 mt-1">Prefer:</span>
                                {recommendations.recommend.map(r => <span key={r} className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">{r}</span>)}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs font-bold text-slate-500 mt-1">Avoid:</span>
                                {recommendations.avoid.map(a => <span key={a} className="px-2 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded">{a}</span>)}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                            <span>Fare & Time Estimator</span>
                            <span className="material-icons-round text-sm">schedule</span>
                        </div>
                        <div className="text-lg font-black text-sky-400 mb-6 pb-4 border-b border-slate-800">{estimator.route}</div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-slate-300"><span className="material-icons-round text-slate-500">train</span> Train</div>
                                <div className="font-bold">{estimator.train}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-slate-300"><span className="material-icons-round text-slate-500">local_taxi</span> Cab</div>
                                <div className="font-bold">{estimator.cab}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-slate-300"><span className="material-icons-round text-slate-500">flight</span> Flight</div>
                                <div className="font-bold">{estimator.flight}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DOMAINS GRID */}
            <div className="space-y-6">
                <div className="flex items-center justify-between pointer-events-none">
                    <h3 className="font-black text-xl text-slate-900">Transport Modalities</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.values(TRANSPORT_DOMAINS).map(domain => (
                        <div key={domain.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:border-slate-300 transition-colors">
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`p-3 rounded-xl bg-${domain.color}-50 text-${domain.color}-600`}>
                                    <span className="material-icons-round text-2xl">{domain.icon}</span>
                                </div>
                                <div>
                                    <h4 className="font-black text-lg text-slate-900">{domain.title}</h4>
                                    <p className="text-sm text-slate-500 leading-snug mt-1">{domain.desc}</p>
                                </div>
                            </div>
                            <div className="flex-1 space-y-2 mb-6">
                                {domain.tips.map((tip, i) => (
                                    <div key={i} className="flex gap-2 text-sm text-slate-700">
                                        <span className={`material-icons-round text-${domain.color}-400 text-sm mt-0.5`}>check_circle</span>
                                        <p>{tip}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                                {domain.links.map(link => (
                                    <a key={link.name} href={link.url} target="_blank" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-md transition-colors flex items-center gap-1">
                                        {link.name} <span className="material-icons-round text-[10px]">open_in_new</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* MUST-KNOW TIPS ALIGNED RIGHT OF LOCAL TRANSIT */}
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex flex-col justify-between">
                        <div>
                            <h3 className="font-black text-amber-900 mb-4 flex items-center gap-2">
                                <span className="material-icons-round text-amber-600">lightbulb</span> Must-Know Tips
                            </h3>
                            <ul className="space-y-3 text-sm text-amber-800 font-medium">
                                <li className="flex gap-2"><span className="material-icons-round text-sm mt-0.5 text-amber-500">priority_high</span> Avoid traveling in metros during peak hours (9AM-11AM, 6PM-8PM).</li>
                                <li className="flex gap-2"><span className="material-icons-round text-sm mt-0.5 text-amber-500">shield</span> Solo travelers should utilize "Share Trip" features in Uber/Ola.</li>
                                <li className="flex gap-2"><span className="material-icons-round text-sm mt-0.5 text-amber-500">g_translate</span> Use 'Bhaiya' (brother) respectfully when addressing drivers.</li>
                                <li className="flex gap-2"><span className="material-icons-round text-sm mt-0.5 text-amber-500">money_off</span> Refuse rides if an auto driver demands you to visit emporiums first.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MAJOR_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "SGD", "AED", "INR"];
const CURRENCY_SYMBOLS = { USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$", CAD: "C$", SGD: "S$", AED: "د.إ", INR: "₹" };

const CURRENCY_META = {
    USD: { currency: "US Dollar", country: "United States", flag: "🇺🇸" },
    INR: { currency: "Indian Rupee", country: "India", flag: "🇮🇳" },
    EUR: { currency: "Euro", country: "European Union", flag: "🇪🇺" },
    GBP: { currency: "British Pound", country: "United Kingdom", flag: "🇬🇧" },
    AED: { currency: "UAE Dirham", country: "United Arab Emirates", flag: "🇦🇪" },
    JPY: { currency: "Japanese Yen", country: "Japan", flag: "🇯🇵" },
    AUD: { currency: "Australian Dollar", country: "Australia", flag: "🇦🇺" },
    CAD: { currency: "Canadian Dollar", country: "Canada", flag: "🇨🇦" },
    SGD: { currency: "Singapore Dollar", country: "Singapore", flag: "🇸🇬" },
    CHF: { currency: "Swiss Franc", country: "Switzerland", flag: "🇨🇭" },
    CNY: { currency: "Chinese Yuan", country: "China", flag: "🇨🇳" },
    NZD: { currency: "New Zealand Dollar", country: "New Zealand", flag: "🇳🇿" },
    ZAR: { currency: "South African Rand", country: "South Africa", flag: "🇿🇦" }
};

const formatLabel = (cur) => CURRENCY_META[cur] ? `${CURRENCY_META[cur].flag} ${cur} \u2014 ${CURRENCY_META[cur].currency} (${CURRENCY_META[cur].country})` : cur;

const CurrencyConverter = () => {
    const [rates, setRates] = useState(null);
    const [amount, setAmount] = useState('100');
    const [fromCurr, setFromCurr] = useState('USD');
    const [toCurr, setToCurr] = useState('INR');
    const [lastUpdated, setLastUpdated] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                // Free, no-key rate endpoint
                const res = await fetch('https://open.er-api.com/v6/latest/USD');
                const data = await res.json();
                if (data && data.rates) {
                    setRates(data.rates);
                    setLastUpdated(new Date(data.time_last_update_unix * 1000).toLocaleString());
                } else setError(true);
            } catch (err) {
                setError(true);
            }
        };
        fetchRates();
    }, []);

    // Conversion logic: Value in USD * targetRate / sourceRate
    const convertedAmount = useMemo(() => {
        if (!rates) return "---";
        const val = parseFloat(amount) || 0;
        // API base is USD
        const fromRate = rates[fromCurr] || 1;
        const toRate = rates[toCurr] || 1;
        const result = (val / fromRate) * toRate;
        return result.toFixed(2);
    }, [amount, fromCurr, toCurr, rates]);

    const handleSwap = () => {
        setFromCurr(toCurr);
        setToCurr(fromCurr);
    };

    const handleShortcut = (from, to) => {
        setFromCurr(from);
        setToCurr(to);
        setAmount('100');
    };

    return (
        <div className="space-y-8 animate-fadeIn text-slate-800">
            <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}>
                <h2>Currency & Macroeconomics</h2>
                <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Real-time Forex conversions, digital payments, and survival cash strategies.</p>
            </div>

            {/* OANDA/Professional Style Converter Widget */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-end border-b border-emerald-100 pb-4 mb-6">
                    <div>
                        <h3 className="font-black text-2xl text-slate-900 flex items-center gap-2">
                            <span className="material-icons-round text-emerald-600">currency_exchange</span> Live Forex Matrix
                        </h3>
                        {error ? (
                            <p className="text-sm text-red-500 font-bold mt-1">⚠️ Connection failed. Showing estimates.</p>
                        ) : (
                            <p className="text-sm text-slate-500 font-medium mt-1">Rates updated: {lastUpdated || 'Fetching...'}</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* FROM BOX */}
                    <div className="flex-1 w-full bg-slate-50 p-4 rounded-xl border border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 block">Amount</label>
                        <div className="flex items-center gap-4">
                            <select
                                value={fromCurr}
                                onChange={e => setFromCurr(e.target.value)}
                                className="bg-white border border-slate-300 text-sm font-bold rounded-lg p-3 outline-none max-w-full truncate"
                            >
                                {rates && Object.keys(rates).sort().map(cur => (
                                    <option key={cur} value={cur}>{formatLabel(cur)}</option>
                                ))}
                                {!rates && MAJOR_CURRENCIES.map(c => <option key={c} value={c}>{formatLabel(c)}</option>)}
                            </select>
                            <input
                                type="number"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="flex-1 bg-transparent text-3xl font-black text-slate-800 outline-none w-full min-w-0"
                            />
                        </div>
                    </div>

                    {/* SWAP BUTTON */}
                    <button
                        onClick={handleSwap}
                        className="bg-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-700 p-4 rounded-full transition-colors flex items-center justify-center shadow-sm"
                    >
                        <span className="material-icons-round text-2xl font-bold">swap_horiz</span>
                    </button>

                    {/* TO BOX */}
                    <div className="flex-1 w-full bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                        <label className="text-xs font-black text-emerald-600/70 uppercase tracking-wider mb-2 block">Converted Output</label>
                        <div className="flex items-center gap-4">
                            <select
                                value={toCurr}
                                onChange={e => setToCurr(e.target.value)}
                                className="bg-white border border-emerald-300 text-sm font-bold rounded-lg p-3 outline-none max-w-full truncate"
                            >
                                {rates && Object.keys(rates).sort().map(cur => (
                                    <option key={cur} value={cur}>{formatLabel(cur)}</option>
                                ))}
                                {!rates && MAJOR_CURRENCIES.map(c => <option key={c} value={c}>{formatLabel(c)}</option>)}
                            </select>
                            <div className="flex-1 bg-transparent text-3xl font-black text-emerald-700 overflow-hidden text-ellipsis">
                                {CURRENCY_SYMBOLS[toCurr] || ''}{error && toCurr === "INR" ? Math.floor(amount * 84) : convertedAmount}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Shortcuts */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Popular Conversions</div>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { f: 'USD', t: 'INR' }, { f: 'EUR', t: 'INR' },
                            { f: 'GBP', t: 'INR' }, { f: 'AED', t: 'INR' }, { f: 'INR', t: 'USD' }
                        ].map(pair => (
                            <button
                                key={pair.f + pair.t}
                                onClick={() => handleShortcut(pair.f, pair.t)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${fromCurr === pair.f && toCurr === pair.t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                            >
                                {pair.f} → {pair.t}
                            </button>
                        ))}
                        <a href="https://www.xe.com/currencyconverter/" target="_blank" className="ml-auto px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-1 transition-colors">
                            Professional Converter <span className="material-icons-round text-xs">open_in_new</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Expanded Info Panels Centered */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                    <h4 className="font-black text-amber-900 mb-4 flex items-center gap-2 text-lg">
                        <span className="material-icons-round text-amber-600">qr_code_scanner</span> Digital Payments (UPI)
                    </h4>
                    <ul className="space-y-3 text-sm text-amber-800 font-medium">
                        <li className="flex gap-2"><span className="material-icons-round text-emerald-600 text-[18px]">verified</span> Supported across India: Google Pay, PhonePe, Paytm. Even street vendors use QRs.</li>
                        <li className="flex gap-2"><span className="material-icons-round text-amber-600 text-[18px]">airplane_ticket</span> Foreigners without Indian SIMs can get prepaid UPI wallets via 'Cheq' or 'Fave' at airports.</li>
                        <li className="flex gap-2"><span className="material-icons-round text-blue-600 text-[18px]">info</span> If UPI fails, fallback to exact cash. Credit cards work at large hotels/malls.</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2 text-lg">
                        <span className="material-icons-round text-rose-500">payments</span> Cash Strategy & Tipping
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-600 font-medium">
                        <li className="flex gap-2"><span><strong className="text-slate-900">Notes:</strong> ₹10, ₹20, ₹50, ₹100, ₹200, ₹500. <br /><span className="text-rose-500 text-xs">Note: ₹2000 denomination is withdrawn.</span></span></li>
                        <li className="flex gap-2"><span><strong className="text-slate-900">Hoard Change:</strong> Always keep ₹10 and ₹20 notes for autos, water, and tips.</span></li>
                        <li className="flex gap-2"><span><strong className="text-slate-900">Scam Alert:</strong> Never exchange money at unauthorized street booths. Use bank ATMs or authorized hotels.</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};


// --- 11. HOTEL BOOKING ---
const HotelBooking = () => {
    const platforms = [
        { name: 'Booking.com', desc: 'Global leader for hotels and hostels', url: 'https://www.booking.com', icon: 'travel_explore' },
        { name: 'Agoda', desc: 'Best deals for Asian destinations', url: 'https://www.agoda.com', icon: 'hotel_class' },
        { name: 'MakeMyTrip', desc: 'Top Indian booking platform', url: 'https://www.makemytrip.com/hotels', icon: 'airplanemode_active' },
        { name: 'Goibibo', desc: 'Great for budget & domestic stays', url: 'https://www.goibibo.com/hotels', icon: 'card_travel' },
        { name: 'Airbnb', desc: 'Unique homes and local experiences', url: 'https://www.airbnb.com', icon: 'door_front' },
        { name: 'Trivago', desc: 'Compare prices from multiple sites', url: 'https://www.trivago.in', icon: 'compare_arrows' },
        { name: 'Expedia', desc: 'Complete travel, flight & stay packages', url: 'https://www.expedia.com', icon: 'explore' }
    ];

    return (
        <div className="space-y-8 animate-fadeIn text-slate-800">
            {/* Header Section */}
            <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)' }}>
                <h2>Hotel Booking Hub</h2>
                <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Find and book stays across India from budget hostels to luxury hotels.</p>
            </div>

            {/* Popular Booking Platforms Grid */}
            <div>
                <h3 className="font-black text-xl text-slate-900 mb-4 flex items-center gap-2"><span className="material-icons-round text-primary">verified</span> Trusted Platforms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {platforms.map(p => (
                        <div key={p.name} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col transition-all hover:shadow-md hover:border-slate-300">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="material-icons-round text-primary bg-indigo-50 p-2 rounded-lg">{p.icon}</span>
                                <h4 className="font-bold text-slate-800 text-lg">{p.name}</h4>
                            </div>
                            <p className="text-sm text-slate-500 mb-4 flex-1">{p.desc}</p>
                            <button className="btn-secondary text-sm font-bold flex items-center justify-center gap-2 py-2" onClick={() => window.open(p.url, '_blank')}>
                                Book Now <span className="material-icons-round text-sm">open_in_new</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Smart Suggestions & Travel Tips (2-Column Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Smart Suggestions */}
                <div className="lg:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-2"><span className="material-icons-round text-amber-500">lightbulb</span> Smart Stay Suggestions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">By Budget</div>
                            <ul className="space-y-2 text-sm text-slate-700 font-medium">
                                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div>Budget (₹500-₹2000)</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div>Mid-range (₹2000-₹6000)</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div>Luxury (₹6000+)</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Travel Type</div>
                            <ul className="space-y-2 text-sm text-slate-700 font-medium">
                                <li className="flex items-center gap-2"><span className="material-icons-round text-[16px] text-slate-400">person</span>Solo traveler</li>
                                <li className="flex items-center gap-2"><span className="material-icons-round text-[16px] text-slate-400">family_restroom</span>Family & Couples</li>
                                <li className="flex items-center gap-2"><span className="material-icons-round text-[16px] text-slate-400">work</span>Business</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                            <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Location</div>
                            <ul className="space-y-2 text-sm text-slate-700 font-medium">
                                <li className="flex items-center gap-2"><span className="material-icons-round text-[16px] text-slate-400">location_city</span>City center</li>
                                <li className="flex items-center gap-2"><span className="material-icons-round text-[16px] text-slate-400">attractions</span>Near attractions</li>
                                <li className="flex items-center gap-2"><span className="material-icons-round text-[16px] text-slate-400">flight_land</span>Near transit</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Travel Tips */}
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 shadow-sm">
                    <h3 className="font-black text-amber-900 mb-4 flex items-center gap-2 text-xl"><span className="material-icons-round text-amber-600">info</span> Travel Tips</h3>
                    <ul className="space-y-3 text-sm text-amber-900 font-medium list-disc list-inside">
                        <li>Always check recent reviews before booking.</li>
                        <li>Prefer free cancellation options for flexibility.</li>
                        <li>Carry valid ID proof (mandatory for all guests in India).</li>
                        <li>Standard check-in time is usually 12:00 PM IST.</li>
                        <li>Use "Couple Friendly" filters if unmarried.</li>
                    </ul>
                </div>
            </div>


        </div>
    );
};


// --- 10. LIVE MAPS ---
const TouristMap = ({ targetDest }) => {
    const defaultStart = "New Delhi, India";
    const [start, setStart] = useState(defaultStart);
    const destinationName = targetDest ? `${targetDest.name}, ${targetDest.location}` : "Taj Mahal, Agra, India";

    // Using a more robust, standard search query format that Google easily permits in iframes.
    const visualMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(destinationName)}&output=embed`;
    const nativeRoutingUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(destinationName)}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem', minHeight: '80vh' }}>
            <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d9488 100%)', marginBottom: '0' }}>
                <h2>Live Navigation Matrix</h2>
                <p style={{ opacity: 0.9, marginTop: '0.5rem' }}>Dynamic route planning utilizing global spatial coordinates.</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <span className="material-icons-round" style={{ color: '#94a3b8' }}>my_location</span>
                <input value={start} onChange={e => setStart(e.target.value)} placeholder="Start Location (e.g. Current Hotel)" style={{ flex: 1, padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-md)' }} />
                <span className="material-icons-round" style={{ color: '#94a3b8' }}>arrow_forward</span>
                <input value={destinationName} readOnly style={{ flex: 1, padding: '0.8rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-md)', color: 'gray' }} />
                <button className="btn-primary" style={{ background: '#0d9488' }} onClick={() => window.open(nativeRoutingUrl, '_blank')}>
                    <span className="material-icons-round">directions</span> Plan Route
                </button>
            </div>
            <div style={{ flex: 1, background: '#e2e8f0', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <iframe src={visualMapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
