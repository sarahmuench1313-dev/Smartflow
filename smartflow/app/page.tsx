"use client";

import { useMemo, useState } from "react";
import {
  Wind, MessageSquareText, FileUp, ListOrdered, ArrowRight, ArrowLeft,
  Check, Building2, Wallet, TrendingUp, CircleHelp, ShieldCheck, Upload,
  FileText, X, Menu
} from "lucide-react";

type Phase = { title: string; subtitle: string; icon: typeof MessageSquareText };
const phases: Phase[] = [
  { title: "Business basics", subtitle: "Tell us what your business does.", icon: Building2 },
  { title: "Revenue", subtitle: "How money comes into the business.", icon: TrendingUp },
  { title: "Expenses", subtitle: "Understand your operating costs.", icon: Wallet },
  { title: "Assets & debts", subtitle: "Capture what you own and owe.", icon: FileText },
  { title: "Import documents", subtitle: "Add reports to fill in the picture.", icon: FileUp },
  { title: "Review & questions", subtitle: "Check details and resolve gaps.", icon: ListOrdered }
];

const money = (value: string) => value ? `$${Number(value).toLocaleString("en-US")}` : "Not entered";

export default function Home() {
  const [section, setSection] = useState("home");
  const [phase, setPhase] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("Small business");
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [cash, setCash] = useState("");
  const [debt, setDebt] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [finished, setFinished] = useState(false);

  const netCashFlow = useMemo(() => {
    if (revenue.trim() === "" || expenses.trim() === "") return null;
    return Number(revenue) - Number(expenses);
  }, [revenue, expenses]);

  const begin = (target = 0) => { setPhase(target); setSection("onboarding"); setFinished(false); };
  const nav = (target: string) => { setSection(target); setShowMenu(false); };
  const fileChange = (list: FileList | null) => {
    if (!list) return;
    setUploadedFiles(old => [...old, ...Array.from(list).map(file => file.name)]);
  };
  const completePhase = () => {
    if (phase < phases.length - 1) setPhase(phase + 1);
    else { setFinished(true); setSection("summary"); }
  };
  const progress = finished ? 100 : Math.round((phase / phases.length) * 100);

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <div className="mx-auto min-h-screen w-full max-w-[460px] bg-[var(--cream)] px-5 pb-10 pt-5 sm:px-7">
        <header className="mb-8 flex items-center justify-between">
          <button className="flex items-center gap-3 text-left" onClick={() => nav("home")} aria-label="Smartflow home">
            <Wind size={31} strokeWidth={2.2} />
            <span className="text-[25px] font-bold tracking-tight">Smartflow</span>
          </button>
          <button className="rounded-full p-2 hover:bg-black/5" aria-label="Toggle menu" onClick={() => setShowMenu(!showMenu)}><Menu size={22}/></button>
        </header>

        {showMenu && <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-3">
          {[["Home","home"],["Interview","interview"],["Import","import"],["Questions","questions"],["Summary","summary"]].map(([label,target]) =>
            <button key={target} onClick={() => target === "interview" ? begin(0) : nav(target)} className="rounded-xl px-3 py-3 text-left text-sm hover:bg-black/5">{label}</button>
          )}
        </div>}

        {section === "home" && <>
          <div className="mb-7 flex items-end justify-between gap-3">
            <div><p className="mb-2 text-[28px] font-bold tracking-tight">Hi there</p><p className="text-[18px] text-[var(--muted)]">{businessName || "Your business"}</p></div>
            <div className="pb-1 text-right"><p className="text-[27px] font-bold">{finished ? "6 of 6" : `${phase} of 6`}</p><p className="text-[15px] text-[var(--muted)]">phases done</p></div>
          </div>
          <div className="mb-7 grid grid-cols-3 gap-2 rounded-[27px] bg-[var(--ink)] px-3 py-6 text-white">
            {[["Interview",MessageSquareText,() => begin(0)],["Import",FileUp,() => nav("import")],["Questions",ListOrdered,() => nav("questions")]].map(([label,Icon,action]) => {
              const I = Icon as typeof MessageSquareText;
              return <button key={label as string} onClick={action as () => void} className="flex min-w-0 flex-col items-center gap-3 rounded-xl px-1 py-1 text-center hover:bg-white/10">
                <span className="grid h-[58px] w-[58px] place-items-center rounded-full border-2 border-white/90"><I size={25}/></span>
                <span className="text-[15px] font-medium">{label as string}</span>
              </button>;
            })}
          </div>
          <div className="mb-5 rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5">
            <div className="mb-3 flex items-center justify-between"><span className="font-semibold">Your financial picture</span><TrendingUp size={20}/></div>
            <p className="mb-4 text-sm leading-6 text-[var(--muted)]">Complete six short phases to create a clearer picture of your business finances. Your information stays in this prototype until we add secure saving.</p>
            <div className="h-2 overflow-hidden rounded-full bg-[#e6ddd1]"><div className="h-full rounded-full bg-black transition-all" style={{width: `${progress}%`}}/></div>
            <div className="mt-2 flex justify-between text-xs text-[var(--muted)]"><span>{finished ? "Profile reviewed" : "Getting started"}</span><span>{progress}%</span></div>
            <button onClick={() => begin(phase)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-4 font-semibold text-white hover:bg-neutral-800">{finished ? "Review answers" : "Continue setup"} <ArrowRight size={18}/></button>
          </div>
          <div className="rounded-3xl border border-[var(--line)] p-5">
            <div className="mb-4 flex items-center gap-2 font-semibold"><ShieldCheck size={19}/> Your information</div>
            <p className="text-sm leading-6 text-[var(--muted)]">This is a demo. Do not enter sensitive or real financial information yet. Bank connections and secure storage are not enabled.</p>
          </div>
        </>}

        {section === "onboarding" && <>
          <button onClick={() => nav("home")} className="mb-5 flex items-center gap-2 text-sm text-[var(--muted)]"><ArrowLeft size={16}/> Back to home</button>
          <div className="mb-5 flex items-center justify-between"><span className="text-sm text-[var(--muted)]">PHASE {phase + 1} OF 6</span><span className="text-sm font-semibold">{Math.round(((phase + 1) / 6) * 100)}%</span></div>
          <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-[#e6ddd1]"><div className="h-full bg-black" style={{width: `${((phase + 1) / 6) * 100}%`}}/></div>
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">{(() => { const Icon = phases[phase].icon; return <Icon size={26}/>; })()}</div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">{phases[phase].title}</h1><p className="mb-7 leading-6 text-[var(--muted)]">{phases[phase].subtitle}</p>

          {phase === 0 && <div className="space-y-5">
            <Field label="Business name" value={businessName} onChange={setBusinessName} placeholder="e.g. Northstar Studio"/>
            <div><label className="mb-2 block text-sm font-semibold">Business type</label><select value={size} onChange={e => setSize(e.target.value)} className="w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-4 outline-none focus:border-black"><option>Small business</option><option>Startup</option><option>Mid-sized business</option><option>Large enterprise</option><option>Nonprofit</option><option>Other</option></select></div>
            <Field label="Industry" value={industry} onChange={setIndustry} placeholder="e.g. Retail, consulting, manufacturing"/>
          </div>}
          {phase === 1 && <div className="space-y-5"><Field label="Average monthly revenue ($)" value={revenue} onChange={setRevenue} placeholder="e.g. 50000" type="number"/><p className="text-sm text-[var(--muted)]">Use a typical month, or your best estimate. You can leave this blank for now.</p></div>}
          {phase === 2 && <div className="space-y-5"><Field label="Average monthly expenses ($)" value={expenses} onChange={setExpenses} placeholder="e.g. 35000" type="number"/><Field label="Largest cost or concern (optional)" value={notes} onChange={setNotes} placeholder="e.g. payroll, inventory, rent"/></div>}
          {phase === 3 && <div className="space-y-5"><Field label="Available business cash ($)" value={cash} onChange={setCash} placeholder="e.g. 25000" type="number"/><Field label="Total business debt ($)" value={debt} onChange={setDebt} placeholder="e.g. 10000" type="number"/><p className="text-sm text-[var(--muted)]">These are optional estimates for this demo.</p></div>}
          {phase === 4 && <div className="rounded-3xl border-2 border-dashed border-[var(--line)] bg-[var(--paper)] p-6 text-center"><Upload size={30} className="mx-auto mb-3"/><p className="mb-2 font-semibold">Upload financial documents</p><p className="mb-4 text-sm leading-5 text-[var(--muted)]">Choose CSV, PDF, Excel, or other financial reports. This prototype only displays filenames; it does not upload or store file contents.</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"><FileUp size={17}/> Choose files<input type="file" multiple accept=".csv,.pdf,.xlsx,.xls,.doc,.docx" className="hidden" onChange={e => fileChange(e.target.files)}/></label>{uploadedFiles.length > 0 && <div className="mt-5 space-y-2 text-left">{uploadedFiles.map((name,i) => <div key={`${name}-${i}`} className="flex items-center gap-2 rounded-xl bg-black/5 p-3 text-sm"><FileText size={17}/><span className="break-all">{name}</span></div>)}</div>}</div>}
          {phase === 5 && <div className="space-y-3">{[["Business",businessName || "Not entered"],["Type",size],["Industry",industry || "Not entered"],["Monthly revenue",money(revenue)],["Monthly expenses",money(expenses)],["Available cash",money(cash)],["Business debt",money(debt)],["Documents selected",String(uploadedFiles.length)]].map(([label,value]) => <div key={label} className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4"><span className="text-sm text-[var(--muted)]">{label}</span><span className="max-w-[60%] break-words text-right text-sm font-semibold">{value}</span></div>)}{netCashFlow !== null && <div className="rounded-2xl bg-black p-4 text-white"><p className="text-sm text-white/70">Estimated monthly cash flow</p><p className="mt-1 text-2xl font-bold">{netCashFlow < 0 ? "−" : ""}${Math.abs(netCashFlow).toLocaleString("en-US")}</p><p className="mt-1 text-xs text-white/70">Simple revenue minus expenses; not a full financial analysis.</p></div>}<p className="text-sm leading-5 text-[var(--muted)]">This is a basic snapshot, not professional accounting, tax, investment, or lending advice.</p></div>}

          <div className="mt-9 flex gap-3"><button disabled={phase===0} onClick={() => setPhase(Math.max(0,phase-1))} className="flex-1 rounded-full border border-[var(--line)] px-4 py-4 font-semibold disabled:opacity-30">Back</button><button onClick={completePhase} className="flex-[1.5] rounded-full bg-black px-4 py-4 font-semibold text-white hover:bg-neutral-800">{phase===5 ? "Finish review" : "Save & continue"} <ArrowRight className="ml-1 inline" size={17}/></button></div>
        </>}

        {section === "import" && <SimplePage icon={<FileUp size={26}/>} title="Import" text="Add business financial documents to help build your financial picture." action="Start document phase" onClick={() => begin(4)} note="In this prototype, file names are only held in the current browser session. File contents are not sent or saved."/>}
        {section === "interview" && <SimplePage icon={<MessageSquareText size={26}/>} title="Business interview" text="Answer a few guided questions about your business, revenue, expenses, assets, and debts." action="Start interview" onClick={() => begin(0)} note="You can leave estimates blank and move through the six phases at your own pace."/>}
        {section === "questions" && <SimplePage icon={<CircleHelp size={26}/>} title="Questions to complete" text="Smartflow will identify missing or unclear details before producing a financial summary." action="Review your profile" onClick={() => begin(5)} note="AI-generated follow-up questions will be added after the core onboarding flow works."/>}
        {section === "summary" && <><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white"><Check size={28}/></div><h1 className="mb-2 text-3xl font-bold">First snapshot ready</h1><p className="mb-6 leading-6 text-[var(--muted)]">You've completed the prototype's six phases. Here is the information entered so far.</p><div className="space-y-3 rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5"><p><strong>{businessName || "Your business"}</strong></p><p className="text-sm text-[var(--muted)]">{size}{industry ? ` · ${industry}` : ""}</p><div className="border-t border-[var(--line)] pt-4"><p className="text-sm text-[var(--muted)]">Estimated monthly cash flow</p><p className="mt-1 text-3xl font-bold">{netCashFlow === null ? "Not enough data" : `${netCashFlow < 0 ? "−" : ""}$${Math.abs(netCashFlow).toLocaleString("en-US")}`}</p></div><p className="text-sm leading-5 text-[var(--muted)]">This is a preliminary snapshot based only on manually entered estimates. No documents were analyzed and no bank data is connected.</p></div><button onClick={() => begin(0)} className="mt-5 w-full rounded-full bg-black px-5 py-4 font-semibold text-white">Review or edit answers</button><button onClick={() => nav("home")} className="mt-3 w-full rounded-full border border-[var(--line)] px-5 py-4 font-semibold">Back to home</button></>}
        <footer className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-[var(--muted)]"><ShieldCheck size={15}/> Prototype only · No bank connection or secure storage</footer>
      </div>
    </main>
  );
}

function Field({label,value,onChange,placeholder,type="text"}:{label:string;value:string;onChange:(v:string)=>void;placeholder:string;type?:string}) {
  return <div><label className="mb-2 block text-sm font-semibold">{label}</label><input type={type} min={type==="number" ? "0" : undefined} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-4 outline-none placeholder:text-[#aaa197] focus:border-black"/></div>;
}
function SimplePage({icon,title,text,action,onClick,note}:{icon:React.ReactNode;title:string;text:string;action:string;onClick:()=>void;note:string}) {
  return <><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">{icon}</div><h1 className="mb-2 text-3xl font-bold">{title}</h1><p className="mb-6 leading-6 text-[var(--muted)]">{text}</p><div className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5"><p className="text-sm leading-6">{note}</p></div><button onClick={onClick} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-4 font-semibold text-white">{action}<ArrowRight size={18}/></button></>;
}