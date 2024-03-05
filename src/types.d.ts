export type City = {
	id: number;
	title: string;
}

export interface AuthSuccessResponse extends Response {
	success: boolean;
	message: string;
}

export type NullableAuthSuccessResponse = AuthSuccessResponse | null;

export type Nullable<T> = T | null

export type User = {
	id: number;
	phone_number: string;
	name: string;
	email?: string;
	created_at: string;
	updated_at: string;
	city_id: number;
	city: City;
	isLoggedIn: boolean;
}

export type Credentials = {
	phone_number: string;
	password: string;
	password_confirmation: string;
	city_id: number | string;
	birthday: string;
	name: string;
}

export type LoginCredentials = {
	phone_number?: string;
	email?: string;
	password: string;
}

export interface PaginatedResponse<T> {
	current_page: number;
	data: T[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: Link[];
	next_page_url: string;
	path: string;
	per_page: number;
	prev_page_url: string;
	to: number;
	total: number;
}

export type Link = {
	label: string;
	url: string;
	active: boolean;
}

export type Program = {
	id: number;
	title: string;
	description: string;
	preview_image_path: string;
	price: number;
	discount_price: number;
	city: City;
	service: Service;
	photos: Photo[];
	max_people_count: number;
	days: Day[];
	outfits: Outfit[];
}

export type Outfit = {
	id: number;
	title: string;
	preview_image_path: string;
	employees: Employee[];
}

export type Day = {
	id: number;
	program_id: number;
	date: string;
	times: Time[];
}

export type Time = {
	id: number;
	schedule_program_id: number;
	time_start: string;
	time_end: string;
}

export type Photo = {
	id: number;
	program_id: number;
	image_path: string;
}

export type Service = {
	id: number;
	title: string;
}

export type AdditionalService = {
	id: number;
	title: string;
	price: number;
}

export interface Employee {
	id: number;
	name: string;
	surname: string;
	position: string;
	photo: string;
	city: City;
	outfits: Outfit[];
	employee_role: EmployeeRole;
}

export interface EmployeeRole {
	id: number;
	title: string;
}

export interface Order {

}

export interface OrderInput {
	user_id: number;
	program_id: number;
	additional_service_ids: number[];
	schedule_program_id: number;
	schedule_program_time_id: number;
	employee_ids: number[];
	outfit_ids: number[];
	comment: string;
	people_count: number;
}