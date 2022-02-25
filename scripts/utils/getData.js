export const getData = async () =>
          await fetch(`data/photographers.json`).then((response) => response.json());
