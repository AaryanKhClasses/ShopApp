<center><h1>ShopApp</h1></center>

<p align="center">A to-fork one-to-many ecommerce platform</p>
<center>
<img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/AaryanKhClasses/ShopApp?style=for-the-badge&label=Issues&color=red&link=https%3A%2F%2Fgithub.com%2FAaryanKhClasses%2FShopApp%2Fissues">
<img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues-pr/AaryanKhClasses/ShopApp?style=for-the-badge&label=Pull%20Requests&color=blue&link=https%3A%2F%2Fgithub.com%2FAaryanKhClasses%2FShopApp%2Fpulls" style="margin-left: 0.1em">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/AaryanKhClasses/ShopApp?style=for-the-badge&label=Forks&color=green&link=https%3A%2F%2Fgithub.com%2FAaryanKhClasses%2FShopApp%2Fforks" style="margin-left: 0.1em">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/AaryanKhClasses/ShopApp?style=for-the-badge&label=Stars&color=yellow" style="margin-left: 0.1em">
</center>

<p align="center" style="margin-top: 1em">Tools used:</p>
<center>
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/TypeScript_JSX-007ACC?style=for-the-badge&logo=react&logoColor=white"style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"style="margin-left: 0.1em">
</center>

<h2>Table of Contents</h2>
<ul>
    <li>Prerequesites</li>
    <li>The .env File</li>
    <li>Setting up External Sources</li>
    <li>Admin Panel</li>
    <li>Customer Side</li>
</ul>

<h2>Prerequesites</h2>
<ol>
    <li><b>NodeJS:</b> To run the server, you would need NodeJS installed on your machine. <a href="https://nodejs.org">Click Here</a> to download NodeJS.
</ol>

<h2>The .env File</h2>
<ol>
    <li>Create a .env file in the root directory of the project.</li>
    <li>Paste the following in the .env file:
    <pre>
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME=
HASHED_ADMIN_PASSWORD=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
NEXT_PUBLIC_SERVER_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=
</pre></li>
<li>Enter any username you want in the "ADMIN_USERNAME" field.</li>
<li>In the "NEXT_PUBLIC_SERVER_URL" field, enter your website URL.</li>
<li>In the "AUTH_SECRET" field, enter any random string.</li>
<li>Now run the "hashPassword.bat" file and enter a password, and paste the result in the "HASHED_ADMIN_PASSWORD" field.</li>
<li>The rest of the fields will be discussed later on.</li>
</ol>

<h2>Setting up External Sources</h2>
For this project, there are external sources such as the Google Cloud Console and Stripe.
<ul>
    <li><b>Setting up Google Cloud Console:</b></li>
    <ol>
        <li>Go to the <a href="https://console.cloud.google.com">Google Cloud Console</a> and create a new project.</li>
        <li>Now, search for "APIs and Services" from the search bar. From the left sidebar click on "OAuth Consent Screen".</li>
        <li>Check the box saying "External", and click on "Continue"</li>
        <li>In the "App Information" Section, enter the App Name and your Email and optionally App Logo.</li>
        <li>Leave the rest of the fields empty, and again enter your email address in the "Developer Contact Information" section.</li>
        <li>After clicking "Continue", click on "Add or Remove Scopes" button in the "Scopes" Section, and add the following scopes by checking their boxes:
        <pre>
.../auth/userinfo.email
.../auth/userinfo.profile
openid
</pre>
and click on "Save and Continue".
        </li>
        <li>For now, in the "Test Users" section, just add your own email address again. Click "Save and Continue", and finally "Create" to create your OAuth Application.</li>
        <li>Now, click the "Credentials" tab in the left sidemenu, and click on "Create Credentials" at the top. Select "OAuth Client ID".</li>
        <li>Select "Web Application" as the Application Type, and give it a name. In the "Authorised Redirect URIs" Section, enter "[your website url]/api/auth/callback/google" and click "Create".</li>
        <li>Finally copy the "OAuth Client Secret" and "OAuth Client ID" and paste it in your .env file.</li>
    </ol>
    <li><b>Setting up Stripe:</b></li>
    [This part to be added later]
</ul>

<h2>The Admin Panel</h2>

<h2>The Customer Side</h2>
