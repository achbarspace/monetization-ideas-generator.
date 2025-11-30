
export enum Category {
  ADVERTISING = "Publicité",
  SUBSCRIPTIONS = "Abonnements",
  ECOMMERCE = "E-commerce",
  AFFILIATE = "Affiliation",
  SERVICES = "Services",
  PREMIUM_CONTENT = "Contenu Premium",
  OTHER = "Autre"
}

export interface Idea {
  category: Category;
  title: string;
  description: string;
}
