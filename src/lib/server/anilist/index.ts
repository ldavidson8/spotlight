import { ANILIST_API_URL } from '$lib/constants';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import {
	AnilistAnimeResponseSchema,
	AnilistAnimeDetailsResponseSchema
} from '$lib/schemas/anilist/anime';

interface AnilistFetchOptions {
	signal?: AbortSignal;
}

export async function anilistFetch<T>(
	query: string,
	variables: Record<string, unknown>,
	schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
	options: AnilistFetchOptions = {}
): Promise<T> {
	const { signal } = options;

	const fetcher = async (): Promise<T> => {
		const response = await fetch(ANILIST_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ query, variables }),
			signal
		});

		if (!response.ok) {
			const body = await response.text().catch(() => 'Unknown error');
			throw error(response.status, `Anilist API error: ${response.status} - ${body}`);
		}

		const json = await response.json();

		if (json.errors) {
			console.error('Anilist GraphQL errors:', json.errors);
			throw error(500, 'Anilist GraphQL query failed');
		}

		const result = v.safeParse(schema, json.data);

		if (!result.success) {
			console.error('Anilist schema validation failed:', v.flatten(result.issues));
			throw error(500, 'Invalid response from Anilist API');
		}

		return result.output;
	};

	return fetcher();
}

const TRENDING_ANIME_QUERY = `
	query ($page: Int, $perPage: Int, $seasonYear: Int, $season: MediaSeason) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(type: ANIME, sort: TRENDING_DESC, seasonYear: $seasonYear, season: $season, isAdult: false) {
				id
				idMal
				title {
					romaji
					english
					native
				}
				type
				format
				status
				description(asHtml: false)
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				seasonInt
				episodes
				duration
				chapters
				volumes
				countryOfOrigin
				isLicensed
				source
				hashtag
				trailer {
					id
					site
					thumbnail
				}
				updatedAt
				coverImage {
					extraLarge
					large
					medium
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				isLocked
				trending
				favourites
				tags {
					id
					name
					description
					category
					isGeneralSpoiler
					isMediaSpoiler
					isAdult
				}
				isFavourite
				isAdult
				nextAiringEpisode {
					airingAt
					timeUntilAiring
					episode
				}
			}
		}
	}
`;

const POPULAR_ANIME_QUERY = `
	query ($page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
				id
				idMal
				title {
					romaji
					english
					native
				}
				type
				format
				status
				description(asHtml: false)
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				seasonInt
				episodes
				duration
				chapters
				volumes
				countryOfOrigin
				isLicensed
				source
				hashtag
				trailer {
					id
					site
					thumbnail
				}
				updatedAt
				coverImage {
					extraLarge
					large
					medium
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				isLocked
				trending
				favourites
				tags {
					id
					name
					description
					category
					isGeneralSpoiler
					isMediaSpoiler
					isAdult
				}
				isFavourite
				isAdult
				nextAiringEpisode {
					airingAt
					timeUntilAiring
					episode
				}
			}
		}
	}
`;

const TOP_RATED_ANIME_QUERY = `
	query ($page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(type: ANIME, sort: SCORE_DESC, isAdult: false) {
				id
				idMal
				title {
					romaji
					english
					native
				}
				type
				format
				status
				description(asHtml: false)
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				seasonInt
				episodes
				duration
				chapters
				volumes
				countryOfOrigin
				isLicensed
				source
				hashtag
				trailer {
					id
					site
					thumbnail
				}
				updatedAt
				coverImage {
					extraLarge
					large
					medium
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				isLocked
				trending
				favourites
				tags {
					id
					name
					description
					category
					isGeneralSpoiler
					isMediaSpoiler
					isAdult
				}
				isFavourite
				isAdult
				nextAiringEpisode {
					airingAt
					timeUntilAiring
					episode
				}
			}
		}
	}
`;

