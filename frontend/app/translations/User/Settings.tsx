export type Translation = {
	title: string,
	forms: {
		general: string,
		password: string
	},
	fields: {
		email: string,
		username: string,
		name: string,
		password1: string,
		password2: string
	},
	feedbacks: {
		success: {
			base: string,
			general: string,
			password: string
		},
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
	title: "Settings",
	forms: {
		general: "General",
		password: "Change Password"
	},
	fields: {
		email: "Email",
		username: "Username",
		name: "Full Name",
		password1: "Password",
		password2: "Password (confirm)"
	},
	feedbacks: {
		success: {
			base: "Success!",
			general: "Profile modified!",
			password: "Password changed!"
		},
		error: {
			base: "An error occured.",
			'400': 'Invalid credentials!',
			'404': 'Server loading.',
			'500': 'Server error.',
			password: 'The passwords do not match.'
		},
		noCookie: 'You must allow cookies.'
	},
	error: {
		email: 'A user with this email already exists.',
		username: 'A user with this email already exists.',
		password: 'The passwords do not match.'
	},
	button: "Submit"
};

export const fr: Translation = {
	title: "Préférences",
	forms: {
		general: "Général",
		password: "Changer le Mot de passe"
	},
	fields: {
		email: "Email",
		username: "Pseudo",
		name: "Nom Complet",
		password1: "Mot de passe",
		password2: "Mot de passe (confirmer)"
	},
	feedbacks: {
		success: {
			base: "Succès!",
			general: "Profil modifié!",
			password: "Mot de passe changé!"
		},
		error: {
			base: "Une erreur est survenue.",
			'400': 'Identifiants invalides!',
			'404': 'Serveur en cours de chargement.',
			'500': 'Erreur serveur.',
			password: 'Les mots de passe ne correspondent pas.'
		},
		noCookie: 'You must allow cookies.'
	},
	error: {
		email: 'Un utilisateur avec cet email existe déjà.',
		username: 'Un utilisateur avec ce pseudo existe déjà.',
		password: 'Les mots de passe ne correspondent pas.'
	},
	button: "Submit"
}