// Fixed dictionary for closed-list values stored in Hebrew in the CRM
// (property types, cities, a few spec values). Free text (descriptions) is never translated here.
// A term missing from the list falls back to the Hebrew original — add it here.
type Tr = { en: string; fr: string; ru: string }

export const TERMS: Record<string, Tr> = {
  // property types
  'משרד': { en: 'Office', fr: 'Bureau', ru: 'Офис' },
  'משרדים': { en: 'Offices', fr: 'Bureaux', ru: 'Офисы' },
  'חנות': { en: 'Shop', fr: 'Boutique', ru: 'Магазин' },
  'חנויות': { en: 'Shops', fr: 'Boutiques', ru: 'Магазины' },
  'מסחר': { en: 'Retail', fr: 'Commerce', ru: 'Торговля' },
  'מסחרי': { en: 'Commercial', fr: 'Commercial', ru: 'Коммерческая' },
  'שטח מסחרי': { en: 'Commercial space', fr: 'Espace commercial', ru: 'Коммерческая площадь' },
  'מחסן': { en: 'Warehouse', fr: 'Entrepôt', ru: 'Склад' },
  'אחסנה': { en: 'Storage', fr: 'Stockage', ru: 'Хранение' },
  'מרלוג': { en: 'Logistics center', fr: 'Centre logistique', ru: 'Логистический центр' },
  'לוגיסטיקה': { en: 'Logistics', fr: 'Logistique', ru: 'Логистика' },
  'תעשיה': { en: 'Industrial', fr: 'Industriel', ru: 'Промышленность' },
  'תעשייה': { en: 'Industrial', fr: 'Industriel', ru: 'Промышленность' },
  'תעשייתי': { en: 'Industrial', fr: 'Industriel', ru: 'Промышленный' },
  'מבנה תעשיה': { en: 'Industrial building', fr: 'Bâtiment industriel', ru: 'Промышленное здание' },
  'מלאכה': { en: 'Light industry', fr: 'Artisanat', ru: 'Мастерские' },
  'אולם': { en: 'Hall', fr: 'Salle', ru: 'Зал' },
  'אולמות': { en: 'Halls', fr: 'Salles', ru: 'Залы' },
  'תצוגה': { en: 'Showroom', fr: 'Showroom', ru: 'Шоурум' },
  'קליניקה': { en: 'Clinic', fr: 'Cabinet médical', ru: 'Клиника' },
  'מסעדה': { en: 'Restaurant', fr: 'Restaurant', ru: 'Ресторан' },
  'מטבח': { en: 'Kitchen', fr: 'Cuisine', ru: 'Кухня' },
  'מעבדה': { en: 'Laboratory', fr: 'Laboratoire', ru: 'Лаборатория' },
  'חניה': { en: 'Parking', fr: 'Parking', ru: 'Парковка' },
  'כללי': { en: 'General', fr: 'Général', ru: 'Общее' },
  'קרקע': { en: 'Land', fr: 'Terrain', ru: 'Земля' },
  'דירה': { en: 'Apartment', fr: 'Appartement', ru: 'Квартира' },
  'פנטהאוז': { en: 'Penthouse', fr: 'Penthouse', ru: 'Пентхаус' },
  'מגורים': { en: 'Residential', fr: 'Résidentiel', ru: 'Жильё' },
  'עסק למכירה': { en: 'Business for sale', fr: 'Fonds de commerce', ru: 'Продажа бизнеса' },
  // spec values
  'אין': { en: 'None', fr: 'Aucune', ru: 'Нет' },
  'מידי': { en: 'Immediate', fr: 'Immédiate', ru: 'Сразу' },
  'גמיש': { en: 'Flexible', fr: 'Flexible', ru: 'Гибко' },
  // cities
  'תל אביב': { en: 'Tel Aviv', fr: 'Tel Aviv', ru: 'Тель-Авив' },
  'פתח תקווה': { en: 'Petah Tikva', fr: 'Petah Tikva', ru: 'Петах-Тиква' },
  'פתח תקוה': { en: 'Petah Tikva', fr: 'Petah Tikva', ru: 'Петах-Тиква' },
  'ראשון לציון': { en: 'Rishon LeZion', fr: 'Rishon LeZion', ru: 'Ришон-ле-Цион' },
  'בני ברק': { en: 'Bnei Brak', fr: 'Bnei Brak', ru: 'Бней-Брак' },
  'הוד השרון': { en: 'Hod HaSharon', fr: 'Hod HaSharon', ru: 'Ход-ха-Шарон' },
  'הרצליה': { en: 'Herzliya', fr: 'Herzliya', ru: 'Герцлия' },
  'נתניה': { en: 'Netanya', fr: 'Netanya', ru: 'Нетания' },
  'ראש העין': { en: 'Rosh HaAyin', fr: 'Rosh HaAyin', ru: 'Рош-ха-Аин' },
  'לוד': { en: 'Lod', fr: 'Lod', ru: 'Лод' },
  'חיפה': { en: 'Haifa', fr: 'Haïfa', ru: 'Хайфа' },
  'ירושלים': { en: 'Jerusalem', fr: 'Jérusalem', ru: 'Иерусалим' },
  'בית דגן': { en: 'Beit Dagan', fr: 'Beit Dagan', ru: 'Бейт-Даган' },
  'אור עקיבא': { en: 'Or Akiva', fr: 'Or Akiva', ru: 'Ор-Акива' },
  'מודיעין': { en: 'Modiin', fr: 'Modiin', ru: 'Модиин' },
  'בית שמש': { en: 'Beit Shemesh', fr: 'Beit Shemesh', ru: 'Бейт-Шемеш' },
  'יבנה': { en: 'Yavne', fr: 'Yavne', ru: 'Явне' },
  'גן יבנה': { en: 'Gan Yavne', fr: 'Gan Yavne', ru: 'Ган-Явне' },
  'צריפין': { en: 'Tzrifin', fr: 'Tzrifin', ru: 'Црифин' },
  'חדרה': { en: 'Hadera', fr: 'Hadera', ru: 'Хадера' },
  'עפולה': { en: 'Afula', fr: 'Afula', ru: 'Афула' },
  'נתיבות': { en: 'Netivot', fr: 'Netivot', ru: 'Нетивот' },
  'בת הדר': { en: 'Bat Hadar', fr: 'Bat Hadar', ru: 'Бат-Хадар' },
  'כרמיאל': { en: 'Karmiel', fr: 'Karmiel', ru: 'Кармиэль' },
  'אשדוד': { en: 'Ashdod', fr: 'Ashdod', ru: 'Ашдод' },
  'אשקלון': { en: 'Ashkelon', fr: 'Ashkelon', ru: 'Ашкелон' },
  'מגדל העמק': { en: 'Migdal HaEmek', fr: 'Migdal HaEmek', ru: 'Мигдаль-ха-Эмек' },
}

export function tr(term: string | null | undefined, locale: string): string {
  const key = (term ?? '').trim()
  if (locale === 'he' || !key) return key
  return TERMS[key]?.[locale as keyof Tr] ?? key
}

// "חנות, משרדים" → "Shop, Offices"
export function trList(list: string, locale: string): string {
  if (locale === 'he') return list
  return list.split(',').map(s => tr(s, locale)).join(', ')
}
