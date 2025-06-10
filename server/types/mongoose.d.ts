import mongoose from 'mongoose';

declare module 'mongoose' {
	namespace Schema {
		namespace Types {
			// Override the ObjectId type definition for schema use
			class ObjectId extends mongoose.SchemaType {
				constructor(key: string, options?: any);
				static schemaName: string;
			}
		}
	}
}
