export type Translation = {
	title: string,
	fields: {
		email: string,
		password: string
	},
	button: string
}

export const en: Translation = {
	title: "Login",
	fields: {
		email: "Email",
		password: "Password"
	},
	button: "Submit"
};

export const fr: Translation = {
	title: "Connexion",
	fields: {
		email: "Email",
		password: "Mot de passe"
	},
	button: "Envoyer"
}