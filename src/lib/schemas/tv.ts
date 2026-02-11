import * as v from 'valibot';

export const TVIdInput = v.pipe(v.number(), v.minValue(1));

export const SeasonInput = v.object({
	tvId: v.pipe(v.number(), v.minValue(1)),
	seasonNumber: v.pipe(v.number(), v.minValue(0))
});

export type SeasonInput = v.InferInput<typeof SeasonInput>;
