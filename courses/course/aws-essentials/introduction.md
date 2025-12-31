# Introduction

In this AWS Essentials course, we will learn what it is like to be a full-stack developer leveraging Amazon Web Services. We will learn how to create an AWS personal account, login, then we will get familiar with the AWS console. From there we will create a simple full stack application leveraging several AWS services: CloudFront, Certificate Manager, S3, API Gateway, Lambda, and DynamoDB.

We will start by learning about S3 and use that knowledge to create an S3 bucket that we will configure to serve a website that is distributed globally over the Internet using CloudFront with a TLS/SSL certificate issued by the Certificate Manager. Then we will learn about bootstrap then find a template website to upload to our bucket to make it available over the Internet. And finally, we will learn how to modify our website to add a contact me form that will allow a potential customer to send us a message.

To gather the requests submitted using our form, we will learn about REST then create an API Gateway interface to receive the messages sent via an HTTP POST request. Next, we will learn about Lambda Functions then create one to forward the request to and it will process the request and save it to our database. For our database, we will learn about DynamoDB and how to configure it to save our messages.

This will take you a long way towards becoming a full-stack developer on AWS. Time permitting, we can go a bit farther and add another method to our API Gateway to fetch the messages that were sent to us so we  can view them on our website by modifying it to display our messages in a table.

## Our Stack

* Frontend
  * HTML
  * CSS
  * JavaScript
  * Bootstrap
  * Fetch API
* Backend
  * Node.js (JavaScript)
  * NoSQL DB

## Our Infrastructure

* Amazon Web Services
  * Frontend
    * Route 53
    * CloudFront
    * Certificate Manager
    * S3
  * Backend
    * API Gateway
    * AWS Lambda
    * DynamoDB


