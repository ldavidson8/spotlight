import { query } from '$app/server';
import * as v from 'valibot';
import { TimeWindowSchema } from '$lib/schemas/common';
import {
	fetchTrendingPeople,
	fetchPopularPeople,
	fetchPersonDetails,
	fetchPersonMovieCredits,
	fetchPersonTvCredits,
	fetchPersonCombinedCredits,
	fetchPersonImages,
	fetchPersonExternalIds,
	searchPeople as searchPeopleServer
} from '$lib/server/tmdb/people';

export const getTrendingPeople = query(
	v.object({
		timeWindow: v.optional(TimeWindowSchema, 'week')
	}),
	async ({ timeWindow }) => {
		return fetchTrendingPeople(timeWindow);
	}
);

export const getPopularPeople = query(async () => {
	return fetchPopularPeople();
});

export const getPersonDetails = query(
	v.number(),
	async (id) => {
		return fetchPersonDetails(id);
	}
);

export const getPersonById = getPersonDetails;

export const getPersonMovieCredits = query(
	v.number(),
	async (id) => {
		return fetchPersonMovieCredits(id);
	}
);

export const getPersonTvCredits = query(
	v.number(),
	async (id) => {
		return fetchPersonTvCredits(id);
	}
);

export const getPersonCombinedCredits = query(
	v.number(),
	async (id) => {
		return fetchPersonCombinedCredits(id);
	}
);

export const getPersonImages = query(
	v.number(),
	async (id) => {
		return fetchPersonImages(id);
	}
);

export const getPersonExternalIds = query(
	v.number(),
	async (id) => {
		return fetchPersonExternalIds(id);
	}
);

export const searchPeople = query(
	v.object({
		query: v.string(),
		page: v.optional(v.number(), 1)
	}),
	async ({ query: searchQuery, page }) => {
		return searchPeopleServer(searchQuery, page);
	}
);
