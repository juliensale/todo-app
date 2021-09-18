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
		delete: {
			success: string,
			error: string
		}
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
		delete: {
			success: "Deleted!",
			error: "The list could not be deleted."
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
		delete: {
			success: "Supprimée!",
			error: "La liste n'a pas pu être supprimée."
		},
		noCookie: 'Vous devez autoriser les cookies.',
		baseError: 'Une erreur est survenue.'
	}
}