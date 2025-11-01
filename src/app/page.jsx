"use client";
import React, { useMemo, useState } from "react";

// AKORD.AL – MVP (portuar në Next.js App Router, /src/app/page.jsx)
// Ky është i njëjti komponent nga canvas-i, me 'use client' dhe Tailwind.

const categories = [
  { id: "seek", label: "Kërkoj punë", description: "Gjej projekte të shkurtra, part-time ose me orar fleksibël." },
  { id: "offer", label: "Ofroj punë", description: "Publiko një mundësi pune/projekti dhe gjej kandidatin e duhur." },
];

const jobCategories = [
  "Teknologji",
  "Marketing",
  "Administratë",
  "Shërbime",
  "Shitje",
  "Financa",
  "Të tjera",
];

const seedPosts = [
  {
    id: 1,
    type: "offer",
    title: "Redaktor për përmbajtje (2 orë/ditë)",
    company: "Studio Alba",
    location: "Remote",
    tags: ["Part-time", "Content", "Albanian"],
    status: "Approved",
    createdAt: "2025-10-20",
    category: "Marketing",
    payRate: 6,
    schedule: "Në darkë",
  },
  {
    id: 2,
    type: "offer",
    title: "Asistent Social Media (Weekend)",
    company: "Arka Digital",
    location: "Tiranë",
    tags: ["Weekend", "Instagram", "TikTok"],
    status: "Pending",
    createdAt: "2025-10-29",
    category: "Marketing",
    payRate: 5,
    schedule: "Fundjavë",
  },
  {
    id: 3,
    type: "seek",
    title: "Student IT kërkon projekte Frontend",
    company: "Profil kandidat",
    location: "Durrës / Remote",
    tags: ["React", "HTML/CSS", "Junior"],
    status: "Approved",
    createdAt: "2025-10-30",
    category: "Teknologji",
    payRate: 7,
    schedule: "Pasdite",
  },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ring-black/10 bg-black/5">
      {children}
    </span>
  );
}

