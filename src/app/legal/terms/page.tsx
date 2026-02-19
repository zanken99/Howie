export default function TermsPage() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto w-full">
                <div className="glass-panel p-8 md:p-12 border border-white/5 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl -z-10" />

                    <h1 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight">
                        Пользовательское соглашение (Оферта)
                    </h1>

                    <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-300">
                        <p>
                            Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между администрацией сервиса HowieCheats (далее — «Администрация») и пользователем (далее — «Пользователь»).
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Общие положения</h2>
                        <p>
                            1.1. HowieCheats — это интернет-ресурс, который предоставляет вспомогательные приложения для различных компьютерных игр, площадку для общения Пользователей и прочие разделы.
                            <br /><br />
                            1.2. Вспомогательное приложение — это программное обеспечение, предназначенное для работы на компьютере, которое предоставляет Пользователю возможность превосходства над другими игроками компьютерной игры, для которой данное приложение было разработано, путём различных вспомогательных функций, влияющих на игровой процесс.
                            <br /><br />
                            1.3. Пользование сайтом или вспомогательным приложением возможно только на условиях, изложенных в настоящих пользовательском и лицензионном соглашениях. Если вы не согласны с его условиями, то вам следует немедленно прекратить использование сайта и вспомогательного приложения.
                            <br /><br />
                            1.4. Использование сайта или вспомогательного приложения означает, что Вы согласны с условиями настоящих Лицензионного и Пользовательского соглашений.
                            <br /><br />
                            1.5. Администрация оставляет за собой право изменять условия Соглашения в любой момент без предварительного уведомления.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Условия предоставления услуг</h2>
                        <p className="font-semibold text-[var(--color-primary)]">
                            Покупая нашу продукцию, вы автоматически соглашаетесь с условиями предоставления услуг:
                        </p>
                        <div className="space-y-3 mt-4 pl-2 border-l-2 border-[var(--color-primary)]/30">
                            <p><span className="text-[var(--color-primary)] font-bold">[1]</span> Обход чита может перестать функционировать и прекратить обновления — возврат средств <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[2]</span> В случае если встроенный спуфер перестает работать — возврат средств <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[3]</span> Возврат средств в случае неработоспособности чита — <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[4]</span> Возврат средств при блокировке вашего аккаунта — <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[5]</span> Возврат средств если вы купили чит и ваша сборка не подходит под указанные в теме — <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[6]</span> Некоторый функционал может перестать работать после обновления игры — возврат средств <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[7]</span> Если вы активировали ключ не на свое железо (Использование спуфера) — возврат средств <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>. Сброс HWID на усмотрение администрации проекта.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[8]</span> Оскорбление администрации проекта — <span className="text-red-400 font-bold">Отказ в технической помощи</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[9]</span> Оскорбление участников, пользователей, покупателей запрещено — <span className="text-red-400 font-bold">Отказ в технической помощи</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[10]</span> Запрещается заниматься «Анти-Пиарной» деятельностью проекта.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[11]</span> Запуск запрещенных программ или наличие их на ПК / Попытки взлома — возврат средств <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>. Возможна блокировка подписки.</p>
                        </div>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Список запрещённого ПО</h2>
                        <div className="bg-black/40 border border-red-500/20 rounded-xl p-6">
                            <p className="text-red-400 font-bold mb-4 text-xs uppercase tracking-wider">⚠ Обнаружение данного ПО ведёт к блокировке подписки</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-xs text-gray-400 font-mono">
                                <span>FACEIT</span>
                                <span>VALORANT</span>
                                <span>ollydbg.exe</span>
                                <span>ProcessHacker.exe</span>
                                <span>tcpview.exe</span>
                                <span>autoruns.exe</span>
                                <span>filemon.exe</span>
                                <span>procmon.exe</span>
                                <span>idaq.exe</span>
                                <span>idaq64.exe</span>
                                <span>ImmunityDebugger.exe</span>
                                <span>Wireshark.exe</span>
                                <span>dumpcap.exe</span>
                                <span>HookExplorer.exe</span>
                                <span>ImportREC.exe</span>
                                <span>PETools.exe</span>
                                <span>LordPE.exe</span>
                                <span>SysInspector.exe</span>
                                <span>proc_analyzer.exe</span>
                                <span>sysAnalyzer.exe</span>
                                <span>sniff_hit.exe</span>
                                <span>windbg.exe</span>
                                <span>joeboxcontrol.exe</span>
                                <span>Fiddler.exe</span>
                                <span>joeboxserver.exe</span>
                                <span>ida64.exe</span>
                                <span>ida.exe</span>
                                <span>Vmtoolsd.exe</span>
                                <span>Vmwaretrat.exe</span>
                                <span>Vmwareuser.exe</span>
                                <span>Vmacthlp.exe</span>
                                <span>vboxservice.exe</span>
                                <span>vboxtray.exe</span>
                                <span>KsDumper.exe</span>
                                <span>x64dbg.exe</span>
                                <span>OLLYDBG.exe</span>
                                <span>httpdebuger.exe</span>
                                <span>ReClass.NET.exe</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Дополнительные условия</h2>
                        <div className="space-y-3 pl-2 border-l-2 border-[var(--color-primary)]/30">
                            <p><span className="text-[var(--color-primary)] font-bold">[12]</span> Если наш спуфер сбросил вашу активацию Windows или подписку на сторонний продукт — компенсации ущерба нет, возврат средств <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[13]</span> Продажа / Перепродажа подписок на нашу продукцию без нашего согласия запрещена — <span className="text-red-400 font-bold">удаление подписки</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[14]</span> Продление времени подписки в случае детекта / обновления — на усмотрение администрации проекта.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[15]</span> Покупка софта в статусе <span className="text-yellow-400 font-bold">USE AT RISK / UPDATE / DETECTED</span> — исключительно на ваш риск, возврат средств <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[16]</span> Мы не несем ответственность за BSOD (Синие экраны и т.д.) — в случае поломки Windows возврат средств <span className="text-red-400 font-bold">НЕВОЗМОЖЕН</span>, компенсации ущерба нет.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[17]</span> Все возможные последствия использования Вспомогательных приложений Пользователь берёт на себя. Администрация не несёт никакой ответственности за возможные последствия использования Вспомогательных приложений.</p>
                            <p><span className="text-[var(--color-primary)] font-bold">[18]</span> Для того, чтобы убедиться в неработоспособности купленного продукта, Вы обязаны обратиться в техническую поддержку после первого запуска продукта. Далее в технической поддержке могут запросить удалённый доступ к Вашему ПК. Если Вы отказываетесь от данной процедуры, то денежные средства возврату не подлежат.</p>
                        </div>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Ответственность</h2>
                        <p className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">
                            Любое нарушение правил карается бесконечной блокировкой подписки или любым другим способом наказания, не нарушая условий Соглашения и прав Пользователя.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Конфиденциальность</h2>
                        <p>
                            Администрация HowieCheats имеет право на хранение и обработку конфиденциальной информации пользователя: имя компьютера, IP-адрес и любая другая возможная информация о Пользователе, которая не является личными данными Пользователя (по типу паролей и файлов на компьютере Пользователя), но может являться Персональными данными такового (определяются условиями настоящего Соглашения).
                        </p>

                        <div className="mt-12 pt-6 border-t border-white/10 text-center">
                            <p className="text-gray-500 text-xs">
                                Электронная почта: <a href="mailto:howiecheats@gmail.com" className="text-[var(--color-primary)] hover:underline">howiecheats@gmail.com</a>
                            </p>
                            <p className="text-gray-600 text-xs mt-2">
                                © {new Date().getFullYear()} HowieCheats. Все права защищены.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
