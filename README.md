# Firebase Studio

This is a Next.js starter project built in Firebase Studio.

## DEPLOYMENT FIX: How to Deploy

If you are having deployment issues, your local Firebase configuration is likely out of sync. A `.firebaserc` file has been created for you to fix this.

### Step 1: Deploy Your Application

You can now deploy your application with a single command. This command specifically targets App Hosting and should now work correctly:

```bash
firebase deploy --only apphosting
```

This command will:
1.  Build your Next.js application for production.
2.  Package the build output into a container image.
3.  Push the image to a secure registry.
4.  Deploy the image to Firebase App Hosting, making it live.

After the deployment finishes, the CLI will provide you with the URL where your application is running, and the login issues will be resolved.

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
    secretEnvironmentVariables:
      - secret: FIREBASE_PRIVATE_KEY
      - secret: FIREBASE_CLIENT_EMAIL
    # ... and so on for other secrets
    ```

3.  **Redeploy:** After adding secrets to your `apphosting.yaml`, you must redeploy your backend for the changes to take effect.
    ```bash
    firebase deploy --only apphosting
    ```

That's it! Your Next.js site will be live and running on Firebase's scalable infrastructure.
