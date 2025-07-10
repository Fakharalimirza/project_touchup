# Firebase Studio

This is a Next.js starter project built in Firebase Studio.

## Deployment to Firebase App Hosting

Deploying your Next.js application to Firebase App Hosting is a streamlined process that leverages the Firebase CLI.

### Prerequisites

1.  **Install the Firebase CLI:** If you haven't already, install the Firebase Command Line Interface on your machine.
    ```bash
    npm install -g firebase-tools
    ```

2.  **Log in to Firebase:** Authenticate with your Firebase account.
    ```bash
    firebase login
    ```

### Step 1: Initialize Firebase in Your Project

If you are having deployment issues, you may need to re-initialize your project. Run the following command from your project's root directory:

```bash
firebase init apphosting
```

The CLI will guide you through the process:
-   Select your existing Firebase project (`touchup-42i8o`).
-   It will detect your `apphosting.yaml` file and set up the `touchup-web` backend. This will fix the link between your local project and Firebase.

### Step 2: Deploy Your Application

Once initialization is complete, you can deploy your application with a single command:

```bash
firebase deploy --only apphosting
```

This command will:
1.  Build your Next.js application for production.
2.  Package the build output into a container image.
3.  Push the image to a secure registry.
4.  Deploy the image to Firebase App Hosting, making it live.

After the deployment finishes, the CLI will provide you with the URL where your application is running.

### Environment Variables

For any environment variables in your `.env` file (like email credentials), you must add them as secrets in Firebase so they are available to your live application.

1.  **Set a secret:**
    ```bash
    firebase apphosting:secrets:set SECRET_NAME
    ```
    The CLI will prompt you to enter the secret value. Repeat this for each variable. For this project, you will need to set `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`.

2.  **Grant access to the secret:** In your `apphosting.yaml` file, you need to grant your backend access to these secrets:
    ```yaml
    # apphosting.yaml
    backendId: touchup-web
    runConfig:
      # ...
    # Grant access to secrets
    env:
      - variable: ADMIN_PRIVATE_KEY
        secret: FIREBASE_PRIVATE_KEY
      - variable: FIREBASE_CLIENT_EMAIL
        secret: FIREBASE_CLIENT_EMAIL
    secretEnvironmentVariables:
      - secret: NEXT_PUBLIC_FIREBASE_API_KEY
      - secret: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
      # ... and so on for other secrets
    ```

3.  **Redeploy:** After adding secrets to your `apphosting.yaml`, you must redeploy your backend for the changes to take effect.
    ```bash
    firebase deploy --only apphosting
    ```

That's it! Your Next.js site will be live and running on Firebase's scalable infrastructure.
