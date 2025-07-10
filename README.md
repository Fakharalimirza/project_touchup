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

If your project isn't already set up with Firebase, you need to initialize it. Run the following command from your project's root directory:

```bash
firebase init apphosting
```

The CLI will guide you through the process:
-   Select an existing Firebase project or create a new one.
-   It will detect your `apphosting.yaml` file and set up the backend.

### Step 2: Deploy Your Application

Once initialization is complete, you can deploy your application with a single command:

```bash
firebase apphosting:backends:deploy
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
    The CLI will prompt you to enter the secret value. Repeat this for each variable (e.g., `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.).

2.  **Grant access to the secret:** In your `apphosting.yaml` file, you need to grant your backend access to these secrets:
    ```yaml
    # apphosting.yaml
    backendId: touchup-web
    runConfig:
      # ...
    secretEnvironmentVariables:
      - secret: SMTP_HOST
      - secret: SMTP_PORT
      - secret: SMTP_USER
      - secret: SMTP_PASS
      - secret: SMTP_FROM_EMAIL
      - secret: ADMIN_EMAIL_BOOKING
      - secret: ADMIN_EMAIL_CONTACT
    ```

3.  **Redeploy:** After adding secrets to your `apphosting.yaml`, you must redeploy your backend for the changes to take effect.
    ```bash
    firebase apphosting:backends:deploy
    ```

That's it! Your Next.js site will be live and running on Firebase's scalable infrastructure.
