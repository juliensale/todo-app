export type Translation = {
	title: string,
	fields: {
		email: string,
		password: string
	},
	error: string,
	feedbacks: {
		login: string,
		error: {
			base: string,
			'400': string,
			'404': string,
			'500': string

		},
		noCookie: string
	},
	button: string
}

export const en: Translation = {
	title: "Login",
	fields: {
		email: "Email",
		password: "Password"
	},
	error: 'The email or password is invalid.',
	feedbacks: {
		login: 'Login successful!',
		error: {
			base: "An error occured.",
			'400': 'Wrong credentials!',
			'404': 'Server loading.',
			'500': 'Server error.'
		},
		noCookie: 'You must allow cookies.'
	},
	button: "Submit"
};

export const fr: Translation = {
	title: "Connexion",
	fields: {
		email: "Email",
		password: "Mot de passe"
	},
	error: "L'email ou le mot de passe est invalide.",
	feedbacks: {
		login: 'Connexion réussie!',
		error: {
			base: "Une erreur est survenue.",
			'400': 'Mauvais identifiants!',
			'404': 'Serveur en cours de chargement.',
			'500': 'Erreur du serveur.'
		},
		noCookie: 'Vous devez autoriser les cookies.'
	},
	button: "Envoyer"
}