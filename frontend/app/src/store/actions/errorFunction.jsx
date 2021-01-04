const errorFunction = () => {
    if (window.confirm("Une erreur est survenue.\nRafraîchir la page?")) {
        window.location.reload()
    } else {

    }
}

export default errorFunction