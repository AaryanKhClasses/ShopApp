<center><h1>ShopApp</h1></center>

<p align="center">A to-fork one-to-many ecommerce platform</p>
<div align="center">
<img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/AaryanKhClasses/ShopApp?style=for-the-badge&label=Issues&color=red&link=https%3A%2F%2Fgithub.com%2FAaryanKhClasses%2FShopApp%2Fissues">
<img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues-pr/AaryanKhClasses/ShopApp?style=for-the-badge&label=Pull%20Requests&color=blue&link=https%3A%2F%2Fgithub.com%2FAaryanKhClasses%2FShopApp%2Fpulls" style="margin-left: 0.1em">
<img alt="GitHub forks" src="https://img.shields.io/github/forks/AaryanKhClasses/ShopApp?style=for-the-badge&label=Forks&color=green&link=https%3A%2F%2Fgithub.com%2FAaryanKhClasses%2FShopApp%2Fforks" style="margin-left: 0.1em">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/AaryanKhClasses/ShopApp?style=for-the-badge&label=Stars&color=yellow" style="margin-left: 0.1em">
</div>

<p align="center" style="margin-top: 1em">Tools used:</p>
<div align="center">
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/NextUI-000?logo=nextui&logoColor=fff&style=for-the-badge">
<img src="https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/TypeScript_JSX-007ACC?style=for-the-badge&logo=react&logoColor=white"style="margin-left: 0.1em">
<img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=for-the-badge" alt="Prisma Badge">
</div>

<h2>Table of Contents</h2>
<ul>
<li><a href="#prerequesites">Prerequesites</a></li>
<li><a href="#the-env-file">The .env File</a></li>
<li><a href="#setting-up-external-sources">Setting up External Sources</a></li>
<li><a href="#the-admin-panel">Admin Panel</a></li>
<li><a href="#the-customer-side">Customer Side</a></li>
<li><a href="#more-info">More Info</a></li>
<ul>
<li><a href="#contributing">Contributing</a></li>
<li><a href="#license">License</a></li>
<li><a href="#also-see">Also See</a></li>
</ul>
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
APP_NAME=
</pre></li>
<li>Enter your Application Name in the "APP_NAME" field. This will be visible on every page of your website.</li>
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
<ol>
<li>Go to the <a href="https://stripe.com">Stripe Website</a> and create an account (if you already don't have one)</li>
<li>Head over to the <a href="https://dashboard.stripe.com">Stripe Dashboard</a> and click on the "Developers" button in the bottom-left corner</li>
<li>Click on the "API Keys" button and see the "Standard Keys" section.</li>
<li>Copy the "Publishable Key" from your dashboard to the "NEXT_PUBLIC_STRIPE_PUBLIC_KEY" field in your .env file.</li>
<li>Copy the "Secret Key" from your dashboard to the "STRIPE_SECRET_KEY" field in your .env file.</li>
</ol>
</ul>

<h2>The Admin Panel</h2>
To access the admin panel (any page with /admin route), you would need the username and password you have set up in your ".env" file. Remember the username is the same as the "ADMIN_USERNAME" field, however the password is the one you chose before hashing your password by running the "hashPassword.bat" file.
<h3>The Dashboard</h3>
The dashboard (/admin) displays the number of orders, the total profit you made, the number of customers, the average customer value, and the number of active & inactive products.
<h3>The Admin Products Page</h3>
This page (/admin/products) allows you to see all the products you have listed, their price, and how many orders have been placed yet in a tabular form. You can also edit the product information, allow you to de-list / re-list the products, and also delete the products from the store (only if no orders have been placed). Also, you can create a new product through this page.
<h3>The Admin Customers Page</h3>
This page (/admin/customers) allows you to see all your customers alongside with the total purchased amount in a tabular form.
<h3>The Admin Orders Page</h3>
This page (/admin/orders) allows you to view all your orders, and give an option that the order is fullfilled or not. You can also check to see only those orders which have not been fullfilled. Once you click the order fullfilled, the respective customer will recieve an e-mail about the same.

<h2>The Customer Side</h2>
The customer is required to login with a Google Account. After logging in, the customer can purchase any listed product by the admin. Also through the Navbar, the customer can see their existing orders and their cart alongside with their account settings.
<h3>The Products Page</h3>
The home page (/) shows the top 6 most popular products and the top 6 newest products listed. However, you can visit the products page (/products) to see all the listed products, not just the top 6.
<h3>The My Orders Page</h3>
The page (/me/orders) shows all the products the customer has purchased along with their price and the order date in a tabular form.
<h3>The My Cart Page</h3>
The page (/me/cart) shows the products the customer has "added to cart" along with the quantity and total price in a tabular form. The user also get the option to view the product and remove one item from the cart. The total price of the cart is also listed on the page.
<h3>The Account Settings Page</h3>
The page (/me/settings) shows your avatar, user id, name, and email. It lets you view your orders and cart. Also you can permanently delete your account (the action is irreversible).

<h2>More Info</h2>
<h3>Contributing:</h3>
If you are interested in this project, you can <a href="../../issues"> create an issue</a> under the label "idea". Furthermore, you can <a href="../../pulls">create a pull request</a> if you directly want to contribute to the project.

<h3>License:</h3>
The project is under the GNU GPL-3.0 License. You can <a href="/LICENSE">click here to view the license</a>

<h3>Also See:</h3>
<ul>
<li><a href="https://github.com/AaryanKhClasses">My Profile</a></li>
<li>Another Little Project: <a href="https://github.com/AaryanKhClasses/Sayout-Clone">Sayout Clone</a></li>
<li>A JSON Based Local Database: <a href="https://github.com/AaryanKhClasses/DatabaseApp">DatabaseApp</a></li>
</ul>