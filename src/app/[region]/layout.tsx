import { I18nProvider } from "@/lib/i18n";
import { PageLoader } from "@/components/PageLoader";
import VideoBackground from "@/components/VideoBackground";
import BackgroundMusic from "@/components/BackgroundMusic";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
    return [{ region: 'ru' }, { region: 'world' }];
}

export default async function RegionLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ region: string }>;
}>) {
    const { region } = await params;
    return (
        <>
            <PageLoader />
            <I18nProvider region={region}>
                <div className="relative flex flex-col min-h-screen">
                    <VideoBackground />
                    <BackgroundMusic />
                    <Header />
                    <main className="flex-grow z-10">{children}</main>
                    <Footer />
                </div>
            </I18nProvider>
        </>
    );
}
