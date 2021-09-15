export type Translation = {
	title: string,
	fields: {
		email: string,
		username: string,
		password1: string,
		password2: string
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
	button: "Envoyer"
}