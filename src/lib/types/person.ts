export interface PersonDetail {
	id: number;
	name: string;
	biography: string;
	birthday: string | null;
	deathday: string | null;
	place_of_birth: string | null;
	profile_path: string | null;
	known_for_department: string;
	also_known_as: string[];
	combined_credits: { cast: any[]; crew: any[] };
	images: { profiles: any[] };
	external_ids: {
		imdb_id: string | null;
		instagram_id: string | null;
		twitter_id: string | null;
	};
}
