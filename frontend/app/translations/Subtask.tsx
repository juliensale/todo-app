export type Translation = {
	create: string,
	title: string,
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
		},
		noCookie: string,
		baseError: string
	},
	options: string,
	delete: string,
	warning: string,
	warningMessage: [string, string, string],
	edit: string,
	submit: string
}

export const en: Translation = {
	create: "Create a sub-task",
	title: "Title",
	feedbacks: {
		create: {
			success: "Sub-task created!",
			error: {
				'400': 'Bad request.',
				'404': 'Server loading.',
				'500': 'Server error.'
			}
		},
		edit: {
			success: "Sub-task edited!",
			error: {
				'400': 'Bad request.',
				'404': 'Server loading.',
				'500': 'Server error.'
			}
		},
		delete: {
			success: "Deleted!",
			error: "The task could not be deleted."
		},
		noCookie: 'You must allow cookies',
		baseError: 'An error occured.'
	},
	options: "Options",
	delete: "Delete",
	warning: "Warning",
	warningMessage: ["You are about to delete the following sub-task:", "This action cannot be reversed.", "Are you sure you want to delete it?"],
	edit: "Edit",
	submit: "Submit"
};

export const fr: Translation = {
	create: "Créer une sous-tâche",
	title: "Titre",
	feedbacks: {
		create: {
			success: "Sous-tâche créée!",
			error: {
				'400': 'Mauvaise requête.',
				'404': 'Serveur en cours de chargement.',
				'500': 'Erreur serveur.'
			}
		},
		edit: {
			success: "Sous-tâche modifiée!",
			error: {
				'400': 'Mauvaise requête.',
				'404': 'Serveur en cours de chargement.',
				'500': 'Erreur serveur.'
			}
		},
		delete: {
			success: "Supprimée!",
			error: "La sous-tâche n'a pas pu être supprimée."
		},
		noCookie: 'Vous devez autoriser les cookies.',
		baseError: 'Une erreur est survenue.'
	},
	options: "Options",
	delete: "Supprimer",
	warning: "Attention",
	warningMessage: ["Vous êtes sur le point de supprimer la sous-tâche suivante:", "Cette action n'est pas réversible.", "Êtes-vous sûr(e) de vouloir la supprimer?"],
	edit: "Modifier",
	submit: 'Envoyer'
}