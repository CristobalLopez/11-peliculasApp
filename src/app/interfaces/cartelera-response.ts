export interface CarteleraResponse {
    total_pages:   number;
    results:       Movie[];
    total_results: number;
    page:          number;
    dates:         Dates;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface Movie {
    adult:             boolean;
    backdrop_path:     string;
    popularity:        number;
    genre_ids:         number[];
    title:             string;
    original_language: string;
    original_title:    string;
    poster_path:       string;
    vote_count:        number;
    video:             boolean;
    vote_average:      number;
    id:                number;
    overview:          string;
    release_date:      Date;
}
