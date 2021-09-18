export type Translation = {
	create: string,
	title: string
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
		edit: {
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
	},
	options: string,
	seeList: string,
	delete: string,
	edit: string,
	submit: string
}

export const en: Translation = {
	create: "Create a list",
	title: "Title",
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
		edit: {
			success: "List edited!",
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
	},
	options: "Options",
	seeList: "See List",
	delete: "Delete",
	edit: "Edit",
	submit: "Submit"
};

export const fr: Translation = {
	create: "Créer une liste",
	title: "Titre",
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
		edit: {
			success: "Liste modifiée!",
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
	},
	options: "Options",
	seeList: "Voir la liste",
	delete: "Supprimer",
	edit: "Modifier",
	submit: 'Envoyer'
}