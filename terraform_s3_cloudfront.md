Sure, let's break down the process into two parts: first, creating the AWS resources manually, and then creating Terraform scripts to automate the deployment.

### Step-by-Step Tutorial: Setting Up Private S3 Bucket with CloudFront

#### Part 1: Setting Up AWS Resources Manually

### Step 1: Create an S3 Bucket

1. Go to the Amazon S3 console: [Amazon S3 Console](https://console.aws.amazon.com/s3/).
2. Click on "Create bucket".
3. Enter a unique bucket name and select the region.
4. Keep the default settings for the rest of the options and click "Create bucket".

### Step 2: Upload Content to S3 Bucket

1. Open the bucket you just created.
2. Click on the "Upload" button.
3. Select the files or folder you want to upload and click "Upload".

### Step 3: Create a CloudFront Distribution

1. Go to the Amazon CloudFront console: [Amazon CloudFront Console](https://console.aws.amazon.com/cloudfront/).
2. Click on "Create Distribution".
3. Under "Web", click "Get Started".
4. Fill in the following settings:
   - Origin Domain Name: Select the S3 bucket you created.
   - Restrict Bucket Access: Yes.
   - Origin Access Identity: Create a new identity.
   - Grant Read Permissions on Bucket: Yes, Update Bucket Policy.
   - Viewer Protocol Policy: Redirect HTTP to HTTPS.
   - Default Cache Behavior Settings: Keep defaults or adjust as needed.
5. Click "Create Distribution".

### Step 4: Update S3 Bucket Policy

1. Go back to the Amazon S3 console.
2. Open the bucket you created.
3. Go to the "Permissions" tab.
4. Click on "Bucket Policy".
5. Update the bucket policy to allow CloudFront to access the bucket. Replace `YOUR-CLOUDFRONT-DISTRIBUTION-ID` with your CloudFront distribution ID.

```json
{
    "Version": "2012-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity YOUR-CLOUDFRONT-DISTRIBUTION-ID"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-S3-BUCKET/*"
        }
    ]
}
```

### Step 5: Test the Setup

1. Wait for the CloudFront distribution to deploy (this may take some time).
2. Once deployed, grab the CloudFront domain name from the CloudFront console.
3. Try accessing a file in your S3 bucket using the CloudFront domain name. You should receive a 403 Forbidden error if the setup is correct.

#### Part 2: Creating Terraform Scripts

Now, let's automate the deployment using Terraform.

### Step 1: Install Terraform

Install Terraform on your local machine by following the instructions here: [Terraform Installation Guide](https://learn.hashicorp.com/tutorials/terraform/install-cli).

### Step 2: Create Terraform Configuration Files

Create the following files in your project directory:

- `main.tf`
- `variables.tf`
- `outputs.tf`

### Step 3: Write Terraform Configuration

Fill in the content of the Terraform configuration files:

#### main.tf

```hcl
provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "private_bucket" {
  bucket = var.s3_bucket_name
  acl    = "private"
}

resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  origin {
    domain_name = aws_s3_bucket.private_bucket.bucket_regional_domain_name
    origin_id   = "S3Origin"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
```

#### variables.tf

```hcl
variable "aws_region" {
  description = "AWS region"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket"
}
```

#### outputs.tf

```hcl
output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.cloudfront_distribution.domain_name
}
```

### Step 4: Initialize and Apply Terraform Configuration

Run the following commands in your project directory:

```sh
terraform init
```

This initializes your Terraform configuration.

```sh
terraform apply
```

This will apply the Terraform configuration and provision the resources.

### Step 5: Test the Deployment

1. Once Terraform completes the deployment, grab the CloudFront domain name from the Terraform output.
2. Try accessing a file in your S3 bucket using the CloudFront domain name. You should receive a 403 Forbidden error if the setup is correct.

That's it! You've now set up a private AWS S3 bucket served by an AWS CloudFront distribution using Terraform. This ensures that the content in your S3 bucket can only be accessed via CloudFront.
