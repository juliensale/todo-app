export type Translation = {
	create: string,
	color: string,
	feedbacks: {
		create: {
			success: string,
			error: {
				'400': string,
				'404': string,
				'500': string
			}
		},
		noCookie: string,
		baseError: string
	}
}

export const en: Translation = {
	create: "Create a list",
	color: "Color",
	feedbacks: {
		create: {
			success: "List created!",
			error: {
				'400': 'Bad request.',
				'404': 'Server loading.',
				'500': 'Server error.'
			}
		},
		noCookie: 'You must allow cookies',
		baseError: 'An error occured.'
	}
};

export const fr: Translation = {
	create: "Créer une liste",
	color: "Couleur",
	feedbacks: {
		create: {
			success: "Liste créée!",
			error: {
				'400': 'Mauvaise requête.',
				'404': 'Serveur en cours de chargement.',
				'500': 'Erreur serveur.'
			}
		},
		noCookie: 'Vous devez autoriser les cookies.',
		baseError: 'Une erreur est survenue.'
	}
}