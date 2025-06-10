import multer from 'multer';
import path from 'path';

// Set up storage engine
const storage = multer.diskStorage({
	destination: function (
		req: Express.Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void
	) {
		cb(null, 'uploads/'); // Specify the destination directory
	},
	filename: function (
		req: Express.Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void
	) {
		cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
	},
});

// Check file type
function checkFileType(
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
): void {
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error('Error: Images Only!'));
	}
}

// Initialize upload
const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 }, // Limit file size to 1MB
	fileFilter: function (
		req: Express.Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback
	) {
		checkFileType(file, cb);
	},
}).single('file'); // Accept a single file with the name 'file'

export default upload;
