# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deployment to cPanel

Deploying a Next.js application to cPanel requires using the **Node.js Selector** or a similar feature. Here is a general guide:

### 1. Build Your Project

First, you need to create a production-ready version of your app. Run the following command in your local terminal:

```bash
npm run build
```

This command will create an optimized build in a `.next` folder.

### 2. Prepare and Upload Files

Next, you need to upload your project files to your hosting server. Create a ZIP archive containing the following:

- The `.next` folder (created in the previous step)
- The `public` folder
- The `node_modules` folder
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `messages` folder
- `.env` (if you have any environment variables)

Upload this ZIP file to your desired directory on the server using the cPanel **File Manager** and then extract it.

### 3. Set Up the Node.js Application in cPanel

1.  Log in to your cPanel and find the **"Setup Node.js App"** tool.
2.  Click **"Create Application"**.
3.  Set the **"Application root"** to the folder where you extracted your files (e.g., `/home/youruser/my-app`).
4.  The **"Application startup file"** should be configured to run your app. Your `package.json` has a `start` script (`next start`), which is what cPanel will use. You can often leave the startup file field blank if cPanel correctly identifies your `package.json`.
5.  Click **"Create"**.

### 4. Install Dependencies and Start the App

Once the application is created in the cPanel interface:

1.  You will see an option to **"Run NPM Install"**. Click this to install all the dependencies from your `package.json` on the server.
2.  After the installation is complete, click the **"Start App"** button. This will run the `npm start` command and get your application running.

### 5. Point Your Domain

Finally, you need to associate your domain with the running Node.js application. This is typically done within the **"Domains"** section of cPanel or might be an option directly within the Node.js App setup page.

That's it! Your Next.js site should now be live on your domain. Keep in mind that the exact steps can vary slightly between hosting providers, so it's always a good idea to check their specific documentation if you run into any issues.
