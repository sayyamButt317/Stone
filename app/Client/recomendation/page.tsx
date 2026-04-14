"use client"

import Image from "next/image"

export default function RecomendationPage() {
  return (
    <div className="min-h-screen bg-[#111413] font-[Manrope] text-[#e1e3e1] selection:bg-[#e2c196]/30">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300&family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 300,
            "GRAD" 0,
            "opsz" 24;
        }
        .gold-gradient {
          background: linear-gradient(135deg, #e2c196 0%, #a58860 100%);
        }
        .emerald-glow {
          box-shadow: 0 0 40px rgba(176, 205, 198, 0.1);
        }
        .glass-card {
          background: rgba(40, 43, 41, 0.4);
          backdrop-filter: blur(24px);
        }
        .glass-card:hover {
          background: rgba(226, 193, 150, 0.05);
        }
      `}</style>

      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-12 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="font-['Noto_Serif'] text-2xl uppercase tracking-[0.2em] text-[#e2c196]">L&apos;ATELIER</div>
        <nav className="hidden items-center gap-10 md:flex">
          <a className="font-['Noto_Serif'] font-light tracking-wide text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
            Collections
          </a>
          <a
            className="border-b border-[#e2c196]/30 pb-1 font-['Noto_Serif'] font-light tracking-wide text-[#e2c196] transition-colors duration-500 hover:text-[#e2c196]"
            href="#"
          >
            Bespoke
          </a>
          <a className="font-['Noto_Serif'] font-light tracking-wide text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
            Heritage
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <button className="text-[#e2c196] transition-all duration-300 ease-in-out hover:scale-95" type="button">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button className="text-[#e2c196] transition-all duration-300 ease-in-out hover:scale-95" type="button">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </header>

      <aside className="fixed left-0 z-40 hidden h-screen w-24 flex-col items-center gap-8 border-r border-[#414846]/10 bg-[#191c1b]/60 py-24 backdrop-blur-2xl md:flex">
        <div className="mb-12 text-center">
          <div className="font-['Noto_Serif'] text-[10px] uppercase leading-tight tracking-widest text-[#e2c196]">
            Step
            <br />
            02
          </div>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="group flex cursor-pointer flex-col items-center gap-1">
            <div className="soft-fade-transition rounded-full p-4 text-[#e1e3e1]/40 transition-all duration-300 hover:bg-[#1d201f]">
              <span className="material-symbols-outlined">edit_note</span>
            </div>
            <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#e1e3e1]/40">Design</span>
          </div>
          <div className="group flex cursor-pointer flex-col items-center gap-1">
            <div className="soft-fade-transition rounded-full bg-[#e2c196]/10 p-4 text-[#e2c196] shadow-[0_0_20px_rgba(226,193,150,0.2)] transition-all duration-300 hover:bg-[#1d201f]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                diamond
              </span>
            </div>
            <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#e2c196]">Gemstones</span>
          </div>
          <div className="group flex cursor-pointer flex-col items-center gap-1">
            <div className="soft-fade-transition rounded-full p-4 text-[#e1e3e1]/40 transition-all duration-300 hover:bg-[#1d201f]">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#e1e3e1]/40">Setting</span>
          </div>
          <div className="group flex cursor-pointer flex-col items-center gap-1">
            <div className="soft-fade-transition rounded-full p-4 text-[#e1e3e1]/40 transition-all duration-300 hover:bg-[#1d201f]">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#e1e3e1]/40">Review</span>
          </div>
        </div>
      </aside>

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-24 pt-32 md:pl-24">
        <div className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#314c47]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#e2c196]/5 blur-[100px]" />

        <section className="relative z-10 w-full max-w-6xl px-8 md:px-20">
          <header className="mb-16 space-y-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e2c196]">Gemstone Selection</span>
            <h1 className="font-['Noto_Serif'] text-5xl font-light leading-tight text-[#e1e3e1] md:text-7xl">How would you like to choose?</h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-[#c1c8c5] md:text-xl">
              Find the perfect gemstone by type or by your preferred aesthetic.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <button className="glass-card emerald-glow group flex h-[400px] flex-col justify-between rounded-lg border border-[#414846]/10 p-12 text-left transition-all duration-500 hover:scale-[1.02]" type="button">
              <div className="space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#414846]/20 bg-[#1d201f] text-[#e2c196] transition-transform duration-500 group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl">diamond</span>
                </div>
                <div>
                  <h3 className="mb-3 font-['Noto_Serif'] text-3xl text-[#e1e3e1]">Pick by stone</h3>
                  <p className="text-lg font-light text-[#c1c8c5]">Select from our variety of species.</p>
                </div>
              </div>
              <div className="relative mt-8 h-40 w-full overflow-hidden rounded-md opacity-60 transition-opacity duration-700 group-hover:opacity-100">
                <Image
                  alt="Macro photography of raw multi-colored gemstones and high-quality cut diamonds scattered on a dark velvet surface with soft studio lighting"
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtOww2Q60N6ZeOmgRDA86hUmmXMYCBQl9TuE1QMPAsAmuPj0p5_3OVYVytza_GfSy8qofpIJGpyYF-RUzGEEn3UG4uklrq23jHFkVoAfm-DnqrBmh8QU54_3lPoy5osOAVrRCWStiEmNEY9KHxXJfT0zFQyAsaTP8xnJCYSp-5iuNuJD7G7g2xfZxWAj2YloHUttMs_0GJm4Akd4QzccJA02f_Qbu3dwIrcwc0GDGKROmKSpK8bf9EoCKjV8vgM8fiCrjYhjaoJJ8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d201f]/80 to-transparent" />
              </div>
            </button>

            <button className="glass-card emerald-glow group flex h-[400px] flex-col justify-between rounded-lg border border-[#414846]/10 p-12 text-left transition-all duration-500 hover:scale-[1.02]" type="button">
              <div className="space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#414846]/20 bg-[#1d201f] text-[#e2c196] transition-transform duration-500 group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl">palette</span>
                </div>
                <div>
                  <h3 className="mb-3 font-['Noto_Serif'] text-3xl text-[#e1e3e1]">Pick by colour</h3>
                  <p className="text-lg font-light text-[#c1c8c5]">Browse stones by their visual hue.</p>
                </div>
              </div>
              <div className="relative mt-8 h-40 w-full overflow-hidden rounded-md opacity-60 transition-opacity duration-700 group-hover:opacity-100">
                <Image
                  alt="An artistic arrangement of faceted jewels showing a spectrum of colors from deep emerald green to sapphire blue and ruby red"
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbBKce1kI7qdDuYcYE3q_iU4jNo0L92YUriewUP3-2LmLXzhHPq5-DIePTA8QK-vODi2U8CtFPMIHffsQoorALCkImYLzlxYhIkYJuIVIQb5-Wh9rWvBDHi0WfJuPMAX7oCbmi6f9KNeAOGjeCjOYyjMoYAvex7F9q1Qz0DEjShS4UPpXNaeybtiH8fk7e0x8FKu7JSpl7rrNMHdlKo-oW5Qj-t7pEy_AkVJc1AoTZvG9Zej3nQRsFEUl1M13RBE1TyegsUOGuI4w"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d201f]/80 to-transparent" />
              </div>
            </button>
          </div>

          <footer className="mt-20 flex items-center justify-between">
            <button className="group flex items-center gap-3 rounded-full px-8 py-4 text-sm uppercase tracking-widest text-[#c1c8c5] transition-colors hover:text-[#e2c196]" type="button">
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
              Back
            </button>
            <button
              className="gold-gradient flex cursor-not-allowed items-center gap-3 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#412d0d] opacity-30 shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
              disabled
              type="button"
            >
              Next
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </footer>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around bg-[#111413]/80 py-4 backdrop-blur-xl md:hidden">
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[#e1e3e1]/40">edit_note</span>
          <span className="text-[10px] uppercase text-[#e1e3e1]/40">Design</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[#e2c196]" style={{ fontVariationSettings: '"FILL" 1' }}>
            diamond
          </span>
          <span className="text-[10px] uppercase text-[#e2c196]">Stones</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[#e1e3e1]/40">auto_awesome</span>
          <span className="text-[10px] uppercase text-[#e1e3e1]/40">Setting</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="material-symbols-outlined text-[#e1e3e1]/40">visibility</span>
          <span className="text-[10px] uppercase text-[#e1e3e1]/40">Review</span>
        </div>
      </nav>
    </div>
  )
}
