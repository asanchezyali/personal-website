export const siteMetadata: { [key: string]: any } = {
  es: {
    headerTitle: "Alejandro Sánchez Yalí - Blog",
    headerSubtitle:"¿Si programo entonces existo?",
    readMore: "Leer más ...",
    readingTime: (time:number) => `${time} min de lectura`,
    views: (views:string) => `${views} vistas`,
    date: (date:string, days:string) => `${date} - Hace ${days} días`,

    headerNavLinks: [
      { href: "/blog", name: "Artículos" },
      { href: "/tags", name: "Etiquetas" },
      { href: "/projects", name: "Proyectos" },
      { href: "/about", name: "Bio" },
    ],
  },
  en: {
    headerTitle: "Alejandro Sánchez Yalí - Blog",
    headerSubtitle:"If I program, then I exist?",
    readMore: "Read more ...",
    readingTime: (time:string) => `${time} min read`,
    views: (views:number) => `${views} views`,
    date: (date:string, days:string) => `${date} - ${days} days ago`,
    headerNavLinks: [
      { href: "/blog", name: "Blog" },
      { href: "/tags", name: "Tags" },
      { href: "/projects", name: "Projects" },
      { href: "/about", name: "About" },
    ],
  },
  theme: "system",
  avatar: "/avatar.jpeg",
  footerText: "© 2021 Alejandro Sánchez Yalí",
};