const ANIME_DETAILS_QUERY = `
	query ($id: Int) {
		Media(id: $id, type: ANIME) {
			id
			idMal
			title {
				romaji
				english
				native
			}
			type
			format
			status
			description(asHtml: false)
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
			season
			seasonYear
			seasonInt
			episodes
			duration
			chapters
			volumes
			countryOfOrigin
			isLicensed
			source
			hashtag
			trailer {
				id
				site
				thumbnail
			}
			updatedAt
			coverImage {
				extraLarge
				large
				medium
				color
			}
			bannerImage
			genres
			synonyms
			averageScore
			meanScore
			popularity
			isLocked
			trending
			favourites
			tags {
				id
				name
				description
				category
				isGeneralSpoiler
				isMediaSpoiler
				isAdult
			}
			isFavourite
			isAdult
			nextAiringEpisode {
				airingAt
				timeUntilAiring
				episode
			}
			studios(isMain: true) {
				edges {
					isMain
					node {
						id
						name
						isAnimationStudio
						siteUrl
					}
				}
			}
			characters(sort: ROLE, perPage: 20) {
				edges {
					id
					role
					node {
						id
						name {
							full
							native
							alternative
						}
						image {
							large
							medium
						}
					}
					voiceActors(language: JAPANESE) {
						id
						name {
							full
							native
						}
						image {
							large
							medium
						}
						language
					}
				}
			}
			relations {
				edges {
					id
					relationType
					node {
						id
						title {
							romaji
							english
							native
						}
						format
						type
						status
						coverImage {
							extraLarge
							large
							medium
							color
						}
					}
				}
			}
			recommendations(sort: RATING_DESC, perPage: 10) {
				nodes {
					mediaRecommendation {
						id
						title {
							romaji
							english
							native
						}
						coverImage {
							extraLarge
							large
							medium
							color
						}
					}
				}
			}
		}
	}
`;

const SEARCH_ANIME_QUERY = `
	query ($search: String, $page: Int, $perPage: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(type: ANIME, search: $search, isAdult: false) {
				id
				idMal
				title {
					romaji
					english
					native
				}
				type
				format
				status
				description(asHtml: false)
				startDate {
					year
					month
					day
				}
				endDate {
					year
					month
					day
				}
				season
				seasonYear
				seasonInt
				episodes
				duration
				chapters
				volumes
				countryOfOrigin
				isLicensed
				source
				hashtag
				trailer {
					id
					site
					thumbnail
				}
				updatedAt
				coverImage {
					extraLarge
					large
					medium
					color
				}
				bannerImage
				genres
				synonyms
				averageScore
				meanScore
				popularity
				isLocked
				trending
				favourites
				tags {
					id
					name
					description
					category
					isGeneralSpoiler
					isMediaSpoiler
					isAdult
				}
				isFavourite
				isAdult
				nextAiringEpisode {
					airingAt
					timeUntilAiring
					episode
				}
			}
		}
	}
`;

export async function fetchTrendingAnime(
	page: number = 1,
	perPage: number = 20,
	seasonYear?: number,
	season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL'
) {
	const variables: Record<string, unknown> = { page, perPage };
	if (seasonYear) variables.seasonYear = seasonYear;
	if (season) variables.season = season;

	return anilistFetch(TRENDING_ANIME_QUERY, variables, AnilistAnimeResponseSchema);
}

export async function fetchPopularAnime(page: number = 1, perPage: number = 20) {
	return anilistFetch(POPULAR_ANIME_QUERY, { page, perPage }, AnilistAnimeResponseSchema);
}

export async function fetchTopRatedAnime(page: number = 1, perPage: number = 20) {
	return anilistFetch(TOP_RATED_ANIME_QUERY, { page, perPage }, AnilistAnimeResponseSchema);
}

export async function fetchAnimeDetails(id: number) {
	return anilistFetch(ANIME_DETAILS_QUERY, { id }, AnilistAnimeDetailsResponseSchema);
}

export async function searchAnime(search: string, page: number = 1, perPage: number = 20) {
	return anilistFetch(SEARCH_ANIME_QUERY, { search, page, perPage }, AnilistAnimeResponseSchema);
}
