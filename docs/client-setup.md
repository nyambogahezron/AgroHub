# Starting a Next.js App

Follow these steps to start a Next.js application by cloning an existing repository:

1. **Install Node.js and npm**:
   Ensure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

2. **Clone the repository**:
   Use the following command to clone the existing Next.js application repository:

   ```bash
   git clone https://github.com/nyambogahezron/AgroHub
   ```

3. **Navigate to your project directory**:

   ```bash
   cd your-project-name
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

6. **Set the API base URI**:
   Create a `.env` file in the root of your project and add the following line to set the API base URI:

   ```plaintext
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url_here  # Replace with your actual API base URL
   ```

7. **Open your browser**:
   Open your browser and navigate to `http://localhost:3000` to see your Next.js app in action.

For more information, refer to the [Next.js documentation](https://nextjs.org/docs).
