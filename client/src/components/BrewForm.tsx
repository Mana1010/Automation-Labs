import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import axios from "axios";
import { useAppStore } from "../store/app.store";
const fieldCls = "flex min-w-0 flex-col gap-2";
const labelCls = "flex items-center gap-2.5 text-sm font-semibold text-ink";
const inputCls =
  "h-11 w-full rounded-xl border border-line-2 bg-night px-3.5 font-mono text-sm text-ink transition-[border-color,box-shadow] duration-200 focus:border-slime focus:shadow-[0_0_0_3px_rgba(124,227,90,0.18),0_0_24px_-6px_rgba(124,227,90,0.5)] focus:outline-none short:h-10";
const strongCls = "font-semibold text-ink";

function Step({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-5.5 items-center justify-center rounded-md bg-ember font-mono text-xs text-pumpkin shadow-[0_0_10px_rgba(255,154,61,0.25)]">
      {children}
    </span>
  );
}

function BrewForm() {
  const { isAutomating, setIsAutomating, setResult, failBrew } = useAppStore();
  const [data, setData] = useState({
    sheetId: "",
    urlDomain: "",
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
    if (isAutomating) return; // ignore double submits while brewing
    try {
      setIsAutomating(true);
      setResult(null);

      const getData = await axios.post(
        `http://localhost:5000/automation/aje-issue`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // PLACEHOLDER — map this from getData.data once the backend response is final
      setResult({
        value: getData.data?.data || 0,
        label: "Total Journal Entry that has Discrepancies",
      });
      return getData;
    } catch (err) {
      console.log(err);
      failBrew(); // cauldron turns red for 3 seconds
    } finally {
      setIsAutomating(false);
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
          <Step>1</Step>Google Sheet ID
        </label>
        <input
          id="al-sheet"
          type="text"
          name="sheetId"
          onChange={handleChange}
          placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
          className={inputCls}
        />
        <div className="flex flex-col gap-2 rounded-xl bg-card-2 px-3.5 py-3 text-[13px] leading-normal text-hint short:gap-1 short:px-3 short:py-2">
          <span>
            <strong className={strongCls}>Where to find it:</strong> open the
            sheet in Google Sheets and copy its URL. The ID is the part right
            after <code className="font-mono text-pumpkin-light">/d/</code>,
            before <code className="font-mono text-pumpkin-light">/edit</code>
          </span>
          <code className="font-mono text-xs break-all text-mist">
            https://docs.google.com/spreadsheets/d/
            <mark className="rounded bg-moss px-1 py-px text-slime-light">
              1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
            </mark>
            /edit#gid=0
          </code>
        </div>
      </div>

      <div className={fieldCls}>
        <label htmlFor="al-domain" className={labelCls}>
          <Step>2</Step>ERPNext domain URL
        </label>
        <input
          id="al-domain"
          name="urlDomain"
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
        disabled={isAutomating}
        aria-busy={isAutomating}
        className="relative flex h-13 flex-none cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-[14px] border-none bg-linear-to-b from-slime-light to-slime font-heading text-lg font-extrabold tracking-[0.01em] text-[#0d1a08] shadow-[0_10px_30px_-10px_rgba(124,227,90,0.55)] transition duration-150 enabled:hover:-translate-y-px enabled:hover:shadow-[0_14px_36px_-8px_rgba(124,227,90,0.75)] enabled:active:translate-y-px disabled:cursor-wait disabled:from-slime/80 disabled:to-[#4FB83A] short:h-[46px]"
      >
        {isAutomating ? (
          <>
            {/* light sweep across the button while brewing */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-shimmer bg-linear-to-r from-transparent via-white/45 to-transparent"
            />
            <svg
              className="size-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeOpacity=".25"
                strokeWidth="3"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span>
              Brewing
              <span className="inline-flex w-5 justify-start">
                <span className="animate-[dot_1.2s_infinite]">.</span>
                <span className="animate-[dot_1.2s_0.2s_infinite]">.</span>
                <span className="animate-[dot_1.2s_0.4s_infinite]">.</span>
              </span>
            </span>
          </>
        ) : (
          <>
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
          </>
        )}
      </button>
    </form>
  );
}

export default BrewForm;
