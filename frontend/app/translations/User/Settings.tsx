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
	button: "Submit"
}