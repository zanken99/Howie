"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const faqs = [
  {
    q: "Как происходит доставка?",
    a: "После оплаты вы моментально получаете ключ активации и подробную инструкцию по установке на указанный email и в личном кабинете.",
  },
  {
    q: "Какие способы оплаты доступны?",
    a: "Мы принимаем банковские карты, криптовалюту, ЮMoney, QIWI и другие популярные платёжные системы.",
  },
  {
    q: "Что делать если чит обнаружен?",
    a: "Мы моментально обновляем софт после детекта. Если статус 'Detected' — подождите обновления. Мы компенсируем время простоя.",
  },
  {
    q: "Безопасно ли использовать?",
    a: "Все наши продукты проходят тестирование перед выпуском. Мы используем kernel-level технологии для обхода античитов. Однако 100% гарантии от бана не существует.",
  },
  {
    q: "Есть ли поддержка?",
    a: "Да, наша поддержка работает 24/7 через Telegram и Discord. Среднее время ответа — 15 минут.",
  },
  {
    q: "Можно ли вернуть деньги?",
    a: "Возврат возможен в течение 24 часов если продукт не работает и мы не можем решить проблему. Подробнее — в правилах использования.",
  },
  {
    q: "На каких ОС работает?",
    a: "Большинство продуктов поддерживают Windows 10/11 (64-bit). Конкретные требования указаны на странице каждого товара.",
  },
];

export default function FaqPage() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [1, 2, 3, 4, 5, 6, 7].map((id) => ({
    q: t(`faq.q${id}`),
    a: t(`faq.a1` === `faq.a${id}` && id !== 1 ? `faq.a${id}` : `faq.a${id}`), // Ensuring valid key access
  }));

  // Re-map cleanly
  const faqList = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    q: t(`faq.q${i}`),
    a: t(`faq.a${i}`)
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">❓ {t("nav.faq")}</h1>
      <p className="text-sm text-gray-500 mb-10">{t("footer.support")}</p>

      <div className="space-y-3">
        {faqList.map((faq, i) => (
          <div
            key={i}
            className="glass-panel rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-[var(--color-primary)]/30 transition-all"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="p-6 flex justify-between items-center bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors">
              <h3 className="text-lg font-bold text-white group-hover:text-[var(--color-primary)] transition-colors pr-8">
                {faq.q}
              </h3>
              <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'rotate-45 bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-gray-400'}`}>
                <span className="text-xl font-bold">+</span>
              </div>
            </div>

            <div
              className={`grid transition-all duration-300 ease-in-out ${openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
