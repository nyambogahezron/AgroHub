// User-related args
export interface GetUserArgs {
	id: string;
}

export interface UpdateUserArgs {
	name?: string;
	email?: string;
	state?: string;
	city?: string;
	phone?: string;
}

export interface UpdatePasswordArgs {
	oldPassword: string;
	newPassword: string;
}

// Auth-related args
export interface RegisterArgs {
	name: string;
	email: string;
	password: string;
}

export interface LoginArgs {
	email: string;
	password: string;
}

export interface VerifyEmailArgs {
	email: string;
	verificationToken: string;
}

export interface ForgotPasswordArgs {
	email: string;
}

export interface ResetPasswordArgs {
	email: string;
	token: string;
	password: string;
}

// Organization-related args
export interface GetOrganizationArgs {
	id: string;
}

export interface CreateOrganizationArgs {
	name: string;
	email: string;
	phone: string;
	address: string;
}

export interface UpdateOrganizationArgs {
	id: string;
	name?: string;
	email?: string;
	phone?: string;
	address?: string;
}

export interface DeleteArgs {
	id: string;
}

// Budget-related args
export interface GetBudgetArgs {
	id: string;
}

export interface GetOrganizationBudgetsArgs {
	organizationId: string;
}

export interface ItemInput {
	name: string;
	amount: number;
}

export interface CreateBudgetArgs {
	organization: string;
	title: string;
	amount: number;
	date: Date;
	items: ItemInput[];
}

export interface UpdateBudgetArgs {
	id: string;
	title?: string;
	amount?: number;
	date?: Date;
	items?: ItemInput[];
}

// Transaction-related args
export interface GetTransactionArgs {
	id: string;
}

export interface GetOrganizationTransactionsArgs {
	organizationId: string;
}

export interface GetBudgetTransactionsArgs {
	budgetId: string;
}

export interface CreateTransactionArgs {
	organization: string;
	budget: string;
	title: string;
	amount: number;
	category: string;
	description: string;
	transaction_date: Date;
}

export interface UpdateTransactionArgs {
	id: string;
	title?: string;
	amount?: number;
	category?: string;
	description?: string;
	transaction_date?: Date;
}

// Product-related args
export interface GetProductArgs {
	id: string;
}

export interface GetOrganizationProductsArgs {
	organizationId: string;
}

export interface CreateProductArgs {
	organization: string;
	name: string;
	price: number;
	description: string;
	category: string;
	stock: number;
}

export interface UpdateProductArgs {
	id: string;
	name?: string;
	price?: number;
	description?: string;
	category?: string;
	stock?: number;
}

// Subscription-related args
export interface GetSubscriptionArgs {
	id: string;
}

export interface CreateSubscriptionArgs {
	plan: string;
	price: number;
	status: string;
	start_date: Date;
	end_date: Date;
	stripe_id?: string;
	payPal_id?: string;
}

export interface UpdateSubscriptionArgs {
	id: string;
	plan?: string;
	price?: number;
	status?: string;
	start_date?: Date;
	end_date?: Date;
	stripe_id?: string;
	payPal_id?: string;
}

// Notification-related args
export interface GetNotificationArgs {
	id: string;
}

// Organization user-related args
export interface GetOrganizationUserArgs {
	id: string;
}

export interface GetAllOrganizationUsersArgs {
	organizationId: string;
}

export interface CreateOrganizationUserArgs {
	organization: string;
	name: string;
	email: string;
	phone: string;
	location: string;
	role: string;
	date: Date;
}

export interface UpdateOrganizationUserArgs {
	id: string;
	name?: string;
	email?: string;
	phone?: string;
	location?: string;
	role?: string;
	date?: Date;
}
