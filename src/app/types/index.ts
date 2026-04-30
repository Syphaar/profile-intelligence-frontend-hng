 /**
 * Profile type matches backend Prisma Profile model
 */
export interface Profile {
  id: string;
  name: string;
  gender: string;
  age: number;
  age_group: string;
  country_id: string;
  country_name: string;
  created_at: string;
}