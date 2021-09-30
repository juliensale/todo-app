export type Translation = {
	notFound: string,
	description: string,
	home: string
}

export const en: Translation = {
	notFound: "404 | Not Found",
	description: "The page does not exist or is temporarily unavailable.",
	home: "Return to Home Page"
};

export const fr: Translation = {
	notFound: "404 | Page Introuvable",
	description: "La page n'existe pas ou est temporarirement indisponible.",
	home: "Retourner à l'Accueil"
}