function StatusPill({ status }) {
  const map = {
    Approved: "bg-green-100 text-green-800 ring-green-300/60",
    Pending: "bg-amber-100 text-amber-900 ring-amber-300/60",
    Rejected: "bg-rose-100 text-rose-800 ring-rose-300/60",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${map[status] || "bg-slate-100 text-slate-800 ring-slate-300/60"}`}>
      {status}
    </span>
  );
}

function SectionCard({ title, description, cta, onClick, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-slate-600">{description}</p>
        </div>
        {cta && (
          <button onClick={onClick} className="rounded-xl px-4 py-2 text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-900 shadow">
            {cta}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Modal({ open, onClose, title, children, actionLabel, onAction }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100" aria-label="Mbyll">✕</button>
        </div>
        <div className="px-6 py-4">{children}</div>
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <button onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-100">Mbyll</button>
          {onAction && (
            <button onClick={onAction} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              {actionLabel || "Vazhdo"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CVWizard({ onDone }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
        <Badge>Hapi {step} / 3</Badge>
        <span className="text-slate-400">•</span>
        <span>Krijo CV-në tënde</span>
      </div>

      {step === 1 && (
        <div className="grid gap-3">
          <Input label="Emri i plotë" help="Si shfaqet në dokumente zyrtare." value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input label="Email" help="Për aplikime dhe njoftime." value={form.email} onChange={(e) => update("email", e.target.value)} />
            <Input label="Telefon" help="Opsional." value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <Input label="Pozicioni i synuar" help="p.sh. Frontend Developer" value={form.role} onChange={(e) => update("role", e.target.value)} />
          <TextArea label="Përmbledhje" help="2–3 fjali për eksperiencën dhe qëllimin." rows={3} value={form.summary} onChange={(e) => update("summary", e.target.value)} />
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-3">
          <Input label="Aftësi (ndahen me presje)" placeholder="React, Excel, Komunikim" value={form.skills} onChange={(e) => update("skills", e.target.value)} />
          <TextArea label="Eksperienca" placeholder="Roli, kompania, periudha, arritje…" rows={5} value={form.experience} onChange={(e) => update("experience", e.target.value)} />
          <TextArea label="Arsimi & Çertifikime" rows={4} value={form.education} onChange={(e) => update("education", e.target.value)} />
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4">
          <div className="rounded-xl border p-4">
            <h5 className="mb-1 text-sm font-semibold">Pamje paraprake</h5>
            <div className="text-sm leading-relaxed">
              <div className="text-lg font-bold">{form.fullName || "Emri Mbiemri"}</div>
              <div className="text-slate-600">{form.role || "Pozicioni i synuar"}</div>
              <div className="mt-2 text-slate-600">{form.email || "email@shembull.com"} • {form.phone || "+355 …"}</div>
              <hr className="my-3" />
              <div>
                <div className="font-semibold">Përmbledhje</div>
                <p className="text-slate-700">{form.summary || "Shkurt, 2–3 fjali për eksperiencën dhe qëllimin tuaj."}</p>
              </div>
              <div className="mt-2">
                <div className="font-semibold">Aftësi</div>
                <p className="text-slate-700">{form.skills || "React, Excel, Komunikim"}</p>
              </div>
              <div className="mt-2">
                <div className="font-semibold">Eksperienca</div>
                <p className="text-slate-700 whitespace-pre-wrap">{form.experience || "Përshkruani rolin tuaj, arritjet matshme dhe teknologjitë e përdorura."}</p>
              </div>
              <div className="mt-2">
                <div className="font-semibold">Arsimi & Çertifikime</div>
                <p className="text-slate-700 whitespace-pre-wrap">{form.education || "Shkolla/Universiteti, programi, vitet; çertifikime relevante."}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">Shënim: Në MVP ruajmë CV-në në profil. Eksporti PDF vjen në fazën 2.</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))} className={`rounded-xl px-4 py-2 text-sm font-medium ${step === 1 ? "opacity-50" : "hover:bg-slate-100"}`}>Prapa</button>
        {step < 3 ? (
          <button onClick={() => setStep((s) => Math.min(3, s + 1))} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Vazhdo</button>
        ) : (
          <button onClick={() => onDone?.(form)} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Ruaj CV</button>
        )}
      </div>
    </div>
  );
}

function Input({ label, help, ...props }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <input {...props} className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300" />
      {help && <span className="text-xs text-slate-500">{help}</span>}
    </label>
  );
}

function TextArea({ label, help, rows = 3, ...props }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <textarea rows={rows} {...props} className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300" />
      {help && <span className="text-xs text-slate-500">{help}</span>}
    </label>
  );
}

export default function Page() {
  const [active, setActive] = useState("seek");
  const [authOpen, setAuthOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false); // fake auth
  const [isAdmin, setIsAdmin] = useState(false); // fake admin toggle
  const [posts, setPosts] = useState(seedPosts);
  const [postOpen, setPostOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  // filtra
  const [filterCategory, setFilterCategory] = useState("Gjithë");
  const [filterMinPay, setFilterMinPay] = useState(0);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (p.type !== active) return false;
      if (p.status === "Rejected") return false;
      if (filterCategory !== "Gjithë" && p.category !== filterCategory) return false;
      if (Number(filterMinPay) > 0 && (Number(p.payRate || 0) < Number(filterMinPay))) return false;
      return true;
    });
  }, [posts, active, filterCategory, filterMinPay]);

  const handleCreatePost = (e) => {
    e?.preventDefault?.();
    if (!isAuthed) {
      setAuthOpen(true);
      return;
    }
    setPostOpen(true);
  };

  const handleAuth = (e) => {
    e?.preventDefault?.();
    setIsAuthed(true);
    setAuthOpen(false);
  };

  const handleSubmitPost = (e) => {
    e?.preventDefault?.();
    const form = new FormData(e.target);
    const newPost = {
      id: posts.length + 1,
      type: form.get("type"),
      title: form.get("title"),
      company: form.get("company") || (form.get("type") === "seek" ? "Profil kandidat" : ""),
      location: form.get("location") || "Remote",
      tags: (form.get("tags") || "").split(",").map((t) => t.trim()).filter(Boolean),
      status: "Pending",
      createdAt: new Date().toISOString().slice(0, 10),
      category: form.get("jobCategory") || "Të tjera",
      payRate: Number(form.get("payRate")) || 0,
      schedule: form.get("schedule") || "",
    };
    setPosts([newPost, ...posts]);
    setPostOpen(false);
  };

  const approve = (id) => setPosts((arr) => arr.map((p) => (p.id === id ? { ...p, status: "Approved" } : p)));
  const reject = (id) => setPosts((arr) => arr.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p)));

  const heroCTA = active === "seek" ? "Shfleto mundësi" : "Posto një mundësi";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white font-bold">A</div>
            <div className="font-semibold">akord.al</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCvOpen(true)} className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-100">Krijo CV</button>
            {isAuthed ? (
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  <input type="checkbox" checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)} /> Admin
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Profili im</div>
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">Hyr / Regjistrohu</button>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">Një dritare për <span className="underline decoration-slate-300 decoration-2 underline-offset-4">punë fleksibël</span> dhe bashkëpunime.</h1>
            <p className="mt-3 text-slate-600">Lidh kërkuesit dhe ofruesit e punës. Postimet publikohen vetëm pas miratimit nga administratori.</p>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside">
              <li>Moderim manual i çdo postimi (kundër spam dhe mashtrimeve).</li>
              <li>Profile me CV dhe aplikime të shpejta.</li>
              <li>Filtra sipas kategorisë dhe pagesës.</li>
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button onClick={handleCreatePost} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">{heroCTA}</button>
              <button onClick={() => setCvOpen(true)} className="rounded-xl px-4 py-2 text-sm font-semibold hover:bg-slate-100">Krijo CV-në tënde</button>
              <button onClick={() => setHowOpen(true)} className="rounded-xl px-4 py-2 text-sm font-semibold hover:bg-slate-100">Si funksionon</button>
            </div>
            <div className="mt-3 text-xs text-slate-500">Moderim manual • Profile me CV • Postime të verifikuara</div>
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex gap-2 rounded-xl bg-slate-100 p-1 text-sm font-semibold">
              {categories.map((c) => (
                <button key={c.id} onClick={() => setActive(c.id)} className={`flex-1 rounded-lg px-3 py-2 ${active === c.id ? "bg-white shadow" : "text-slate-600"}`}>
                  {c.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-slate-600">{categories.find((c) => c.id === active)?.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <SectionCard
            title="Posto"
            description={active === "seek" ? "Krijo profilin tënd dhe aplikime të shpejta." : "Publiko një mundësi pune/projekti. Postimet miratohen nga admini."}
            cta={active === "seek" ? "Krijo profil" : "Posto"}
            onClick={handleCreatePost}
          >
            <ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc list-inside">
              <li>Autentikim me email; profil bazë</li>
              <li>Status i postimit: <span className="font-medium">Pending → Approved</span></li>
              <li>Filtra për orar, vendndodhje, kategori, pagesë</li>
            </ul>
          </SectionCard>

          <SectionCard
            title="Shfleto"
            description="Zbulo postimet më të reja dhe filtro sipas nevojës."
            cta="Shfleto tani"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
          >
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Remote</Badge>
              <Badge>Part-time</Badge>
              <Badge>Weekend</Badge>
              <Badge>Fillestar</Badge>
            </div>
          </SectionCard>

          <SectionCard
            title="Krijo CV"
            description="Ndërto një CV të thjeshtë dhe ruaje në profilin tënd."
            cta="Hap wizard-in"
            onClick={() => setCvOpen(true)}
          >
            <p className="mt-4 text-sm text-slate-600">Eksporti PDF planifikohet në fazën 2.</p>
          </SectionCard>
        </div>

        <div className="mt-10">
          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold">Postimet e fundit</h2>
            <div className="flex flex-wrap items-center gap-2">
              <select value={filterCategory} onChange={(e)=>setFilterCategory(e.target.value)} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">
                <option>Gjithë</option>
                {jobCategories.map((c)=> (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-600">Min € / orë</span>
                <input type="number" min={0} value={filterMinPay} onChange={(e)=>setFilterMinPay(e.target.value)} className="w-24 rounded-xl border border-slate-300 px-3 py-2" />
              </div>
              <input placeholder="Kërko… (titull, kompani)" className="rounded-xl border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="grid gap-3">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold">{p.title}</div>
                    <div className="text-sm text-slate-600">{p.company} • {p.location} • <span className="text-slate-500">{p.createdAt}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill status={p.status} />
                    <button className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800">Shiko / Apliko</button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-slate-700">Kategoria: <span className="font-medium">{p.category}</span> • Pagesa: <span className="font-medium">{p.payRate || 0}€/orë</span> • Orari: <span className="font-medium">{p.schedule || "-"}</span></div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t, i) => (
                    <Badge key={i}>{t}</Badge>
                  ))}
                </div>
                {isAdmin && p.status === "Pending" && (
                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={()=>approve(p.id)} className="rounded-xl bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700">Aprovo</button>
                    <button onClick={()=>reject(p.id)} className="rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700">Refuzo</button>
                    <span className="text-xs text-slate-500">(Admin: veprimet e moderimit)</span>
                  </div>
                )}
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed bg-white p-8 text-center text-slate-600">
                Nuk ka postime ende në këtë kategori ose pagesë. Rregullo filtrat ose bëhu i pari që {active === "seek" ? "kërkon një mundësi" : "poston një mundësi"}.
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} akord.al • Të gjitha të drejtat e rezervuara</div>
          <div className="flex items-center gap-4 text-sm">
            <button onClick={()=>setHowOpen(true)} className="hover:underline">Si funksionon</button>
            <button onClick={()=>setPolicyOpen(true)} className="hover:underline">Politika e moderimit</button>
            <a className="hover:underline" href="#">Kontakt</a>
          </div>
        </div>
      </footer>

      {/* Auth modal */}
      <Modal open={authOpen} onClose={() => setAuthOpen(false)} title="Hyr / Regjistrohu" actionLabel="Vazhdo" onAction={handleAuth}>
        <div className="grid gap-3">
          <Input label="Email" placeholder="ti@shembull.com" />
          <Input label="Fjalëkalimi" type="password" placeholder="••••••••" />
          <p className="text-xs text-slate-500">Në versionin e parë do të aktivizojmë verifikimin me email dhe rolet (admin/përdorues). Nëse je admin, aktivizo butonin "Admin" te header për të testuar moderimin.</p>
        </div>
      </Modal>

      {/* Post modal */}
      <Modal open={postOpen} onClose={() => setPostOpen(false)} title={active === "seek" ? "Krijo kërkesë pune" : "Posto një mundësi"}>
        <form className="grid gap-3" onSubmit={handleSubmitPost}>
          <input type="hidden" name="type" value={active} />
          <Input label="Titulli" name="title" placeholder={active === "seek" ? "p.sh. Designer grafik për projekte të vogla" : "p.sh. Kërkohet Designer grafik (remote)"} required />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input label={active === "seek" ? "Emri & mbiemri" : "Kompania / Emri"} name="company" help={active === "seek" ? "Opsional nëse ke CV." : "Opsional për individët."} />
            <Input label="Vendndodhja" name="location" placeholder="Remote / Tiranë…" />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <label className="grid gap-1 text-sm">
              <span className="font-medium text-slate-700">Kategoria</span>
              <select name="jobCategory" className="rounded-xl border border-slate-300 px-3 py-2">
                {jobCategories.map((c)=> <option key={c}>{c}</option>)}
              </select>
            </label>
            <Input label="Pagesa (€ / orë)" name="payRate" type="number" min={0} step={1} help="Vendos 0 nëse nuk e përcakton tani." />
            <label className="grid gap-1 text-sm">
              <span className="font-medium text-slate-700">Orari</span>
              <select name="schedule" className="rounded-xl border border-slate-300 px-3 py-2">
                {['Mëngjes','Pasdite','Në darkë','Fundjavë','Orar i plotë','Fleksibël'].map((o)=> <option key={o}>{o}</option>)}
              </select>
            </label>
          </div>
          <Input label="Etiketa (me presje)" name="tags" placeholder="Part-time, Remote, Junior" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Pas dorëzimit, postimi shkon te administratori për miratim. Postimet e refuzuara nuk shfaqen publikisht.</span>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Dërgo</button>
          </div>
        </form>
      </Modal>

      {/* CV modal */}
      <Modal open={cvOpen} onClose={() => setCvOpen(false)} title="Krijo CV">
        <CVWizard onDone={() => setCvOpen(false)} />
      </Modal>

      {/* How it works modal */}
      <Modal open={howOpen} onClose={()=>setHowOpen(false)} title="Si funksionon akord.al">
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
          <li>Krijon llogari me email (verifikim) dhe plotëson profilin + CV (opsional).</li>
          <li>Zgjedh "Kërkoj punë" ose "Ofroj punë" dhe krijon postimin.</li>
          <li>Postimi shkon <strong>Pending</strong> te administratori për verifikim (spam, mashtrime, përputhje me rregullat).</li>
          <li>Pas <strong>Approved</strong>, shfaqet publikisht dhe mund të aplikohet / kontaktohet.</li>
          <li>Mundet të fshish / përditësosh postimin nga profili yt.</li>
        </ol>
        <p className="mt-3 text-xs text-slate-500">Shënim: Në fazën 2 shtojmë mesazhe brenda platformës dhe eksport PDF për CV.</p>
      </Modal>

      {/* Policy modal */}
      <Modal open={policyOpen} onClose={()=>setPolicyOpen(false)} title="Politika e moderimit">
        <div className="space-y-2 text-sm text-slate-700">
          <p>Ne heqim postimet që përmbajnë mashtrime, diskriminim, gjuhë të urrejtjes, oferta të paligjshme ose të pasakta. Postimet duhet të kenë titull të qartë, pagesë të sinqertë (nëse jepet) dhe kontakt të verifikueshëm.</p>
          <ul className="list-disc list-inside">
            <li>Ndalohet kërkimi i pagesave paraprake nga kandidatët.</li>
            <li>Detyrimisht: përshkrim i detyrës, kërkesat minimale, vendndodhja/remote, orari, nëse është B2B apo punësim.</li>
            <li>Shkeljet përsëritëse sjellin pezullim të llogarisë.</li>
          </ul>
          <p className="text-xs text-slate-500">Këshillë: Për transparencë, jepni gamën e pagesës dhe afatin e aplikimit.</p>
        </div>
      </Modal>
    </main>
  );
}
