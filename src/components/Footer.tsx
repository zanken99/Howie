"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-auto border-t-2 border-white/10 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group relative top-2">
              <div className="relative w-28 h-28 flex items-center justify-center transition-all group-hover:scale-105">
                <img src="/media/logo.png" alt="HowieCheats Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tight text-white font-[family-name:var(--font-display)]">
                  HOWIE
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase">
                  CHEATS
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {t("footer.desc")}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-5 text-[var(--color-primary)] font-[family-name:var(--font-display)]">{t("footer.catalog")}</h3>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><Link href="/#games" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.all_products")}</Link></li>
              <li><Link href="/legal/terms" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.offer")}</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-[var(--color-primary)] transition-colors">{t("footer.privacy")}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-5 text-[var(--color-primary)] font-[family-name:var(--font-display)]">{t("footer.support")}</h3>
            <ul className="space-y-3 text-sm text-gray-400 font-medium">
              <li><Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">FAQ</Link></li>
              <li><Link href="/guarantees" className="hover:text-[var(--color-primary)] transition-colors">{t("nav.guarantees")}</Link></li>
              <li><a href="https://t.me/HowieCheat_bot" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">{t("nav.support")}</a></li>
              <li><a href="https://discord.gg/howiecheat" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">Discord Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="https://t.me/HowieCheat" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">💬 Channel</a></li>
              <li><a href="https://t.me/HowieCheat_bot" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">🤖 Support Bot</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-medium">
            © {new Date().getFullYear()} HowieCheats. {t("footer.rights")}
          </p>
          <div className="flex gap-4">
            <a href="https://t.me/HowieCheat" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[var(--color-primary)]/20 border-2 border-white/10 hover:border-[var(--color-primary)] flex items-center justify-center transition-all group">
              <img src="/media/telegram.png" alt="Telegram" className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://discord.gg/howiecheat" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[var(--color-primary)]/20 border-2 border-white/10 hover:border-[var(--color-primary)] flex items-center justify-center transition-all group">
              <img src="/media/discord.png" alt="Discord" className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
