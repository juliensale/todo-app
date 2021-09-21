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
	seeTask: string,
	delete: string,
	warning: string,
	warningMessage: [string, string, string],
	edit: string,
	submit: string,
	noTask: [string, string],
	idError: string,
	returnHome: string
}

export const en: Translation = {
	create: "Create a task",
	title: "Title",
	feedbacks: {
		create: {
			success: "Task created!",
			error: {
				'400': 'Bad request.',
				'404': 'Server loading.',
				'500': 'Server error.'
			}
		},
		edit: {
			success: "Task edited!",
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
	seeTask: "See Task",
	delete: "Delete",
	warning: "Warning",
	warningMessage: ["You are about to delete the following task:", "This action will result in deleting each of its sub-tasks. It cannot be reversed.", "Are you sure you want to delete it?"],
	edit: "Edit",
	submit: "Submit",
	noTask: [
		"There is no Task yet.",
		'Add a title and click the "+" button in the form below to create one.'
	],
	idError: "The sub-list does not exist.",
	returnHome: "Return to Home Page"
};

export const fr: Translation = {
	create: "Créer une tâche",
	title: "Titre",
	feedbacks: {
		create: {
			success: "Tâche créée!",
			error: {
				'400': 'Mauvaise requête.',
				'404': 'Serveur en cours de chargement.',
				'500': 'Erreur serveur.'
			}
		},
		edit: {
			success: "Tâche modifiée!",
			error: {
				'400': 'Mauvaise requête.',
				'404': 'Serveur en cours de chargement.',
				'500': 'Erreur serveur.'
			}
		},
		delete: {
			success: "Supprimée!",
			error: "La tâche n'a pas pu être supprimée."
		},
		noCookie: 'Vous devez autoriser les cookies.',
		baseError: 'Une erreur est survenue.'
	},
	options: "Options",
	seeTask: "Voir la tâche",
	delete: "Supprimer",
	warning: "Attention",
	warningMessage: ["Vous êtes sur le point de supprimer la tâche suivante:", "Cette action va entraîner la suppression de chacune de ses sous-tâches. Cette action n'est pas réversible.", "Êtes-vous sûr(e) de vouloir la supprimer?"],
	edit: "Modifier",
	submit: 'Envoyer',
	noTask: [
		"Il n'y a pas encore de Tâche.",
		'Ajoutez un titre et cliquez sur le bouton "+" dans le formulaire ci-dessous pour en créer une.'
	],
	idError: "La liste n'existe pas.",
	returnHome: "Retourner à l'Accueil"
}