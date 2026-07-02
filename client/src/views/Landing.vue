<script setup>

    const profile = { name: "Дмитрий", role: "Веб-разработчик" };

    const stack = [ "PHP", "Laravel", "Vue.js", "Node.js", "React", "REST API", "My/PostgreSQL", "Redis", "Docker", "Linux", "CI/CD", "Python" ];

    const services = [
        {title: "Можно заполнить, но не знаю чем лучше <3", text: "SPA Lorem SPA Lorem SPA", icon: "</>"},
        {title: "Можно заполнить, но не знаю чем лучше <3", text: "SPA Lorem SPA Lorem SPA", icon: "{ }"},
        {title: "Можно заполнить, но не знаю чем лучше <3", text: "SPA Lorem SPA Lorem SPA", icon: "//"},
    ];

    const stats = [
        { value: "4", "suffix": "+", label: "года коммерческого опыта" },
        { value: "❤️", "suffix": "+", label: "????????????????" },
        { value: "❤️", "suffix": "+", label: "????????????????" }
    ];

    const projects = [
        { title: "ERP-система", tag: "PHP • Laravel • Vue • Docker • Redis", desc: "Автоматизация внутренних процессов, задач и данных о клиентах; REST API и интерфейс на Vue" },
        { title: "MBO и MBI", tag: "Laravel • REST API • RBAC", desc: "Две B2B системы" },
        { title: "E-Commerce backend", tag: "Laravel • MySQL • Redis", desc: "Нагруженный магазин: оптимизация API и SQL" }
    ];
</script>

<template>
    <section id="hero" class="relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0 -z-10">
            <div class="absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"></div>
            <div class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-600/10 blur-3xl"></div>
        </div>

        <div class="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
            <div class="animate-fade-up">
                <p class="text-3xl font-semibold text-white">Привет<span class="accent-dot">.</span></p>
                <p class="mt-2 flex items-center gap-3 text-sl text-slate-300">
                    <span class="h-px w-8 bg-accent-500"></span>
                    Я {{ profile.name }}
                </p>
                <h1 class="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{{ profile.role }}</h1>
                <p class="mt-5 max-w-md text-slate-400">
                    Web-разработчик с 4+ годами коммерческого опыта
                </p>
            </div>

            <div class="relative mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96">
                <div class="absolute inset-0 rounded-full border border-accent-500/30 animate-pulse-ring"></div>
                <div class="absolute inset-6 rounded-full border-2 border-dashed border-accent-500/40 animate-spin-slow"></div>
                <div class="absolute inset-14 rounded-full border border-accent-500/20"></div>
                <div class="absolute inset-10 rounded-full bg-accent-500/10 blur-2xl"></div>

                <div class="absolute inset-6 animate-spin-slow">
                    <span class="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-500 shadow-lg shadow-accent-500/50"></span>
                    <span class="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-400"></span>
                </div>

                <div class="relative w-56 rounded-xl border border-white/10 bg-ink-800/90 p-4 shadow-2xl backdrop-blur">
                    <div class="mb-3 flex gap-1.5">
                        <span class="h-2.5 w-2.5 rounded-full bg-red-400/80"></span>
                        <span class="h-2.5 w-2.5 rounded-full bg-yellow-400/80"></span>
                        <span class="h-2.5 w-2.5 rounded-full bg-green-400/80"></span>
                    </div>
<pre class="text-[11px] leading-5 text-slate-300">
<span class="text-accent-400">const</span> dev = {
    <span class="text-brand-400">stack</span>: [<span class="text-emerald-400">'vue'</span>, <span class="text-emerald-400">'node'</span>],
    <span class="text-brand-400">coffee</span>: <span class="text-accent-400">true</span>,
    <span class="text-brand-400">ship</span>: () => <span class="text-emerald-400">'🚀'</span>,
}</pre>
                </div>
            </div>
        </div>

        <div class="border-y border-white/5 bg-white/[0.02]">
            <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-6 text-sm text-slate-500">
                <span v-for="t in stack" :key="t" class="transition hover:text-accent-400"> {{ t }} </span>
            </div>
        </div>

    </section>

    <section id="about" class="mx-auto max-w-6xl px-5 py-20">
        <div class="grid gap-12 md:grid-cols-2">
            <div class="space-y-5">
                <div v-for="s in services" :key="s.title" class="flex gap-4 border-l-2 border-accent-500/60 pl-5">
                    <div class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-500/10 font-mono text-accent-400">{{ s.icon }}</div>
                    <div>
                        <h3 class="font-semibold text-white">{{ s.title }}</h3>
                        <p class="mt-1 text-sm text-slate-400">{{ s.text }}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 class="text-3xl font-bold">Обо мне</h2>
                <p class="mt-4 text-slate-400">Web-разработчик с 4+ годами коммерческого опыта</p>
                <div class="mt-8 grid grid-cols-3 gap-4">
                    <div v-for="st in stats" :key="st.label">
                        <div class="text-3xl font-extrabold">{{ st.value }}<span class="accent-dot">{{ st.suffix }}</span></div>
                        <div class="mt-1 text-xs text-slate-500">{{ st.label }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="projects" class="mx-auto max-w-6xl px-5 py-16">
        <h2 class="text-center text-3xl font-bold">Проекты<span class="accent-dot">.</span></h2>
        <div class="mt-10 grid gap-5 md:grid-cols-3">
            <article v-for="p in projects" :key="p.title" class="card group transition duration-300 hover:-translate-y-1 hover:border-accent-500/40">
                <div class="mb-4 h-32 rounded-xl bg-gradient-to-br from-accent-500/20 to-brand-600/20 ring-1 ring-white/5"></div>
                <h3 class="font-semibold text-white group-hover:text-accent-400">{{ p.title }}</h3>
                <p class="mt-1 text-xs uppercase tracking-wide text-accent-400/80">{{ p.tag }}</p>
                <p class="mt-2 text-sm text-slate-400">{{ p.desc }}</p>
            </article>
        </div>
    </section>

</template>