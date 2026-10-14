import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import axios from "axios";
const fieldCls = "flex min-w-0 flex-col gap-2";
const labelCls = "flex items-center gap-2.5 text-sm font-semibold text-ink";
const inputCls =
  "h-11 w-full rounded-xl border border-line-2 bg-night px-3.5 font-mono text-sm text-ink transition-[border-color,box-shadow] duration-200 focus:border-slime focus:shadow-[0_0_0_3px_rgba(124,227,90,0.18),0_0_24px_-6px_rgba(124,227,90,0.5)] focus:outline-none short:h-10";
const strongCls = "font-semibold text-ink";

function Step({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-[22px] items-center justify-center rounded-md bg-ember font-mono text-xs text-pumpkin shadow-[0_0_10px_rgba(255,154,61,0.25)]">
      {children}
    </span>
  );
}

function BrewForm() {
  const [data, setData] = useState({
    larkSheetId: "",
    domainURL: "",
    apiKey: "",
    apiSecret: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setData((d) => {
      return {
        ...d,
        [name]: value,
      };
    });
  }
  async function automateForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const getData = axios.post(
        `http://localhost:8000/automations/aje-issue`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return getData;
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form
      className="brew-form relative flex flex-col gap-4 rounded-[20px] border border-line bg-linear-to-b from-card-2/92 to-card/92 px-7 py-6 shadow-[0_0_0_1px_rgba(255,154,61,0.06),0_30px_60px_-30px_rgba(255,122,26,0.25),0_0_80px_-40px_rgba(124,227,90,0.35)] backdrop-blur-sm desk:min-h-0 desk:flex-auto desk:overflow-y-auto short:gap-3 short:px-6 short:py-[18px]"
      onSubmit={automateForm}
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="m-0 font-heading text-[22px] font-bold text-ink-h">
          Mix the ingredients
        </h2>
        <p className="m-0 text-sm leading-normal text-muted">
          Fill in all four, then hit Automate.
        </p>
      </div>

      <div className={fieldCls}>
        <label htmlFor="al-sheet" className={labelCls}>
          <Step>1</Step>Lark Sheet ID
        </label>
        <input
          id="al-sheet"
          type="text"
          name="larkSheetId"
          onChange={handleChange}
          placeholder="e.g. Xk9sTq2LmPa7RbVz"
          className={inputCls}
        />
        <div className="flex flex-col gap-2 rounded-xl bg-card-2 px-3.5 py-3 text-[13px] leading-normal text-hint short:gap-1 short:px-3 short:py-2">
          <span>
            <strong className={strongCls}>Where to find it:</strong> open the
            sheet in Lark and copy its URL. The ID is the part right after{" "}
            <code className="font-mono text-pumpkin-light">/sheets/</code>,
            before any <code className="font-mono text-pumpkin-light">?</code>
          </span>
          <code className="font-mono text-xs break-all text-mist">
            https://yourteam.larksuite.com/sheets/
            <mark className="rounded bg-moss px-1 py-px text-slime-light">
              Xk9sTq2LmPa7RbVz
            </mark>
            ?sheet=0a1b2c
          </code>
        </div>
      </div>

      <div className={fieldCls}>
        <label htmlFor="al-domain" className={labelCls}>
          <Step>2</Step>ERPNext domain URL
        </label>
        <input
          id="al-domain"
          name="domainURL"
          onChange={handleChange}
          type="url"
          placeholder="https://yourcompany.erpnext.com"
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        <div className={fieldCls}>
          <label htmlFor="al-key" className={labelCls}>
            <Step>3</Step>API key
          </label>
          <input
            id="al-key"
            type="text"
            name="apiKey"
            onChange={handleChange}
            placeholder="a1b2c3d4e5f6g7h"
            className={inputCls}
          />
        </div>
        <div className={fieldCls}>
          <label htmlFor="al-secret" className={labelCls}>
            <Step>4</Step>API secret
          </label>
          <input
            id="al-secret"
            type="password"
            name="apiSecret"
            onChange={handleChange}
            placeholder="••••••••••••••"
            className={inputCls}
          />
        </div>
      </div>
      <p className="-mt-1.5 text-[13px] leading-normal text-muted">
        From ERPNext: open your <strong className={strongCls}>User</strong>{" "}
        record → <strong className={strongCls}>Settings</strong> →{" "}
        <strong className={strongCls}>API Access</strong> →{" "}
        <strong className={strongCls}>Generate Keys</strong>. The secret is
        shown only once.
      </p>

      <button
        type="submit"
        className="flex h-[52px] flex-none cursor-pointer items-center justify-center gap-2.5 rounded-[14px] border-none bg-linear-to-b from-slime-light to-slime font-heading text-lg font-extrabold tracking-[0.01em] text-[#0d1a08] shadow-[0_10px_30px_-10px_rgba(124,227,90,0.55)] transition duration-150 hover:-translate-y-px hover:shadow-[0_14px_36px_-8px_rgba(124,227,90,0.75)] active:translate-y-px short:h-[46px]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
        </svg>
        Automate
      </button>
    </form>
  );
}

export default BrewForm;
