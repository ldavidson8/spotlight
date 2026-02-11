import * as v from 'valibot';

export const MovieIdInput = v.pipe(v.number(), v.minValue(1));
