// Fonction de fetch pour récupérer les données du fichier JSON
export const getData = async () =>
  await fetch('data/photographers.json').then((response) => response.json())
