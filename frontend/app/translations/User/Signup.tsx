export type Translation = {
	title: string,
	fields: {
		email: string,
		username: string,
		password1: string,
		password2: string
	},
	feedbacks: {
		success: string,
		error: {
			base: string,
			'400': string,
			'404': string,
			'500': string,
			password: string
		},
		noCookie: string
	},
	error: {
		email: string,
		username: string,
		password: string
	},
	button: string
}

export const en: Translation = {
	title: "Signup",
	fields: {
		email: "Email",
		username: "Username",
		password1: "Password",
		password2: "Password (confirm)"
	},
	feedbacks: {
		success: 'Account created! Logged in.',
		error: {
			base: 'An error occured.',
			'400': 'Invalid credentials!',
			'404': 'Server loading.',
			'500': 'Server error.',
			password: "The passwords do not match."
		},
		noCookie: 'You must allow cookies.'
	},
	error: {
		email: "A user with this email already exists.",
		username: "A user with this username already exists.",
		password: "The passwords do not match."
	},
	button: "Submit"
};

export const fr: Translation = {
	title: "Inscription",
	fields: {
		email: "Email",
		username: "Pseudo",
		password1: "Mot de passe",
		password2: "Mot de passe (confirmer)"
	},
	feedbacks: {
		success: "Compte créé! Connecté.",
		error: {
			base: 'Une erreur est survenue.',
			'400': 'Identifiants invalides!',
			'404': 'Serveur en cours de chargement.',
			'500': 'Erreur serveur.',
			password: "Les mots de passe ne correspondent pas."
		},
		noCookie: "Vous devez autoriser les cookies."
	},
	error: {
		email: "Un utilisateur avec cet email existe déjà.",
		username: "Un utilisateur avec ce pseudo existe déjà.",
		password: "Les mots de passe ne correspondent pas."
	},
	button: "Envoyer"
}