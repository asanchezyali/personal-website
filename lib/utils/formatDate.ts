export const getDate = (date: string, language: string) => {
  const articleDate = new Date(date);
  const year = articleDate.getFullYear();
  const month = articleDate.toLocaleString(language, { month: "long" });
  const day = articleDate.getDate();
  return [year, month, day];
};

export const timeAgo = (date: string, language: string) => {
  const timeNames: { [key: string]: any } = {
    es: {
      days: (days: number) => `Hace ${days} días`,
      months: (months: number) => `Hace ${months} meses`,
      years: (years: number) => `Hace ${years} años`,
    },
    en: {
      days: (days: number) => `${days} days ago`,
      months: (months: number) => `${months} months ago`,
      years: (years: number) => `${years} years ago`,
    },
  };
  const articleDate = new Date(date);
  const today = new Date();
  const diff = Math.abs(today.getTime() - articleDate.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 30) {
    return timeNames[language].days(days);
  } else if (days < 365) {
    const months = Math.ceil(days / 30);
    return timeNames[language].months(months);
  } else {
    const years = Math.ceil(days / 365);
    return timeNames[language].years(years);
  }
};

export const formatDate = (date: string, language: string) => {
  const [year, month, day] = getDate(date, language);
  if (language === "es") {
    return `${day} de ${month} de ${year} - ${timeAgo(date, language)}`;
  } else {
    return `${month} ${day}, ${year} - ${timeAgo(date, language)}`;
  }
};
