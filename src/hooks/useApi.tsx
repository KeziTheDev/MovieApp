// Definice enumu pro různé typy vyhledávání
export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    episode = 'episode',
}

// Rozhraní pro reprezentaci výsledků vyhledávání
export interface SearchResult {
    Title: string
    Year: string
    Poster: string
    imdbID: string
    Type: string
}

// Rozhraní pro reprezentaci chyby při vyhledávání
export interface SearchError {
    Response: string
    Error: string
}

// Rozhraní pro reprezentaci detailů o filmu/seriálu
export interface DetailsResult {
    Genre: string
    Title: string
    Year: string
    Poster: string
    Plot: string
    imdbRating: string
    Director: string
    Actors: string
    Website: string
    Awards: string
}

// Vlastní hook pro komunikaci s OMDB API
export const useApi = () => {
    //Url a klíč pro přístup k OMDB API
    let url = 'https://www.omdbapi.com/'
    let apiKey = 'dfeed471'

    // Funkce pro vyhledávání na základě zadaného titulu a typu
    const searchData = async (title: string, type: SearchType): Promise<SearchResult[] | SearchError> =>{
        const result = await fetch(
            `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`,
        )
        return result.json()
    }

        // Funkce pro získání detailů na základě identifikátoru
    const getDetails = async (id: string): Promise<DetailsResult> => {
        const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`)
        return result.json()
    }

        // Vrací objekt s funkcemi pro vyhledávání a získání detailů
    return {
        searchData,
        getDetails,
    }
}

// Exportuje výchozí implementaci hooku
export default useApi

