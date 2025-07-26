
const fetchmethode = {

    getArticle: async () => {
        try {
            const response = await fetch('http://localhost:5000/articles', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error);
        }
    }
}