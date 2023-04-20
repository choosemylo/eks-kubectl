# express-project-skeleton

## Purpose
Uniform structure and common configuration

## Accountabilities
 - Demonstrating usage of diagnostic middleware
   - Handled by `service-common` with `ServiceContext`
 - Demonstrating usage of mylog
 - Providing error class examples and error handling best practices
   - Standard error classes and error handling are included from `service-common`
 - Providing folder structure for nodejs service
 - Demonstrating database configuration and usage with postgres, objection, and knex
 - Demonstrating unit tests with mocha and chai

## Getting started

- Install [Node.js](https://nodejs.org/en/)(v16+)
    
## Setting up the database
- `npm run db:create`

## Running locally

| Environment Variable | Example Value |
|----------------------|---------------|
| AWS_SQS_QUEUE_URL     | SQS queue url (found in SQS Dashboard) (optional) |
| AWS_REGION            |      aws-region-id (optional)         |
| AWS_ACCESS_KEY_ID     | aws-access-key (optional) |
| AWS_SECRET_ACCESS_KEY | aws-secret-access-key (optional) |
| AWS_SECRET_ACCESS_KEY | aws-secret-access-key (optional) |
| PORT                  | 3001 |
| LOGGER_LEVEL          | info |

- set up AWS SQS for message handling. See [Teams](https://lockton.sharepoint.com/sites/MyloTechnology/SitePages/SQS%20Setup.aspx) for setup instructions.
- `npm run watch` or `npm run watch:win` and navigate to [http://localhost:3000](http://localhost:3000)
   - Port can be overridden with environment variable **PORT**

## Organization and Features
This project is designed to be an easy framework to build other Mylo services from.  It offers the following features:
- Postgres database via Objection/Knex
- Multiple routes
   - The server itself is fairly simple and all routes are loaded from a /routes sub-directory
- MyloError generic class and sub-class examples in `/common/errors`
   - Standard error classes are included with `service-common`
- Logging through [mylog](https://github.com/choosemylo/mylog)
   - Standard http logging middleware is added to the application
   - Example generic log message on the example route `heartbeat` endpoint (included by `service-common`)
   - Standard Error logging is included with `service-common` [errorHandler](https://github.com/choosemylo/service-common/blob/main/lib/errorHandler.js)
- Testing
   - Tests are run with mocha; unit tests on each route and one application test
   - Test coverage is run with `nyc` and saved to /coverage directory
- Common Mylo service functionality is included by [service-common](https://github.com/choosemylo/service-common)
   - Standard diagnositc middleware
   - Standard error classes and error handling
   - Scopes that will be checked on service startup
   - Server start-up and terminus

- Build and Deploy
   - This project uses Danger.js (must add DANGER_GITHUB_API_TOKEN to Travis)
   - This project builds in Travis and Docker (must add DOCKER_USERNAME, DOCKER_PASSWORD, and DOCKER_EMAIL in Travis settings)
   - Includes script to publish the Docker container
   - Also demonstrates how an NPM Token is used to gain access to our private NPM libraries
   - Includes skeleton for `k8s-deploy` from `@mylo/build-tools` (See TODOs in `.travis.yml`)

## Standing up a new service
### Create the repo and add to CI pipeline
1. Select "Use this template" on this repo:
   ![Use this template](/assets/use-this-template.png)
1. Fill in the repository details (!!Ensure `Private` is selected!!)
   ![Repository details](/assets/create-repository.png)
1. Update GitHub settings
   - TODO Not sure what these are yet
1. You'll see a Travis job kicked off, but you'll have to update the settings to inject required environment variables, etc. (later step)
1. Clone the repo locally
1. Update `package(-lock).json` with the following things:
   - Name: Unfortunately, I don't know a good way to update the name. I used (OSX) `find ./ -type f -name 'package*.json' | xargs sed -i '' 's/express-project-skeleton/new-name/g'`
   - Version: `npm version 0.1.0`
   - Description
   - Code coverage values
   - Finally, `npm ci`
1. Update your service `README.md`
1. Review `travis.yml`
   - Do not uncomment the k8s deploy line yet
   - See [Travis CI Build](https://lockton.sharepoint.com/sites/MyloTechnology/SitePages/Travis%20CI%20Build.aspx)
   - Most variables are in LastPass (`new travis build variables`), but some you may need to get from someone who has access (e.g. GITHUB_ACCESS_TOKEN)
1. Commit and push initial changes
1. Begin running locally and testing manually until the code is in a deployable state
   - Ideally this means that an api proxy is available through Baemax and/or the api-gateway so that version/health can be accessed
   - Confirm that the push to dockerhub is successful
   - Possibly check the docker image and run it locally too 

### Add the repo to Sandbox environment and CD pipeline
1. Give DevOps a heads up that a new repo will be required as soon as you know about it so they have enough time to plan to help you
   They will also need to know the following:
   - If a database is needed
   - If an auth certificate is needed
   - Any other special environment variables (Kafka, Salesforce, etc)
   - What the proxy url is
1. Bump to version `1.0.0` 
1. Update `travis.yml` again
   - Review any remaining `TODOs`
   - Now is when the k8s deploy line can be uncommented
1. Request new service deploy in `#deploy_infrastructure`

### Add the repo to the team responsible for it
1. Master statuses page in enginerring principles
   - https://github.com/choosemylo/engineering-principles/blob/master/pages/master-statuses.md
1. Auto react in auto-react-bot so the errors in the #engineering channel get tagged with the correct team emoji
   - https://github.com/choosemylo/auto-react-bot/blob/main/botModules/autoReact.js