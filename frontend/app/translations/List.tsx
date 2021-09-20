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
			error: string,
		}
		noCookie: string,
		baseError: string
	},
	options: string,
	seeList: string,
	delete: string,
	warning: string,
	warningMessage: [string, string, string],
	edit: string,
	submit: string,
	noList: [string, string]
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
	warning: "Warning",
	warningMessage: ["You are about to delete the following list:", "This action will result in deleting each of its sub-lists, and their content. It cannot be reversed.", "Are you sure you want to delete it?"],
	edit: "Edit",
	submit: "Submit",
	noList: [
		"There is no List yet.",
		'Add a title and click the "+" button in the form below to create one.'
	]
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
	warning: "Attention",
	warningMessage: ["Vous êtes sur le point de supprimer la liste suivante:", "Cette action va entraîner la suppression de chacune de ses sous-listes et de leur contenu. Cette action n'est pas réversible.", "Êtes-vous sûr(e) de vouloir la supprimer?"],
	edit: "Modifier",
	submit: 'Envoyer',
	noList: [
		"Il n'y a pas encore de Liste.",
		'Ajoutez un titre et cliquez sur le bouton "+" dans le formulaire ci-dessous pour en créer une.'
	]
}