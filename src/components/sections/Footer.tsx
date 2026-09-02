import { BRAND, COMPANY_INFO, FOOTER_LINKS } from "../../data/content";

export function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-hairline bg-graphite-950 px-6 py-14 sm:px-10 lg:px-16"
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
        <p className="font-display text-sm tracking-[0.15em] text-ivory">
          {BRAND.name}
        </p>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
          {FOOTER_LINKS.columns.map((column) => (
            <div key={column.heading}>
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted">
                {column.heading}
              </p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-ivory/80 transition-colors duration-300 hover:text-amber-soft"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-1.5 border-t border-hairline pt-6 font-mono-data">
        <p className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-muted">
          <span>{COMPANY_INFO.legalName}</span>
          <span aria-hidden="true">·</span>
          <span>대표전화 {COMPANY_INFO.representativePhone}</span>
          <span aria-hidden="true">·</span>
          <span>사업자등록번호 {COMPANY_INFO.businessNumber}</span>
        </p>
        <p className="text-[11px] text-muted">{COMPANY_INFO.address}</p>
        <p className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-muted">
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="transition-colors duration-300 hover:text-amber-soft"
          >
            {COMPANY_INFO.email}
          </a>
          <span aria-hidden="true">·</span>
          <span>운영시간 {COMPANY_INFO.hours}</span>
        </p>
      </div>

      <div className="mt-6 border-t border-hairline pt-6">
        <p className="text-[11px] text-muted">
          © {new Date().getFullYear()} {BRAND.name}. Concept brand for
          portfolio purposes only.
        </p>
      </div>
    </footer>
  );
}
